<template>
  <div>
    <v-hover>
      <v-list-item
        color="white"
        class="mb-1"
        @click="conectToVoiceChannel()"
        slot-scope="{ hover }"
        :class="[
          `${hover ? 'select-item' : 'no-select-item'}`,
          `${isConnected ? 'active' : 'noActive'}`
        ]"
      >
        <v-list-item-icon>
          <v-icon color="white">{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="title">
            {{ channel.nombre }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-menu v-if="workspace.uid_usuario == currentUser.uid" v-model="menu" offset-y>
            <template #activator="{ on }">
              <v-btn text icon v-on="on" v-on:click.prevent :class="{ hidden: !hover && !menu }">
                <v-icon color="white">mdi-cog</v-icon>
              </v-btn>
            </template>
            <v-list color="secondary">
              <v-list-item-content class="justify-center card-list">
                <div class="mx-auto text-right">
                  <v-menu open-on-hover bottom offset-x>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        depressed
                        text
                        block
                        class="btn"
                        v-bind="attrs"
                        v-on="on"
                        v-on:click.prevent
                      >
                        <v-icon color="info" class="mr-6">
                          mdi-account-multiple-outline
                        </v-icon>
                        Conceder acceso a
                      </v-btn>
                    </template>
                    <v-list color="secondaryDark">
                      <v-list-item
                        v-for="user in users"
                        :key="user.uid"
                        class="list-title"
                        color="secondaryDark"
                      >
                        <v-checkbox
                          v-model="channel.permisos"
                          class="black--text"
                          color="infoDark"
                          :label="user.nombre"
                          @click.stop="() => {}"
                          @change="check($event, user.uid, user.nombre)"
                          :value="user.uid"
                        ></v-checkbox>
                      </v-list-item>
                    </v-list>
                  </v-menu>

                  <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                    v-model="dialogRenameChanel"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn depressed text block class="btn" v-bind="attrs" v-on="on">
                        <v-icon color="info" class="mr-6"> mdi-pencil </v-icon>
                        Renombrar canal
                      </v-btn>
                    </template>
                    <v-card>
                      <v-toolbar color="secondary" dark>
                        Ingresa el nuevo nombre del canal
                      </v-toolbar>
                      <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
                          <v-row align="center" justify="center" class="mt-6">
                            <v-col cols="9">
                              <v-text-field
                                label="Nuevo nombre del canal"
                                :placeholder="channel.nombre"
                                outlined
                                dense
                                color="primary"
                                prepend-inner-icon="mdi-account-voice"
                                v-model="newNameChannel"
                                :rules="[rules.required, rules.regexNameChannel]"
                                @keyup.enter="editChannel"
                                @keydown.esc="closeAddSpace"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn color="success" :loading="loadingRenameChanel" @click="editChannel"
                          >Aceptar</v-btn
                        >
                        <v-btn text @click="closeAddSpace">Cancelar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                    v-model="dialogDelete"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn depressed text block class="btn" v-bind="attrs" v-on="on">
                        <v-icon color="error" class="mr-6"> mdi-delete </v-icon>
                        Eliminar
                      </v-btn>
                    </template>
                    <v-card>
                      <v-toolbar color="error" dark>
                        Solicitud de confirmación
                      </v-toolbar>
                      <v-card-text>
                        <div class="text-h6 pa-5 text-center">
                          <p>¿SEGURO QUE DESEAS ELIMINAR ESTE CANAL?</p>
                          <p>ESTA ACCIÓN NO SE PUEDE DESAHACER</p>
                        </div>
                        <v-row align="center" justify="center">
                          <v-btn color="error" @click="deleteChannel" :loading="loadingDelete">
                            SI, QUIERO ELIMINARLO
                          </v-btn>
                        </v-row>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialogDelete = false">Cancelar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-list-item-content>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-hover>
    <v-list class="ml-10 mt-0">
      <v-list-item v-for="user in usersDisplay" :key="user.uid">
        <v-list-item-avatar size="25">
          <v-img :src="user.fotoURL" @error="imgError"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="user.nombre"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div ref="audioContainer" class="audio-container"></div>
  </div>
  <!-- </v-hover> -->
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
/* eslint-disable */
// @ts-ignore
import image from "@/assets/userProfile.png";
import { VoiceState } from "@/utils/voiceState";
import { ChannelType } from "@/utils/channels_types";
/* eslint-enable */
@Component
export default class NameChannels extends Vue {
  @Prop({
    required: true
  })
  public channel!: VoiceChannel;

  @Prop({
    required: true
  })
  public icon!: string;

  @Prop({
    required: true
  })
  public users!: User[];

  @Prop({
    required: true
  })
  public workspaceUID!: string;

  /**
   * Acciones obtenidas del @module Workspace
   */
  @WorkspaceOptions.Action
  private editVoiceChannel!: (voiceChannel: VoiceChannel) => Promise<void>;

  @WorkspaceOptions.Action
  private deleteVoiceChannel!: (voiceChannelID: string) => Promise<void>;

  /**
   * Estado obtenido del @module Workspace
   */

  @WorkspaceOptions.State("status")
  private status!: any;

  @WorkspaceOptions.State("workspace")
  private workspace!: Workspace;

  @WorkspaceOptions.Action
  private setMessageOnSnackbarWarning!: (message: string) => void;

  @WorkspaceOptions.Action
  private setVisibleSnackBarWarning!: () => void;

  /**
   * Estado obtenido del @module User
   */

  @User.State("user")
  private currentUser!: User;

  /**
   * Acciones obtenidas del @module Permissions
   */
  @Permissions.Action
  private AddVoicePermission!: (permissionsPath: PermissionsPath) => Promise<void>;
  @Permissions.Action
  private RemoveVoicePermission!: (permissionsPath: PermissionsPath) => Promise<void>;

  @StatusVoice.Action
  private setIsConnectedStatus!: (status: VoiceState) => void;

  @StatusVoice.State("isMute")
  private isMute!: boolean;

  @Ref("form") readonly form!: VForm;

  @Watch("isMute")
  onChildChanged() {
    this.mutePeers();
  }

  public menu = false;
  public dialog = false;
  public dialogRenameChanel = false;
  public dialogDelete = false;
  public loadingDelete = false;
  public loadingRenameChanel = false;
  public model = [];
  public valid = true;
  public newNameChannel = "";
  public permissions = {} as PermissionsPath;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
    regexNameChannel: (v: string): string | boolean =>
      /^[_A-z0-9]*((\s)*[_A-z0-9])*$/.test(v) || "Nombre inválido"
  };
  public usersDisplay: User[] = [];
  public isConnected = false;
  public activeItem = "";
  public peers: { [id: string]: Peer.Instance } = {};
  public stream: MediaStream | undefined = undefined;

  editChannel(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loadingRenameChanel = true;
      this.channel.nombre = this.newNameChannel;
      this.editVoiceChannel(this.channel);
      if (this.status.showSnackbar && !this.status.showSnackbarError) {
        this.loadingRenameChanel = false;
        this.form.reset();
        this.dialogRenameChanel = false;
      } else {
        this.loadingRenameChanel = false;
        this.form.reset();
        this.dialogRenameChanel = false;
      }
    }
  }

  /**
   * Eliminar canal de voz
   */
  async deleteChannel() {
    this.loadingDelete = true;
    await this.deleteVoiceChannel(this.channel.uid!);
    /*  if (this.status.showSnackbar) { */
    this.loadingDelete = false;
    this.dialogDelete = false;
    /* if (this.$route.path != "/space/" + this.workspaceUID) {
      this.$router.replace({ path: "/space/" + this.workspaceUID }); */
    /* } */
    /* } */
  }

  async check(e: string[], userUID: string, userName: string) {
    this.permissions = {
      uidUser: userUID,
      uidWorkSpace: this.workspaceUID,
      uidChannel: this.channel.uid!,
      nameUser: userName,
      nameChannel: this.channel.nombre
    };
    if (e.includes(userUID)) {
      await this.AddVoicePermission(this.permissions);
    } else {
      await this.RemoveVoicePermission(this.permissions);
    }
  }

  async conectToVoiceChannel() {
    console.log(this.activeItem);
    const hasAcces = await ChannelService.getUsersInChannel(
      this.currentUser.uid!,
      ChannelType.VOICE,
      this.workspaceUID,
      this.channel.uid!
    );

    if (hasAcces) {
      this.setIsConnectedStatus(VoiceState.CONNECTING);
      await this.initStream();
      VoiceService.joinToVoiceChannel(this.currentUser.uid!, this.channel.uid!);
      VoiceService.userStatus(this.currentUser.uid!, isConnected => {
        this.isConnected = !!isConnected;
      });
      if (!this.isConnected) {
        const audio = new Audio(require("@/assets/connected.mp3"));
        audio.play();
      }
    } else {
      this.setVisibleSnackBarWarning();
      this.setMessageOnSnackbarWarning(
        "No tienes permiso para entrar a " +
          this.channel.nombre +
          ". Comunícate con el administrador."
      );
    }
  }

  mounted() {
    VoiceService.allUsers(this.currentUser.uid!, this.channel.uid!, async users => {
      if (!users.find(user => user.uid === this.currentUser.uid)) {
        this.stream?.getTracks().forEach(track => {
          track.stop();
        });
        Object.keys(this.peers).forEach(k => {
          this.disconnect(k);
        });
        delete this.stream;
      }
      this.usersDisplay = await Promise.all(
        users.map(user => UserService.getUserInfoByID(user.uid))
      );
    });
    this.initSignaling();
  }

  imgError(e: any) {
    e.target.src = image;
  }

  closeAddSpace() {
    this.form.resetValidation();
    this.form.reset();
    this.dialogRenameChanel = false;
  }

  createPeer(userSocketIDToSignal: string, callerID: string, stream: MediaStream): Peer.Instance {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on("signal", signal => {
      VoiceService.sendingSignal(callerID, {
        signal: signal,
        callerID: callerID,
        userIDToSignal: userSocketIDToSignal
      });
    });

    peer.on("stream", stream => {
      const audio = document.createElement("audio");
      audio.srcObject = stream;
      audio.id = userSocketIDToSignal;
      (this.$refs.audioContainer as any).appendChild(audio);
      audio.play();
    });

    peer.on("connect", () => {
      this.setIsConnectedStatus(VoiceState.CONNECTED);
    });

    peer.on("close", () => {
      this.disconnect(userSocketIDToSignal);
    });

    peer.on("error", err => {
      console.log(err);
      this.disconnect(userSocketIDToSignal);
    });

    console.log("Soy nuevo y estoy llamando");
    console.log(this.peers);

    return peer;
  }

  disconnect(peerID: string) {
    document.getElementById(peerID)?.remove();
    this.peers[peerID]?.destroy();
    delete this.peers[peerID];

    console.log("alguien se fue");

    console.log(this.peers);
  }

  addPeer(incomingSignal: Peer.SignalData, callerID: string, stream: MediaStream): Peer.Instance {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });
    peer.on("signal", signal => {
      VoiceService.returningSignal(this.currentUser.uid!, {
        signal: signal,
        callerID: callerID
      });
    });

    peer.signal(incomingSignal);

    peer.on("stream", stream => {
      const audio = document.createElement("audio");
      audio.id = callerID;
      audio.srcObject = stream;
      (this.$refs.audioContainer as any).appendChild(audio);
      audio.play();
    });

    peer.on("connect", () => {
      this.setIsConnectedStatus(VoiceState.CONNECTED);
    });

    peer.on("close", () => {
      this.disconnect(callerID);
    });

    peer.on("error", err => {
      console.log(err);

      this.disconnect(callerID);
    });

    console.log("Alguien me llama");
    console.log(this.peers);

    return peer;
  }

  mutePeers(): void {
    this.stream?.getAudioTracks().forEach(track => {
      track.enabled = !this.isMute;
    });
  }
  async initStream(): Promise<void> {
    if (!this.stream) {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      });
    }
  }

  initSignaling(): void {
    VoiceService.joinedUsers(this.currentUser.uid!, users => {
      console.log('entro a joined');
      
      users
        .filter(user => user.uid != this.currentUser.uid)
        .forEach(user => {
          this.disconnect(user.uid);
          this.peers[user.uid] = this.createPeer(user.uid, this.currentUser.uid!, this.stream!);
        });
    });

    VoiceService.listenUserJoined(this.currentUser.uid!, payloadSignal => {
      const peer = this.addPeer(payloadSignal.signal, payloadSignal.callerID, this.stream!);
      this.peers[payloadSignal.callerID] = peer;
    });

    VoiceService.listenReturningSignal(this.currentUser.uid!, payloadSignal => {
      if (payloadSignal.userIDToSignal) {
        const item = this.peers[payloadSignal.userIDToSignal];
        item?.signal(payloadSignal.signal);
      }
    });
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
