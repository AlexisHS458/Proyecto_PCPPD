<template>
  <v-row class="row" no-gutters>
    <v-col class="flex-grow-0 flex-shrink-1">
      <div class="mx-auto cardd">
        <toolbar></toolbar>
        <channels class="flex-grow-1"></channels>
        <userinfo></userinfo>
      </div>
    </v-col>
    <v-col class="flex-grow-1 flex-shrink-0">
      <div class="mx-auto card-center">
        <toolbardata></toolbardata>
        <message class="flex-grow-1"></message>
        <inputmessage></inputmessage>
      </div>
    </v-col>
    <v-col class="flex-grow-0 flex-shrink-1">
      <div class="mx-auto cardd">
        <listusers></listusers>

        <!--  <v-navigation-drawer class="primaryDark accent-4" dark> -->

        <!-- </v-navigation-drawer> -->
      </div>
    </v-col>
  </v-row>
</template>

<script>
import toolbar from "@/components/modules/spacework/toolbar.vue";
import userinfo from "@/components/modules/spacework/userinfo.vue";
import channels from "@/components/modules/spacework/channels.vue";
import toolbardata from "@/components/modules/spacework/toolbardata.vue";
import inputmessage from "@/components/modules/spacework/inputmessage.vue";
import message from "@/components/modules/spacework/message.vue";
import listusers from "@/components/modules/spacework/listusers.vue";
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Account", icon: "mdi-account-box" },
        { title: "Admin", icon: "mdi-gavel" },
      ],
    };
  },
  components: {
    toolbar,
    userinfo,
    channels,
    toolbardata,
    inputmessage,
    message,
    listusers,
  },
};
</script>

<style scoped>
.cardd {
  height: 100vh;
  width: 40vh;
  display: flex;
  flex-direction: column;
  background-color: #000029;
}
.card-center {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #3e527e;
}

.container-div {
  width: 100%;
  display: flex;
}
</style>