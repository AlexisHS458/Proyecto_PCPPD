<template>
  <v-hover>
    <v-list-item @click="goToPath(treeEntry)" slot-scope="{ hover }">
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
      <v-list-item-icon>
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogDelete">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text icon v-bind="attrs" v-on="on" :class="{ hidden: !hover }">
              <v-icon color="error"> mdi-delete </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-toolbar color="error" dark>
              Solicitud de confirmación
            </v-toolbar>
            <v-card-text>
              <div class="text-h6 pa-5 text-center">
                <p>¿SEGURO QUE DESEAS ELIMINAR ESTE ARCHIVO?</p>
                <p>ESTA ACCIÓN NO SE PUEDE DESAHACER</p>
              </div>
              <v-row align="center" justify="center">
                <v-btn color="error" @click="deleteFolder(treeEntry.name)" :loading="loadingDelete">
                  SI, QUIERO ELIMINARLO
                </v-btn>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialogDelete = false">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item-icon>
    </v-list-item>
  </v-hover>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { CodePath } from "@/models/codePath";

import { Maybe, Tree, TreeEntry, Blob, Repository, Commit } from "@/generated/graphql";
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

import { CodeChannel } from "@/models/codeChannel";
@Component
export default class ViewTreeView extends Vue {
  @Prop({
    required: true
  })
  public treeEntry!: Maybe<TreeEntry>;

  @CodeChannelModule.Action
  private setShowDialog!: (state: boolean) => void;

  @CodeChannelModule.Action
  private addPathState!: (path: CodePath) => void;

  @CodeChannelModule.Action
  private setCodeData!: (data: TreeEntry) => void;

  @CodeChannelModule.State("driverUID")
  private driverUID!: string;

  @CodeChannelModule.State("codeChanged")
  private codeChanged!: boolean;

  @User.State("user")
  private currentUser!: User;

  @CodeChannelModule.State("codeFilePath")
  private codeFilePath!: string;

  @WorkspaceModule.State("codeChannels")
  public codeChannels!: CodeChannel[];

  @CodeChannelModule.Action("setRepository")
  private setRepository!: (repo: Repository) => void;

  @CodeChannelModule.Action
  private setTreeEntry!: (tree: TreeEntry[]) => void;

  @CodeChannelModule.State("codePath")
  private codePath!: CodePath[];

  @CodeChannelModule.State("repository")
  private repository!: Maybe<Repository>;

  @CodeChannelModule.State("branchOid")
  private branchOid!: string;

  public dialogNewFolder = false;
  public loadingNewFolder = false;
  public dialogDelete = false;
  public treeEntriess: Maybe<TreeEntry[]> | undefined = null;
  public loadingDelete = false;

  getColor(extensionFile: string): string {
    return Colors.toColor(StringUtils.getHashCode(extensionFile));
  }

  async goToPath(treeEntry: TreeEntry) {
    switch ((treeEntry.object as any)?.__typename) {
      case "Tree":
        const tree = treeEntry.object as Tree;
        this.addPathState({ id: tree.id, nombre: treeEntry.name });
        break;
      case "Blob":
        if (this.driverUID === this.currentUser.uid!) {
          if (!this.codeChanged) {
            const blob = treeEntry.object as Blob;
            if (blob.isBinary == false) {
              const language = monaco.languages.getLanguages().find(language => {
                return language.extensions?.includes(treeEntry.extension ?? "plaintext");
              })?.id;
              this.setCodeData(treeEntry);
              CodeService.sendCode(this.currentUser.uid!, {
                channelID: this.$route.params.idChannelCode,
                code: blob.text ?? "",
                extension: language ?? "plaintext",
                path: this.codeFilePath
              });
            }
          } else {
            this.setShowDialog(this.codeChanged);
          }
        }
        break;
      default:
        break;
    }
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

  async deleteFolder(name: string) {
    this.loadingDelete = true;
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
        deletions: [
          {
            path: prefix + name
          }
        ]
      },
      message: { headline: "Se eliminó el archivo " + name, body: "" },
      expectedHeadOid: this.branchOid
    };
    //console.log(commitBody);

    await this.fileActions(commitBody);
    this.loadingDelete = false;

    this.dialogDelete = false;
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

.hidden {
  visibility: hidden;
}
</style>
