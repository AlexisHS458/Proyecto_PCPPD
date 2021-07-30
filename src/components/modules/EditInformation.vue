<template>
  <v-container v-if="!isLoading" class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card rounded="lg" height="100%" width="100%">
          <v-row no-gutters>
            <v-col cols="7" class="arrow">
              <v-btn class="ma-2" text icon to="/dashboard">
                <v-icon large> mdi-arrow-left </v-icon>
              </v-btn>
            </v-col>
            <v-col class="d-flex align-center">
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
                      outlined
                      :rules="[rules.required, rules.regex]"
                      v-model="currentUser.nombre"
                      dense
                      prepend-inner-icon="mdi-account "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="Apellidos"
                      :rules="[rules.required, rules.regexLastName]"
                      v-model="currentUser.apellido"
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
                      :rules="[rules.required, rules.regexBoleta]"
                      v-model="currentUser.boleta"
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
                      @click="handleEditInfo"
                    >
                      Editar Información
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
  <div v-else class="coll">
    <v-progress-circular indeterminate :size="120" :width="4" color="primary">
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
const Edit = namespace("UserModule");

@Component
export default class EditInformation extends Vue {
  public loading = false;
  public valid = true;
  public snackbar = false;
  public snackbarSuccess = false;
  public text = "Ocurrio un error al registrarte";
  public textSuccess = "Se actualizo tu información";
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
      /^[a-zA-Z0-9]+$/.test(v) || "Apellido inválido",
  };
  @Edit.Action
  private fetchCurrentUser!: () => void;

  @Edit.Action
  private saveUser!: (user: User) => Promise<void>;

  @Edit.State("user")
  private currentUser!: User;

  @Edit.Getter
  private isLoggedIn!: boolean;

  @Edit.Getter
  private isLoading!: boolean;

  created(): void {
    if (!this.isLoggedIn) {
      this.fetchCurrentUser();
    }
  }

  mounted(): void {
    this.currentUser;
  }

  async handleEditInfo(): Promise<void> {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loading = true;
      this.snackbar = false;
      this.snackbarSuccess = false;
      await this.saveUser(this.currentUser);
      if (this.isLoggedIn) {
        this.loading = false;
        this.snackbarSuccess = true;
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
.pa {
  margin-top: 300px;
}
.arrow {
  position: absolute;
}

.coll {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>