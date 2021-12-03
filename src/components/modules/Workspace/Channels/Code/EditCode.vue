<template>
  <div>
    <div id="editCode" @mousemove="mouseIsMoving">
      <app-bar-options
        ref="codeappbar"
        :nameChannel="nameCodeChannel"
        :color="'primary'"
      ></app-bar-options>

      <div
        id="container"
        :style="calculatedHeight"
        @keydown="getLine()"
        @keyup="
          getLine();
          sendCode();
        "
        @mousedown="getLine"
      ></div>
      <cursor-component
        class="tooltip"
        v-for="cursor in userPointers"
        :key="cursor.userID"
        :style="{
          top: getMyScroll() + cursor.y + 41 - cursor.scroll + 'px',
          left: cursor.x + getOffSet() + 'px'
        }"
        :cursor="cursor"
      ></cursor-component>
      <footer-options-code :line="line"></footer-options-code>
    </div>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="status.showCloseDialog"
      persistent
    >
      <v-card>
        <v-toolbar color="warning" dark> No se han guardado cambios </v-toolbar>
        <v-card-text>
          <div class="text-h6 pa-5 text-center">
            <p>
              Estás abandonando esta hoja de código, ¿quieres guardar cambios?
            </p>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="success" @click="saveDialog"> Guardar </v-btn>
          <v-btn
            color="error"
            @click="
              setShowDialog(false);
              setCodeChanged(false);
            "
          >
            No guardar
          </v-btn>
          <v-btn text @click="setShowDialog(false)">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!--   <div v-else class="div-progress-circular">
    <v-progress-circular indeterminate :size="120" :width="4" color="primary">
    </v-progress-circular>
  </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CursorComponent from "@/components/modules/Workspace/Channels/Code/CursorComponent.vue";
import FooterOptionsCode from "@/components/modules/Workspace/Channels/Code/FooterOptionsCode.vue";
import AppBarOptions from "@/components/modules/Workspace/Channels/Code/AppBarOptions.vue";
import * as monaco from "monaco-editor";

import ServiceChannels from "@/services/channels.service";
import CodeService from "@/services/code_channel.service";
import { namespace } from "vuex-class";
const User = namespace("UserModule");
import { User } from "@/models/user";
import { CursorCoordinates } from "@/models/cursorCoordinates";
import { ChannelType } from "@/utils/channels_types";
import { Maybe, Blob, TreeEntry } from "@/generated/graphql";

/* eslint-disable */
// @ts-ignore
import { languageDefinitions } from "monaco-editor/esm/vs/basic-languages/_.contribution";
import { Code } from "@/models/code";
/* eslint-enable */

const CodeChannel = namespace("CodeChannelModule");
@Component({
  components: {
    /* MonacoEditor, */
    CursorComponent,
    FooterOptionsCode,
    AppBarOptions
  }
})
export default class EditCode extends Vue {
  @Prop({
    required: true
  })
  public idChannelCode!: string;

  @Watch("idChannelCode")
  onChildChanged() {
    this.changeView();
  }

  @Watch("codeData")
  onChildChangedData() {
    const language = monaco.languages.getLanguages().find(language => {
      return language.extensions?.includes(this.codeData?.extension ?? "plaintext");
    })?.id;
    monaco.editor.setModelLanguage(this.options.getModel()!, language ?? "cpp");
    const blob = this.codeData?.object as Blob;
    this.options.setValue(blob.text ?? "");
    this.sendCode(language ?? "cpp");
  }

  @Watch("driverUID")
  currentDriverWatch(val: string) {
    //   monaco.editor.getModels().forEach(model => model.dispose());
    if (val) {
      if (this.currentUser.uid !== this.driverUID) {
        this.setCodeChanged(false);
        this.options?.updateOptions({ readOnly: true });
      } else {
        if (this.currentCode?.hash !== this.currentCode?.currentHash) {
          this.setCodeChanged(true);
        } else {
          this.setCodeChanged(false);
        }
        this.options?.updateOptions({ readOnly: false });
      }
    }
  }

  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  @CodeChannel.State("status")
  private status!: any;

  @CodeChannel.State("codeData")
  private codeData!: Maybe<TreeEntry>;

  @CodeChannel.Getter
  private isLoading!: boolean;

  @CodeChannel.Action
  private loadingMonaco!: () => Promise<void>;

  @CodeChannel.State("driverUID")
  private driverUID!: string;

  @CodeChannel.State("codeFilePath")
  private codeFilePath!: string;

  @CodeChannel.Getter
  private getDriverID!: string;

  @CodeChannel.Action
  private setLoadingStatus!: (state: boolean) => void;

  @CodeChannel.Action
  private setDriverUIDStatus!: (uid: string) => void;

  @CodeChannel.Action
  private clearPathState!: () => void;

  @CodeChannel.Action
  private setCodeChanged!: (state: boolean) => void;

