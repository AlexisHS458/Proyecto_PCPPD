<template>
  <div>
    <v-toolbar color="primaryDark" flat dense>
      <v-icon color="grey darken-2" @click="goBackAction" v-if="codePath.length > 0" class="mr-4">
        mdi-arrow-left
      </v-icon>

      <v-toolbar-title class="grey--text text--darken-4 font">
        {{ codePath.length > 0 ? codePath[codePath.length - 1].nombre : nameCodeChannel }}
      </v-toolbar-title>
    </v-toolbar>
    <v-list dark>
      <v-list-item
        v-for="treeEntry in treeEntries"
        :key="treeEntry.object.id"
        @click="goToPath(treeEntry)"
      >
        <v-list-item-avatar>
          <v-icon dark v-if="treeEntry.type == 'tree'"> mdi-folder </v-icon>
          <v-icon
            dark
            v-else-if="treeEntry.type == 'blob'"
            :color="getColor(treeEntry.extension.replace('.', ''))"
          >
            mdi-file
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="treeEntry.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CodePath } from "@/models/codePath";
import { Maybe, Tree, TreeEntry, Blob } from "@/generated/graphql";
import { namespace } from "vuex-class";
const CodeChannelModule = namespace("CodeChannelModule");
const User = namespace("UserModule");
import { User } from "@/models/user";
import { Colors } from "@/utils/colors";
import { StringUtils } from "@/utils/stringsUtils";
import { ChannelType } from "@/utils/channels_types";
import ServiceChannels from "@/services/channels.service";
import CodeService from "@/services/code_channel.service";
import * as monaco from "monaco-editor";
import CryptoJS from "crypto-js";
@Component
export default class ViewTreeView extends Vue {
  @Prop({
    required: true
  })
  public treeEntries!: Maybe<TreeEntry[]>;

  @Prop({
    required: false
  })
  public codeChanel!: string;

  @Watch("codeChanel")
  onChildChangedView() {
    this.nameCode();
  }

  @CodeChannelModule.Action
  private addPathState!: (path: CodePath) => void;

  @CodeChannelModule.Action
  private goBackAction!: () => void;

  @CodeChannelModule.Action
  private setCodeData!: (data: TreeEntry) => void;

  @CodeChannelModule.State("driverUID")
  private driverUID!: string;

  @User.State("user")
  private currentUser!: User;

  @CodeChannelModule.State("codePath")
  private codePath!: CodePath[];

  public nameCodeChannel = "";

  public serverHash: string | undefined;

  getColor(extensionFile: string): string {
    return Colors.toColor(StringUtils.getHashCode(extensionFile));
  }

  async nameCode() {
    this.nameCodeChannel = await ServiceChannels.getChannelName(
      ChannelType.CODE,
      this.$route.params.id,
      this.$route.params.idChannelCode
    );
  }

  mounted() {
    this.nameCode();
  }

  async getServerHash(): Promise<string> {
    return new Promise((resolve, reject) => {
      CodeService.getInitialHash(this.currentUser.uid!, hash => {
        console.log("tengo el hash del server");
        resolve(hash);
      });
    });
  }

  compareHash(): boolean {
    console.log("entro");

    if (!this.serverHash) {
      console.log("se salio");
      return true;
    }

    const currentCode = monaco.editor.getModels()[0].getValue();
    // const secret = process.env.VUE_APP_SOCKET_SECRET
    //   ? process.env.VUE_APP_SOCKET_SECRET
    //   : "secreto";
    const secret = "Plataforma colaborativa para el pair programming distribuido";
    const encryp = CryptoJS.AES.encrypt(currentCode, secret).toString();
    console.log(
      CryptoJS.AES.decrypt(this.serverHash, secret)
        .toString(CryptoJS.enc.Utf8)
        .substring(0, 200)
    );
    console.log(this.serverHash == encryp);

    return this.serverHash == encryp;
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async goToPath(treeEntry: TreeEntry) {
    switch ((treeEntry.object as any)?.__typename) {
      case "Tree":
        const tree = treeEntry.object as Tree;
        this.addPathState({ id: tree.id, nombre: treeEntry.name });
        break;
      case "Blob":
        //this.serverHash = await this.getServerHash();
        if (this.driverUID === this.currentUser.uid!) {
          const blob = treeEntry.object as Blob;
          if (blob.isBinary == false) {
            if (this.compareHash() == true) {
              this.setCodeData(treeEntry);
            } else {
              console.log("decirle que guarde");
            }
          }
        }
        break;
      default:
        break;
    }
  }
}
</script>

<style scoped>
.v-navigation-drawer__content {
  height: 100%;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}

.v-toolbar__content {
  padding: 0px 0px;
}

.v-list {
  display: block;
  padding: 0px 0px;
  position: static;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}

.font {
  font-size: 1.1em;
}
</style>
