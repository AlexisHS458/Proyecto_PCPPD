<template>
  <v-container>
    <v-row>
      <app-bar></app-bar>
    </v-row>
    <v-row>
      <own-card></own-card>
      <collaboration-card></collaboration-card>
      <invitation-card></invitation-card>
      <add-card></add-card>
    </v-row>
  </v-container>
</template>

<script >
import Vue from "vue";
import AppBar from "@/components/modules/AppBar.vue";
import { firebase } from "@/utils/firebase";
import OwnCard from "@/components/modules/OwnCard.vue";
import CollaborationCard from "@/components/modules/CollaborationCard.vue";
import InvitationCard from "@/components/modules/InvitationCard.vue";
import AddCard from "@/components/modules/AddCard.vue";
export default Vue.extend({
  data: () => ({
    show: false,
    user: null,
    items: [{ title: "Aplicaciones para la comunicación" }],
  }),
  components: {
    AppBar,
    OwnCard,
    CollaborationCard,
    InvitationCard,
    AddCard,
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
});
</script>
 


