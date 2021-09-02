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
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row align="center" justify="center" class="mt-6">
            <v-col cols="9">
              <v-text-field
                label="Ingresa el nombre del espacio de trabajo"
                outlined
                dense
                color="primary"
                prepend-inner-icon="mdi-account"
                v-model="workspace.nombre"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="handleAddSpace">Aceptar</v-btn>
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
import { CodeChannel } from "@/models/codeChannel";
const Add = namespace("MainScreenModule");
const User = namespace("UserModule");
import Vue from "vue";

@Component
export default class AddCard extends Vue {
  public show = false;
  public dialog = false;
  public valid = true;
  public workspace = {} as Workspace;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };
  @Ref("form") readonly form!: VForm;

  @Add.Action
  private addWorkSpace!: (workspace: Workspace) => void;

  @User.State("user")
  private currentUser!: User;

  handleAddSpace(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.workspace.uid_usuario = this.currentUser.uid;
      this.addWorkSpace(this.workspace);
      this.form.reset();
      this.dialog = false;
    }
  }

  closeAddSpace() {
    this.form.resetValidation();
    this.form.reset();
    this.dialog = false;
  }
}
</script>