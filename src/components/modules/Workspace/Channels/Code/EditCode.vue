<template>
  <div>
    <div id="editCode" @mousemove="mouseIsMoving">
      <div 
        id="tooltip" 
        v-for="cursor in userPointers" 
        :key="cursor.userID"
        :style="{top: ((cursor.scroll + cursor.y)- getMyScroll()) + 'px', left: cursor.x + 'px'}"
      >
        {{ cursor.nombre }}
      </div>
      <app-bar-options ref="codeappbar"></app-bar-options>
      <div
        id="container"
        :style="calculatedHeight"
        @keydown="getLine"
        @keyup="getLine"
        @mousedown="getLine"
      ></div>
      <footer-options-code :line="line"></footer-options-code>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import FooterOptionsCode from "@/components/modules/Workspace/Channels/Code/FooterOptionsCode.vue";
import AppBarOptions from "@/components/modules/Workspace/Channels/Code/AppBarOptions.vue";
import * as monaco from "monaco-editor";
import { Position } from "monaco-editor";
import CodeService from "@/services/code_channel.service";
import { namespace } from "vuex-class";
const User = namespace("UserModule");
import { User } from "@/models/user";
import { CursorCoordinates } from "@/models/cursorCoordinates";
@Component({
  components: {
    /* MonacoEditor, */
    FooterOptionsCode,
    AppBarOptions,
  },
})
export default class EditCode extends Vue {
  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  public calculatedHeight = "height: 50px";
  public options!: monaco.editor.IStandaloneCodeEditor;
  public line = 1;

  public userPointers: CursorCoordinates[] = [];

  mounted() {
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
      this.$route.params.idChannelCode,
      (coordinates) => {
        this.userPointers = coordinates;
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
        value: 'console.log("Hello, world")',
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

  mouseIsMoving(e: MouseEvent): void {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: any = document.getElementsByClassName('monaco-editor-background')[0];
    const x = e.clientX;
    const y = e.clientY;

    this.sendMouseCoordinates({
      userID: this.currentUser.uid!,
      nombre: this.currentUser.nombre ,
      x,y,
      scroll: parseInt(target.style.top.replace('px',''))
    });
  }

  sendMouseCoordinates(coordinates: CursorCoordinates): void{
    CodeService.sentCoordinates(this.currentUser.uid!, coordinates);
  }

  getMyScroll(): number {
    const target: any = document.getElementsByClassName('monaco-editor-background')[0];
    return parseInt(target.style.top.replace('px',''))
  }
}
</script>

<style scoped>
#editCode:hover #tooltip {
  opacity: 1;
  visibility: visible;
}
#editCode:hover #holis {
  opacity: 1;
  visibility: visible;
}
#tooltip {
  position: fixed;
  display: block;
  opacity: 0;
  visibility: hidden;
  background: white;
  border-radius: 7.5px;
  color: black;
  text-transform: uppercase;
  padding: 10px 15px;
  border: 2px solid #ccc;
  z-index: 6;
}

</style>