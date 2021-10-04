<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-card rounded="lg" height="100%" width="100%">
          <v-row no-gutters>
            <v-col cols="7" class="d-flex align-center">
              <v-card-text align="center">
                <v-img
                  class="img"
                  :src="require('@/assets/logo.png')"
                  height="50%"
                  width="25%"
                />
                <section id="firebaseui-auth-container" class="mt-10"></section>
              </v-card-text>
            </v-col>
            <v-col cols="5">
              <v-img
                :src="require('@/assets/background.jpg')"
                height="600"
                width="100%"
              >
                <p
                  class="text-h4 white--text text-center margin-p"
                  align="center"
                  justify="center"
                >
                  <strong> Bienvenido a Kun </strong>
                </p>
                <p
                  class="text-h5 white--text text-center"
                  align="center"
                  justify="center"
                >
                  Inicia sesión con tu cuenta de Google
                </p>
              </v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { firebase } from "@/utils/firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { namespace } from "vuex-class";
import { User } from "@/models/user";

const Auth = namespace("UserModule");
@Component
export default class LoginForm extends Vue {
  /**
   * Acciones obtenidas del @module User
   */
  @Auth.Action
  private fetchCurrentUser!: () => void;

  /**
   * Estado obtenido del @module User
   */
  @Auth.State("user")
  private currentUser!: User;

  /**
   * Getter obtenido del @module User
   */
  @Auth.Getter
  private isLoggedIn!: boolean;

  /**
   * Inicia sesión a la plataforma
   */
  async mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/register",

      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
}
</script>

<style scoped>
.img {
  border-radius: 25px;
}
.margin-p {
  margin-top: 300px;
}
.firebaseui-card-content {
  padding: 0 !important;
}
html {
  overflow-y: hidden; /* Hide scrollbars */
  overflow: hidden;
}
</style>