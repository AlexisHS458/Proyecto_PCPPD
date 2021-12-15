<template>
  <div>
    <v-app-bar v-if="iSConnectedCode" color="primaryDark" dense class="toolbar">
      <v-toolbar-title class="text-color"> Conectado: {{ nameCodeChannel }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="disconnectCode" v-if="iSConnectedCode">
        <v-icon color="errorLight">mdi-xml</v-icon>
      </v-btn>
    </v-app-bar>

    <v-app-bar v-if="isConnected" color="primaryDark" dense class="toolbar">
      <v-toolbar-title v-if="isConnectedStatus == 'Conectando'" class="text-color-connecting">
        {{ isConnectedStatus + " a: " + nameVoiceChannel }}
      </v-toolbar-title>
      <v-toolbar-title v-else-if="isConnectedStatus == 'Conectado'" class="text-color">
        {{ isConnectedStatus + ": " + nameVoiceChannel }}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="disconnect" v-if="isConnected">
        <v-icon color="errorLight">mdi-phone-remove</v-icon>
      </v-btn>
    </v-app-bar>

    <v-app-bar color="primaryDark" dense class="toolbar">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-toolbar-title v-bind="attrs" v-on="on">
            {{ currentUser.nombre + " " + currentUser.apellido }}
          </v-toolbar-title>
        </template>
        <span>{{ currentUser.nombre + " " + currentUser.apellido }}</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleMicrophone" v-if="isConnected">
        <v-icon v-if="!isMute" color="success">mdi-microphone</v-icon>
        <v-icon v-else color="error">mdi-microphone-off</v-icon>
      </v-btn>
      <v-btn icon @click="toggleHeadphones" v-if="isConnected">
        <v-icon v-if="!isDeafen" color="success">mdi-headphones</v-icon>
        <v-icon v-else color="error">mdi-headphones-off</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
import { Prop } from "vue-property-decorator";
import VoiceService from "@/services/voice_channel.service";
import CodeService from "@/services/code_channel.service";
import ServiceChannels from "@/services/channels.service";
import { VoiceState } from "@/utils/voiceState";
import { ChannelType } from "@/utils/channels_types";
import { Workspace } from "@/models/workspace";
const User = namespace("UserModule");
const StatusVoice = namespace("VoiceChannelModule");
const MyWorkSpace = namespace("WorkspaceModule");
const CodeChannel = namespace("CodeChannelModule");
@Component
export default class UserInfo extends Vue {
  @Prop({
    required: true
  })
  public currentUser!: User;

  @StatusVoice.State("isConnectedStatus")
  private isConnectedStatus!: VoiceState;

  @StatusVoice.State("isMute")
  private isMute!: boolean;

  @StatusVoice.Action
  private toggleIsMuteStatus!: () => void;

  @StatusVoice.State("isDeafen")
  private isDeafen!: boolean;

  @StatusVoice.Action
  private toggleIsDeafenStatus!: () => void;

  @StatusVoice.Action
  private setMute!: (mute: boolean) => void;

  @StatusVoice.Action
  private setIsConnectedStatus!: (status: VoiceState) => void;

  @MyWorkSpace.State("workspace")
  private workspace!: Workspace;

  @CodeChannel.Action
  private setCodeChanged!: (state: boolean) => void;

  @CodeChannel.Action
  private setShowDialog!: (state: boolean) => void;

  @CodeChannel.State("codeChanged")
  private codeChanged!: boolean;

  public loading = false;

  public isConnected = false;
  public iSConnectedCode = false;
  public nameCodeChannel = "";
  public nameVoiceChannel = "";
  toggleMicrophone() {
    this.toggleIsMuteStatus();
  }

  toggleHeadphones() {
    this.toggleIsDeafenStatus();
  }

  disconnect() {
    //sound: string) {
    VoiceService.leaveVoiceChannel(this.currentUser.uid!);
    // if (sound) {
    var audio = new Audio(require("@/assets/disconnected.mp3"));
    audio.play();
    this.setIsConnectedStatus(VoiceState.CONNECTING);
    //  }
  }

  disconnectCode() {
    if (!this.codeChanged) {
      CodeService.leaveCodeChannel(this.currentUser.uid!);
      var audio = new Audio(require("@/assets/disconnected.mp3"));
      audio.play();
      if (
        (this.$route.path != "/space/" + this.$route.params.id,
        +"/code/" + this.$route.params.idChannelCode)
      ) {
        this.$router.replace({ name: "notChannels" });
      }
    } else {
      this.setShowDialog(true);
    }
  }

  mounted() {
    VoiceService.userStatus(this.currentUser.uid!, async isConnected => {
      if (isConnected) {
        this.nameVoiceChannel = await ServiceChannels.getChannelName(
          ChannelType.VOICE,
          this.$route.params.id,
          isConnected
        );
      }
      this.isConnected = !!isConnected;
    });
    CodeService.userStatus(this.currentUser.uid!, async isConnected => {
      if (isConnected) {
        this.nameCodeChannel = await ServiceChannels.getChannelName(
          ChannelType.CODE,
          this.$route.params.id,
          isConnected
        );
      }

      this.iSConnectedCode = !!isConnected;
    });
    VoiceService.listenToActions(this.currentUser.uid!, actions => {
      this.setMute(actions.mute ?? false);

      if (actions.disconnect) {
        this.setIsConnectedStatus(VoiceState.CONNECTING);
        VoiceService.leaveVoiceChannel(this.currentUser.uid!);
      }
    });
  }
}
</script>

<style scoped>
.toolbar {
  flex: none;
}
.v-toolbar__title {
  color: white;
  font-size: 1.13rem;
}

.text-color {
  color: #a1db45;
}

.text-color-connecting {
  color: #ffbd45;
}
</style>
