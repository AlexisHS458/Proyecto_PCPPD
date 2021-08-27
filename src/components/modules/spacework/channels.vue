<template>
  <v-list class="hola">
    <list-channels
      v-for="item in items"
      :key="item.title"
      :item="item"
      :user="users"
    ></list-channels>
    <!--     <list-channels
      v-for="item in voiceChanels"
      :key="item.title"
      :item="item"
    ></list-channels>
    <list-channels
      v-for="item in messageChanels"
      :key="item.title"
      :item="item"
    ></list-channels> -->
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import ListChannels from "@/components/modules/spacework/channels/listchannels.vue";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    ListChannels,
  },
})
export default class Channels extends Vue {
  @Prop({
    required: true,
  })
  public users!: [];

  public items = [
    {
      items: [{ title: "Default" }],
      title: "Canales de texto",
      icon: "mdi-message-text",
      text: "Texto",
    },
    {
      items: [{ title: "Default" }, { title: "TT" }],
      title: "Canales de voz",
      icon: "mdi-account-voice",
      text: "Voz",
    },
    {
      items: [{ title: "Default" }],
      title: "Canales de código",
      icon: "mdi-code-tags",
      text: "Código",
    },
  ];

  mounted() {
    console.log(this.users);
  }
}
</script>

<style scoped>
.hola {
  background-color: #000029;
  color: white;
}
</style>