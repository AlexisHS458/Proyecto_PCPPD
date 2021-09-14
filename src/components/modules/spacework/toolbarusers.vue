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
                  item-text="name"
                  item-value="symbol"
                >
                </v-autocomplete>
                <v-text-field v-model="nombre"> </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="success" @click="inivitar">Invitar</v-btn>
          <v-btn text>Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Ref, Watch } from "vue-property-decorator";
import { VForm } from "@/utils/types.js";
import { Action, namespace } from "vuex-class";
import Vue from "vue";
import { User } from "@/models/user";
const Invitations = namespace("InvitationsModule");
@Component
export default class ToolbarUsers extends Vue {
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
  public nombre = "";

  @Invitations.Action
  private fetchUserNames!: (name: string) => void;

  @Invitations.State("users")
  private users!: User[];

  /*   @Watch("invitation")
  onChildChanged(val: string) {
    if (val != null) this.tab = 0;
    else this.tab = null;
  } */

  @Watch("search")
  onChildChangedSearch(val: string) {
    val && val !== this.select && this.querySelections(val);
    /*  if (this.items.length > 0) return;
    console.log("Hola");
    console.log(this.invitation);
    this.isLoading = true; */

    /* fetch("https://api.coingecko.com/api/v3/coins/list")
      .then((res) => res.clone().json())
      .then((res) => {
        this.items = res;
      })
      .catch((err) => {
        console.log(err);
      }) */
    /* .finally(() => (this.isLoading = false)); */
    /*  this.fetchUserNames(this.invitation);
    this.items = this.users;
    this.isLoading = false; */
  }

  querySelections(v: string) {
    this.isLoading = true;
    // Simulated ajax query
    /*  setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.isLoading = false
        }, 500) */
    this.fetchUserNames(v);
    console.log(this.users);
    this.items = this.users;
    this.isLoading = false;
  }

  inivitar() {
    this.fetchUserNames(this.nombre);
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
