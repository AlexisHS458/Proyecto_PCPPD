<template>
  <div class="card-center d-flex flex-column">
    <app-bar-messages
      :channelApp="channel"
      class="flex-grow-0 flex-shrink-1"
    ></app-bar-messages>
    <div v-if="!isLoadingMessages">
      <template v-if="messages.length > 0">
        <messages-list
          class="background list-background scroll flex-grow-1"
          ref="vList"
        >
          <messages-in-messages
            v-for="message in messages"
            :key="message.uid"
            :message="message"
            :currentUser="currentUser"
            :messages="messages"
          >
            <!--<template v-if="message.isFile">
              {{ message.contenido }}
            </template>
            <template v-else>
              {{ message.contenido }}
            </template> -->
          </messages-in-messages>
        </messages-list>
      </template>
      <template v-else>
        <div class="div-image-center">
          <img src="@/assets/Messages.svg" class="img-not-messages" />
        </div>
      </template>
    </div>
    <div v-else class="div-progress-circular">
      <v-progress-circular indeterminate :size="80" :width="4" color="white">
      </v-progress-circular>
    </div>
    <v-footer app color="primary" inset class="display-footer">
      <input-message
        class="flex-grow-0 flex-shrink-1"
        :workspace="workspace"
        :currentUser="currentUser"
      ></input-message>
    </v-footer>
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
import MessagesList from "@/components/modules/Workspace/Channels/Text/Messages.vue";
import MessagesInMessages from "@/components/modules/Workspace/Channels/Text/Message.vue";
import { User } from "@/models/user";
import { TextChannel } from "@/models/textChannel";
import { Workspace } from "@/models/workspace";
import { Message } from "@/models/message";
import { Prop, Watch } from "vue-property-decorator";
import { ChannelType } from "@/utils/channels_types";
import ServiceChannels from "@/services/channels.service";
const User = namespace("UserModule");
const MyWorkSpace = namespace("WorkspaceModule");
const Messages = namespace("TextChannelModule");
const Invitations = namespace("InvitationsModule");
const Permissions = namespace("PermissionsModule");
import MessageService from "@/services/message.service";
@Component({
  components: {
    Snackbar,
    AppBarMessages,
    InputMessage,
    ListMessages,
    MessagesList,
    MessagesInMessages,
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

  @Permissions.Action("setNotVisibleSnackBar")
  setNotVisibleSnackBarPermissions!: () => void;

  /**
   * Cada que se cambie de canal de texto se mandara a llamar la función de obtener mensajes
   */
  @Watch("idChannel")
  onChildChanged() {
    this.getMessages();
  }

  public channel = "";
  public timeout = -1;

  /**
   * Obtener mensajes
   */
  /* async */ mounted() {
    /*   await this.fetchTextChannels(this.$route.params.id); */
    this.getMessages();
  }
  async nameText() {
    this.channel = await ServiceChannels.getChannelName(
      ChannelType.TEXT,
      this.$route.params.id,
      this.$route.params.idChannel
    );
  }
  destroyed() {
    this.setNotVisibleSnackBarWorkspace();
    this.setNotVisibleSnackBar();
    this.setNotVisibleSnackBarInvitations();
    this.setNotVisibleSnackBarError();
    this.setNotVisibleSnackBarErrorWorkspace();
    this.setNotVisibleSnackBarErrorInvitations();
    this.setNotVisibleSnackBarPermissions();
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
    this.setNotVisibleSnackBarPermissions();
    this.setTextChannelIDtoModule(this.$route.params.id);
    this.setWorkspaceIDtoModule(this.$route.params.idChannel);
    this.nameText();
    this.fetchMesages(() => {
      setTimeout(() => {
        //Mostrar scroll inverso
        const vList = this.$refs.vList as any;
        vList.$el.scrollTop = vList.$el.scrollHeight;
      }, 1000);
    });
  }
}
</script>

<style scoped lang="scss">
.div-progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-center {
  /* display: flex; */
  flex-direction: column;
  /* justify-content: space-between; */
  background-color: #0c2a52;
}
.div-image-center {
  height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  max-height: 40vh;
}
.list-background {
  background-color: #0c2a52;
  color: white;
  max-height: 81vh;
  overflow-x: auto;
}
.img-not-messages {
  border-radius: 1rem;
  width: 18rem !important;
  height: 18rem !important;
}
/* .background {
  background-color: transparent;
  border: 0px;
} */
.display-footer {
  display: block;
}
</style>
