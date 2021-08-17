<template>
  <v-app-bar color="primaryDark" flat dense class="toolbar">
    <v-icon color="white" class="pr-4">mdi-account-multiple-outline</v-icon>
    <v-toolbar-title> Lista de usuarios </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.toolbar {
  flex: none;
}
.v-toolbar__title {
  color: white;
}
</style>
