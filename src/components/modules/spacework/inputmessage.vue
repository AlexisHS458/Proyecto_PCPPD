<template>
  <!--   <v-text-field
    prepend-inner-icon="mdi-paperclip"
    append-icon="mdi-send"
    placeholder="Escribe tu mensaje"
    filled
    rounded
    light
    dense
    counter="500"
    class="text-input my-text-style form-input"
    background-color="primaryDark"
    color="white"
    autocomplete="off"
    :rules="[rules.lenght]"
  ></v-text-field> -->
  <v-flex>
    <v-textarea
      v-model="message"
      append-icon="mdi-send"
      rounded
      class="text-input"
      placeholder="Escribe tu mensaje"
      autocomplete="off"
      auto-grow
      outlined
      filled
      dense
      rows="1"
      row-height="15"
      counter="500"
      :rules="[rules.size]"
      @click:append="sendMessages"
      background-color="primaryDark"
      dark
    >
      <template v-slot:prepend-inner>
        <v-file-input accept="image/*" hide-input></v-file-input>
      </template>
    </v-textarea>
    <!--    <input
      ref="uploader"
      class="d-none"
      type="file"
      accept="image/*"
      @change="onFileChanged"
    /> -->
  </v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Message } from "@/models/message";
import { namespace } from "vuex-class";
import { Workspace } from "@/models/workspace";
import { User } from "@/models/user";
const Message = namespace("TextChannelModule");

@Component
export default class InputMessage extends Vue {
  @Prop({
    required: true,
  })
  public workspace!: Workspace;

  @Prop({
    required: true,
  })
  public user!: User;

  public messageModel = {} as Message;
  public message = "";
  public model = [];
  public imageName = "";
  public imageUrl: any;
  public imageFile = "";
  public isSelecting = false;
  public selectedFile = "";
  public rules = {
    size: (v: string): string | boolean =>
      v.length <= 500 || "Haz alcanzado el límite de caracteres",
  };

  /*   onButtonClick() {
    this.isSelecting = true;
    window.addEventListener(
      "focus",
      () => {
        this.isSelecting = false;
      },
      { once: true }
    );
    (this.$refs.uploader as HTMLElement).click();
  }

  onFileChanged(e: any) {
    this.selectedFile = e.target.files[0];
  } */

  @Message.Action
  private sendMessage!: (message: Message) => Promise<void>;

  @Message.Getter
  private isLoadingMessages!: boolean;

  @Message.Action
  setTextChannelIDtoModule!: (id: string) => void;

  @Message.Action
  setWorkspaceIDtoModule!: (id: string) => void;

  async sendMessages() {
    console.log(this.user);
    this.messageModel = {
      uid_usuario: this.user.uid,
      usuarioNombre: this.user.nombre + " " + this.user.apellido,
      contenido: this.message,
      fecha: new Date().toLocaleString(),
    };
    console.log(this.messageModel);
    this.setTextChannelIDtoModule(this.$route.params.id);
    this.setWorkspaceIDtoModule(this.$route.params.idChannel);
    await this.sendMessage(this.messageModel);
  }

  mounted() {
    console.log(this.$route.params.id);
    console.log(this.$route.params.idChannel);
  }
}
</script>

<style scoped>
.text-input {
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  flex: none;
}

/* .my-text-style >>> .v-text-field__slot input {
  color: white;
}

.v-text-field ::before,
::after {
  color: white;
} */

/* #input-55 {
  color: white;
} */

/* .theme--light.v-input.my-text-style input::placeholder {
  color: green !important;
}

.theme--light.v-input input,
.theme--light.v-input textarea {
  color: white;
} */

.theme--light.v-input textarea {
  /* color: red; */
}
</style>