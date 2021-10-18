<template>
  <div id="edit-code">
    <app-bar-options ref="codeappbar"></app-bar-options>
    <!-- <MonacoEditor
      :height="calculatedHeight"
      ref="editor"
      theme="vs-dark"
      language="cpp"
      @change="onChange"
    >
    </MonacoEditor> -->
    <div
      id="container"
      :style="calculatedHeight"
      @change="onChange"
      @mouseenter="mouseEnter"
      @keydown="get"
      @keyup="get"
      @mousedown="get"
    ></div>

    <footer-options-code :line="line"></footer-options-code>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import FooterOptionsCode from "@/components/modules/Workspace/Channels/Code/FooterOptionsCode.vue";
import AppBarOptions from "@/components/modules/Workspace/Channels/Code/AppBarOptions.vue";
import * as monaco from "monaco-editor";
import { Position } from "monaco-editor";

@Component({
  components: {
    /* MonacoEditor, */
    FooterOptionsCode,
    AppBarOptions,
  },
})
export default class EditCode extends Vue {
  public calculatedHeight = "height: 50px";
  public options!: monaco.editor.IStandaloneCodeEditor;
  public line = 1;

  onChange(value: any) {
    console.log(value);
  }
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
  getValue() {
    console.log(this.options.getValue());
    this.options.getValue();
    this.options.getPosition();
  }
  get() {
    this.line = this.options.getPosition()!.lineNumber;
    console.log(this.line);
  }

  mouseIsMoving(e: any) {
    var x = e.pageX;
    var y = e.pageY;
    this.line = this.options.getPosition()!.lineNumber;
    /*  console.log(x, y); */
  }

  mouseEnter() {
    this.$el.addEventListener("mousemove", this.mouseIsMoving);
  }
}
</script>
