<template>
  <v-container class="fill-height scroll" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-card rounded="lg" height="100%" width="100%">
          <v-row no-gutters>
            <v-col cols="12" lg="7" md="12" sm="12" xl="7" class="d-flex align-center">
              <v-card-text align="center">
                <div class="hidden-md-and-up">
                  <p class="text-h9 text-center" align="center" justify="center">
                    <strong> Bienvenido a Kun </strong>
                  </p>
                  <p class="text-h10 text-center" align="center" justify="center">
                    Inicia sesión con tu cuenta de GitHub
                  </p>
                </div>
                <v-col>
                  <v-img class="img" :src="require('@/assets/logo.png')" height="50%" width="25%" />
                  <section id="firebaseui-auth-container" class="mt-10"></section>
                </v-col>
                <v-col>
                  <div class="user-manual">
                    <a
                      href="https://correoipn-my.sharepoint.com/:b:/g/personal/hgalvang1701_alumno_ipn_mx/EW_2eYj07aVCn9C58N59xh4B-HkrcZ1Q_afVUfrOYyxRiQ?e=9dWLPg"
                      target="_blank"
                    >
                      Ver manual de usuario
                    </a>
                  </div>
                </v-col>
              </v-card-text>
            </v-col>
            <v-col cols="5" class="hidden-sm-and-down">
              <v-img :src="require('@/assets/background.jpg')" height="600" width="100%">
                <p class="text-h4 white--text text-center margin-p" align="center" justify="center">
                  <strong> Bienvenido a Kun </strong>
                </p>
                <p class="text-h5 white--text text-center" align="center" justify="center">
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
    var uiConfig: firebaseui.auth.Config = {
      signInSuccessUrl: "/register",
      signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: function (result,redirect){          
           localStorage.setItem('github-token',result.credential.accessToken);
          return true;
        }
      }
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
.user-manual {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.scroll {
  overflow-y: auto;
  height: 100vh;
}

.scroll::-webkit-scrollbar {
  width: 5px;
}
.scroll::-webkit-scrollbar-track {
  background-color: #000029;
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-thumb {
  background-color: #3e527e;
  border-radius: 10px;
}
</style>
