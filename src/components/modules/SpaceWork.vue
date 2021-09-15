<template>
  <v-row v-if="!isLoading && !isLoadingWorkspace" class="row" no-gutters>
    <v-col class="flex-grow-0 flex-shrink-1">
      <div class="mx-auto cardd">
        <toolbar :name="workspace.nombre"></toolbar>
        <channels
          class="flex-grow-1"
          :users="itemss"
          :workspace="workspace"
          :textChannels="textChannel"
        ></channels>
        <userinfo></userinfo>
      </div>
    </v-col>
    <v-col class="flex-grow-1 flex-shrink-0">
      <router-view> </router-view>
    </v-col>
    <v-col class="flex-grow-0 flex-shrink-1">
      <div class="mx-auto cardd">
        <toolbarusers :user="currentUser" :workspace="workspace"></toolbarusers>
        <v-list color="primaryDark">
          <userlist
            v-for="(item, i) in itemss"
            :item="item"
            :key="i"
          ></userlist>
        </v-list>
      </div>
    </v-col>
  </v-row>
  <div v-else class="coll">
    <v-progress-circular indeterminate :size="120" :width="4" color="primary">
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import toolbar from "@/components/modules/spacework/toolbar.vue";
import userinfo from "@/components/modules/spacework/userinfo.vue";
import channels from "@/components/modules/spacework/channels.vue";
import toolbardata from "@/components/modules/spacework/toolbardata.vue";
import inputmessage from "@/components/modules/spacework/inputmessage.vue";
import message from "@/components/modules/spacework/message.vue";
import toolbarusers from "@/components/modules/spacework/toolbarusers.vue";
import userlist from "@/components/modules/spacework/userlist.vue";
import { User } from "@/models/user";
import { TextChannel } from "@/models/textChannel";
import { Workspace } from "@/models/workspace";
import { Message } from "@/models/message";
const User = namespace("UserModule");
/* const ChannelsModule = namespace("ChannelModule"); */
const MyWorkSpace = namespace("WorkspaceModule");
const Messages = namespace("TextChannelModule");

@Component({
  components: {
    toolbar,
    userinfo,
    channels,
    toolbardata,
    inputmessage,
    message,
    toolbarusers,
    userlist,
  },
})
export default class Spacework extends Vue {
  @User.Getter
  private isLoading!: boolean;

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

  @MyWorkSpace.Getter
  private isLoadingWorkspace!: boolean;

  @Messages.Action
  private fetchMesages!: () => void;

  @Messages.Getter
  private isLoadingMessages!: boolean;

  @Messages.State("messages")
  private messages!: Message[];

  @Messages.Action
  setTextChannelIDtoModule!: (id: string) => void;

  @Messages.Action
  setWorkspaceIDtoModule!: (id: string) => void;

  public itemss = [
    {
      icon: "mdi-circle",
      text: "Pablo",
      status: true,
    },
    {
      icon: "mdi-circle",
      text: "Zamudio",
      status: true,
    },
    {
      icon: "mdi-circle",
      text: "Hector",
      status: false,
    },
    {
      icon: "mdi-circle",
      text: "Juanito",
      status: false,
    },
  ];

  mounted() {
    if (!this.isLoggedIn) {
      this.fetchCurrentUser();
    }
    this.fetchMyWorkspace(this.$route.params.id);
    this.fetchTextChannels(this.$route.params.id);
  }
}
</script>

<style scoped>
.cardd {
  height: 100vh;
  width: 40vh;
  display: flex;
  flex-direction: column;
  background-color: #000029;
}
.card-center {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #0c2a52;
}

.container-div {
  width: 100%;
  display: flex;
}

.coll {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

.holaaaa {
  background-color: #0c2a52;
  color: white;
  max-height: 100vh;
  overflow-x: auto;
}
</style>
