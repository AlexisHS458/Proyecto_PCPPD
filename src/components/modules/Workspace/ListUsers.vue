<template>
  <v-hover>
    <v-list-item class="mb-0" slot-scope="{ hover }" @click="() => {}">
      <v-list-item-avatar class="mr-1">
        <v-icon
          v-if="status == 'Online'"
          v-text="'mdi-circle'"
          size="15"
          color="success"
        ></v-icon>
        <v-icon
          v-else-if="status == 'Offline'"
          v-text="'mdi-circle'"
          size="15"
          color="grey"
        ></v-icon>
        <v-icon
          v-else-if="status == 'Away'"
          v-text="'mdi-circle'"
          size="15"
          color="yellow"
        ></v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          v-text="user.nombre"
          class="list-title"
        ></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu
          v-if="workspace.uid_usuario == currentUser.uid"
          v-model="menu"
          offset-y
        >
          <template #activator="{ on }">
            <v-btn text icon v-on="on" :class="{ hidden: !hover && !menu }">
              <v-icon color="white">mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-list color="secondary">
            <v-list-item-content class="justify-center card-list">
              <div class="mx-auto text-right">
                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="dialog"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      text
                      block
                      class="btn"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="error" class="mr-6"> mdi-delete </v-icon>
                      Eliminar
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="error" dark>
                      Solicitud de confirmación
                    </v-toolbar>
                    <v-card-text>
                      <div class="text-h6 pa-5 text-center">
                        <p>
                          ¿SEGURO QUE DESEAS ELIMINAR ESTE COLABORADOR DEL
                          ESPACIO DE TRABAJO?
                        </p>
                      </div>
                      <v-row align="center" justify="center">
                        <v-btn color="error" @click="kickUserWorkspace">
                          SI, QUIERO ELIMINARLO
                        </v-btn>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog = false">Cancelar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-list-item-content>
          </v-list>
        </v-menu>
        <!--  <v-menu
          v-else-if="currentUser.uid == currentUser.uid"
          v-model="menu"
          offset-y
        >
          <template #activator="{ on }">
            <v-btn text icon v-on="on" :class="{ hidden: !hover && !menu }">
              <v-icon color="white">mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-list color="secondary">
            <v-list-item-content class="justify-center card-list">
              <div class="mx-auto text-right">
                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="dialog"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      text
                      block
                      class="btn"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="error" class="mr-6"> mdi-delete </v-icon>
                      Eliminar
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="error" dark>
                      Solicitud de confirmación
                    </v-toolbar>
                    <v-card-text>
                      <div class="text-h6 pa-5 text-center">
                        <p>
                          ¿SEGURO QUE DESEAS ELIMINAR ESTE COLABORADOR DEL
                          ESPACIO DE TRABAJO?
                        </p>
                      </div>
                      <v-row align="center" justify="center">
                        <v-btn color="error" @click="kickUserWorkspace">
                          SI, QUIERO ELIMINARLO
                        </v-btn>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog = false">Cancelar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-list-item-content>
          </v-list>
        </v-menu> -->
      </v-list-item-action>
    </v-list-item>
  </v-hover>
</template>


<script lang="ts">
import { Status } from "@/models/status";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
import presenceServices from "@/services/presence.service";
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const KickUserWorkSpace = namespace("WorkspaceModule");

@Component
export default class UserList extends Vue {
  @Prop({
    required: true,
  })
  public user!: User;

  @Prop({
    required: true,
  })
  public currentUser!: User;

  @Prop({
    required: true,
  })
  public workspace!: Workspace;

  /**
   * Accion obtenida del @module Workspace
   */
  @KickUserWorkSpace.Action
  private kickUser!: (id: string) => void;

  public menu = false;
  public model = 1;
  public status = Status.OFFLINE;
  public dialog = false;
  public isValid = true;

  /**
   * Checar status de cada usuario
   */
  mounted() {
    if (this.user.uid) {
      presenceServices.getPresence(this.user.uid, (status) => {
        this.status = status;
      });
    }
  }

  async kickUserWorkspace() {
    await this.kickUser(this.user.uid!);
    this.dialog = false;
  }

  validated() {
    if (this.workspace.uid_usuario == this.currentUser.uid) {
      this.isValid = false;
    }
  }
}
</script>

<style scoped>
.list-title {
  color: white;
}
.hidden {
  visibility: hidden;
}

.v-btn,
.v-btn * {
  transition: none;
}

.card-list {
  padding: 0 0 0 0 !important;
}

.btn {
  justify-content: left !important;
  color: white;
}
</style>