<template>
  <v-snackbar v-model="status" :timeout="timeout" :color="color">
    <p v-html="snackText" class="mb-0"></p>
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="method"> Cerrar </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class snackbar extends Vue {
  @Prop({
    required: true,
  })
  public status!: boolean;

  @Prop({
    required: true,
  })
  public timeout!: number;

  @Prop({
    required: true,
  })
  public snackText!: string;

  @Prop({
    required: false,
    type: Function,
    default: () => ({}),
  })
  public method: any;

  @Prop({
    required: false,
  })
  public color!: string;

  mounted() {
    this.color;
  }
}
</script>