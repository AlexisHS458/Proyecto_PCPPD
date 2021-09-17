<template>
  <v-app-bar color="primaryDark" flat dense class="toolbar">
    <v-icon color="white" class="pr-4">mdi-account-multiple-outline</v-icon>
    <v-toolbar-title> Lista de usuarios </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon>
          <v-icon color="white" v-bind="attrs" v-on="on">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar color="secondary" dark>
          Ingresa la boleta o el nombre del usuario a invitar
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
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
                  :items="items"
                  item-text="nombre"
                  item-value="uid"
                  :filter="costumFilter"
                  :rules="[rules.required]"
                  hide-no-data
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
import { Action, namespace } from "vuex-class";
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

  @Ref("form") readonly form!: VForm;

  public show = false;
  public dialog = false;
  public valid = true;
  public invitation = "";
  public isLoading = false;
  public items: User[] = [];
  public search = null;
  public tab: any = null;
  public select = null;
  public invitationModel = {} as Invitation;
  public loading = false;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  @Invitations.Action
  private fetchUserNames!: () => void;

  @Invitations.State("users")
  private users!: User[];

  @Invitations.Action
  private sendInvitation!: (invitation: Invitation) => Promise<void>;

  @Watch("invitation")
  onChildChanged(val: string) {
    if (val != null) this.tab = 0;
    else this.tab = null;
  }

  @Watch("search")
  onChildChangedSearch(val: string) {
    if (this.items.length > 0) return;
    this.isLoading = true;
    this.fetchUserNames();
    this.items = this.users;
    this.isLoading = false;
  }

  costumFilter(item: User, queryText: string, itemText: string) {
    const textOne =
      item.nombre.toLowerCase() + " " + item.apellido.toLowerCase();
    const textTree = item.boleta.toLowerCase();
    const searchText = queryText.toLowerCase();
    return (
      textOne.indexOf(searchText) > -1 || textTree.indexOf(searchText) > -1
    );
  }

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
      this.form.reset();
      this.loading = false;
      this.dialog = false;
    }
  }

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
}
</style>
