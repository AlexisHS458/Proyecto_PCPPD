<template>
  <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fixed
          bottom
          right
          fab
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
    <v-card>
      <v-toolbar color="primary" dark> Crea tu espacio de trabajo </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row align="center" justify="center" class="mt-6">
            <v-col cols="9">
              <v-text-field
                label="Ingresa el nombre del espacio de trabajo"
                outlined
                dense
                color="primary"
                prepend-inner-icon="mdi-text"
                v-model="workspaceName"
                :rules="[rules.required, rules.regexNameChannel]"
                @keyup.enter="handleAddSpace"
                @keydown.esc="closeAddSpace"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="handleAddSpace" :loading="loading"
          >Aceptar</v-btn
        >
        <v-btn text @click="closeAddSpace">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


 <script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { VForm } from "@/utils/types.js";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
const AddWorkspace = namespace("MainScreenModule");
const User = namespace("UserModule");
import Vue from "vue";

@Component
export default class AddCard extends Vue {
  /**
   * Accion obtenida del @module MainScreen
   */
  @AddWorkspace.Action
  private addWorkSpace!: (workspace: Workspace) => Promise<void>;

  /**
   * Estado obtenido del @module MainScreen
   */
  @AddWorkspace.State("status")
  private status!: any;

  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  @Ref("form") readonly form!: VForm;

  public show = false;
  public loading = false;
  public dialog = false;
  public valid = true;
  public workspace = {} as Workspace;
  public workspaceName = "";
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
    regexNameChannel: (v: string): string | boolean =>
      /^[_A-z\u00C0-\u00FF0-9]*((\s)*[_A-z\u00C0-\u00FF0-9])*$/.test(v) ||
      "Nombre inválido",
  };

  /**
   * Crear nuevo espacio de trabajo
   */
  async handleAddSpace() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loading = true;
      this.workspace.uid_usuario = this.currentUser.uid!;
      this.workspace.nombre = this.workspaceName;
      this.workspace.usuarios = [this.currentUser.uid!];
      this.workspace.almacenamiento = 0;
      await this.addWorkSpace(this.workspace);
      this.form.resetValidation();
      this.form.reset();
      this.loading = false;
      this.dialog = false;
    }
  }

  /**
   * Cerrar dialog y resetear el formulario
   */
  closeAddSpace() {
    this.form.resetValidation();
    this.form.reset();
    this.dialog = false;
  }
}
</script>