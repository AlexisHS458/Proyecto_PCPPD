<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "./models/user";
const CurrentUser = namespace("UserModule");
@Component
export default class AppVue extends Vue {
  /**
   * Accion obtenida del @module User
   */
  @CurrentUser.Action
  private fetchCurrentUser!: () => Promise<void>;

  /**
   * Estado obtenido del @module User
   */
  @CurrentUser.State("user")
  private currentUser!: User;

  /**
   * Getter obtenido del @module User
   */
  @CurrentUser.Getter
  private isLoggedIn!: boolean;


  async mounted() {
    if (!this.isLoggedIn) {
      await this.fetchCurrentUser();
    }
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono");
@import url("https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Roboto:wght@100&family=Stick+No+Bills:wght@200&display=swap");
#app {
  background-color: #edf0f3;
  font-family: "Roboto", sans-serif;
}



.application {
  font-family: "Roboto", sans-serif;
}
</style>