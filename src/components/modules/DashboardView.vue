<template>
  <v-container v-if="!isLoading">
    <v-row>
      <app-bar></app-bar>
    </v-row>
    <own-card></own-card>
    <invitation-card></invitation-card>
    <floating-button></floating-button>
  </v-container>
  <div v-else class="coll">
    <v-progress-circular indeterminate :size="120" :width="4" color="primary">
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import AppBar from "@/components/modules/AppBar.vue";
import OwnCard from "@/components/modules/OwnCard.vue";
import FloatingButton from "@/components/modules/FloatingButton.vue";
import CollaborationCard from "@/components/modules/CollaborationCard.vue";
import InvitationCard from "@/components/modules/InvitationCard.vue";
import AddCard from "@/components/modules/AddCard.vue";
import { User } from "@/models/user";
const User = namespace("UserModule");

@Component({
  components: {
    AppBar,
    OwnCard,
    CollaborationCard,
    InvitationCard,
    AddCard,
    FloatingButton,
  },
})
export default class DashboardView extends Vue {
  @User.Getter
  private isLoading!: boolean;

  @User.State("user")
  private currentUser!: User;

  @User.Getter
  private isLoggedIn!: boolean;

  @User.Action
  private fetchCurrentUser!: () => void;

  /*   @User.Action
  private logout!: () => void; */

  created(): void {
    if (!this.isLoggedIn) {
      this.fetchCurrentUser();
    }
  }

  mounted(): void {
    this.currentUser;
  }
}
</script>

<style scoped>
.coll {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
 


