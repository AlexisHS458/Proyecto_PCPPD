<template>
  <v-row>
    <v-col v-for="(invitation, index) in invitations" :key="index" cols="4">
      <invitations :invitation="invitation"></invitations>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
import { Invitation } from "@/models/invitation";
import Invitations from "@/components/modules/MainScreen/MyWorkspaces/Invitations.vue";
const InvitationSpacework = namespace("MainScreenModule");

@Component({
  components: {
    Invitations,
  },
})
export default class CardInvitation extends Vue {
  @Prop({
    required: true,
  })
  public user!: User;

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
   * Obtener Invitaciones del usuario
   */
  mounted(): void {
    this.fetchInvitations(this.user.uid!);
  }
}
</script>

