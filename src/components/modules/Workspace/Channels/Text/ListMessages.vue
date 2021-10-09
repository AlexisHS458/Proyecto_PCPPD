<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="title">
        <v-row>
          <v-col class="flex-grow-1 flex-shrink-1">
            {{ message.usuarioNombre }}</v-col
          >
          <v-col class="flex-grow-0 flex-shrink-0">
            <div class="grey--text">
              {{ toLocalDate(message.fecha) }}
            </div>
          </v-col>
          <v-col
            v-if="message.uid_usuario == currentUser.uid"
            class="flex-grow-0 flex-shrink-1"
          >
            <v-dialog
              transition="dialog-top-transition"
              max-width="600"
              v-model="dialogEdit"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="infoLight" v-bind="attrs" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-toolbar color="secondary" dark> Editar mensaje </v-toolbar>
                <v-card-text>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent
                  >
                    <v-row align="center" justify="center" class="mt-6">
                      <v-col cols="9">
                        <v-text-field
                          v-model="text"
                          label="Mensaje"
                          :placeholder="message.contenido"
                          outlined
                          dense
                          color="primary"
                          prepend-inner-icon="mdi-message"
                          :rules="[rules.required]"
                          @keyup.enter="editMessages"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    color="success"
                    @click="editMessages"
                    :loading="loadingEdit"
                  >
                    Guardar cambios
                  </v-btn>
                  <v-btn text @click="closeDialogEdit">Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              transition="dialog-top-transition"
              max-width="600"
              v-model="dialog"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="errorLight" v-bind="attrs" v-on="on">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-toolbar color="error" dark>
                  Solicitud de confirmación
                </v-toolbar>
                <v-card-text>
                  <div class="text-h6 pa-5 text-center">
                    <p>¿SEGURO QUE DESEAS ELIMINAR ESTE Mnesaje?</p>
                    <p>ESTA ACCION NO SE PUEDE DESAHACER</p>
                  </div>
                  <v-row align="center" justify="center">
                    <v-btn
                      color="error"
                      @click="deleteMessages"
                      :loading="loadingDelete"
                    >
                      SI, QUIERO ELIMINARLO
                    </v-btn>
                  </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog = false">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-list-item-title>
      <v-list-item-subtitle class="subtitle">
        {{ message.contenido }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>



<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import Vue from "vue";
import { namespace } from "vuex-class";
import { Message } from "@/models/message";
import { VForm } from "@/utils/types.js";
import { User } from "@/models/user";
const optionsMessage = namespace("TextChannelModule");

@Component
export default class Messages extends Vue {
  @Prop({
    required: true,
  })
  public message!: Message;

  @Prop({
    required: true,
  })
  public currentUser!: User;

  /**
   * Acciones obtenidos del @module Messages
   */
  @optionsMessage.Action
  private editMessage!: (message: Message) => Promise<void>;

  @optionsMessage.Action
  private deleteMessage!: (id: string | undefined) => Promise<void>;

  /**
   * Estado obtenido del @module Messages
   */
  @optionsMessage.State("status")
  private status!: any;

  @Ref("form") readonly form!: VForm;

  public dialog = false;
  public dialogEdit = false;
  public text = "";
  public loadingEdit = false;
  public loadingDelete = false;
  public valid = false;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  /**
   * Cambiar fecha a un formato local
   */
  toLocalDate(date: number): string {
    return new Date(date).toLocaleString();
  }

  /**
   * Editar mensaje
   */
  async editMessages() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
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

  /**
   * Eliminar mensaje
   */
  async deleteMessages() {
    this.loadingDelete = true;
    await this.deleteMessage(this.message.uid);
    if (this.status.showSnackbar && !this.status.showSnackbarError) {
      this.loadingDelete = false;
      this.dialog = false;
    } else {
      this.loadingDelete = false;
      this.dialog = false;
    }
  }

  /**
   * Cerrar dialog y resetear el formulario
   */
  closeDialogEdit() {
    this.form.resetValidation();
    this.form.reset();
    this.dialogEdit = false;
  }
}
</script>

<style scoped>
.v-list-item__subtitle {
  color: #e0e0e0;
}

.title {
  color: #a6e6db;
  padding-bottom: 10px;
}

.theme--light.v-list-item .v-list-item__subtitle,
.theme--light.v-list-item .v-list-item__action-text {
  /* color: rgba(0, 0, 0, 0.6); */
  color: rgb(255, 255, 255);
}

.body::-webkit-scrollbar {
  width: 5px;
}
.body::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.body::-webkit-scrollbar-thumb {
  background-color: #11171a;
  border-radius: 10px;
}

.v-list--three-line .v-list-item .v-list-item__subtitle,
.v-list-item--three-line .v-list-item__subtitle {
  white-space: initial;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: contents;
}
</style>