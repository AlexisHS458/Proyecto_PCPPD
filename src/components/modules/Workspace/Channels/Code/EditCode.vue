<template>
  <div id="app">
    <v-app-bar app clipped-right flat height="72" color="primaryDark">
      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
          background-color="white"
        ></v-text-field>
      </v-responsive>
    </v-app-bar>
    <MonacoEditor
      height="50vh"
      theme="vs-dark"
      language="cpp"
      :options="options"
      @change="onChange"
    ></MonacoEditor>
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
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
};
</script>