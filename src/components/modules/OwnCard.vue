<template>
  <v-row>
    <v-col v-for="(item, index) in workSpacesList" :key="index" cols="4">
      <v-card>
        <v-card-title class="card-title">
          {{ getInitials(item.nombre) }}
        </v-card-title>
        <v-card-subtitle class="card-subtitle">{{
          item.nombre
        }}</v-card-subtitle>
        <v-card-actions class="card-actions">
          <v-spacer></v-spacer>

          <v-btn icon @click="toggle(index)">
            <v-icon color="white">
              {{ space[index].visible ? "mdi-chevron-up" : "mdi-chevron-down" }}
            </v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="space[index].visible" color="primary">
            <v-divider></v-divider>
            <v-card-text class="card-text">
              <v-row align="center" justify="center">
                <v-dialog transition="dialog-top-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="error" text v-bind="attrs" v-on="on">
                      Eliminar espacio de trabajo
                      <v-icon color="error" class="ml-6"> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="error" dark>
                        Solicitud de confirmación
                      </v-toolbar>
                      <v-card-text>
                        <div class="text-h6 pa-5 text-center">
                          <p>
                            ¿SEGURO QUE QUIERES ELIMINAR TU ESPACIO DE TRABAJO?
                          </p>
                          <p>SE ELIMINARÁN TODOS LOS ARCHIVOS ENVIADOS.</p>
                        </div>
                        <v-row align="center" justify="center">
                          <v-btn color="error"> SI, QUIERO ELIMINARLO </v-btn>
                        </v-row>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false"
                          >Cancelar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-row>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
    <collaboration-card></collaboration-card>
    <add-card></add-card>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
const User = namespace("UserModule");
const OwnSpacework = namespace("WorkSpaceModule");
import { StringUtils } from "@/utils/stringsUtils";
import CollaborationCard from "@/components/modules/CollaborationCard.vue";
import AddCard from "@/components/modules/AddCard.vue";

@Component({
  components: {
    CollaborationCard,
    AddCard,
  },
})

export default class OwnCard extends Vue {
  public getInitials = StringUtils.getInitials;
  public space: { visible: boolean }[] = [];

  @User.State("user")
  private currentUser!: User;

  
  @OwnSpacework.State("workSpacesList")
  private workSpacesList!: Workspace[];

  @OwnSpacework.Action
  private fetchWorkspaces!: (uid: string) => void;



  async mounted(): Promise<void> {
    this.currentUser;
    await this.fetchWorkspaces(this.currentUser.uid);
    this.workSpacesList;

    for (let i = 0; i < this.workSpacesList.length; i++) {
      this.space.push({ visible: false });
    }
  }

  toggle(key: number) {
    this.space[key].visible = !this.space[key].visible;
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