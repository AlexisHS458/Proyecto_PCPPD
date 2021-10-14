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
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-icon size="25px" color="info" v-on="on" v-bind="attrs">
                mdi-github
              </v-icon>
            </template>
            <v-card color="secondary">
              <v-list color="secondary" dark>
                <v-list-item>
                  <v-list-item-title>Opciones de GitHub</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list color="secondary" dark>
                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="dialogImport"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-action>
                        <v-icon color="info"> mdi-file-import-outline</v-icon>
                      </v-list-item-action>
                      <v-list-item-title>
                        Importar código de GitHub
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <v-card>
                    <v-toolbar color="primary" dark>
                      Importar código
                    </v-toolbar>
                    <v-card-text>
                      <v-form
                        ref="form"
                        v-model="validImport"
                        lazy-validation
                        @submit.prevent
                      >
                        <v-row align="center" justify="center" class="mt-6">
                          <v-col cols="9">
                            <v-text-field
                              label="URL"
                              placeholder="Ingresa URL de repositorio a clonar"
                              outlined
                              dense
                              color="primary"
                              prepend-inner-icon="mdi-code-tags"
                              autocomplete="off"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn color="success">Aceptar</v-btn>
                      <v-btn text>Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="dialogExport"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-action>
                        <v-icon color="info"> mdi-file-export-outline</v-icon>
                      </v-list-item-action>
                      <v-list-item-title
                        >Exportar código de GitHub</v-list-item-title
                      >
                    </v-list-item>
                  </template>
                  <v-card>
                    <v-toolbar color="primary" dark>
                      Importar código
                    </v-toolbar>
                    <v-card-text>
                      <v-form
                        ref="form"
                        v-model="validExport"
                        lazy-validation
                        @submit.prevent
                      >
                        <v-row align="center" justify="center" class="mt-6">
                          <v-col cols="9">
                            <v-text-field
                              label="Descripción"
                              placeholder="Exportar código"
                              outlined
                              dense
                              color="primary"
                              prepend-inner-icon="mdi-text "
                              autocomplete="off"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn color="success">Aceptar</v-btn>
                      <v-btn text>Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="dialogExit"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-action>
                        <v-icon color="error"> mdi-logout</v-icon>
                      </v-list-item-action>
                      <v-list-item-title>
                        Desvicular cuenta de GitHub
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <v-card>
                    <v-toolbar color="warning" dark> Cerrar Sesión </v-toolbar>
                    <v-card-text>
                      <div class="text-h6 pa-5 text-center">
                        <p>¿ESTAS SEGURO QUE QUIERES DESVINCULAR</p>
                        <p>TU CUENTA DE GITHUB?</p>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn color="warning">Aceptar</v-btn>
                      <v-btn text>Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list>
            </v-card>
          </v-menu>

          <v-icon size="25px" color="info" @click="toggleShowTreeView">
            mdi-folder-open
          </v-icon>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon size="25px" color="success" v-bind="attrs" v-on="on">
                mdi-play-outline
              </v-icon>
            </template>
            <span>Run</span>
          </v-tooltip>
        </v-row>
      </v-responsive>
    </v-app-bar>
    <!--  <div style="position: relative"> -->
    <MonacoEditor
      :height="calculatedHeight"
      ref="editor"
      theme="vs-dark"
      language="cpp"
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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const CodeChannel = namespace("CodeChannelModule");

/* eslint-disable */
// @ts-ignore
import MonacoEditor from "monaco-editor-vue";
/* eslint-enable */
@Component({
  components: {
    MonacoEditor,
  },
})
export default class EditCode extends Vue {
  @CodeChannel.Action
  private toggleShowTreeView!: () => void;

  /*   options: { */
  //Monaco Editor Options
  /*   }, */
  public calculatedHeight = 0;
  public closeOnClick = false;
  public showStdin = false;
  public showArgs = false;
  public showConsole = false;
  public dialogImport = false;
  public validImport = true;
  public dialogExport = false;
  public validExport = true;
  public dialogExit = false;
  public validExit = false;

  onChange(value: any) {
    console.log(value);
  }
  closeInputStdin() {
    this.showStdin = !this.showStdin;
    if (this.showStdin) {
      this.showArgs = false;
      this.showConsole = false;
    }
  }
  closeInputConsole() {
    this.showConsole = !this.showConsole;
    if (this.showConsole) {
      this.showArgs = false;
      this.showStdin = false;
    }
  }

  closeInputArgs() {
    this.showArgs = !this.showArgs;
    if (this.showArgs) {
      this.showConsole = false;
      this.showStdin = false;
    }
  }

  mounted() {
    const code = this.$refs.codeappbar as any;
    this.calculatedHeight = window.innerHeight - code.$el.offsetHeight;
  }
  status() {
    this.toggleShowTreeView();
  }
}
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