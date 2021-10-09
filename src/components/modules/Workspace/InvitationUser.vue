<template>
  <v-app-bar color="primaryDark" flat dense class="toolbar">
    <v-icon color="white" class="pr-4">mdi-account-multiple-outline</v-icon>
    <v-toolbar-title> Lista de usuarios </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-dialog
      v-if="workspace.uid_usuario == user.uid"
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-show="workspace.usuarios.length < 8">
          <v-icon color="white" v-bind="attrs" v-on="on">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar color="secondary" dark>
          Ingresa la boleta o el nombre del usuario a invitar
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
            <v-row align="center" justify="center" class="mt-6">
              <v-col cols="9">
                <v-autocomplete
                  v-model="invitation"
                  label="Boleta o nombre de usuario"
                  placeholder="Boleta o nombre de usuario"
                  outlined
                  dense
                  color="primary"
                  prepend-inner-icon="mdi-account"
                  :loading="isLoading"
                  :search-input.sync="search"
                  :items="itemsUsers"
                  item-text="nombre"
                  item-value="uid"
                  :filter="costumFilter"
                  :rules="[rules.required]"
                  hide-no-data
                  @keyup.enter="sendInvitationUser"
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar>
                      <v-img :src="item.fotoURL"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.nombre + ' ' + item.apellido"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.boleta"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template slot="selection" slot-scope="{ item }">
                    {{ item.nombre }} {{ item.apellido }}
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="success" @click="sendInvitationUser" :loading="loading"
            >Invitar</v-btn
          >
          <v-btn text @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { VForm } from "@/utils/types.js";
import { namespace } from "vuex-class";
import Vue from "vue";
import { User } from "@/models/user";
import { Invitation } from "@/models/invitation";
import { Workspace } from "@/models/workspace";
const Invitations = namespace("InvitationsModule");
@Component
export default class ToolbarUsers extends Vue {
  @Prop({
    required: true,
  })
  public workspace!: Workspace;

  @Prop({
    required: true,
  })
  public user!: User;

  /**
   * Acciones obtenidas del @module Invitations
   */
  @Invitations.Action
  private fetchUserNames!: () => void;

  @Invitations.Action
  private sendInvitation!: (invitation: Invitation) => Promise<void>;

  /**
   * Estados obtenidos del @module Invitations
   */
  @Invitations.State("users")
  private users!: User[];

  @Invitations.State("status")
  private status!: any;

  @Invitations.State("snackbarMessage")
  private snackbarMessage!: string;

  @Watch("invitation")
  onChildChanged(val: string) {
    if (val != null) this.tab = 0;
    else this.tab = null;
  }

  /**
   * Se observa la variable para estar buscando el usuario
   */
  @Watch("search")
  onChildChangedSearch() {
    if (this.itemsUsers.length > 0) return;
    this.isLoading = true;
    this.fetchUserNames();
    //Se elimina el usuario actual de la lista
    let index = this.users.findIndex((user) => user.uid === this.user.uid);
    if (index > -1) {
      this.users.splice(index, 1);
    }
    //Se asigan los usuarios para poder mostrarlos en una lista
    this.itemsUsers = this.users;
    this.isLoading = false;
  }

  @Ref("form") readonly form!: VForm;

  public dialog = false;
  public valid = true;
  public invitation = "";
  public isLoading = false;
  public itemsUsers: User[] = [];
  public search = null;
  public tab: any = null;
  public invitationModel = {} as Invitation;
  public loading = false;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  /**
   * Filtro para buscar por nombre, apellido o boleta
   */
  costumFilter(item: User, queryText: string, itemText: string) {
    const name = item.nombre.toLowerCase() + " " + item.apellido.toLowerCase();
    const boleta = item.boleta.toLowerCase();
    const searchText = queryText.toLowerCase();
    return name.indexOf(searchText) > -1 || boleta.indexOf(searchText) > -1;
  }

  /**
   * Enviar invitación a un usuario
   */
  async sendInvitationUser() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loading = true;
      this.invitationModel = {
        nombreRemitente: this.user.nombre + " " + this.user.apellido,
        nombreEspacioTrabajo: this.workspace.nombre,
        idEspacioTrabajo: this.workspace.uid,
        idUsuarioInvitado: this.invitation,
      };
      await this.sendInvitation(this.invitationModel);
      if (this.status.showSnackbar && !this.status.showSnackbarError) {
        this.form.reset();
        this.loading = false;
        this.dialog = false;
      } else {
        this.form.reset();
        this.loading = false;
        this.dialog = false;
      }
    }
  }

  /**
   * Cerrar dialog y resetear el formulario
   */
  closeDialog() {
    this.form.resetValidation();
    this.form.reset();
    this.dialog = false;
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
</style>
