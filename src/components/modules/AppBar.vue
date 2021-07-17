<template>
  <v-app-bar app color="primary" flat dark>
    <v-toolbar-title>Tus espacios de trabajo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu v-if="currentUser"  offset-y>
      
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-on="on" v-bind="attrs">
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
        <v-card-title class="card-title"> Opciones </v-card-title>

        <v-list-item-content class="justify-center card-list">
          <div class="mx-auto text-right">
           <v-divider class="my-3"></v-divider>
            <v-btn depressed text block class="btn" to="/edit">
              <v-icon class="mr-6"> mdi-pencil </v-icon> Editar información
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed text block class="btn">
              <v-icon color="error" class="mr-6"> mdi-logout </v-icon> Cerrar
              sesión
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
    <div v-else>
              <v-progress-circular
                indeterminate
                :size="30"
                :width="2"
                color="white"
              >
        </v-progress-circular>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
const Auth = namespace("PantallaPrincipalModule");

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
    console.log(this.currentUser);
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
.card-title {
  padding-bottom: 0 !important;
}
.card-list {
  padding-top: 0 !important;
}
</style>