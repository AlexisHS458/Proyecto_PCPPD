<template>
  <div>
    <v-hover>
      <v-list-item
        slot-scope="{ hover }"
        :to="{
          name: 'codeChannel',
          params: { idChannelCode: channel.uid },
        }"
        color="white"
        :class="`${hover ? 'select-item' : 'no-select-item'}`"
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
                                prepend-inner-icon="mdi-code-tags"
                                v-model="newNameChannel"
                                :rules="[
                                  rules.required,
                                  rules.regexNameChannel,
                                ]"
                                @keyup.enter="editChannel"
                                @keydown.esc="closeAddSpace"
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
                        <v-btn text @click="dialogDelete = false"
                          >Cancelar</v-btn
                        >
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
    <v-list class="ml-10 mt-0">
      <v-list-item v-for="user in usersDisplay" :key="user.uid">
        <v-list-item-avatar size="25">
          <img @error="imgError" :src="user.fotoURL" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="user.nombre"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-chip small color="error"> Driver </v-chip>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-swap-horizontal</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { CodeChannel } from "@/models/codeChannel";
import { PermissionsPath } from "@/models/permissions";
import { User } from "@/models/user";
import CodeService from "@/services/code_channel.service";
import { Workspace } from "@/models/workspace";
import { VForm } from "@/utils/types";
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const WorkspaceOptions = namespace("WorkspaceModule");
const User = namespace("UserModule");
const Permissions = namespace("PermissionsModule");
import UserService from "@/services/user.service";
/* eslint-disable */
// @ts-ignore
import image from "@/assets/userProfile.png";
/* eslint-enable */
@Component
export default class NameChannels extends Vue {
  @Prop({
    required: true,
  })
  public channel!: CodeChannel;

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
  private editCodeChannel!: (codeChannel: CodeChannel) => Promise<void>;

  @WorkspaceOptions.Action
  private deleteCodeChannel!: (codeChannelID: string) => Promise<void>;

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
  private AddCodePermission!: (
    permissionsPath: PermissionsPath
  ) => Promise<void>;
  @Permissions.Action
  private RemoveCodePermission!: (
    permissionsPath: PermissionsPath
  ) => Promise<void>;

  @Ref("form") readonly form!: VForm;

  public menu = false;
  public dialog = false;
  public dialogRenameChanel = false;
  public dialogDelete = false;
  public loadingDelete = false;
  public loadingRenameChanel = false;
  public model = [];
  public valid = true;
  public newNameChannel = "";
  public permissions = {} as PermissionsPath;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
    regexNameChannel: (v: string): string | boolean =>
      /^[_A-z0-9]*((\s)*[_A-z0-9])*$/.test(v) || "Nombre inválido",
  };
  public usersDisplay: User[] = [];
  /**
   * Editar información de un canal de voz
   */
  editChannel(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loadingRenameChanel = true;
      this.channel.nombre = this.newNameChannel;
      this.editCodeChannel(this.channel);
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
   * Eliminar canal de voz
   */
  async deleteChannel() {
    this.loadingDelete = true;
    await this.deleteCodeChannel(this.channel.uid!);
    /*  if (this.status.showSnackbar) { */
    this.loadingDelete = false;
    this.dialogDelete = false;
    /* if (this.$route.path != "/space/" + this.workspaceUID) {
      this.$router.replace({ path: "/space/" + this.workspaceUID }); */
    /* } */
    /* } */
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
      await this.AddCodePermission(this.permissions);
    } else {
      await this.RemoveCodePermission(this.permissions);
    }
  }

  /*   conectToCodeChannel() {
    CodeService.joinToCodeChannel(this.currentUser.uid!, this.channel.uid!);
  } */

  mounted() {
    CodeService.allUsers(this.currentUser.uid!, this.channel.uid!, async users => {
      this.usersDisplay = await Promise.all(
        users.map(user => UserService.getUserInfoByID(user.uid))
      );
    });
  }

  imgError(e: any) {
    e.target.src = image;
  }

  closeAddSpace() {
    this.form.resetValidation();
    this.form.reset();
    this.dialogRenameChanel = false;
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

.list-title {
  color: white;
}
.hidden {
  visibility: hidden;
}

.title {
  font-size: 1rem !important;
  color: white;
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
</style>