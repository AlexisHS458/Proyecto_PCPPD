<template>
  <v-row class="row" no-gutters>
    <v-col class="flex-grow-0 flex-shrink-1">
      <v-card class="mx-auto cardd" color="primaryLight">
        <v-navigation-drawer class="primaryDark accent-4" dark>
          <v-list>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-col>
    <v-col class="flex-grow-1 flex-shrink-0">
      <v-card color="primaryLight" class="card-center"> </v-card>
    </v-col>
    <!-- <div class="container-div"></div> -->
    <v-col class="flex-grow-0 flex-shrink-1">
      <v-card class="mx-auto cardd" color="primaryLight">
        <v-navigation-drawer class="primaryDark accent-4" dark>
          <v-list>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
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
};
</script>

<style scoped>
.cardd {
  height: 100vh;
}
.card-center {
  height: 100vh;
}

.container-div {
  width: 100%;
  display: flex;
}
</style>