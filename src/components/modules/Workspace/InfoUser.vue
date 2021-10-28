<template>
  <div>
    <v-app-bar v-if="isConnected" color="primaryDark" dense class="toolbar">
      <v-toolbar-title> Conectado </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="
          disconnect(
            'http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3'
          )
        "
        v-if="isConnected"
      >
        <v-icon color="errorLight">mdi-phone-remove</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="errorLight">mdi-xml</v-icon>
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
      <!--  <v-btn icon @click="disconnect" v-if="isConnected">
        <v-icon color="errorLight">mdi-phone-remove</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="errorLight">mdi-xml</v-icon>
      </v-btn> -->
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
const User = namespace("UserModule");

@Component
export default class UserInfo extends Vue {
  @Prop({
    required: true,
  })
  public currentUser!: User;

  public loading = false;
  public isTalk = true;
  public isListening = true;
  public isConnected = false;

  toggleMicrophone() {
    this.isTalk = !this.isTalk;
  }

  toggleHeadphones() {
    this.isListening = !this.isListening;
    this.isTalk = !this.isTalk;
  }

  disconnect(sound: string) {
    VoiceService.leaveVoiceChannel(this.currentUser.uid!);
    if (sound) {
      var audio = new Audio(sound);
      audio.play();
    }
  }

  mounted() {
    VoiceService.userStatus(this.currentUser.uid!, (isConnected) => {
      this.isConnected = !!isConnected;
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
</style>