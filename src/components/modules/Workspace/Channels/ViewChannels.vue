<template>
  <v-list class="background-list">
    <list-channels
      v-for="(item, index) in ChannelsText"
      :key="index"
      :item="item"
      :users="users"
      :channels="textChannels"
      :workspaceUID="workspace.uid"
      :workspaceChannels="workspace.canales_texto"
    ></list-channels>

    <list-channels-voice
      v-for="item in ChannelsVoice"
      :key="item.title"
      :item="item"
      :users="users"
      :channels="voiceChannels"
      :workspaceUID="workspace.uid"
    ></list-channels-voice>
    <list-channels-code
      v-for="item in ChannelsCode"
      :key="item.title"
      :item="item"
      :users="users"
      :channels="codeChannels"
      :workspaceUID="workspace.uid"
    ></list-channels-code>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ListChannels from "@/components/modules/Workspace/Channels/ListChannels.vue";
import ListChannelsVoice from "@/components/modules/Workspace/Channels/Voice/ListChannelsVoice.vue";
import ListChannelsCode from "@/components/modules/Workspace/Channels/Code/ListChannelsCode.vue";
import { Prop } from "vue-property-decorator";
import { Workspace } from "@/models/workspace";
import { TextChannel } from "@/models/textChannel";
import { User } from "@/models/user";
import { VoiceChannel } from "@/models/voiceChannel";
import { CodeChannel } from "@/models/codeChannel";

@Component({
  components: {
    ListChannels,
    ListChannelsVoice,
    ListChannelsCode,
  },
})
export default class Channels extends Vue {
  @Prop({
    required: true,
  })
  public users!: User[];

  @Prop({
    required: true,
  })
  public workspace!: Workspace;

  @Prop({
    required: true,
  })
  public textChannels!: TextChannel[];

  @Prop({
    required: true,
  })
  public voiceChannels!: VoiceChannel[];

  @Prop({
    required: true,
  })
  public codeChannels!: CodeChannel[];

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
.background-list {
  background-color: #000029;
  color: white;
}
</style>