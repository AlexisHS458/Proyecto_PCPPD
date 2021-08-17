<template>
  <v-container>
    <ul>
      <li v-for="(item, index) in gatos" :key="index">
        {{ item.nombre }}
      </li>
    </ul>
    <v-text-field label="Regular" v-model="textCat"></v-text-field>
    {{ textCat }}
    <v-btn elevation="2" @click="addCat">Agregar gato</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { Gato } from "@/models/gato";
const Gato = namespace("GatoModule");

@Component
export default class List extends Vue {
  public textCat = "";
  public gato = {} as Gato;

  @Gato.Action
  private addGato!: (gato: Gato) => Promise<void>;

  @Gato.State("gatos")
  private gatos!: Gato[];
  mounted() {
    this.gatos;
  }

  addCat() {
    this.gato = {
      nombre: this.textCat,
    };
    this.addGato(this.gato);
  }
}
</script>