<template>
  <div>
    <div v-if="message.isFile">
      <v-hover>
        <div class="discord-message" slot-scope="{ hover }">
          <div class="discord-author-avatar">
            <img :src="message.fotoURL" :alt="message.usuarioNombre" @error="imgError" />
          </div>
          <div class="discord-message-content">
            <div class="div">
              <author-info class="flex-shrink-1 flex-grow-0">
                {{ message.usuarioNombre }}
              </author-info>
              <span class="discord-message-timestamp flex-shrink-0 flex-grow-1">
                {{ formatDate(new Date(message.fecha)) }}
              </span>
              <span class="flex-shrink-1 flex-grow-0" :class="{ hidden: !hover }">
                <v-btn
                  icon
                  color="infoLight"
                  @click.prevent="downloadFile(message.contenido, message.nombreArchivo)"
                >
                  <v-icon small> mdi-cloud-download </v-icon>
                </v-btn>

                <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="errorLight"
                      v-bind="attrs"
                      v-on="on"
                      v-if="
                        message.uid_usuario == currentUser.uid ||
                          workspace.uid_usuario == currentUser.uid
                      "
                    >
                      <v-icon color="error" small> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="error" dark>
                      Solicitud de confirmación
                    </v-toolbar>
                    <v-card-text>
                      <div class="text-h6 pa-5 text-center">
                        <p>¿SEGURO QUE DESEAS ELIMINAR ESTE ARCHIVO?</p>
                        <p>ESTA ACCION NO SE PUEDE DESAHACER</p>
                      </div>
                      <v-row align="center" justify="center">
                        <v-btn color="error" @click="deleteMessages" :loading="loadingDelete">
                          SI, QUIERO ELIMINARLO
                        </v-btn>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog = false">Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </span>
            </div>
            <div class="editable-text wrapper">
              <template v-if="message.contentType.includes('image')">
                <img class="iconImage" v-img :src="message.contenido" />
              </template>
              <template v-else>
                <img class="icon" :src="previewType(message.contentType)" />
                <span class="discord-message-body">{{ message.nombreArchivo }} </span>
                <!-- <v-skeleton-loader
                  v-else
                  type="text"
                  min-height="70"
                  min-width="250"
                ></v-skeleton-loader>-->
              </template>
            </div>
          </div>
        </div>
      </v-hover>
    </div>
    <div v-else>
      <v-hover>
        <div class="discord-message" slot-scope="{ hover }">
          <div class="discord-author-avatar">
            <img :src="message.fotoURL" :alt="message.usuarioNombre" @error="imgError" />
          </div>
          <div class="discord-message-content">
            <div class="div">
              <author-info class="flex-shrink-1 flex-grow-0">
                {{ message.usuarioNombre }}
              </author-info>
              <span class="discord-message-timestamp flex-shrink-0 flex-grow-1">
                {{ formatDate(new Date(message.fecha)) }}
              </span>
              <span class="flex-shrink-1 flex-grow-0" :class="{ hidden: !hover }">
                <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogEdit">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="infoLight"
                      v-bind="attrs"
                      v-on="on"
                      v-if="message.uid_usuario == currentUser.uid"
                    >
                      <v-icon small> mdi-pencil </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="secondary" dark>
                      Editar mensaje
                    </v-toolbar>
                    <v-card-text>
                      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
                        <v-row align="center" justify="center" class="mt-6">
                          <v-col cols="9">
                            <v-textarea
                              v-model.trim="text"
                              label="Mensaje"
                              :placeholder="message.contenido"
                              class="chat-input"
                              outlined
                              dense
                              counter
                              color="primary"
                              prepend-inner-icon="mdi-message"
                              :rules="[rules.required]"
                              @keydown="inputHandler"
                              autocomplete="off"
                              maxlength="500"
                              no-resize
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn color="success" @click="editMessages" :loading="loadingEdit">
                        Guardar cambios
                      </v-btn>
                      <v-btn text @click="closeDialogEdit">Cancelar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="errorLight"
                      v-bind="attrs"
                      v-on="on"
                      v-if="
                        message.uid_usuario == currentUser.uid ||
                          workspace.uid_usuario == currentUser.uid
                      "
                    >
                      <v-icon color="error" small> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="error" dark>
                      Solicitud de confirmación
                    </v-toolbar>
                    <v-card-text>
                      <div class="text-h6 pa-5 text-center">
                        <p>¿SEGURO QUE DESEAS ELIMINAR ESTE MENSAJE?</p>
                        <p>ESTA ACCION NO SE PUEDE DESAHACER</p>
                      </div>
                      <v-row align="center" justify="center">
                        <v-btn color="error" @click="deleteMessages" :loading="loadingDelete">
                          SI, QUIERO ELIMINARLO
                        </v-btn>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog = false">Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </span>
            </div>
            <div class="discord-message-body editable-text">
              {{ message.contenido }}
            </div>
          </div>
        </div>
      </v-hover>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";

