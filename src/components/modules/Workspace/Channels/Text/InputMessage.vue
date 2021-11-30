<template>
  <div>
    <div v-if="!file">
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
        >
          <template v-slot:prepend-inner>
            <!--   <v-file-input
              class="v-text-field"
              hide-input
              @change="onFileChanged($event)"
              dense
            ></v-file-input>-->
            <label for="fileInput">
              <v-icon id="icon">mdi-paperclip</v-icon>
            </label>
            <input id="fileInput" type="file" @change="onFileChanged" />
          </template>
        </v-textarea>
      </v-form>
    </div>
    <div v-else>
      <v-file-input
        dark
        rounded
        filled
        dense
        outlined
        v-model="file"
        append-icon="mdi-send"
        class="chat-input"
        show-size
        counter
        @click:append="uploadFileInput"
        :loading="isSelecting"
      ></v-file-input>
    </div>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialog"
      persistent
    >
      <v-card>
        <v-toolbar color="error" dark class="d-flex justify-center">
          <v-toolbar-title class="flex text-center">!AVISO!</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="text-h6 pa-5 text-center">
            <p>Lo sentimos. El tamaño del archivo debe ser menor a 5 MB.</p>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialogNoSize"
      persistent
    >
      <v-card>
        <v-toolbar color="error" dark class="d-flex justify-center">
          <v-toolbar-title class="flex text-center">¡AVISO!</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="text-h6 pa-5 text-center">
            <p>{{ messageAlert }}</p>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialogNoSize = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { Message } from "@/models/message";
import { namespace } from "vuex-class";
import { Workspace } from "@/models/workspace";
import { User } from "@/models/user";
import { VForm } from "@/utils/types";
import { storage } from "@/utils/firebase";
import { Maybe } from "graphql/jsutils/Maybe";
const Message = namespace("TextChannelModule");
import MessageService from "@/services/message.service";
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
  public file: Maybe<File> = null;
  public imageURL = null;
  public fileURL = "";
  public dialog = false;
  public dialogNoSize = false;
  public messageAlert = "";

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
        isFile: false,
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

  onFileChanged(e: any) {
    this.file = e.target.files[0];
  }

  async uploadFileInput() {
    console.log(this.file);

    this.isSelecting = true;
    if (this.file!.size < 5000000) {
      this.messageModel = {
        fotoURL: this.currentUser.fotoURL,
        uid_usuario: this.currentUser.uid!,
        usuarioNombre:
          this.currentUser.nombre + " " + this.currentUser.apellido,
        contenido: "",
        fecha: Date.now(),
        isFile: true,
        nombreArchivo: "",
        contentType: "",
      };

      MessageService.sendMessageFile(
        this.$route.params.id,
        this.$route.params.idChannel,
        this.messageModel,
        this.file!
      ).catch((e: Error) => {
        this.dialogNoSize = true;
        this.messageAlert = e.message;
      });
      this.isSelecting = false;
      this.file = null;
    } else {
      this.dialog = true;
      this.isSelecting = false;
      this.file = null;
    }
  }

  destroyed() {
    this.message = "";
  }
}
</script>

<style scoped lang="scss">
.v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}

.xd {
  margin-top: 5px;
}
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

#fileInput {
  display: none;
}
#icon {
  cursor: pointer;
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
