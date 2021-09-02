<template>
  <v-app-bar color="primaryDark" flat dense class="toolbar">
    <v-icon color="white" class="pr-4">mdi-account-multiple-outline</v-icon>
    <v-toolbar-title> Lista de usuarios </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon>
          <v-icon color="white" v-bind="attrs" v-on="on">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar color="secondary" dark>
          Ingresa la boleta o el nombre del usuario a invitar
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row align="center" justify="center" class="mt-6">
              <v-col cols="9">
                <v-text-field
                  label="Boleta o nombre de usuario"
                  placeholder="Boleta o nombre de usuario"
                  outlined
                  dense
                  color="primary"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="success">Invitar</v-btn>
          <v-btn text>Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { VForm } from "@/utils/types.js";
import { namespace } from "vuex-class";
import Vue from "vue";

@Component
export default class ToolbarUsers extends Vue {
  @Ref("form") readonly form!: VForm;
  public show = false;
  public dialog = false;
  public valid = true;
}
</script>


<style scoped>
.toolbar {
  flex: none;
}
.v-toolbar__title {
  color: white;
}
</style>
