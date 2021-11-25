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
        <v-menu v-if="currentUser.uid == driverUID" offset-y v-model="test">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="info" size="25px" v-on="on" v-bind="attrs">
              mdi-alert-circle-outline
            </v-icon>
          </template>
          <v-card color="infoDark">
            <template v-if="userRequest">
              <div v-show="userRequest"></div>
              <v-list color="infoDark">
                <v-list-item>
                  <v-list-item-title class="text-center">
                    {{ userRequest.nombre }} ha <br />
                    solicitado cambio de rol
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-card-actions class="justify-center">
                <v-btn color="success" small @click="acceptRequest"
                  >Aceptar</v-btn
                >
                <v-btn color="error" small>Rechazar</v-btn>
              </v-card-actions>
            </template>
            <template v-else>
              <v-list color="infoDark">
                <v-list-item>
                  <v-list-item-title class="text-center">
                    No hay solicitudes
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
          </v-card>
        </v-menu>
        <!-- dialogExport-->
        <v-dialog
          transition="dialog-top-transition"
          max-width="600"
          v-model="status.showDialogSave"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              size="25px"
              color="info"
              :disabled="currentUser.uid != driverUID"
            >
              mdi-content-save
            </v-icon>
          </template>
          <v-card>
            <v-toolbar color="secondary" dark> Realizar Commit </v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent
              >
                <v-row align="center" justify="center" class="mt-6">
                  <v-col cols="9">
                    <v-text-field
                      label="Summary"
                      outlined
                      dense
                      color="primary"
                      prepend-inner-icon="mdi-message-text "
                      :rules="[rules.required]"
                      autocomplete="off"
                      v-model="summary"
                    ></v-text-field>
                    <v-textarea
                      v-model.trim="description"
                      label="Descripción"
                      class="chat-input"
                      outlined
                      dense
                      color="primary"
                      prepend-inner-icon="mdi-message"
                      @keydown="inputHandler"
                      autocomplete="off"
                      no-resize
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="success" :loading="loadingExport" @click="doCommit">
                Commit
              </v-btn>
              <v-btn text @click="closeDialogExport">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-icon size="25px" color="info" @click="toggleShowTreeView">
          mdi-folder-open
        </v-icon>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              size="25px"
              color="success"
              v-bind="attrs"
              v-on="on"
              :disabled="currentUser.uid != driverUID"
            >
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
import { Component, Prop, Vue, Watch, Ref } from "vue-property-decorator";
import { namespace } from "vuex-class";
import CodeService from "@/services/code_channel.service";
import { User } from "@/models/user";
const CodeChannel = namespace("CodeChannelModule");
import GitHubService from "@/services/github.service";
const User = namespace("UserModule");
const WorkspaceOptions = namespace("WorkspaceModule");
import UserService from "@/services/user.service";
import { Maybe, Repository, Commit } from "@/generated/graphql";
import { VForm } from "@/utils/types";
import * as monaco from "monaco-editor";
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

  @CodeChannel.State("status")
  public status!: any;

  @CodeChannel.State("driverUID")
  private driverUID!: string | undefined;

  @CodeChannel.State("repository")
  private repository!: Maybe<Repository>;

  @CodeChannel.State("branchOid")
  private branchOid!: string;

  @CodeChannel.State("codeFilePath")
  private codeFilePath!: string;

  @CodeChannel.Action("setBranchOid")
  private setBranchOid!: (ref: any) => void;

  @CodeChannel.Action
  private setCodeChanged!: (state: boolean) => void;

  @CodeChannel.Action("setShowDialogSave")
  private setShowDialogSave!: (status: boolean) => void;

  @WorkspaceOptions.Action
  private setMessageOnSnackbar!: (message: string) => void;

  @WorkspaceOptions.Action
  private setVisibleSnackBar!: () => void;

  @CodeChannel.Action
  private setShowDialog!: (state: boolean) => void;

  @Ref("form") readonly form!: VForm;

  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  public loadingExport = false;
  public dialogImport = false;
  public validImport = true;
  public dialogExport = false;
  public validExport = true;
  public dialogExit = false;
  public validExit = false;
  public userRequest: Maybe<User> = null;
  public test = false;
  public description = "";
  public summary = "";
  public valid = false;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  closeDialogExport() {
    this.form.resetValidation();
    this.form.reset();
    this.setShowDialogSave(false);
  }

  acceptRequest() {
    CodeService.acceptRequest(this.currentUser.uid!, this.userRequest!.uid!);
  }

  inputHandler(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // this.editMessages();
    }
  }

  async doCommit() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loadingExport = true;
      const response = await GitHubService.makeCommit({
        branch: {
          repositoryNameWithOwner:
            this.repository?.owner.login + "/" + this.repository?.name,
          branchName: this.repository?.defaultBranchRef?.name,
        },
        fileChanges: {
          additions: [
            {
              path: this.codeFilePath,
              contents: window.btoa(monaco.editor.getModels()[0].getValue()),
            },
          ],
        },
        message: { headline: this.summary, body: this.description },
        expectedHeadOid: this.branchOid,
      });

      this.setShowDialogSave(false);
      this.setCodeChanged(false);
      this.setShowDialog(false);
      this.form.resetValidation();
      this.form.reset();
      this.setVisibleSnackBar();

      const commit = response.commit as Commit;
      this.setBranchOid(response.ref);
      console.log(commit);

      const urlShort = commit.url.slice(0, -25) + "...";
      this.setMessageOnSnackbar(
        "Puedes consultar tu commit copiando esta URL en tu navegador:\n" +
          `<a href="${commit.url}"  target="_blank">${urlShort}</a>`
      );
    }
  }

  mounted() {
    CodeService.listenForRequest(this.currentUser.uid!, async (uidRequest) => {
      this.userRequest = await UserService.getUserInfoByID(uidRequest);
      this.test = true;
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
