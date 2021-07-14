<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-card rounded="lg" height="100%" width="100%">
          <v-row no-gutters>
            <v-col cols="7" class="arrow">
              <v-btn class="ma-2" text icon to="/">
                <v-icon large> mdi-arrow-left </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="7" class="d-flex align-center">
              <v-card-text align="center">
                <v-img
                  class="img mb-12"
                  :src="require('@/assets/logo.png')"
                  height="50%"
                  width="25%"
                />
                <v-col cols="8">
                  <v-text-field
                    label="Nombre"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account "
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Apellidos"
                    outlined
                    dense
                    color="primary"
                    class="hola"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Boleta o Número de empleado"
                    outlined
                    dense
                    color="primary"
                    prepend-inner-icon="mdi-credit-card-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-btn color="primary" class="white--text" block>
                    Registrarse
                  </v-btn>
                </v-col>
              </v-card-text>
            </v-col>
            <v-col cols="5">
              <v-img
                :src="require('@/assets/background.jpg')"
                height="600"
                width="100%"
              >
                <p
                  class="text-h4 white--text text-center pa"
                  align="center"
                  justify="center"
                >
                  Regístrate a <strong>Kun</strong>
                </p>
                <p
                  class="text-h5 white--text text-center"
                  align="center"
                  justify="center"
                >
                  Completa tus datos para terminar tu registro
                </p>
              </v-img>
              <!--  <div class="imm">Hola</div> -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import Firebase from "firebase/app";
const Auth = namespace("Register");

@Component
export default class Register extends Vue {
  @Auth.Action
  private fetchCurrentUser!: () => void;

  @Auth.State("userAuth")
  private currentUser!: /* Firebase.User */ any;

  created(): void {
    this.fetchCurrentUser();
  }

  mounted(): void {
    this.currentUser;
    console.log(this.currentUser);
  }
}
</script>

<style scoped >
.img {
  border-radius: 25px;
}
.pa {
  margin-top: 300px;
}
.arrow {
  position: absolute;
}
</style>