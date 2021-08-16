<template>
  <v-list class="hola">
    <list-channels
      v-for="item in items"
      :key="item.title"
      :item="item"
    ></list-channels>
  </v-list>
</template>

<script>
import ListChannels from "@/components/modules/spacework/channels/listchannels.vue";
export default {
  data: () => ({
    items: [
      {
        active: true,
        items: [{ title: "List Item" }],
        title: "Canales de texto",
      },
      {
        active: true,
        items: [
          { title: "Breakfast & brunch" },
          { title: "New American" },
          { title: "Sushi" },
        ],
        title: "Canales de voz",
      },
      {
        active: true,
        items: [{ title: "List Item" }],
        title: "Canales de código",
      },
    ],
  }),
  components: {
    ListChannels,
  },
};
</script>

<style scoped>
.hola {
  background-color: #000029;
  color: white;
}
</style>