import Vue from "vue";
import { namespace } from "vuex-class";
import { Message } from "@/models/message";
import { VForm } from "@/utils/types.js";
import { User } from "@/models/user";
const optionsMessage = namespace("TextChannelModule");
const MyWorkSpace = namespace("WorkspaceModule");
import AuthorInfo from "./AuthorInfo.vue";

/* eslint-disable */
// @ts-ignore
import validators from "@/util/validators.js";
/* eslint-enable */

/* eslint-disable */
// @ts-ignore
import image from "@/assets/userProfile.png";
import { storage } from "@/utils/firebase";
import { Workspace } from "@/models/workspace";
/* eslint-enable */
const now = new Date();

@Component({
  components: {
    AuthorInfo
  }
})
export default class Messages extends Vue {
  @Prop({
    required: false,
    default: "User"
  })
  public author!: string;

  @Prop({
    required: false
  })
  public avatar!: string;

  @Prop({
    required: true
  })
  public currentUser!: User;

  @Prop({
    required: true
  })
  public messages!: Message[];

  @Prop({
    type: [Date, String],
    required: false,
    default: () => now,
    validator: validators.dates.validator
  })
  public timestamp!: string;

  @Prop({
    required: false
  })
  public profile!: string;

  @Prop({
    required: true
  })
  public message!: Message;

  /**
   * Acciones obtenidos del @module Messages
   */
  @optionsMessage.Action
  private editMessage!: (message: Message) => Promise<void>;

  @optionsMessage.Action
  private deleteMessage!: (message: Message) => Promise<void>;

  /**
   * Estado obtenido del @module Messages
   */
  @optionsMessage.State("status")
  private status!: any;

  @MyWorkSpace.State("workspace")
  private workspace!: Workspace;

  @Ref("form") readonly form!: VForm;

