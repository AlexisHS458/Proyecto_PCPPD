<template>
  <v-hover>
    <v-app-bar
      slot-scope="{ hover }"
      @click="() => {}"
      color="primaryDark"
      dense
      class="toolbar"
    >
      <v-toolbar-title> {{ nameWorkspace }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="1 == 2" v-model="menu" offset-y>
        <template #activator="{ on }">
          <v-btn text icon v-on="on" :class="{ hidden: !hover && !menu }">
            <v-icon color="white">mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list color="secondary">
          <v-list-item-content class="justify-center card-list">
            <div class="mx-auto text-right">
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    text
                    block
                    class="btn"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="error" class="mr-6"> mdi-arrow-left </v-icon>
                    Abandonar espacio de trabajo
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar color="error" dark>
                    Solicitud de confirmación
                  </v-toolbar>
                  <v-card-text>
                    <div class="text-h6 pa-5 text-center">
                      <p>
                        ¿ESTAS SEGURO QUE DESEAS ABANDONAR ESTE ESPACIO DE
                        TRABAJO?
                      </p>
                    </div>
                    <v-row align="center" justify="center">
                      <v-btn color="error"> SI, Abandonar </v-btn>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Cancelar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-list-item-content>
        </v-list>
      </v-menu>
      <v-menu v-else v-model="menu" offset-y>
        <template #activator="{ on }">
          <v-btn text icon v-on="on" :class="{ hidden: !hover && !menu }">
            <v-icon color="white">mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list color="secondary">
          <v-list-item-content class="justify-center card-list">
            <div class="mx-auto text-right">
              <v-dialog transition="dialog-top-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    text
                    block
                    class="btn"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="error" class="mr-6"> mdi-delete </v-icon>
                    Eliminar archivos
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar color="warning" dark>
                    Eliminar archivos
                  </v-toolbar>
                  <v-card-text class="mt-10">
                    <v-data-table
                      v-model="selected"
                      :headers="headers"
                      :items="files"
                      :single-select="singleSelect"
                      show-select
                      class="elevation-1"
                    >
                      <template v-slot:item.icon="{ item }">
                        <v-icon> {{ item.icon }} </v-icon>
                      </template>
                    </v-data-table>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn @click="dialog.value = false" color="error"
                      >Eliminar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-list-item-content>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-hover>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Toolbar extends Vue {
  @Prop({
    required: true,
  })
  public nameWorkspace!: string;

  public show = false;
  public menu = false;
  public model = 1;
  public selected = [];
  public singleSelect = false;
  public headers = [
    {
      sortable: false,
      value: "icon",
      align: "center",
    },
    { text: "Nombre del archivo", value: "name" },
    { text: "Fecha", value: "date" },
    { text: "Tamaño", value: "size" },
  ];
  public files = [
    {
      icon: "mdi-file",
      name: "Práctica 1.cpp",
      date: "2021-12-14",
      size: "1 MB",
    },
    {
      icon: "mdi-file",
      name: "Práctica 2.java",
      date: "2021-1-14",
      size: "5 MB",
    },
    {
      icon: "mdi-file",
      name: "Botella tras botella.mp44",
      date: "2020-12-30",
      size: "8 MB",
    },
    {
      icon: "mdi-file",
      name: "Reporte práctica 1.pdf",
      date: "2022-12-24",
      size: "4 MB",
    },
    {
      icon: "mdi-file",
      name: "Práctica 1.cpp",
      date: "2021-12-24",
      size: "1 MB",
    },
    {
      icon: "mdi-file",
      name: "Práctica 1.cpp",
      date: "2021-12-24",
      size: "1 MB",
    },

    {
      icon: "mdi-file",
      name: "Práctica 1.cpp",
      date: "2021-12-24",
      size: "1 MB",
    },
  ];
}
</script>


<style scoped>
.toolbar {
  flex: none;
}
.v-toolbar__title {
  color: white;
}

.list-title {
  color: white;
}
.hidden {
  visibility: hidden;
}

.v-btn,
.v-btn * {
  transition: none;
}

.card-list {
  padding: 0 0 0 0 !important;
}

.btn {
  justify-content: left !important;
  color: white;
}
</style>