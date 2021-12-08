<template>
  <div>
    <v-toolbar color="primaryDark" flat dense>
      <v-icon color="grey darken-2" @click="goBackAction" v-if="codePath.length > 0" class="mr-4">
        mdi-arrow-left
      </v-icon>

      <v-toolbar-title class="grey--text text--darken-4 font">
        {{ codePath.length > 0 ? codePath[codePath.length - 1].nombre : nameCodeChannel }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogNewFile">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-file-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar color="secondary" dark> Nuevo archivo </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
              <v-row align="center" justify="center" class="mt-6">
                <v-col cols="9">
                  <v-text-field
                    label="Ingresa el nombre del archivo con extensiòn"
                    :rules="[rules.required]"
                    outlined
                    dense
                    color="primary"
                    prepend-inner-icon="mdi-file"
                    @keydown.esc="closeDialogNewFile"
                    v-model.trim="nameFile"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="success" @click="addFile" :loading="loadingNewFile">
              Crear
            </v-btn>
            <v-btn text @click="closeDialogNewFile">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogNewFolder">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-folder-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar color="secondary" dark> Nueva carpeta </v-toolbar>
          <v-card-text>
            <v-form ref="formFolder" v-model="validFolder" lazy-validation @submit.prevent>
              <v-row align="center" justify="center" class="mt-6">
                <v-col cols="9">
                  <v-text-field
                    :rules="[rules.required]"
                    label="Ingresa el nombre de la carpeta"
                    outlined
                    dense
                    color="primary"
                    prepend-inner-icon="mdi-folder"
                    @keydown.esc="closeDialogNewFolder"
                    v-model.trim="nameFolder"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="success" @click="addFolder" :loading="loadingNewFolder">
              Crear
            </v-btn>
            <v-btn text @click="closeDialogNewFolder">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-list dark>
      <list-tree
        v-for="treeEntry in treeEntries"
        :key="treeEntry.object.id"
        :treeEntry="treeEntry"
      ></list-tree>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { CodePath } from "@/models/codePath";
import SubTree from "@/components/modules/Workspace/Channels/Code/Files/RepoFilesView.vue";
import ListTree from "@/components/modules/Workspace/Channels/Code/Files/ListTree.vue";
import {
  Maybe,
  Tree,
  TreeEntry,
  Blob,
  Repository,
  Commit,
  Ref as RefGraphQL
} from "@/generated/graphql";
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
import GitHubService from "@/services/github.service";
const WorkspaceModule = namespace("WorkspaceModule");
import { VForm } from "@/utils/types";
import { CodeChannel } from "@/models/codeChannel";
import { GraphQLResolveInfo } from "graphql";
@Component({
  components: {
    SubTree,
    ListTree
  }
})
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
  private setShowDialog!: (state: boolean) => void;

  @CodeChannelModule.Action
  private addPathState!: (path: CodePath) => void;

  @CodeChannelModule.Action
  private goBackAction!: () => void;

  @CodeChannelModule.Action
  private setCodeData!: (data: TreeEntry) => void;

  @CodeChannelModule.State("driverUID")
  private driverUID!: string;

  @CodeChannelModule.State("codeChanged")
  private codeChanged!: boolean;

  @User.State("user")
  private currentUser!: User;

  @CodeChannelModule.State("codePath")
  private codePath!: CodePath[];

  @CodeChannelModule.State("codeFilePath")
  private codeFilePath!: string;

  @CodeChannelModule.State("repository")
  private repository!: Maybe<Repository>;

  @CodeChannelModule.State("branchOid")
  private branchOid!: string;

  @CodeChannelModule.Action("setBranchOid")
  private setBranchOid!: (ref: any) => void;

  @CodeChannelModule.Action("setRepository")
  private setRepository!: (repo: Repository) => void;

  @WorkspaceModule.State("codeChannels")
  public codeChannels!: CodeChannel[];

  @CodeChannelModule.Action
  private setTreeEntry!: (tree: TreeEntry[]) => void;

  public nameCodeChannel = "";
  public serverHash: string | undefined;
  public dialogNewFile = false;
  public valid = false;
  public loadingNewFile = false;
  public nameFile = "";
  public nameFolder = "";
  public validFolder = false;
  public dialogNewFolder = false;
  public loadingNewFolder = false;
  public dialogDelete = false;
  public loadingDelete = false;
  public treeEntryFromFileActions: Maybe<TreeEntry[]> = null;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido"
  };

  @Ref("form") readonly form!: VForm;
  @Ref("formFolder") readonly formFolder!: VForm;

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

  async fileActions(commitBody: any): Promise<void> {
    await GitHubService.makeCommit(commitBody);
    const codeChannel = this.codeChannels.find(channel => {
      return channel.uid == this.$route.params.idChannelCode;
    });
    if (codeChannel) {
      const repo = await GitHubService.getRepo(codeChannel!.propietario, codeChannel!.nombre);
      const treeEntries = (repo?.defaultBranchRef?.target as Commit).tree.entries?.sort((a, b) => {
        const aType = a.type === "tree" ? -1 : 1;
        const bType = b.type === "tree" ? -1 : 1;
        return aType - bType;
      });
      if (treeEntries) {
        this.setTreeEntry(treeEntries);
      }
      if (repo) {
        this.setRepository(repo);
      }
    }
  }

  async addFile() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loadingNewFile = true;
      let prefix = "";
      if (this.codePath.length > 0) {
        prefix = this.codePath.map(path => path.nombre).join("/") + "/";
      }
      const commitBody = {
        branch: {
          repositoryNameWithOwner: this.repository?.owner.login + "/" + this.repository?.name,
          branchName: this.repository?.defaultBranchRef?.name
        },
        fileChanges: {
          additions: [
            {
              path: prefix + this.nameFile,
              contents: ""
            }
          ]
        },
        message: { headline: "Creación de archivo " + this.nameFile, body: "" },
        expectedHeadOid: this.branchOid
      };

      await this.fileActions(commitBody);
      this.loadingNewFile = false;
      this.form.resetValidation();
      this.form.reset();
      this.dialogNewFile = false;
    }
  }

  async addFolder() {
    if ((this.$refs.formFolder as Vue & { validate: () => boolean }).validate()) {
      this.loadingNewFolder = true;
      let prefix = "";
      if (this.codePath.length > 0) {
        prefix = this.codePath.map(path => path.nombre).join("/") + "/";
      }
      const commitBody = {
        branch: {
          repositoryNameWithOwner: this.repository?.owner.login + "/" + this.repository?.name,
          branchName: this.repository?.defaultBranchRef?.name
        },
        fileChanges: {
          additions: [
            {
              path: prefix + this.nameFolder + "/.gitkeep",
              contents: ""
            }
          ]
        },
        message: { headline: "Creación de carpeta " + this.nameFolder, body: "" },
        expectedHeadOid: this.branchOid
      };

  
      await this.fileActions(commitBody);
      this.loadingNewFolder = false;
      this.formFolder.resetValidation();
      this.formFolder.reset();
      this.dialogNewFolder = false;
    }
  }

  closeDialogNewFile() {
    this.form.resetValidation();
    this.form.reset();
    this.dialogNewFile = false;
  }

  closeDialogNewFolder() {
    this.formFolder.resetValidation();
    this.formFolder.reset();
    this.dialogNewFolder = false;
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
