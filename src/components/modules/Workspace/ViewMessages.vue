<template>
  <div class="card-center">
    <app-bar-messages :channelApp="channel"></app-bar-messages>
    <v-list three-line class="list-background scroll" ref="vList">
      <template v-if="messages.length > 0">
        <list-messages
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
          :currentUser="currentUser"
        ></list-messages>
      </template>
      <template v-else>
        <img src="@/assets/Messages.svg" class="img-not-messages" />
      </template>
    </v-list>
    <input-message
      class="flex-grow-0 flex-shrink-0"
      :workspace="workspace"
      :currentUser="currentUser"
    ></input-message>

    <!--   Peticiones exitosas del modulo de TextChannel -->
    <snackbar
      :color="'success'"
      :snackText="snackbarMessage"
      :status="status.showSnackbar"
      :timeout="timeout"
      :method="setNotVisibleSnackBar"
    ></snackbar>

    <!--   Errores del modulo de TextChannel -->
    <snackbar
      :color="'error'"
      :snackText="snackbarMessageError"
      :status="status.showSnackbarError"
      :timeout="timeout"
      :method="setNotVisibleSnackBarError"
    ></snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import AppBarMessages from "@/components/modules/Workspace/Channels/Text/AppBarMessages.vue";
import InputMessage from "@/components/modules/Workspace/Channels/Text/InputMessage.vue";
import ListMessages from "@/components/modules/Workspace/Channels/Text/ListMessages.vue";
import Snackbar from "@/components/modules/Workspace/Snackbar.vue";
import { User } from "@/models/user";
import { TextChannel } from "@/models/textChannel";
import { Workspace } from "@/models/workspace";
import { Message } from "@/models/message";
import { Prop, Watch } from "vue-property-decorator";
const User = namespace("UserModule");
const MyWorkSpace = namespace("WorkspaceModule");
const Messages = namespace("TextChannelModule");
const Invitations = namespace("InvitationsModule");
@Component({
  components: {
    Snackbar,
    AppBarMessages,
    InputMessage,
    ListMessages,
  },
})
export default class MessagesPage extends Vue {
  @Prop({
    required: true,
  })
  public idChannel!: string;

  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  /**
   * Acciones obtenidas del @module Workspace
   */
  @MyWorkSpace.Action
  private fetchMyWorkspace!: (id: string) => void;

  @MyWorkSpace.Action
  private fetchTextChannels!: (id: string) => Promise<void>;

  @MyWorkSpace.Action("setNotVisibleSnackBar")
  setNotVisibleSnackBarWorkspace!: () => void;

  @MyWorkSpace.Action("setNotVisibleSnackBarError")
  setNotVisibleSnackBarErrorWorkspace!: () => void;

  /**
   * Estados obtenidas del @module Workspace
   */
  @MyWorkSpace.State("textChannels")
  private textChannel!: TextChannel[];

  @MyWorkSpace.State("workspace")
  private workspace!: Workspace;

  /**
   * Acciones obtenidas del @module Messages
   */
  @Messages.Action
  private fetchMesages!: (callBack: () => void) => void;

  @Messages.Action
  setTextChannelIDtoModule!: (id: string) => void;

  @Messages.Action
  setWorkspaceIDtoModule!: (id: string) => void;

  @Messages.Action("setNotVisibleSnackBar")
  setNotVisibleSnackBar!: () => void;

  @Messages.Action("setNotVisibleSnackBarError")
  setNotVisibleSnackBarError!: () => void;
  /**
   * Estado obtenido del @module Messages
   */
  @Messages.State("messages")
  private messages!: Message[];

  @Messages.State("snackbarMessage")
  private snackbarMessage!: string;

  @Messages.State("snackbarMessageError")
  private snackbarMessageError!: string;

  @Messages.State("status")
  private status!: any;

  /**
   * Getters obtenido del @module Messages
   */
  @Messages.Getter
  private isLoadingMessages!: boolean;

  @Invitations.Action("setNotVisibleSnackBar")
  setNotVisibleSnackBarInvitations!: () => void;

  @Invitations.Action("setNotVisibleSnackBarError")
  setNotVisibleSnackBarErrorInvitations!: () => void;

  /**
   * Cada que se cambie de canal de texto se mandara a llamar la función de obtener mensajes
   */
  @Watch("idChannel")
  onChildChanged() {
    this.getMessages();
  }

  public channel? = {} as TextChannel;
  public timeout = -1;

  /**
   * Obtener mensajes
   */
  /* async */ mounted() {
    /*   await this.fetchTextChannels(this.$route.params.id); */
    this.getMessages();
  }

  destroyed() {
    this.setNotVisibleSnackBarWorkspace();
    this.setNotVisibleSnackBar();
    this.setNotVisibleSnackBarInvitations();
    this.setNotVisibleSnackBarError();
    this.setNotVisibleSnackBarErrorWorkspace();
    this.setNotVisibleSnackBarErrorInvitations();
  }

  /**
   * Obtener mensajes
   */
  getMessages() {
    this.setNotVisibleSnackBar();
    this.setNotVisibleSnackBarInvitations();
    this.setNotVisibleSnackBarWorkspace();
    this.setNotVisibleSnackBarError();
    this.setNotVisibleSnackBarErrorWorkspace();
    this.setNotVisibleSnackBarErrorInvitations();
    this.setTextChannelIDtoModule(this.$route.params.id);
    this.setWorkspaceIDtoModule(this.$route.params.idChannel);
    this.channel = this.textChannel.find(
      (channel) => channel.uid === this.$route.params.idChannel
    );

    this.fetchMesages(() => {
      setTimeout(() => {
        //Mostrar scroll inverso
        const vList = this.$refs.vList as any;
        vList.$el.scrollTop = vList.$el.scrollHeight;
      }, 200);
    });
  }
}
</script>

<style scoped>
.card-center {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #0c2a52;
}
.scroll::-webkit-scrollbar {
  width: 5px;
}
.scroll::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-thumb {
  background-color: #11171a;
  border-radius: 10px;
}
.scroll {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.list-background {
  background-color: #0c2a52;
  color: white;
  max-height: 100vh;
  overflow-x: auto;
}
.img-not-messages {
  width: 40rem;
  height: 20rem;
  margin: auto;
}
</style>


