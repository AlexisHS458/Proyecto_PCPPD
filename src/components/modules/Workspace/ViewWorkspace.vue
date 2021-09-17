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
  <div v-else class="div-progress-circular">
    <v-progress-circular indeterminate :size="120" :width="4" color="primary">
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import toolbar from "@/components/modules/Workspace/InfoWorkspace.vue";
import userinfo from "@/components/modules/Workspace/InfoUser.vue";
import channels from "@/components/modules/Workspace/Channels/ViewChannels.vue";
import toolbarusers from "@/components/modules/Workspace/InvitationUser.vue";
import userlist from "@/components/modules/Workspace/ListUsers.vue";
import { User } from "@/models/user";
import { TextChannel } from "@/models/textChannel";
import { Workspace } from "@/models/workspace";
import { Message } from "@/models/message";
const User = namespace("UserModule");

const MyWorkSpace = namespace("WorkspaceModule");
const Messages = namespace("TextChannelModule");

@Component({
  components: {
    toolbar,
    userinfo,
    channels,
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
  private fetchCurrentUser!: () => Promise<void>;

  @MyWorkSpace.Action
  private fetchMyWorkspace!: (id: string) => Promise<void>;

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
  private setTextChannelIDtoModule!: (id: string) => void;

  @Messages.Action
  private setWorkspaceIDtoModule!: (id: string) => void;

  @MyWorkSpace.Action
  private fetchUsersOnline!: (workspaceID: string) => void;

  @MyWorkSpace.Action
  private deleteUserOnline!: (usrID: string) => Promise<void>;

  @MyWorkSpace.State("usersOnline")
  private usersOnline!: User[];

  @MyWorkSpace.Action
  private AddUserOnline!: (user: User) => Promise<void>;

  public itemss = [
    {
      icon: "mdi-circle",
      text: "Pablo",
      uid: "oluDJu524xWQAlUJMkq7Ug4yUfn1",
      status: true,
    },
    {
      icon: "mdi-circle",
      text: "Zamudio",
      uid: "i1iyi7p8b6XsfjXHgpbbLZH6kIp1",
      status: true,
    },
    {
      icon: "mdi-circle",
      text: "Hector",
      uid: "YC3pYdnSChMdz8jeY2czeG9ozSl2",
      status: false,
    },
    {
      icon: "mdi-circle",
      text: "Juanito",
      uid: "rL8Mn5T61nbt4RZYucELaIl6qnq2",
      status: false,
    },
  ];

  async created() {
    if (!this.isLoggedIn) {
      await this.fetchCurrentUser();
    }
    await this.fetchMyWorkspace(this.$route.params.id);
    this.fetchTextChannels(this.$route.params.id);
    this.fetchUsersOnline(this.$route.params.id);
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

.div-progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
