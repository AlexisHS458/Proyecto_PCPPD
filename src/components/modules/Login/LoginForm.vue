<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-card rounded="lg" height="100%" width="100%">
          <v-row no-gutters>
            <v-col
              cols="12"
              lg="7"
              md="12"
              sm="12"
              xl="7"
              class="d-flex align-center"
            >
              <v-card-text align="center">
                <div class="hidden-md-and-up">
                  <p
                    class="text-h9 text-center"
                    align="center"
                    justify="center"
                  >
                    <strong> Bienvenido a Kun </strong>
                  </p>
                  <p
                    class="text-h10 text-center"
                    align="center"
                    justify="center"
                  >
                    Inicia sesión con tu cuenta de Google
                  </p>
                </div>
                <v-img
                  class="img"
                  :src="require('@/assets/logo.png')"
                  height="50%"
                  width="25%"
                />
                <section id="firebaseui-auth-container" class="mt-10"></section>
              </v-card-text>
            </v-col>
            <v-col cols="5" class="hidden-sm-and-down">
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

const Auth = namespace("UserModule");
@Component
export default class LoginForm extends Vue {
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
    /* await this.fetchCurrentUser();
    if (this.isLoggedIn) {
      this.$router.push("/Mainscreen");
    } */
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