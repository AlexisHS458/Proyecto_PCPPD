<template>
  <v-app-bar app clipped-right flat height="48px" color="primary">
    <v-icon
      color="white"
      class="mr-4"
      @click="toggleShowNavigationDrawerChannels"
      >mdi-menu</v-icon
    >
    <v-toolbar-title class="font-weight-medium">
      {{ nameChannel }}
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-responsive max-width="180">
      <v-row justify="space-around">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="info" size="25px" v-on="on" v-bind="attrs">
              mdi-alert-circle-outline
            </v-icon>
          </template>
          <v-card color="infoDark">
            <v-list color="infoDark">
              <v-list-item>
                <v-list-item-title class="text-center"
                  >{{ userRequest.nombre }} ha <br />
                  solicitado cambio de rol</v-list-item-title
                >
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions class="justify-center">
              <v-btn color="success" small @click="acceptRequest"
                >Aceptar</v-btn
              >
              <v-btn color="error" small>Rechazar</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

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
                  <v-toolbar color="primary" dark> Importar código </v-toolbar>
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
                  <v-toolbar color="primary" dark> Importar código </v-toolbar>
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
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import CodeService from "@/services/code_channel.service";
import { User } from "@/models/user";
const CodeChannel = namespace("CodeChannelModule");
const User = namespace("UserModule");
import UserService from "@/services/user.service";
@Component
export default class AppBarOptions extends Vue {
  @Prop({
    required: true,
  })
  public nameChannel!: string;

  @CodeChannel.Action
  private toggleShowTreeView!: () => void;

  @CodeChannel.Action
  private toggleShowNavigationDrawer!: () => void;

  @CodeChannel.Action
  private toggleShowNavigationDrawerChannels!: () => void;

  /**
   * Estado obtenido del @module User
   */

  @User.State("user")
  private currentUser!: User;

  public dialogImport = false;
  public validImport = true;
  public dialogExport = false;
  public validExport = true;
  public dialogExit = false;
  public validExit = false;
  public userRequest = {} as User;

  acceptRequest() {
    console.log(this.currentUser.uid);
    CodeService.acceptRequest(this.currentUser.uid!, this.currentUser.uid!);
  }

  mounted() {
    CodeService.listenForRequest(this.currentUser.uid!, async (uidRequest) => {
      this.userRequest = await UserService.getUserInfoByID(uidRequest);
    });
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
</style>