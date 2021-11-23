<template>
  <v-navigation-drawer
    app
    clipped
    right
    v-model="status.showTreeView"
    color="primaryDark"
    dark
  >
    <div v-if="treeEntries" class="v-navigation-drawer__content">
      <view-tree
        :codeChanel="idChannelCode"
        v-if="codePath.length === 0"
        :treeEntries="treeEntries"
      ></view-tree>
      <sub-tree v-else></sub-tree>
    </div>
    <div v-else class="div-progress-circular">
      <v-progress-circular indeterminate :size="120" :width="4" color="primary">
      </v-progress-circular>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ViewTree from "@/components/modules/Workspace/ViewTreeView.vue";
import SubTree from "@/components/modules/Workspace/Channels/Code/Files/SubTreeFile.vue";
import { Maybe, TreeEntry } from "@/generated/graphql";
import GitHubService from "@/services/github.service";
import { namespace } from "vuex-class";
import { CodeChannel } from "@/models/codeChannel";
import { CodePath } from "@/models/codePath";
const CodeChannelModule = namespace("CodeChannelModule");
const WorkspaceModule = namespace("WorkspaceModule");
@Component({
  components: { ViewTree, SubTree },
})
export default class RepoFilesView extends Vue {
  @Prop({
    required: true,
  })
  public idChannelCode!: string;

  @CodeChannelModule.State("status")
  private status!: any;

  @CodeChannelModule.State("codePath")
  private codePath!: CodePath[];

  @WorkspaceModule.State("codeChannels")
  public codeChannels!: CodeChannel[];

  @Watch("idChannelCode")
  onChildChangedView() {
    this.viewTree();
  }

  @Watch("codeChannels")
  onChildChanged() {
    this.viewTree();
  }

  public treeEntries: Maybe<TreeEntry[]> | undefined = null;

  async mounted() {
    this.viewTree();
  }

  async viewTree() {
    const codeChannel = this.codeChannels.find((channel) => {
      return channel.uid == this.$route.params.idChannelCode;
    });
    if (codeChannel) {
      this.treeEntries = await GitHubService.getRepo(
        codeChannel!.propietario,
        codeChannel!.nombre
      );
    }
  }
}
</script>

<style scoped>
.f {
  color: white;
}
.scrolls {
  overflow-y: auto;
  height: 100%;
}
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 5px !important;
  margin-right: 200px !important;
}
.v-navigation-drawer__content::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 10px !important;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background-color: #3e527e;
  border-radius: 10px;
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
