<template>
  <v-hover>
    <v-list-item slot-scope="{ hover }">
      <v-list-item-avatar size="25">
        <v-img :src="user.fotoURL" @error="imgError"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="user.nombre"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu v-model="menuOptions" offset-y v-if="workspace.uid_usuario === currentUser.uid">
          <template #activator="{ on }">
            <v-btn
              text
              icon
              v-on="on"
              v-on:click.prevent
              v-if="user.uid !== currentUser.uid"
              :class="{ hidden: !hover && !menuOptions }"
            >
              <v-icon color="white">mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-list color="secondary">
            <v-list-item-content class="justify-center card-list">
              <div class="mx-auto text-right">
                <v-btn depressed text block class="btn" @click="muteUser(user.uid)">
                  <v-icon color="error" class="mr-6">
                    mdi-microphone-off
                  </v-icon>
                  Silenciar usuario
                </v-btn>

                <v-btn depressed text block class="btn" @click="disconnectUser(user.uid)">
                  <v-icon color="error" class="mr-6">
                    mdi-phone-remove
                  </v-icon>
                  Desconectar usuario
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
  </v-hover>
</template>

<script lang="ts">
import { PermissionsPath } from "@/models/permissions";
import { User } from "@/models/user";
import { VoiceChannel } from "@/models/voiceChannel";
import { Workspace } from "@/models/workspace";
import { VForm } from "@/utils/types";
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import VoiceService from "@/services/voice_channel.service";
import UserService from "@/services/user.service";
import Peer from "simple-peer";
const WorkspaceOptions = namespace("WorkspaceModule");
const User = namespace("UserModule");
const Permissions = namespace("PermissionsModule");
const StatusVoice = namespace("VoiceChannelModule");
import ChannelService from "@/services/channels.service";
import ListUser from "@/components/modules/Workspace/Channels/Voice/ListUser.vue";
/* eslint-disable */
// @ts-ignore
import image from "@/assets/userProfile.png";
import { VoiceState } from "@/utils/voiceState";
import { ChannelType } from "@/utils/channels_types";
import { voiceChannelSocket } from "@/socketio";
import { Socket } from "socket.io-client";
/* eslint-enable */
@Component({ components: { ListUser } })
export default class NameChannels extends Vue {
  @Prop({
    required: false
  })
  public channel!: VoiceChannel;

  @Prop({
    required: false
  })
  public icon!: string;

  @Prop({
    required: false
  })
  public users!: User[];

  @Prop({
    required: false
  })
  public workspaceUID!: string;

  @Prop({
    required: true
  })
  public user!: User;

  @WorkspaceOptions.State("workspace")
  private workspace!: Workspace;

  /**
   * Estado obtenido del @module User
   */

  @User.State("user")
  private currentUser!: User;

  @StatusVoice.Action
  private setIsConnectedStatus!: (status: VoiceState) => void;

  @StatusVoice.State("isMute")
  private isMute!: boolean;

  @Ref("form") readonly form!: VForm;

  public menuOptions = false;
  public menu = false;
  public dialog = false;
  public dialogRenameChanel = false;
  public dialogDelete = false;
  public loadingDelete = false;
  public loadingRenameChanel = false;
  public model = [];
  public valid = true;
  public newNameChannel = "";
  public socket?: Socket;
  public permissions = {} as PermissionsPath;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
    regexNameChannel: (v: string): string | boolean =>
      /^[_A-z\u00C0-\u00FF0-9]*((\s)*[_A-z\u00C0-\u00FF0-9])*$/.test(v) || "Nombre inválido"
  };
  public usersDisplay: User[] = [];
  public isConnected = false;
  public activeItem = "";
  public peers: { [id: string]: Peer.Instance } = {};
  public stream: MediaStream | undefined = undefined;

  imgError(e: any) {
    e.target.src = image;
  }

  muteUser(userUId: string) {
    if (userUId) {
      VoiceService.sendActionToUser(this.currentUser.uid!, {
        uidUserToMute: userUId,
        actions: { mute: true }
      });
    }
  }

  disconnectUser(userUId: string) {
    if (userUId) {
      VoiceService.sendActionToUser(this.currentUser.uid!, {
        uidUserToMute: userUId,
        actions: { disconnect: true }
      });
    }
  }
}
</script>

<style scoped>
.list-title {
  color: white;
}
.hidden {
  visibility: hidden;
}

.v-btn,
.v-btn * {
  transition: none;
}

.card-list {
  padding: 0 0 0 0 !important;
}

.btn {
  justify-content: left !important;
  color: white;
}

.list-title {
  color: white;
}
.hidden {
  visibility: hidden;
}

.title {
  color: white;
  font-size: 1rem !important;
}
.v-list .v-list-item--active .v-icon {
  color: white;
}

.black--text /deep/ label {
  color: white;
}

.select-item {
  background-color: rgba(255, 255, 255, 0.3);
}

.no-select-item {
  background-color: #000029;
}

.audio-container {
  visibility: hidden;
}

.active {
  background-color: rgba(255, 255, 255, 0.3);
}

.noActive {
  background-color: #000029;
}
</style>
