<template>
  <v-hover>
    <v-list-item
      slot-scope="{ hover }"
      @click="goToTextChannel"
      :class="[
        `${hover ? 'select-item' : 'no-select-item'}`,
        `${
          '/space/' + workspaceUID + '/' + channel.uid !== $route.path
            ? ''
            : 'active'
        }`,
      ]"
      active-class="active"
      color="white"
      class="mb-1"
    >
      <v-list-item-icon>
        <v-icon color="white">{{ icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title class="title">
          {{ channel.nombre }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-menu
          v-if="workspace.uid_usuario == currentUser.uid"
          v-model="menu"
          offset-y
        >
          <template #activator="{ on }">
            <v-btn
              text
              icon
              v-on="on"
              v-on:click.prevent
              :class="{ hidden: !hover && !menu }"
            >
              <v-icon color="white">mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-list color="secondary">
            <v-list-item-content class="justify-center card-list">
              <div class="mx-auto text-right">
                <v-menu open-on-hover bottom offset-x>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      text
                      block
                      class="btn"
                      v-bind="attrs"
                      v-on="on"
                      v-on:click.prevent
                    >
                      <v-icon color="info" class="mr-6">
                        mdi-account-multiple-outline
                      </v-icon>
                      Conceder acceso a
                    </v-btn>
                  </template>
                  <v-list color="secondaryDark">
                    <v-list-item
                      v-for="user in users"
                      :key="user.uid"
                      class="list-title"
                      color="secondaryDark"
                    >
                      <v-checkbox
                        v-model="channel.permisos"
                        class="black--text"
                        color="infoDark"
                        :label="user.nombre"
                        @click.stop="() => {}"
                        @change="check($event, user.uid, user.nombre)"
                        :value="user.uid"
                      ></v-checkbox>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="dialogRenameChanel"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      text
                      block
                      class="btn"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="info" class="mr-6"> mdi-pencil </v-icon>
                      Renombrar canal
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="secondary" dark>
                      Ingresa el nuevo nombre del canal
                    </v-toolbar>
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
                              label="Nuevo nombre del canal"
                              :placeholder="channel.nombre"
                              outlined
                              dense
                              color="primary"
                              prepend-inner-icon="mdi-message-text "
                              v-model="newNameChannel"
                              :rules="[rules.required, rules.regexNameChannel]"
                              @keyup.enter="editChannel"
                              @keydown.esc="closeAddSpace"
                              autocomplete="off"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        color="success"
                        :loading="loadingRenameChanel"
                        @click="editChannel"
                        >Aceptar</v-btn
                      >
                      <v-btn text @click="closeAddSpace">Cancelar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="dialogDelete"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      text
                      block
                      class="btn"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="error" class="mr-6"> mdi-delete </v-icon>
                      Eliminar
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="error" dark>
                      Solicitud de confirmación
                    </v-toolbar>
                    <v-card-text>
                      <div class="text-h6 pa-5 text-center">
                        <p>¿SEGURO QUE DESEAS ELIMINAR ESTE CANAL?</p>
                        <p>ESTA ACCIÓN NO SE PUEDE DESAHACER</p>
                      </div>
                      <v-row align="center" justify="center">
                        <v-btn
                          color="error"
                          @click="deleteChannel"
                          :loading="loadingDelete"
                        >
                          SI, QUIERO ELIMINARLO
                        </v-btn>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialogDelete = false">Cancelar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-list-item-content>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
  </v-hover>
</template>

<script lang="ts">
import { PermissionsPath } from "@/models/permissions";
import { TextChannel } from "@/models/textChannel";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
import { VForm } from "@/utils/types";
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const WorkspaceOptions = namespace("WorkspaceModule");
const User = namespace("UserModule");
const Permissions = namespace("PermissionsModule");
import ChannelService from "@/services/channels.service";
import { ChannelType } from "@/utils/channels_types";
@Component
export default class NameChannels extends Vue {
  @Prop({
    required: true,
  })
  public channel!: TextChannel;

  @Prop({
    required: true,
  })
  public icon!: string;

  @Prop({
    required: true,
  })
  public users!: User[];

  @Prop({
    required: true,
  })
  public workspaceUID!: string;

  /**
   * Acciones obtenidas del @module Workspace
   */
  @WorkspaceOptions.Action
  private editTextChannel!: (textChannel: TextChannel) => Promise<void>;

  @WorkspaceOptions.Action
  private deleteTextChannel!: (textChannelID: string) => Promise<void>;

  @WorkspaceOptions.Action
  private setMessageOnSnackbarWarning!: (message: string) => void;

  @WorkspaceOptions.Action
  private setVisibleSnackBarWarning!: () => void;

  /**
   * Estado obtenido del @module Workspace
   */

  @WorkspaceOptions.State("status")
  private status!: any;

  @WorkspaceOptions.State("workspace")
  private workspace!: Workspace;

  /**
   * Estado obtenido del @module User
   */

  @User.State("user")
  private currentUser!: User;

  /**
   * Acciones obtenidas del @module Permissions
   */
  @Permissions.Action
  private AddPermission!: (permissionsPath: PermissionsPath) => Promise<void>;
  @Permissions.Action
  private RemovePermission!: (
    permissionsPath: PermissionsPath
  ) => Promise<void>;

  @Ref("form") readonly form!: VForm;

  public menu = false;
  public dialog = false;
  public dialogRenameChanel = false;
  public dialogDelete = false;
  public loadingDelete = false;
  public loadingRenameChanel = false;
  public userUID = "";
  public valid = true;
  public newNameChannel = "";
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
    regexNameChannel: (v: string): string | boolean =>
      /^[_A-z\u00C0-\u00FF0-9]*((\s)*[_A-z\u00C0-\u00FF0-9])*$/.test(v) ||
      "Nombre inválido",
  };
  public permissions = {} as PermissionsPath;
  public statusCheckbox = false;

  /**
   * Editar información de un canal de texto
   */
  editChannel(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loadingRenameChanel = true;
      this.channel.nombre = this.newNameChannel;
      this.editTextChannel(this.channel);
      if (this.status.showSnackbar && !this.status.showSnackbarError) {
        this.loadingRenameChanel = false;
        this.form.reset();
        this.dialogRenameChanel = false;
      } else {
        this.loadingRenameChanel = false;
        this.form.reset();
        this.dialogRenameChanel = false;
      }
    }
  }

  /**
   * Cerrer dialog de editar canal de texto
   */
  /*   closeDialog(){

  } */

  /**
   * Eliminar canal de texto
   */
  async deleteChannel() {
    this.loadingDelete = true;
    await this.deleteTextChannel(this.channel.uid!);
    /*  if (this.status.showSnackbar) { */
    this.loadingDelete = false;
    this.dialogDelete = false;
    if (this.$route.path != "/space/" + this.workspaceUID) {
      this.$router.replace({ path: "/space/" + this.workspaceUID });
      /* } */
    }
  }

  async check(e: string[], userUID: string, userName: string) {
    this.permissions = {
      uidUser: userUID,
      uidWorkSpace: this.workspaceUID,
      uidChannel: this.channel.uid!,
      nameUser: userName,
      nameChannel: this.channel.nombre,
    };
    if (e.includes(userUID)) {
      await this.AddPermission(this.permissions);
    } else {
      await this.RemovePermission(this.permissions);
    }
  }

  closeAddSpace() {
    this.form.resetValidation();
    this.form.reset();
    this.dialogRenameChanel = false;
  }

  async goToTextChannel() {
    const hasAcces = await ChannelService.getUsersInChannel(
      this.currentUser.uid!,
      ChannelType.TEXT,
      this.workspaceUID,
      this.channel.uid!
    );
    if (hasAcces) {
      if (
        this.$route.path !=
        "/space/" + this.workspaceUID + "/" + this.channel.uid!
      ) {
        this.$router.push({
          name: "messages",
          params: { idChannel: this.channel.uid! },
        });
      }
    } else {
      this.setVisibleSnackBarWarning();
      this.setMessageOnSnackbarWarning(
        "No tienes permiso para entrar a " +
          this.channel.nombre +
          ". Comunícate con el administrador."
      );
    }
  }
}
</script>

<style scoped>
.list-title {
  color: white;
}
.hidden {
  visibility: hidden;
}

.v-btn,
.v-btn * {
  transition: none;
}

.card-list {
  padding: 0 0 0 0 !important;
}

.btn {
  justify-content: left !important;
  color: white;
}

.hidden {
  visibility: hidden;
}

.title {
  color: white;
  font-size: 1rem !important;
}
.v-list .v-list-item--active .v-icon {
  color: white;
}

.black--text /deep/ label {
  color: white;
}

.select-item {
  background-color: rgba(255, 255, 255, 0.3);
}

.no-select-item {
  background-color: #000029;
}

.active {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>