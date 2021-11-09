<template>
  <div>
    <div id="editCode" @mousemove="mouseIsMoving">
      <app-bar-options ref="codeappbar"></app-bar-options>
      <div
        id="container"
        :style="calculatedHeight"
        @keydown="getLine"
        @keyup="getLine();sendCode();"
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
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CursorComponent from "@/components/modules/Workspace/Channels/Code/CursorComponent.vue";
import FooterOptionsCode from "@/components/modules/Workspace/Channels/Code/FooterOptionsCode.vue";
import AppBarOptions from "@/components/modules/Workspace/Channels/Code/AppBarOptions.vue";
import * as monaco from "monaco-editor";

import CodeService from "@/services/code_channel.service";
import { namespace } from "vuex-class";
const User = namespace("UserModule");
import { User } from "@/models/user";
import { CursorCoordinates } from "@/models/cursorCoordinates";
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

  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  public calculatedHeight = "height: 50px";
  public options!: monaco.editor.IStandaloneCodeEditor;
  public line = 1;
  public userCode = "";
  public userPointers: CursorCoordinates[] = [];

  mounted() {
    this.changeView();
  }

  changeView() {
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

    CodeService.getCoordinates(
      this.currentUser.uid!,
      (coordinates) => {
        this.userPointers = coordinates.filter((cursor) => {
          return cursor.userID !== this.currentUser.uid;
        });
      }
    );
    CodeService.getDataCode(
      this.currentUser.uid!,
      (code) => {
        this.options.setValue(code);
      }
    );
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
        language: "cpp",
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
}
</script>

<style scoped>
.tooltip {
  position: fixed;
  display: block;
  pointer-events: none;
}
</style>