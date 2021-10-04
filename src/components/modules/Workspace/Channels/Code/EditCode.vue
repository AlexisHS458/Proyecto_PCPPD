<template>
  <div id="edit-code">
    <v-app-bar
      app
      clipped-right
      flat
      height="48px"
      ref="codeappbar"
      color="primary"
    >
      <v-icon color="white" class="pr-4">mdi-message-processing-outline</v-icon>
      <v-toolbar-title class="font-weight-medium">Equipo</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-responsive max-width="180">
        <v-row justify="space-around">
          <v-icon color="info" size="25px"> mdi-alert-circle-outline </v-icon>
          <v-icon size="25px" color="info"> mdi-content-save </v-icon>
          <v-icon size="25px" color="info"> mdi-github </v-icon>
          <v-icon size="25px" color="info"> mdi-folder-open </v-icon>
          <v-icon size="25px" color="success"> mdi-play-outline </v-icon>
        </v-row>
      </v-responsive>
    </v-app-bar>
    <MonacoEditor
      :height="calculatedHeight"
      ref="editor"
      theme="vs-dark"
      language="cpp"
      :options="options"
      @change="onChange"
    ></MonacoEditor>
    <v-app-bar
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import MonacoEditor from "monaco-editor-vue";
export default {
  name: "App",
  components: {
    MonacoEditor,
  },
  data() {
    return {
      options: {
        //Monaco Editor Options
      },
      calculatedHeight: 0,
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
  mounted: function () {
    this.calculatedHeight =
      window.innerHeight - this.$refs.codeappbar.$el.offsetHeight;
  },
};
</script>

<style scoped>
.toolbar {
  flex: none;
}
.v-toolbar__title {
  color: white;
  font-size: 1.13rem;
}
.v-responsive {
  position: relative;
  overflow: visible;
  flex: 1 0 auto;
  max-width: 100%;
  display: flex;
}
</style>