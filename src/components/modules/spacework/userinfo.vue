<template>
  <v-app-bar color="primaryDark" dense class="toolbar">
    <v-toolbar-title> Alexis Herrera </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon color="success">mdi-microphone</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon color="success">mdi-headphones</v-icon>
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