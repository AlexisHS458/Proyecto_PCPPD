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
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-textarea
        v-model="message"
        append-icon="mdi-send"
        rounded
        class="text-input"
        placeholder="Escribe tu mensaje"
        autocomplete="off"
        outlined
        filled
        dense
        no-resize
        auto-grow
        rows="1"
        row-height="4"
        counter="500"
        :rules="[rules.size, rules.required]"
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
    </v-form>
  </v-flex>
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
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };
  public valid = true;

  /**
   * Mandar mensaje al canal de texto seleccionado
   */
  async sendMessages() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
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
      await this.sendMessage(this.messageModel);
      this.form.reset();
      this.form.resetValidation();
    }
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