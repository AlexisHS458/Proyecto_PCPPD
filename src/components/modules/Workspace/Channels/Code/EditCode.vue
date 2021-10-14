<template>
  <div id="edit-code">
    <app-bar-options ref="codeappbar"></app-bar-options>
    <MonacoEditor
      :height="calculatedHeight"
      ref="editor"
      theme="vs-dark"
      language="cpp"
      @change="onChange"
    >
    </MonacoEditor>
    <footer-options-code></footer-options-code>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import FooterOptionsCode from "@/components/modules/Workspace/Channels/Code/FooterOptionsCode.vue";
import AppBarOptions from "@/components/modules/Workspace/Channels/Code/AppBarOptions.vue";
/* eslint-disable */
// @ts-ignore
import MonacoEditor from "monaco-editor-vue";
/* eslint-enable */
@Component({
  components: {
    MonacoEditor,
    FooterOptionsCode,
    AppBarOptions,
  },
})
export default class EditCode extends Vue {
  public calculatedHeight = 0;

  onChange(value: any) {
    console.log(value);
  }

  mounted() {
    const code = this.$refs.codeappbar as any;
    this.calculatedHeight = window.innerHeight - code.$el.offsetHeight;
  }
}
</script>