  @CodeChannel.Action
  private setShowDialog!: (state: boolean) => void;

  @CodeChannel.Action("setShowDialogSave")
  private setShowDialogSave!: (status: boolean) => void;

  public calculatedHeight = "height: 50px";
  public options!: monaco.editor.IStandaloneCodeEditor;
  public line = 1;
  public userCode = "";
  public userPointers: CursorCoordinates[] = [];
  public nameCodeChannel = "";
  public currentDriver = "";
  public show = true;
  public changeCode = false;
  public currentCode: Code | undefined;
  mounted() {
    this.changeView();
  }

  async nameCode() {
    this.nameCodeChannel = await ServiceChannels.getChannelName(
      ChannelType.CODE,
      this.$route.params.id,
      this.$route.params.idChannelCode
    );
  }

  changeView() {
    monaco.editor.getModels().forEach(model => model.dispose());
    this.clearPathState();

    this.initEditor();
    const code = this.$refs.codeappbar as any;
    window.visualViewport.addEventListener("resize", () => {
      this.calculatedHeight = `height: ${window.innerHeight - code.$el.offsetHeight}px;`;
      this.options.layout();
    });
    this.calculatedHeight = `height: ${window.innerHeight - code.$el.offsetHeight}px;`;
    this.options.layout();

    CodeService.getCoordinates(this.currentUser.uid!, coordinates => {
      this.userPointers = coordinates.filter(cursor => {
        return cursor.userID !== this.currentUser.uid;
      });
    });
    CodeService.getDataCode(this.currentUser.uid!, code => {
      this.currentCode = code;
      if (this.driverUID !== this.currentUser.uid) {
        this.setCodeChanged(false);
        this.options.setValue(code.data);

        monaco.editor.setModelLanguage(this.options.getModel()!, code.extension ?? "cpp");
      } else if (code.hash !== code.currentHash) {
        this.setCodeChanged(true);
      } else {
        this.setCodeChanged(false);
      }
    });
    CodeService.requestCurrentCode(this.currentUser.uid!, this.$route.params.idChannelCode);
    var audio = new Audio(require("@/assets/connected.mp3"));
    audio.play();
    this.nameCode();
  }

  updated() {
    const code = this.$refs.codeappbar as any;
    this.calculatedHeight = `height: ${window.innerHeight - code.$el.offsetHeight}px;`;
    this.options.layout();
  }

  initEditor() {
    const blob = this.codeData?.object as Blob | undefined;
    const language = monaco.languages.getLanguages().find(language => {
      return language.extensions?.includes(this.codeData?.extension ?? "plaintext");
    })?.id;
    this.options = monaco.editor.create(document.getElementById("container") as HTMLElement, {
      value: blob?.text ?? "",

      language: language,
      theme: "vs-dark",
      automaticLayout: true,
      columnSelection: true
    });
  }

  saveDialog() {
    this.setCodeChanged(false);
    this.setShowDialogSave(true);
  }
  /*   getValue() {
    this.options.getValue();
    this.options.getPosition();
  } */
  getLine(): void {
    this.line = this.options.getPosition()!.lineNumber;
  }

  sendCode(extension: string): void {
    CodeService.sendCode(this.currentUser.uid!, {
      channelID: this.$route.params.idChannelCode,
      code: this.options.getValue(),
      extension: extension,
      path: this.codeFilePath!
    });
  }

  mouseIsMoving(e: MouseEvent): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: any = document.getElementsByClassName("monaco-editor-background")[0];

    const editor = document.getElementById("container")!.getBoundingClientRect();
    const x = e.clientX - editor.left;
    const y = e.clientY - editor.top;

    this.sendMouseCoordinates({
      userID: this.currentUser.uid!,
      nombre: this.currentUser.nombre,
      x,
      y,
      scroll: parseInt(target.style.top.replace("px", ""))
    });
  }

  sendMouseCoordinates(coordinates: CursorCoordinates): void {
    CodeService.sentCoordinates(this.currentUser.uid!, coordinates);
  }

  getMyScroll(): number {
    const target: any = document.getElementsByClassName("monaco-editor-background")[0];
    return parseInt(target.style.top.replace("px", ""));
  }

  getOffSet(): number {
    const editor = document.getElementById("container")!.getBoundingClientRect();
    return editor.left;
  }

  /* keyboardState(): void {
    if (this.driverUID !== this.currentUser.uid) {
      document.onkeydown = e => false;
    } else {
      document.onkeydown = e => true;
    }
  } */

  destroyed() {
    document.onkeydown = e => true;
    monaco.editor.getModels().forEach(model => model.dispose());
  }
}
</script>

<style scoped>
.tooltip {
  position: fixed;
  display: block;
  pointer-events: none;
}
.div-progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
}

.img {
  border-radius: 1rem;
  width: 25rem !important;
  height: 25rem !important;
}

.h {
  text-align: center;
  color: white;
}
</style>
