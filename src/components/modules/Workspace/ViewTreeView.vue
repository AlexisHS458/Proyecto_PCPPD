<template>
  <v-navigation-drawer app clipped right v-model="status.showTreeView" color="primaryDark" dark>
    {{ nameFile }}
    <v-treeview
      v-model="tree"
      :open="initiallyOpen"
      :items="items"
      activatable
      item-key="name"
      open-on-click
      style="color: white"
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.file" color="white">
          {{ open ? "mdi-folder-open" : "mdi-folder" }}
        </v-icon>
        <v-icon color="white" v-else>
          {{ files[item.file] }}
        </v-icon>
      </template>
    </v-treeview>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import CodeChannelService from "@/services/code_channel.service";
const CodeChannel = namespace("CodeChannelModule");

@Component
export default class ViewTreeViwe extends Vue {
  @CodeChannel.State("status")
  private status!: any;

  public drawer = null;
  public initiallyOpen = ["public"];
  public files = {
    html: "mdi-language-html5",
    js: "mdi-nodejs",
    json: "mdi-code-json",
    md: "mdi-language-markdown",
    pdf: "mdi-file-pdf",
    png: "mdi-file-image",
    txt: "mdi-file-document-outline",
    xls: "mdi-file-excel"
  };
  public tree = [];
  public nameFile: string | undefined = undefined;

  public items = [
    {
      name: ".git"
    },
    {
      name: "node_modules"
    },
    {
      name: "public",
      children: [
        {
          name: "static",
          children: [
            {
              name: "logo.png",
              file: "png"
            }
          ]
        },
        {
          name: "favicon.ico",
          file: "png"
        },
        {
          name: "index.html",
          file: "html"
        }
      ]
    },
    {
      name: ".gitignore",
      file: "txt"
    },
    {
      name: "babel.config.js",
      file: "js"
    },
    {
      name: "package.json",
      file: "json"
    },
    {
      name: "README.md",
      file: "md"
    },
    {
      name: "vue.config.js",
      file: "js"
    },
    {
      name: "yarn.lock",
      file: "txt"
    }
  ];
  async mounted() {
    this.nameFile = await CodeChannelService.getFileTree();
  }
  
}
</script>

<style scoped>
.f {
  color: white;
}
</style>
