<template>
  <v-row v-if="!isLoading && !isLoadingMyWorkspace" class="row" no-gutters>
    <v-col class="flex-grow-0 flex-shrink-1">
      <div class="mx-auto cardd">
        <toolbar :name="workspace.nombre"></toolbar>
        <channels
          class="flex-grow-1"
          :users="itemss"
          :workspace="workspace"
        ></channels>
        <userinfo></userinfo>
      </div>
    </v-col>
    <v-col class="flex-grow-1 flex-shrink-0">
      <div class="mx-auto card-center">
        <toolbardata></toolbardata>
        <v-list three-line class="holaaaa scrooll">
          <message
            class="flex-grow-1"
            v-for="(message, index) in messages"
            :key="index"
            :messages="message"
          ></message>
        </v-list>
        <inputmessage></inputmessage>
      </div>
    </v-col>
    <v-col class="flex-grow-0 flex-shrink-1">
      <div class="mx-auto cardd">
        <toolbarusers></toolbarusers>
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
const User = namespace("UserModule");
/* const ChannelsModule = namespace("ChannelModule"); */
const MyWorkSpace = namespace("Workspace");

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

  @MyWorkSpace.State("workspace")
  private workspace!: Workspace;

  @MyWorkSpace.Getter
  private isLoadingMyWorkspace!: boolean;

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

  public messages = [
    {
      title: "Brunch this weekend?",
      subtitle:
        "ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
    },

    {
      title: "Summer BBQ",
      subtitle: "Wish I could come, but I'm out of town this weekend.",
    },

    {
      title: "Oui oui",
      subtitle: "Do you have Paris recommendations? Have you ever been?",
    },

    {
      title: "Birthday gift",
      subtitle:
        "Have any ideas about what we should get Heidi for her birthday?",
    },

    {
      title: "Recipe to try",
      subtitle: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
    },
    {
      title: "Recipe to try",
      subtitle: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
    },
    {
      title: "Brunch this weekend?",
      subtitle:
        "ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'ll be in your neighborhood doing errands this weekend. Do you want to hang out?I'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out? 'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
    },
    {
      title: "Brunch this weekend?",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus ex ac urna viverra posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla aliquet pulvinar sagittis. Curabitur purus ante, dictum ac metus volutpat, porttitor iaculis sem. Cras iaculis mauris a odio faucibus faucibus. Nam faucibus elit enim, a facilisis ex pulvinar eu. Etiam congue tempus velit, sed iaculis mauris blandit in. Vestibulum eleifend augue quam, et semper nibh molestie semper. Pellentesque pellentesque, risus vitae euismod vulputate, neque tortor interdum mi, porta molestie mauris lorem vel nunc. Donec at justo velit. Nam lobortis urna a dui pharetra posuere at at massa. Sed ipsum neque, pharetra pharetra egestas et, placerat sed sapien. Cras congue ante ante, non tincidunt sapien gravida quis. Maecenas condimentum, leo quis porta pretium, felis lacus cursus orci, ac mattis purus odio a libero. Donec gravida neque felis, a facilisis libero euismod nec. Pellentesque finibus rutrum libero sed pretium. In nisi lectus, sollicitudin eu lectus a, rhoncus porttitor tellus. Duis interdum, nulla feugiat porta convallis, odio dolor ullamcorper orci, quis condimentum dui risus nec metus. Aliquam ut augue malesuada, sagittis justo eget, facilisis odio. Donec sit amet pharetra mi. Maecenas quam sapien, vulputate sit amet lacinia nec, eleifend vel urna. Donec pulvinar condimentum convallis. Suspendisse malesuada libero nec blandit semper. Aenean venenatis ultrices nunc vitae tempus. Donec luctus ornare metus sit amet porta. Integer vehicula felis turpis, at faucibus felis luctus at. Phasellus vehicula leo vel porta imperdiet. Suspendisse potenti. Suspendisse mattis sapien non hendrerit condimentum. Mauris sagittis tincidunt sapien ac venenatis. Donec lacus lorem, vestibulum a lorem commodo, consectetur consequat lacus. In dignissim placerat odio in finibus. Aliquam erat volutpat. Suspendisse non lorem fringilla, hendrerit diam vitae, aliquam purus. Nulla facilisi. Nam pellentesque mollis tempor. Vivamus tincidunt lorem efficitur felis luctus iaculis. Proin quis felis quis dolor maximus congue. Nulla tristique lacus vitae quam volutpat, pretium lacinia nisi elementum. Curabitur tristique lorem ac tincidunt hendrerit. In suscipit suscipit magna, at aliquam dui semper non. Aliquam fermentum velit ut mattis congue. Donec feugiat quis ante ut sodales. Morbi non massa odio. Mauris condimentum, leo nec iaculis scelerisque, risus risus dapibus ex, ut iaculis dolor massa vitae tellus. Aenean quam risus, semper non placerat ac, suscipit vitae quam. Nunc varius vel dui vitae vestibulum. Fusce tincidunt justo eu tincidunt consequat. Aenean fringilla nisi id consequat interdum. Proin erat eros, auctor ac ultrices vel, varius quis nunc. Etiam auctor tempus dolor porta fringilla. Ut quis erat tortor. Integer tortor enim, bibendum vel bibendum et, eleifend et neque. Cras pellentesque lectus vitae congue ultricies. Sed aliquet ex nec purus commodo, at feugiat lorem viverra. Donec volutpat purus eget massa mattis, quis tempus ipsum suscipit. Donec elit tortor, porta quis posuere at, pellentesque quis elit. Etiam urna orci, ultrices sed elit non, blandit malesuada tortor. Sed nisl mauris, sodales vel tellus vel, ullamcorper vestibulum turpis. In eu lectus et enim pellentesque aliquet. Etiam eget maximus mi, convallis porttitor felis. Aliquam sed tellus molestie, fermentum leo eu, efficitur. ",
    },
  ];

  mounted(): void {
    if (!this.isLoggedIn) {
      this.fetchCurrentUser();
    }
    this.fetchMyWorkspace(this.$route.params.id);
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
