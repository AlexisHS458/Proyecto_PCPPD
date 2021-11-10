<template>
  <div>
    <v-app-bar v-if="iSConnectedCode" color="primaryDark" dense class="toolbar">
      <v-spacer></v-spacer>

      <v-btn icon @click="disconnectCode" v-if="iSConnectedCode">
        <v-icon color="errorLight">mdi-xml</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar v-if="isConnected" color="primaryDark" dense class="toolbar">
      <v-toolbar-title
        v-if="isConnectedStatus == 'Conectando'"
        class="text-color-connecting"
      >
        {{ isConnectedStatus }}
      </v-toolbar-title>
      <v-toolbar-title
        v-else-if="isConnectedStatus == 'Conectado'"
        class="text-color"
      >
        {{ isConnectedStatus }}
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
      <v-btn icon @click="toggleMicrophone">
        <v-icon v-if="isTalk" color="success">mdi-microphone</v-icon>
        <v-icon v-else color="error">mdi-microphone-off</v-icon>
      </v-btn>
      <v-btn icon @click="toggleHeadphones">
        <v-icon v-if="isListening" color="success">mdi-headphones</v-icon>
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
import { VoiceState } from "@/utils/voiceState";
const User = namespace("UserModule");
const StatusVoice = namespace("VoiceChannelModule");
@Component
export default class UserInfo extends Vue {
  @Prop({
    required: true,
  })
  public currentUser!: User;

  @StatusVoice.State("isConnectedStatus")
  private isConnectedStatus!: VoiceState;

  @StatusVoice.Action
  private toggleIsMuteStatus!: () => void;

  public loading = false;
  public isTalk = true;
  public isListening = true;
  public isConnected = false;
  public iSConnectedCode = false;

  toggleMicrophone() {
    this.toggleIsMuteStatus();
    this.isTalk = !this.isTalk;
  }

  toggleHeadphones() {
    this.isListening = !this.isListening;
    this.isTalk = !this.isTalk;
  }

  disconnect() {
    //sound: string) {
    VoiceService.leaveVoiceChannel(this.currentUser.uid!);
    // if (sound) {
    var audio = new Audio(require("@/assets/disconnected.mp3"));
    audio.play();
    //  }
  }

  disconnectCode() {
    CodeService.leaveCodeChannel(this.currentUser.uid!);
    var audio = new Audio(require("@/assets/disconnected.mp3"));
    audio.play();
  }

  mounted() {
    VoiceService.userStatus(this.currentUser.uid!, (isConnected) => {
      this.isConnected = !!isConnected;
    });
    CodeService.userStatus(this.currentUser.uid!, (isConnected) => {
      this.iSConnectedCode = !!isConnected;
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
