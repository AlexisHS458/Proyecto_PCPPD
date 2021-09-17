<template>
  <v-container v-if="!isLoading" class="fill-height" fluid>
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
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-img
                    class="img mb-12"
                    :src="require('@/assets/logo.png')"
                    height="50%"
                    width="25%"
                  />
                  <v-col cols="8">
                    <v-text-field
                      label="Nombre"
                      v-model="currentUser.nombre"
                      :rules="[rules.required, rules.regex]"
                      outlined
                      dense
                      prepend-inner-icon="mdi-account "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="Apellidos"
                      v-model="currentUser.apellido"
                      :rules="[rules.required, rules.regexLastName]"
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
                      v-model="currentUser.boleta"
                      :rules="[rules.required, rules.regexBoleta]"
                      outlined
                      dense
                      color="primary"
                      prepend-inner-icon="mdi-credit-card-outline"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                      color="primary"
                      class="white--text"
                      block
                      :loading="loading"
                      @click="handleRegister"
                    >
                      Registrarse
                    </v-btn>
                  </v-col>
                </v-form>
              </v-card-text>
              <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
                {{ text }}
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Cerrar
                  </v-btn>
                </template>
              </v-snackbar>
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
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-else class="div-progress-circular">
    <v-progress-circular indeterminate :size="120" :width="4" color="primary">
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
const Auth = namespace("UserModule");

@Component
export default class Register extends Vue {
  @Auth.Action
  private fetchCurrentUser!: () => void;

  @Auth.Action
  private saveUser!: (user: User) => Promise<void>;

  @Auth.State("user")
  private currentUser!: User;

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Getter
  private isLoading!: boolean;

  public loading = false;
  public valid = true;
  public snackbar = false;
  public text = "Ocurrio un error al registrarte";
  public timeout = 2000;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
    regex: (v: string): string | boolean =>
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1])*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
        v
      ) || "Nombre inválido",
    regexLastName: (v: string): string | boolean =>
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1])*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
        v
      ) || "Apellido inválido",
    regexBoleta: (v: string): string | boolean =>
      /^[a-zA-Z0-9]+$/.test(v) || "Boleta inválido",
  };

  async created(): Promise<void> {
    await this.fetchCurrentUser();
    if (this.isLoggedIn) {
      this.$router.push("/Mainscreen");
    }
  }

  async handleRegister(): Promise<void> {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loading = true;
      this.snackbar = false;
      await this.saveUser(this.currentUser);
      if (this.isLoggedIn) {
        this.loading = false;
        this.$router.push({ path: "/Mainscreen" });
      } else {
        this.loading = false;
        this.snackbar = true;
      }
    }
  }
}
</script>

<style scoped >
.img {
  border-radius: 25px;
}
.margin-p {
  margin-top: 300px;
}
.arrow {
  position: absolute;
}
.div-progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>