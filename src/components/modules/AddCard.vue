<template>
  <v-col cols="4">
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-card v-bind="attrs" v-on="on">
          <v-card-title class="card-title"> + </v-card-title>
          <v-card-subtitle class="card-subtitle">
            Crear tu espacio de trabajo
          </v-card-subtitle>
          <v-card-actions class="card-actions"> </v-card-actions>
        </v-card>
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
          <v-btn text @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

 <script lang="ts">
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
const Add = namespace("WorkSpaceModule");
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

  @Add.Action
  private addWorkSpace!: (workspace: Workspace) => void;

  @User.State("user")
  private currentUser!: User;

  handleAddSpace(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.workspace.uid = this.currentUser.uid;
      this.addWorkSpace(this.workspace);
      this.workspace.nombre = "";
      this.dialog = false;
    }
  }
}
</script>


<style scoped>
.card-title {
  height: 150px !important;
  background-color: #ffffff !important;
  font-size: 2.5rem !important;
  justify-content: center !important;
}

.card-subtitle {
  background-color: #0c2a52;
  font-size: 1rem !important;
  justify-content: center !important;
  color: #ffffff !important;
  padding-top: 16px !important;
  padding-bottom: 0px !important;
}

.card-actions {
  background-color: #0c2a52;
}

/* .card-text {
  width: 100%;
  height: 60px;
  align-items: center;
  display: flex;
} */
</style>