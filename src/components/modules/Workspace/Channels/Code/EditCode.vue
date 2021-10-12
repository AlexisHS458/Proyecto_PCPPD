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
    <!--  <div style="position: relative"> -->
    <MonacoEditor
      :height="calculatedHeight"
      ref="editor"
      theme="vs-dark"
      language="cpp"
      :options="options"
      @change="onChange"
    >
    </MonacoEditor>
    <v-footer app inset color="secondary">
      <v-card class="flex" flat tile color="secondary">
        <v-card-text v-show="showStdin" class="mt-5">
          <v-text-field
            label="Outlined"
            placeholder="Stdin"
            outlined
            background-color="grey"
          ></v-text-field>
        </v-card-text>

        <v-card-text v-show="showConsole">
          <p class="white--text mb-0">Resultado</p>
          <v-textarea
            no-resize
            solo
            color="white"
            @click.stop="() => {}"
            background-color="black"
            dark
            width="150vh"
          ></v-textarea>
        </v-card-text>
        <v-card-text v-show="showArgs">
          <v-textarea
            solo
            name="input-7-4"
            color="white"
            @click.stop="() => {}"
            background-color="black"
            dark
            width="150vh"
          ></v-textarea>
        </v-card-text>
        <v-card-title>
          <v-icon color="white">mdi-console </v-icon>
          <v-btn
            depressed
            text
            color="white"
            class="ml-2 text-capitalize"
            @click="closeInputConsole"
          >
            Consola
          </v-btn>

          <v-divider vertical></v-divider>
          <v-btn
            depressed
            text
            color="white"
            class="ml-2 mr-2 text-capitalize"
            @click="closeInputArgs"
          >
            Argumentos
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn
            depressed
            text
            color="white"
            class="mr-2 text-capitalize"
            @click="closeInputStdin"
          >
            Stdin
          </v-btn>
          <v-spacer></v-spacer>
          <strong class="subheading" style="color: white">Línea: 24</strong>
        </v-card-title>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import MonacoEditor from "monaco-editor-vue";
export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      options: {
        //Monaco Editor Options
      },
      calculatedHeight: 0,
      closeOnClick: false,
      showStdin: false,
      showArgs: false,
      showConsole: false,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
    closeInputStdin() {
      this.showStdin = !this.showStdin;
      if (this.showStdin) {
        this.showArgs = false;
        this.showConsole = false;
      }
    },
    closeInputConsole() {
      this.showConsole = !this.showConsole;
      if (this.showConsole) {
        this.showArgs = false;
        this.showStdin = false;
      }
    },

    closeInputArgs() {
      this.showArgs = !this.showArgs;
      if (this.showArgs) {
        this.showConsole = false;
        this.showStdin = false;
      }
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
.hola {
  position: absolute;
  align-content: flex-end;
}
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0px;
}

.v-text-field fieldset,
.v-text-field .v-input__control,
.v-text-field .v-input__slot {
  border-radius: 10px;
}
</style>