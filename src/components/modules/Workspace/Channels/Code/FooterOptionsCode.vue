<template>
  <v-footer app inset color="secondary">
    <v-card class="flex" flat tile color="secondary">
      <v-card-text v-show="showStdin" class="mt-5">
        <v-text-field
          label="Outlined"
          placeholder="Stdin"
          outlined
          background-color="grey"
        ></v-text-field>
      </v-card-text>

      <v-card-text v-show="showConsole">
        <p class="white--text mb-0">Resultado</p>
        <v-textarea
          no-resize
          solo
          color="white"
          @click.stop="() => {}"
          background-color="black"
          dark
          width="150vh"
        ></v-textarea>
      </v-card-text>
      <v-card-text v-show="showArgs">
        <v-textarea
          solo
          name="input-7-4"
          color="white"
          @click.stop="() => {}"
          background-color="black"
          dark
          width="150vh"
        ></v-textarea>
      </v-card-text>
      <v-card-title>
        <v-icon color="white">mdi-console </v-icon>
        <v-btn
          depressed
          text
          color="white"
          class="ml-2 text-capitalize"
          @click="closeInputConsole"
        >
          Consola
        </v-btn>

        <v-divider vertical></v-divider>
        <v-btn
          depressed
          text
          color="white"
          class="ml-2 mr-2 text-capitalize"
          @click="closeInputArgs"
        >
          Argumentos
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn
          depressed
          text
          color="white"
          class="mr-2 text-capitalize"
          @click="closeInputStdin"
        >
          Stdin
        </v-btn>
        <v-spacer></v-spacer>
        <strong class="subheading" style="color: white">Línea: 24</strong>
      </v-card-title>
    </v-card>
  </v-footer>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditCode extends Vue {
  public showStdin = false;
  public showArgs = false;
  public showConsole = false;

  closeInputStdin() {
    this.showStdin = !this.showStdin;
    if (this.showStdin) {
      this.showArgs = false;
      this.showConsole = false;
    }
  }
  closeInputConsole() {
    this.showConsole = !this.showConsole;
    if (this.showConsole) {
      this.showArgs = false;
      this.showStdin = false;
    }
  }

  closeInputArgs() {
    this.showArgs = !this.showArgs;
    if (this.showArgs) {
      this.showConsole = false;
      this.showStdin = false;
    }
  }
}
</script>

<style scoped>

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0px;
}

.v-text-field fieldset,
.v-text-field .v-input__control,
.v-text-field .v-input__slot {
  border-radius: 10px;
}
</style>