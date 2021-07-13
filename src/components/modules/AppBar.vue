<template>
  <v-app-bar app color="primary" flat dark>
    <v-toolbar-title>Tu espacio de trabajo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-on="on" v-bind="attrs">
          <v-list-item-avatar>
            <v-img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Alexis Herrera Saucedo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-card>
        <v-card-title> Opciones </v-card-title>

        <v-list-item-content class="justify-center">
          <div class="mx-auto text-right">
            <v-divider class="my-3"></v-divider>
            <v-btn depressed text block class="btn">
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

<script>
import { firebase } from "@/utils/firebase";
export default {
  data: () => ({
    showMenu: false,
    user: null,
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style>
.v-list-item {
  flex: 0 !important;
}
.btn {
  justify-content: left !important;
}
</style>