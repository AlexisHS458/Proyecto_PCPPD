<template>
  <v-card @click="toSpaceWork">
    <v-card-title class="card-title">
      {{ getInitials(workspace.nombre) }}
    </v-card-title>
    <v-card-subtitle class="card-subtitle">{{
      workspace.nombre
    }}</v-card-subtitle>
    <v-card-actions class="card-actions">
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="show = !show">
        <v-icon color="white">
          {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show" color="primary">
        <v-divider></v-divider>
        <v-card-text class="card-text">
          <v-row align="center" justify="center">
            <v-dialog
              transition="dialog-top-transition"
              max-width="600"
              v-model="dialog"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="error" text v-bind="attrs" v-on="on">
                  Eliminar espacio de trabajo
                  <v-icon color="error" class="ml-6"> mdi-delete </v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-toolbar color="error" dark>
                  Solicitud de confirmación
                </v-toolbar>
                <v-card-text>
                  <div class="text-h6 pa-5 text-center">
                    <p>¿SEGURO QUE QUIERES ELIMINAR TU ESPACIO DE TRABAJO?</p>
                    <p>SE ELIMINARÁN TODOS LOS ARCHIVOS ENVIADOS.</p>
                  </div>
                  <v-row align="center" justify="center">
                    <v-btn color="error" @click="deleteSpacework">
                      SI, QUIERO ELIMINARLO
                    </v-btn>
                  </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog = false">Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Workspace } from "@/models/workspace";
import { Component, Prop, Vue } from "vue-property-decorator";
import { StringUtils } from "@/utils/stringsUtils";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
const Workspace = namespace("MainScreenModule");

@Component
export default class WorkspaceCard extends Vue {
  @Prop({
    required: true,
  })
  public workspace!: Workspace;

  @Prop({
    required: true,
  })
  public user!: User;

  /**
   * Accion obtenida del @module MainScreen
   */
  @Workspace.Action
  private deletedWorkSpaces!: (id: string) => Promise<void>;

  /**
   * Estado obtenido del @module MainScreen
   */
  @Workspace.State("status")
  private status!: any;

  public show = false;
  public getInitials = StringUtils.getInitials;
  public dialog = false;

  /**
   * Elimina un espacio de trabajo
   */
  async deleteSpacework() {
    await this.deletedWorkSpaces(this.workspace.uid);
    if (this.status.showSnackbar && !this.status.showSnackbarError) {
      this.dialog = false;
      this.show = false;
    } else {
      this.dialog = false;
      this.show = false;
    }
  }

  /**
   * Redirreciona al espacio de trabajo
   */
  toSpaceWork() {
    this.$router.push("/space/" + this.workspace.uid);
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

.card-text {
  width: 100%;
  height: 60px;
  align-items: center;
  display: flex;
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