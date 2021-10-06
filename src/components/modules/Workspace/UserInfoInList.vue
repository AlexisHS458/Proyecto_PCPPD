<template>
  <v-list-item class="list-margin" @click="() => {}">
    <v-list-item-avatar class="mr-1">
      <v-icon
        v-if="statusCurrent == 'Online'"
        v-text="'mdi-circle'"
        size="15"
        color="success"
      ></v-icon>
      <v-icon
        v-else-if="statusCurrent == 'Offline'"
        v-text="'mdi-circle'"
        size="15"
        color="grey"
      ></v-icon>
      <v-icon
        v-else-if="statusCurrent == 'Away'"
        v-text="'mdi-circle'"
        size="15"
        color="yellow"
      ></v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title
        v-text="currentUser.nombre"
        class="list-title"
      ></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
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
  public currentUser!: User;
  /**
   * Accion obtenida del @module Workspace
   */
  @KickUserWorkSpace.Action
  private kickUser!: (id: string) => void;

  public menu = false;
  public model = 1;
  public statusCurrent = Status.OFFLINE;
  public dialog = false;
  public isValid = true;

  /**
   * Checar status de cada usuario
   */
  mounted() {
    if (this.currentUser.uid) {
      presenceServices.getPresence(this.currentUser.uid, (status) => {
        this.statusCurrent = status;
      });
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

.list-margin {
  margin-bottom: -4;
}

.btn {
  justify-content: left !important;
  color: white;
}
</style>