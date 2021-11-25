<template>
  <div v-if="treeEntries">
    <view-tree :treeEntries="treeEntries"></view-tree>
  </div>
</template>

<script lang="ts">
import { Component,  Vue, Watch } from "vue-property-decorator";
import ViewTree from "@/components/modules/Workspace/ViewTreeView.vue";
import { Maybe, TreeEntry } from "@/generated/graphql";
import GitHubService from "@/services/github.service";
import { namespace } from "vuex-class";
import { CodePath } from "@/models/codePath";

const CodeChannelModule = namespace("CodeChannelModule");
@Component({
  components: { ViewTree },
})
export default class SubTreeFile extends Vue {
  @CodeChannelModule.State("codePath")
  private codePath!: CodePath[];


  @Watch("codePath")
  async onChildChanged() {
    this.treeEntries = null;
    this.treeEntries = await GitHubService.getNodeFiles(
      this.codePath[this.codePath.length - 1].id
    );

  }

  public treeEntries: Maybe<TreeEntry[]> | undefined = null;

  async mounted() {
    this.treeEntries = await GitHubService.getNodeFiles(
      this.codePath[this.codePath.length - 1].id
    );
  }
}
</script>

