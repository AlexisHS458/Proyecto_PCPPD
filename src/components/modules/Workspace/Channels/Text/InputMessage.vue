<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
    <v-textarea
      no-resize
      dark
      rows="1"
      auto-grow
      rounded
      filled
      dense
      outlined
      autocomplete="off"
      maxlength="500"
      counter
      background-color="primaryDark"
      placeholder="Escribe tu mensaje"
      v-model.trim="message"
      append-icon="mdi-send"
      class="chat-input"
      @keydown="inputHandler"
      @click:append="sendMessages"
    ></v-textarea>
    <!--    <input
      ref="uploader"
      class="d-none"
      type="file"
      accept="image/*"
      @change="onFileChanged"
    /> -->
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { Message } from "@/models/message";
import { namespace } from "vuex-class";
import { Workspace } from "@/models/workspace";
import { User } from "@/models/user";
import { VForm } from "@/utils/types";
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
  public currentUser!: User;

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

  /**
   * Acciones obtenidas del @module Messages
   */
  @Message.Action
  private sendMessage!: (message: Message) => Promise<void>;

  @Message.Action
  setTextChannelIDtoModule!: (id: string) => void;

  @Message.Action
  setWorkspaceIDtoModule!: (id: string) => void;

  /**
   * Getter obtenido del @module Messages
   */
  @Message.Getter
  private isLoadingMessages!: boolean;

  @Ref("form") readonly form!: VForm;

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
  public valid = true;

  /**
   * Mandar mensaje al canal de texto seleccionado
   */
  async sendMessages() {
    if (
      this.message &&
      this.message.length > 0 /* &&
      !/^\s*$/.test(this.message) */
    ) {
      this.messageModel = {
        fotoURL: this.currentUser.fotoURL,
        uid_usuario: this.currentUser.uid!,
        usuarioNombre:
          this.currentUser.nombre + " " + this.currentUser.apellido,
        contenido: this.message,
        fecha: Date.now(),
      };
      this.setTextChannelIDtoModule(this.$route.params.id);
      this.setWorkspaceIDtoModule(this.$route.params.idChannel);
      this.form.reset();
      this.form.resetValidation();
      await this.sendMessage(this.messageModel);
    }
  }

  inputHandler(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.sendMessages();
    }
  }

  /*   preventEnter(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      return false;
    }
  } */
}
</script>

<style scoped lang="scss">
.text-input {
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  /*   flex: none; */
  max-height: 115px;
  overflow-y: auto;
}

.chat-input::v-deep {
  textarea {
    max-height: 7rem;
    overflow: auto;
    margin-bottom: 6px;
  }
  textarea::-webkit-scrollbar {
    width: 5px;
    margin-right: 200px;
  }
  textarea::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: #3e527e;
    border-radius: 10px;
  }
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

/* .theme--light.v-input textarea {
  color: red;
} */
</style>