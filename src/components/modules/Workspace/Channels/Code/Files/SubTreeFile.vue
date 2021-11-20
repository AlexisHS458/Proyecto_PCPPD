<template>
  <div v-if="treeEntries">
    <v-icon @click="goBackAction">mdi-arrow-left</v-icon>
    <view-tree :treeEntries="treeEntries"></view-tree>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ViewTree from "@/components/modules/Workspace/ViewTreeView.vue";
import { Maybe, TreeEntry } from "@/generated/graphql";
import CodeService from "@/services/code_channel.service";
import { namespace } from "vuex-class";

const CodeChannelModule = namespace("CodeChannelModule");
@Component({
  components: { ViewTree }
})
export default class SubTreeFile extends Vue {
  @CodeChannelModule.State("codePath")
  private codePath!: string[];

  @CodeChannelModule.Action
  private goBackAction!: () => void;

  @Watch("codePath")
  async onChildChanged() {

    this.treeEntries = null;
    this.treeEntries = await CodeService.getNodeFiles(this.codePath[this.codePath.length - 1]);
    console.log(this.treeEntries);
  }

  public treeEntries: Maybe<TreeEntry[]> | undefined = null;

  async mounted() {
    this.treeEntries = await CodeService.getNodeFiles(this.codePath[this.codePath.length - 1]);
  }
}
</script>
