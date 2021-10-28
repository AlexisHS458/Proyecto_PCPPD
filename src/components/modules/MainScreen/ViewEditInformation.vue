<template>
  <v-container v-if="!isLoading" class="fill-height scroll" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" lg="6" xl="6" md="12">
        <v-card rounded="lg" height="100%" width="100%">
          <v-row no-gutters>
            <v-col cols="7" class="arrow hidden-sm-and-down">
              <v-btn class="ma-2" text icon to="/Mainscreen">
                <v-icon large> mdi-arrow-left </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" sm="7" xs="7" class="hidden-md-and-up">
              <v-btn class="ma-2" text icon to="/Mainscreen">
                <v-icon large> mdi-arrow-left </v-icon>
              </v-btn>
            </v-col>
            <v-col class="d-flex align-center">
              <v-card-text align="center">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-img
                    class="img mb-12 hidden-sm-and-down"
                    :src="require('@/assets/logo.png')"
                  />
                  <v-col cols="12" sm="12" md="12" xl="8" lg="8">
                    <v-text-field
                      label="Nombre"
                      outlined
                      :rules="[rules.required, rules.regex]"
                      v-model="user.nombre"
                      dense
                      prepend-inner-icon="mdi-account "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" xl="8" lg="8">
                    <v-text-field
                      label="Apellidos"
                      :rules="[rules.required, rules.regexLastName]"
                      v-model="user.apellido"
                      outlined
                      dense
                      color="primary"
                      prepend-inner-icon="mdi-account"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" xl="8" lg="8">
                    <v-text-field
                      label="Boleta o Número de empleado"
                      :rules="[
                        rules.required,
                        rules.regexBoleta,
                        rules.caracteres,
                        rules.caracteresMayor,
                      ]"
                      v-model="user.boleta"
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
                      @click="handleEditInfo"
                    >
                      Guardar
                    </v-btn>
                  </v-col>
                </v-form>
              </v-card-text>
              <v-snackbar
                v-model="snackbarFailture"
                :timeout="timeout"
                color="error"
              >
                {{ textFailture }}
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbarFailture = false"
                  >
                    Cerrar
                  </v-btn>
                </template>
              </v-snackbar>
              <v-snackbar
                v-model="snackbarSuccess"
                :timeout="timeout"
                color="success"
              >
                {{ textSuccess }}
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbarSuccess = false"
                  >
                    Cerrar
                  </v-btn>
                </template>
              </v-snackbar>
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
const EditUser = namespace("UserModule");
const Workspace = namespace("WorkspaceModule");

@Component
export default class ViewEdit extends Vue {
  /**
   * Acciones obtenidas del @module User
   */
  @EditUser.Action
  private fetchCurrentUser!: () => Promise<void>;

  @EditUser.Action
  private saveUser!: (user: User) => Promise<void>;

  /**
   * Estado obtenido del @module User
   */
  @EditUser.State("user")
  private currentUser!: User;

  /**
   * Getters obtenidos del @module User
   */
  @EditUser.Getter
  private isLoggedIn!: boolean;

  @EditUser.Getter
  private isLoading!: boolean;

  /**
   * Accion obtenida del @module Invitations
   */
  @Workspace.State("allUsers")
  private allUsers!: User[];

  @Workspace.Action
  private fetchAllUsers!: () => Promise<void>;

  @Ref("form") readonly form!: VForm;

  public user = {} as User;
  public boletas: string[] = [];

  public loading = false;
  public valid = true;
  public snackbarFailture = false;
  public snackbarSuccess = false;
  public textFailture = "Ocurrio un error al registrarte";
  public textSuccess = "Se actualizó tu información";
  public timeout = 2000;
  public textError = "";
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
    caracteres: (v: string): string | boolean =>
      (v || "").length >= 7 ||
      "Este campo no puede tener menor de 7 caracteres",
    caracteresMayor: (v: string): string | boolean =>
      (v || "").length <= 15 ||
      "Este campo no puede tener más de 15 caracteres",
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

  @Watch("user.boleta")
  onChildChanged() {
    this.textError = "";
  }

  async created() {
    if (!this.isLoggedIn) {
      await this.fetchCurrentUser();
    }
    this.user = JSON.parse(JSON.stringify(this.currentUser));
  }

  /**
   * Edita información del usuario actual
   */
  async handleEditInfo(): Promise<void> {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.form.resetValidation();
      this.loading = true;
      this.snackbarFailture = false;
      this.snackbarSuccess = false;

      await this.fetchAllUsers();
      const allUsersBoletas = this.allUsers.map((user) => user.boleta);
      this.boletas = allUsersBoletas.filter(
        (boleta) => boleta !== this.currentUser.boleta
      );
      console.log(this.boletas);
      if (!this.boletas.includes(this.user.boleta)) {
        await this.saveUser(this.user);
        if (this.isLoggedIn) {
          this.loading = false;
          this.snackbarSuccess = true;
        } else {
          this.loading = false;
          this.snackbarFailture = true;
        }
      } else {
        this.loading = false;
        this.textError = "Boleta duplicada";
      }
    }
  }
}
</script>

<style scoped>
.img {
  border-radius: 1rem;
  width: 14rem;
  height: 14rem;
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
