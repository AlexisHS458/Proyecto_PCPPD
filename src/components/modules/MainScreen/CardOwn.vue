<template>
  <div>
    <div v-if="!isLoadingList && !isLoadingInvitations">
      <div v-if="invitations.length > 0 || workSpacesList.length > 0">
        <v-row>
          <v-col
            v-for="(workspace, index) in workSpacesList"
            :key="index"
            lg="4"
            cols="12"
            md="6"
          >
            <collaboration-card
              v-if="workspace.uid_usuario !== user.uid"
              :currentUser="currentUser"
              :workspace="workspace"
            ></collaboration-card>
            <my-workspace
              v-else
              :workspace="workspace"
              :user="user"
            ></my-workspace>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(invitation, index) in invitations"
            :key="index"
            lg="4"
            cols="12"
            md="6"
          >
            <invitations :invitation="invitation"></invitations>
          </v-col>
        </v-row>
      </div>

      <div v-else class="card-center">
        <img src="@/assets/Visual_data-pana.svg" class="img" />
        <!-- <h1 class="h">Selecciona un canal</h1> -->
      </div>
    </div>
    <div v-else class="div-progress-circular">
      <v-progress-circular indeterminate :size="120" :width="4" color="primary">
      </v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
import CollaborationCard from "@/components/modules/MainScreen/CardCollaboration.vue";
import MyWorkspace from "@/components/modules/MainScreen/MyWorkspaces/CardMyWorkspaces.vue";
import Invitations from "@/components/modules/MainScreen/MyWorkspaces/Invitations.vue";
import { Prop } from "vue-property-decorator";
import { Invitation } from "@/models/invitation";
const User = namespace("UserModule");
const MyWorkspaces = namespace("MainScreenModule");
const InvitationSpacework = namespace("MainScreenModule");
@Component({
  components: {
    CollaborationCard,
    MyWorkspace,
    Invitations,
  },
})
export default class CardOwn extends Vue {
  @Prop({
    required: true,
  })
  public user!: User;

  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  /**
   * Accion obtenida del @module MainScreen
   */
  @MyWorkspaces.Action
  private fetchWorkspaces!: (uid: string) => void;

  /**
   * Estado obtenido del @module MainScreen
   */
  @MyWorkspaces.State("workSpacesList")
  private workSpacesList!: Workspace[];

  @MyWorkspaces.Getter
  private isLoadingList!: boolean;

  @InvitationSpacework.Getter
  private isLoadingInvitations!: boolean;

  /**
   * Accion obtenida del @module MainScreen
   */
  @InvitationSpacework.Action
  private fetchInvitations!: (uid: string) => void;

  /**
   * Estado obtenido del @module MainScreen
   */
  @InvitationSpacework.State("invitations")
  private invitations!: Invitation[];

  /**
   * Se obtienen los espacio de trabajo de un usuario
   */
  mounted(): void {
    this.fetchWorkspaces(this.currentUser.uid!);
    this.fetchInvitations(this.user.uid!);
  }
}
</script>

<style scoped>
.card-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.div-progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.img {
  border-radius: 1rem;
  width: 25rem !important;
  height: 25rem !important;
}
</style>

