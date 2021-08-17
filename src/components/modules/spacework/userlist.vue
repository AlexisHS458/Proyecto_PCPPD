<template>
  <v-list subheader two-line color="primaryDark">
    <v-list-item v-for="(item, i) in items" :key="i">
      <v-list-item-icon>
        <v-icon v-text="item.icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title
          v-text="item.text"
          class="list-title"
        ></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        icon: "mdi-wifi",
        text: "Wifi",
      },
      {
        icon: "mdi-bluetooth",
        text: "Bluetooth",
      },
      {
        icon: "mdi-chart-donut",
        text: "Data Usage",
      },
    ],
  }),
};
</script>

<style scoped>
.list-title {
  color: white;
}
</style>