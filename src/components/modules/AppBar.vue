<template>
  <v-app-bar app color="primary" flat dark>
    <v-toolbar-title>Tu espacio de trabajo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-if="currentUser" v-on="on" v-bind="attrs">
          <v-list-item-avatar>
            <v-img :src="currentUser.fotoURL"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              currentUser.nombre + " " + currentUser.apellido
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-card>
        <v-card-title> Opciones </v-card-title>

        <v-list-item-content class="justify-center">
          <div class="mx-auto text-right">
            <v-divider class="my-3"></v-divider>
            <v-btn depressed text block class="btn" to="/edit">
              <v-icon class="mr-6"> mdi-pencil </v-icon> Editar información
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed text block class="btn">
              <v-icon color="error" class="mr-6"> mdi-logout </v-icon> Cerrera
              sesión
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
const Auth = namespace("RegisterUserModule");

@Component
export default class AppBar extends Vue {
  @Auth.Action
  private fetchCurrentUser!: () => void;

  @Auth.State("user")
  private currentUser!: User;

  created(): void {
    this.fetchCurrentUser();
  }

  mounted(): void {
    this.currentUser;
  }
}
</script>

<style>
.v-list-item {
  flex: 0 !important;
}
.btn {
  justify-content: left !important;
}
</style>