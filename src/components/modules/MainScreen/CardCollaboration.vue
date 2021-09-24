<template>
  <v-card @click="toSpaceWork">
    <v-card-title class="card-title">
      {{ getInitials(workspace.nombre) }}
    </v-card-title>
    <v-card-subtitle class="card-subtitle">
      {{ workspace.nombre }}</v-card-subtitle
    >
    <v-card-actions class="card-actions">
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="show = !show">
        <v-icon color="white">{{
          show ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
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
                  Abandonar espacio de trabajo
                  <v-icon color="error" class="ml-6"> mdi-arrow-left </v-icon>
                </v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="error" dark>
                    Solicitud de confirmación
                  </v-toolbar>
                  <v-card-text>
                    <div class="text-h6 pa-4 text-center">
                      <p>
                        ¿SEGURO QUE QUIERES ABANDONAR ESTE ESPACIO DE TRABAJO?
                      </p>
                      <p>YA NO TENDRÁS ACCESO A NINGUNO DE LOS CANALES.</p>
                    </div>
                    <v-row align="center" justify="center">
                      <v-btn color="error" @click="leaveUserWorkspace">
                        SI, QUIERO ABANDONARLO
                      </v-btn>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn text @click="dialog = false">Cancelar</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-row>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Workspace } from "@/models/workspace";
import { Prop } from "vue-property-decorator";
import { StringUtils } from "@/utils/stringsUtils";
import { User } from "@/models/user";
const LeaveWorkspace = namespace("MainScreenModule");
import { LeaveWorkspace } from "@/models/leaveWorkspace";
import { namespace } from "vuex-class";
@Component
export default class CardCollaboration extends Vue {
  @Prop({
    required: true,
  })
  public workspace!: Workspace;

  @Prop({
    required: true,
  })
  public currentUser!: User;

  /**
   * Acciones obtenidas del @module Mainscreen
   */
  @LeaveWorkspace.Action
  private leaveWorkSpace!: (leaveWorkSpace: LeaveWorkspace) => Promise<void>;

  @LeaveWorkspace.Action
  private setMessageOnSnackbar!: () => Promise<void>;

  @LeaveWorkspace.Action
  private setVisibleSnackBar!: () => Promise<void>;

  @LeaveWorkspace.Action
  private setNotVisibleSnackBar!: () => Promise<void>;

  /**
   * Estado obtenido del @module MainScreen
   */
  @LeaveWorkspace.State("snackbarMessage")
  private snackbarMessage!: string;

  @LeaveWorkspace.State("status")
  private status!: any;
  /**
   * Getteres obtenidos del @module MainScreen
   */
  @LeaveWorkspace.Getter
  private isLeftWorkSpace!: boolean;

  @LeaveWorkspace.Getter
  private showSnackbar!: boolean;

  public show = false;
  public getInitials = StringUtils.getInitials;
  public dialog = false;
  public userLeave = {} as LeaveWorkspace;
  public snackbar = false;

  toSpaceWork() {
    this.$router.push("/space/" + this.workspace.uid);
  }

  async leaveUserWorkspace() {
    this.userLeave = {
      uidUser: this.currentUser.uid!,
      uidWorkspace: this.workspace.uid!,
      nombreWorkspace: this.workspace.nombre,
    };
    await this.leaveWorkSpace(this.userLeave);
    if (this.status.showSnackbar) {
      this.show = false;
      this.dialog = false;
    } else {
      this.show = false;
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

.card-text {
  width: 100%;
  height: 60px;
  align-items: center;
  display: flex;
}
</style>