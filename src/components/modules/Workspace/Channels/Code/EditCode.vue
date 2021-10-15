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
    <div id="container" :style="calculatedHeight" @change="onChange"></div>
    <footer-options-code></footer-options-code>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import FooterOptionsCode from "@/components/modules/Workspace/Channels/Code/FooterOptionsCode.vue";
import AppBarOptions from "@/components/modules/Workspace/Channels/Code/AppBarOptions.vue";
import * as monaco from "monaco-editor";
/* eslint-disable */
// @ts-ignore
import MonacoEditor from "monaco-editor-vue";
/* eslint-enable */
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
        language: "java",
        theme: "vs-dark",
        automaticLayout: true,
      }
    );
  }
  getValue() {
    console.log(this.options.getValue());
    this.options.getValue();
  }
}
</script>
