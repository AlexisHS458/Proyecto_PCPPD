<template>
  <v-list class="hola">
    <list-channels
      v-for="item in ChannelsText"
      :key="item.title"
      :item="item"
      :user="users"
      :channels="textChannels"
      :url="workspace.uid"
    ></list-channels>
    <list-channels
      v-for="item in ChannelsVoice"
      :key="item.title"
      :item="item"
      :user="users"
    ></list-channels>
    <list-channels
      v-for="item in ChannelsCode"
      :key="item.title"
      :item="item"
      :user="users"
    ></list-channels>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import ListChannels from "@/components/modules/spacework/channels/listchannels.vue";
import { Prop } from "vue-property-decorator";
import { Workspace } from "@/models/workspace";
import { TextChannel } from "@/models/textChannel";

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

  @Prop({
    required: true,
  })
  public workspace!: Workspace;

  @Prop({
    required: true,
  })
  public textChannels!: TextChannel[];

  public ChannelsText = [
    {
      title: "Canales de texto",
      icon: "mdi-message-text",
      text: "Texto",
    },
  ];

  public ChannelsVoice = [
    {
      title: "Canales de voz",
      icon: "mdi-account-voice",
      text: "Voz",
    },
  ];

  public ChannelsCode = [
    {
      title: "Canales de código",
      icon: "mdi-code-tags",
      text: "Código",
    },
  ];
}
</script>

<style scoped>
.hola {
  background-color: #000029;
  color: white;
}
</style>