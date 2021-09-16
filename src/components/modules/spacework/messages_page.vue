<template>
  <div class="mx-auto card-center">
    <toolbardata></toolbardata>
    <v-list three-line class="holaaaa scrooll" ref="vList">
      <message
        class="flex-grow-1"
        v-for="(message, index) in messages"
        :key="index"
        :messages="message"
        :uidWorkspace="workspace.uid"
      ></message>
    </v-list>
    <inputmessage :workspace="workspace" :user="currentUser"></inputmessage>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import toolbardata from "@/components/modules/spacework/toolbardata.vue";
import inputmessage from "@/components/modules/spacework/inputmessage.vue";
import message from "@/components/modules/spacework/message.vue";
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
    toolbardata,
    inputmessage,
    message,
  },
})
export default class MessagesPage extends Vue {
  @Prop({
    required: true,
  })
  public idChannel!: string;

  @Watch("idChannel")
  onChildChanged() {
    this.getMessages();
  }

  @User.State("user")
  private currentUser!: User;

  @User.Getter
  private isLoggedIn!: boolean;

  @User.Action
  private fetchCurrentUser!: () => void;

  @MyWorkSpace.Action
  private fetchMyWorkspace!: (id: string) => void;

  @MyWorkSpace.Action
  private fetchTextChannels!: (id: string) => void;

  @MyWorkSpace.State("textChannels")
  private textChannel!: TextChannel[];

  @MyWorkSpace.State("workspace")
  private workspace!: Workspace;

  @Messages.Action
  private fetchMesages!: (callBack: () => void) => void;

  @Messages.Getter
  private isLoadingMessages!: boolean;

  @Messages.State("messages")
  private messages!: Message[];

  @Messages.Action
  setTextChannelIDtoModule!: (id: string) => void;

  @Messages.Action
  setWorkspaceIDtoModule!: (id: string) => void;

  mounted() {
    this.getMessages();
  }

  getMessages() {
    this.setTextChannelIDtoModule(this.$route.params.id);
    this.setWorkspaceIDtoModule(this.$route.params.idChannel);

    this.fetchMesages(() => {
      setTimeout(() => {
        const vList = this.$refs.vList as any;
        console.log(vList.$el.scrollHeight, vList.$el);
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

.scrooll::-webkit-scrollbar {
  width: 5px;
}
.scrooll::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.scrooll::-webkit-scrollbar-thumb {
  background-color: #11171a;
  border-radius: 10px;
}

.scrooll {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.holaaaa {
  background-color: #0c2a52;
  color: white;
  max-height: 100vh;
  overflow-x: auto;
}
</style>


