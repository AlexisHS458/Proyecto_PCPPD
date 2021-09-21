<template>
  <div class="mx-auto card-center">
    <app-bar-messages></app-bar-messages>
    <v-list three-line class="list-background scroll" ref="vList">
      <list-messages
        class="flex-grow-1"
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      ></list-messages>
    </v-list>
    <input-message
      :workspace="workspace"
      :currentUser="currentUser"
    ></input-message>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import AppBarMessages from "@/components/modules/Workspace/Channels/Text/AppBarMessages.vue";
import InputMessage from "@/components/modules/Workspace/Channels/Text/InputMessage.vue";
import ListMessages from "@/components/modules/Workspace/Channels/Text/ListMessages.vue";
import { User } from "@/models/user";
import { TextChannel } from "@/models/textChannel";
import { Workspace } from "@/models/workspace";
import { Message } from "@/models/message";
import { Prop, Watch } from "vue-property-decorator";
const User = namespace("UserModule");
const MyWorkSpace = namespace("WorkspaceModule");
const Messages = namespace("TextChannelModule");

@Component({
  components: {
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
  private fetchTextChannels!: (id: string) => void;

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

  /**
   * Estado obtenido del @module Messages
   */
  @Messages.State("messages")
  private messages!: Message[];

  /**
   * Getters obtenido del @module Messages
   */
  @Messages.Getter
  private isLoadingMessages!: boolean;

  /**
   * Cada que se cambie de canal de texto se mandara a llamar la función de obtener mensajes
   */
  @Watch("idChannel")
  onChildChanged() {
    this.getMessages();
  }

  /**
   * Obtener mensajes
   */
  mounted() {
    this.getMessages();
  }

  /**
   * Obtener mensajes
   */
  getMessages() {
    this.setTextChannelIDtoModule(this.$route.params.id);
    this.setWorkspaceIDtoModule(this.$route.params.idChannel);
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
  height: 100vh;
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
</style>


