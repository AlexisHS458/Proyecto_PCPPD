<template>
  <v-footer app inset color="secondary">
    <v-card class="flex" flat tile color="secondary">
      <v-card-text v-show="showStdin" class="mt-5">
        <v-text-field
          label="Stdin"
          placeholder="Stdin"
          outlined
          background-color="grey"
          v-model.trim="stdinModel"
          @keyup="sendStdin"
        ></v-text-field>
      </v-card-text>

      <v-card-text v-show="status.showTerminal">
        <p class="white--text mb-0">Resultado</p>
        <v-textarea
          no-resize
          solo
          color="white"
          @click.stop="() => {}"
          background-color="black"
          dark
          width="150vh"
          readonly
          :value="responseCompiler"
        ></v-textarea>
      </v-card-text>
      <!--   <v-card-text v-show="showArgs">
        <v-textarea
          solo
          name="input-7-4"
          color="white"
          @click.stop="() => {}"
          background-color="black"
          dark
          width="150vh"
        ></v-textarea>
      </v-card-text>  -->
      <v-card-title>
        <v-icon color="white">mdi-console </v-icon>
        <v-btn depressed text color="white" class="ml-2 text-capitalize" @click="closeInputConsole">
          Consola
        </v-btn>

        <v-divider vertical></v-divider>
        <!--        <v-btn
          depressed
          text
          color="white"
          class="ml-2 mr-2 text-capitalize"
          @click="closeInputArgs"
        >
          Argumentos
        </v-btn> -->
        <v-divider vertical></v-divider>
        <v-btn

          depressed
          text
          color="white"
          class="mr-2 text-capitalize"
          @click="closeInputStdin"

          v-if="currentUser.uid == driverUID"
        >
          Stdin
        </v-btn>
        <v-spacer></v-spacer>
        <strong class="subheading" style="color: white">Línea: {{ line }}</strong>
      </v-card-title>
    </v-card>
  </v-footer>
</template>
<script lang="ts">
import { User } from "@/models/user";
import { Position } from "monaco-editor";
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const User = namespace("UserModule");
import { User } from "@/models/user";
const CodeChannel = namespace("CodeChannelModule");
const User = namespace("UserModule");
@Component
export default class EditCode extends Vue {
  @Prop({
    required: true
  })
  public line!: number;

  @CodeChannel.State("responseCompiler")
  private responseCompiler!: string;

  @CodeChannel.State("status")
  private status!: any;

  @CodeChannel.Action
  private setChangeTerminal!: (state: boolean) => void;

  @CodeChannel.Action
  private setStdin!: (stdin: string) => void;

  @CodeChannel.State("codeFilePath")
  private codeFilePath!: string;

  @CodeChannel.State("driverUID")
  private driverUID!: string | undefined;

  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  public showStdin = false;
  public showArgs = false;
  public showConsole = false;
  public stdinModel = "";

  sendStdin() {
    this.setStdin(this.stdinModel);
  }

  closeInputStdin() {
    this.showStdin = !this.showStdin;
    if (this.showStdin) {
      this.showArgs = false;
      this.setChangeTerminal(false);
      // this.showConsole = false;
    }
  }

  closeInputConsole() {
    this.status.showTerminal = !this.status.showTerminal;
    if (this.showConsole) {
      this.showArgs = false;
      this.showStdin = false;
    }
  }

  closeInputArgs() {
    this.showArgs = !this.showArgs;
    if (this.showArgs) {
      this.setChangeTerminal(false);
      // this.showConsole = false;
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
