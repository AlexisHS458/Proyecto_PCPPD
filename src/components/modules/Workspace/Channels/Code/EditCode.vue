<template>
  <div>
    <div id="editCode" @mousemove="mouseIsMoving">
      <app-bar-options
        ref="codeappbar"
        :nameChannel="nameCodeChannel"
      ></app-bar-options>
      <div
        id="container"
        :style="calculatedHeight"
        @keydown="
          getLine();
          keyboardState();
        "
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
          left: cursor.x + getOffSet() + 'px',
        }"
        :cursor="cursor"
      ></cursor-component>
      <footer-options-code :line="line"></footer-options-code>
    </div>
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

const CodeChannel = namespace("CodeChannelModule");
@Component({
  components: {
    /* MonacoEditor, */
    CursorComponent,
    FooterOptionsCode,
    AppBarOptions,
  },
})
export default class EditCode extends Vue {
  @Prop({
    required: true,
  })
  public idChannelCode!: string;

  @Watch("idChannelCode")
  onChildChanged() {
    this.changeView();
  }

  @Watch("codeData")
  onChildChangedData() {
    console.log(this.codeData?.extension);

    monaco.editor.setModelLanguage(
      this.options.getModel()!,
      this.codeData?.extension?.replace(".", "") ?? "cpp"
    );
    const blob = this.codeData?.object as Blob;
    this.options.setValue(blob.text ?? "");
    this.sendCode();
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

  @CodeChannel.Getter
  private getDriverID!: string;

  @CodeChannel.Action
  private setLoadingStatus!: (state: boolean) => void;

  @CodeChannel.Action
  private setDriverUIDStatus!: (uid: string) => void;

  @CodeChannel.Action
  private clearPathState!: () => void;

  /*   @Watch("driverUID")
  currentDriverWatch(val: string) {
    if (val) {
      this.currentDriver = val;
      this.setLoadingStatus(false);
      this.changeView();
    }
  } */

  public calculatedHeight = "height: 50px";
  public options!: monaco.editor.IStandaloneCodeEditor;
  public line = 1;
  public userCode = "";
  public userPointers: CursorCoordinates[] = [];
  public nameCodeChannel = "";
  public currentDriver = "";

  mounted() {
    this.setDriverUIDStatus(this.currentUser.uid!);
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
    this.clearPathState();
    CodeService.joinToCodeChannel(
      this.currentUser.uid!,
      this.$route.params.idChannelCode
    );
    this.initEditor();
    const code = this.$refs.codeappbar as any;
    window.visualViewport.addEventListener("resize", () => {
      this.calculatedHeight = `height: ${
        window.innerHeight - code.$el.offsetHeight
      }px;`;
      this.options.layout();
    });
    this.calculatedHeight = `height: ${
      window.innerHeight - code.$el.offsetHeight
    }px;`;
    this.options.layout();

    CodeService.getCoordinates(this.currentUser.uid!, (coordinates) => {
      this.userPointers = coordinates.filter((cursor) => {
        return cursor.userID !== this.currentUser.uid;
      });
    });
    CodeService.getDataCode(this.currentUser.uid!, (code) => {
      this.options.setValue(code);
    });
    var audio = new Audio(require("@/assets/connected.mp3"));
    audio.play();
    this.nameCode();
  }

  updated() {
    const code = this.$refs.codeappbar as any;
    this.calculatedHeight = `height: ${
      window.innerHeight - code.$el.offsetHeight
    }px;`;
    this.options.layout();
  }

  initEditor() {
    this.options = monaco.editor.create(
      document.getElementById("container") as HTMLElement,
      {
        value: "",
        language: "html",
        theme: "vs-dark",
        automaticLayout: true,
        columnSelection: true,
      }
    );
  }
  /*   getValue() {
    this.options.getValue();
    this.options.getPosition();
  } */
  getLine(): void {
    this.line = this.options.getPosition()!.lineNumber;
  }

  sendCode(): void {
    CodeService.sendCode(this.currentUser.uid!, {
      channelID: this.$route.params.idChannelCode,
      code: this.options.getValue(),
    });
  }

  mouseIsMoving(e: MouseEvent): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: any = document.getElementsByClassName(
      "monaco-editor-background"
    )[0];

    const editor = document
      .getElementById("container")!
      .getBoundingClientRect();
    const x = e.clientX - editor.left;
    const y = e.clientY - editor.top;

    this.sendMouseCoordinates({
      userID: this.currentUser.uid!,
      nombre: this.currentUser.nombre,
      x,
      y,
      scroll: parseInt(target.style.top.replace("px", "")),
    });
  }

  sendMouseCoordinates(coordinates: CursorCoordinates): void {
    CodeService.sentCoordinates(this.currentUser.uid!, coordinates);
  }

  getMyScroll(): number {
    const target: any = document.getElementsByClassName(
      "monaco-editor-background"
    )[0];
    return parseInt(target.style.top.replace("px", ""));
  }

  getOffSet(): number {
    const editor = document
      .getElementById("container")!
      .getBoundingClientRect();
    return editor.left;
  }

  keyboardState(): void {
    if (this.driverUID !== this.currentUser.uid) {
      document.onkeydown = (e) => false;
    } else {
      document.onkeydown = (e) => true;
    }
  }

  destroyed() {
    document.onkeydown = (e) => true;
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
</style>
