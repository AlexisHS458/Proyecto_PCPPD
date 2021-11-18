<template>
  <v-container v-if="!isLoading" class="fill-height scroll" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-card rounded="lg" height="100%" width="100%">
          <v-row no-gutters>
            <v-col cols="7" class="arrow">
              <v-btn class="ma-2" text icon to="/">
                <v-icon large> mdi-arrow-left </v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              lg="7"
              md="12"
              sm="12"
              xl="7"
              class="d-flex align-center"
            >
              <v-card-text align="center">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-img
                    class="img mb-12"
                    :src="require('@/assets/logo.png')"
                    height="50%"
                    width="25%"
                  />
                  <v-col cols="12" sm="12" md="12" xl="8" lg="8">
                    <v-text-field
                      label="Nombre"
                      v-model="currentUser.nombre"
                      :rules="[rules.required, rules.regex]"
                      outlined
                      dense
                      prepend-inner-icon="mdi-account"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" xl="8" lg="8">
                    <v-text-field
                      label="Apellidos"
                      v-model="currentUser.apellido"
                      :rules="[rules.required, rules.regexLastName]"
                      outlined
                      dense
                      color="primary"
                      prepend-inner-icon="mdi-account"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" xl="8" lg="8">
                    <v-text-field
                      label="Boleta o Número de empleado"
                      v-model="currentUser.boleta"
                      :rules="[
                        rules.required,
                        rules.regexBoleta,
                        rules.caracteres,
                        rules.caracteresMayor,
                      ]"
                      outlined
                      dense
                      color="primary"
                      prepend-inner-icon="mdi-credit-card-outline"
                      :error-messages="textError"
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

            <v-col cols="5" class="hidden-md-and-down">
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
import { Ref, Watch } from "vue-property-decorator";
import { VForm } from "@/utils/types";
const Auth = namespace("UserModule");
const GetUsers = namespace("InvitationsModule");
const Workspace = namespace("WorkspaceModule");
@Component
export default class Register extends Vue {
  /**
   * Acciones obtenidas del @module User
   */
  @Auth.Action
  private fetchCurrentUser!: () => void;

  @Auth.Action
  private saveUser!: (user: User) => Promise<void>;

  /**
   * Estado obtenido del @module User
   */
  @Auth.State("user")
  private currentUser!: User;

  /**
   * Getters obtenidos del @module User
   */
  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Getter
  private isLoading!: boolean;

  /**
   * Accion obtenida del @module Invitations
   */
  @GetUsers.Action
  private fetchUserNames!: () => void;

  /**
   * Estado obtenido del @module Invitations
   */
  @GetUsers.State("users")
  private users!: User[];

  /**
   * Accion obtenida del @module Worksapce
   */
  @Workspace.State("allUsers")
  private allUsers!: User[];

  @Workspace.Action
  private fetchAllUsers!: () => Promise<void>;

  @Ref("form") readonly form!: VForm;

  public loading = false;
  public valid = true;
  public snackbar = false;
  public text = "Ocurrio un error al registrarte";
  public timeout = 2000;
  public textError = "";
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
      /^[a-zA-Z0-9]+$/.test(v) || "Boleta inválida",
    caracteres: (v: string): string | boolean =>
      (v || "").length >= 6 ||
      "Este campo no puede tener menor de 6 caracteres",
    caracteresMayor: (v: string): string | boolean =>
      (v || "").length <= 15 ||
      "Este campo no puede tener más de 15 caracteres",
  };

  async created(): Promise<void> {
    this.fetchUserNames();
    //Se obtiene información del usuario.
    await this.fetchCurrentUser();
    //Si el usuario ya esta regsitrado será redireccionado a la pantalla principal
    if (this.isLoggedIn) {
      this.$router.push("/Mainscreen");
    }
  }

  /**
   * Registra infomación del usuario
   * @param user información del usuario
   */
  async handleRegister(): Promise<void> {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.form.resetValidation();
      this.loading = true;
      this.snackbar = false;
      await this.fetchAllUsers();
      if (
        !this.allUsers.find((user) => user.boleta === this.currentUser.boleta)
      ) {
        await this.saveUser(this.currentUser);
        if (this.isLoggedIn) {
          this.loading = false;
          this.$router.push({ path: "/Mainscreen" });
        } else {
          this.loading = false;
          this.snackbar = true;
        }
      } else {
        this.textError = "Boleta duplicada";
        this.loading = false;
      }
    }
  }

  @Watch("currentUser.boleta")
  onChildChanged() {
    this.textError = "";
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