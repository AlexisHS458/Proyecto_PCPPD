<template>
  <div>
    <div id="editCode" @mousemove="mouseEnter">
      <div id="tooltip">{{ currentUser.nombre }}</div>
      <div id="holis">holis</div>
      <app-bar-options ref="codeappbar" id="hola"></app-bar-options>
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
  getLine() {
    this.line = this.options.getPosition()!.lineNumber;
  }

  mouseIsMoving(e: any) {
    var x = e.clientX;
    var y = e.clientY;

    document.getElementById("tooltip")!.style.left = x + "px";
    document.getElementById("tooltip")!.style.top = y + "px";

    CodeService.sentCoordinates(this.currentUser.uid!, {
      userID: this.currentUser.uid!,
      x: x,
      y: y,
    });
    CodeService.getCoordinates(
      this.currentUser.uid!,
      this.$route.params.idChannelCode,
      (coordinates) => {
        console.log(coordinates[0].x);

        /*    console.log(
          coordinates.map((c) => {
            return c.userID;
          })
        ); */

        /*  document.getElementById("holis")!.style.left = coordinates[0].x + "px";
        document.getElementById("holis")!.style.top = coordinates[0].y + "px"; */
      }
    );
  }

  mouseEnter() {
    this.$el.addEventListener("mousemove", this.mouseIsMoving);
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
#holis {
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