  public dialog = false;
  public dialogEdit = false;
  public text = "";
  public loadingEdit = false;
  public loadingDelete = false;
  public valid = false;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido"
  };

  /**
   * Editar mensaje
   */
  async editMessages() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      if (this.text && this.text.length > 0) {
        this.loadingEdit = true;
        this.message.contenido = this.text;
        await this.editMessage(this.message);
        if (this.status.showSnackbar && !this.status.showSnackbarError) {
          this.loadingEdit = false;
          this.form.reset();
          this.dialogEdit = false;
        } else {
          this.loadingEdit = false;
          this.form.reset();
          this.dialogEdit = false;
        }
      }
    }
  }

  /**
   * Eliminar mensaje
   */
  async deleteMessages() {
    this.loadingDelete = true;
    await this.deleteMessage(this.message);
    if (this.status.showSnackbar && !this.status.showSnackbarError) {
      this.loadingDelete = false;
      this.dialog = false;
    } else {
      this.loadingDelete = false;
      this.dialog = false;
    }
  }

  async downloadFile(url: string, name: string) {
    const resumeRef = storage.refFromURL(url);
    resumeRef
      .getDownloadURL()
      .then(url => {
        // `url` is the download URL

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function() {
          const blob = xhr.response;
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = name;
          link.click();
          URL.revokeObjectURL(link.href);
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch(error => {
        // Handle any errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;

          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
          default:
            break;
        }
      });
  }

  /**
   * Cerrar dialog y resetear el formulario
   */
  closeDialogEdit() {
    this.form.resetValidation();
    this.form.reset();
    this.dialogEdit = false;
  }

  formatDate(value: any) {
    if (!(value instanceof Date)) return value;
    return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
  }
  padZeroes(value: any) {
    const [month, day, year] = value.split("/");
    return `${month.padStart(2, 0)}/${day.padStart(2, 0)}/${year}`;
  }

  imgError(e: any) {
    e.target.src = image;
  }

  inputHandler(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.editMessages();
    }
  }

  previewType(type: string): string {
    let preview = "";
    if (type.includes("image")) {
      preview = "image";
    } else if (type.includes("audio")) {
      preview = require("@/assets/audioFile.svg");
    } else if (type.includes("video")) {
      preview = require("@/assets/videoFile.svg");
    } else if (type.includes("application/pdf")) {
      preview = require("@/assets/pdfFile.svg");
    } else if (type.includes("application/octet-stream")) {
      preview = require("@/assets/codeFile.svg");
    } else if (
      type.includes("application/zip") ||
      type.includes("application/x-rar-compressed") ||
      type.includes("application/x-zip-compressed")
    ) {
      preview = require("@/assets/zipFile.svg");
    } else if (type.includes("application/pdf")) {
      preview = require("@/assets/codeFile.svg");
    } else {
      preview = require("@/assets/docFile.svg");
    }

    return preview;
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto Mono");

.discord-message {
  color: #dcddde;
  display: flex;
  font-size: 0.9em;
  margin: 1em 0;
  padding: 0.25em 1em 0;
}

.discord-message:hover {
  background-color: #46606f;
}

.discord-light-theme .discord-message {
  color: #2e3338;
}

.discord-light-theme .discord-message:hover {
  background-color: #fafafa;
}

.discord-message a {
  color: #0096cf;
  font-weight: normal;
  text-decoration: none;
}

.discord-message a:hover {
  text-decoration: underline;
}

.discord-light-theme .discord-message a {
  color: #00b0f4;
}

.discord-message .discord-author-avatar {
  margin-top: 1px;
  margin-right: 16px;
  min-width: 40px;
}

.discord-message .discord-author-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.discord-message .discord-message-timestamp {
  color: #72767d;
  font-size: 12px;
  margin-left: 3px;
  align-items: center;
  display: inline-flex;
}

.discord-message .discord-message-edited {
  color: #72767d;
  font-size: 10px;
}

.discord-message .discord-message-content {
  width: 100%;
  line-height: 160%;
  font-weight: normal;
  overflow-wrap: anywhere;
}

.discord-message .discord-message-body {
  position: relative;
  white-space: pre-wrap;
  font-family: "Roboto Mono";
}

.discord-light-theme .discord-message .discord-message-timestamp,
.discord-compact-mode .discord-message:hover .discord-message-timestamp,
.discord-compact-mode.discord-light-theme .discord-message:hover .discord-message-timestamp {
  color: #99aab5;
}

.discord-compact-mode.discord-light-theme .discord-message .discord-message-timestamp {
  color: #d1d9de;
}

.discord-compact-mode .discord-message {
  margin: 0.15em 0;
  padding-left: 0.25em;
  padding-right: 0.25em;
}

.discord-compact-mode .discord-author-avatar {
  display: none;
  align-items: center;
  display: inline-flex;
}

.discord-compact-mode .discord-message-body {
  margin-left: 0.25em;
}

.div {
  display: flex;
  flex-direction: row;
}
.hidden {
  visibility: hidden;
}

.icon {
  margin-right: 12px;
  height: 40px;
  width: 40px;
}

.iconImage {
  width: 50%;
}

.text {
  margin: 10px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
}

.wrapper {
  display: flex;
  flex-direction: row;
  //  align-items: center;
}

.chat-input::v-deep {
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
</style>
