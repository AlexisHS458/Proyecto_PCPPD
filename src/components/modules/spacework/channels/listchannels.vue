<template>
  <v-list-group :value="true" no-action>
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title
          v-text="item.title"
          class="title"
        ></v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item v-for="child in item.items" :key="child.title">
      <v-list-item-content>
        <v-list-item-title
          class="title"
          v-text="child.title"
        ></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ListChannels extends Vue {
  @Prop({
    required: true,
  })
  public item!: [];
}
</script>

<style scoped>
.hola {
  background-color: #000029;
  color: white;
}
.title {
  color: white;
}
.v-list .v-list-item--active .v-icon {
  color: white;
}
</style>