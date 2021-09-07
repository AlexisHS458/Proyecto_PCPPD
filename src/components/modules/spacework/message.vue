<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="title">
        <v-row>
          <v-col class="flex-grow-1 flex-shrink-1">
            {{ messages.usuarioNombre }}</v-col
          >
          <v-col class="flex-grow-0 flex-shrink-0">
            <div class="grey--text">{{ messages.fecha }}</div>
          </v-col>
          <v-col class="flex-grow-0 flex-shrink-1">
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
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row align="center" justify="center" class="mt-6">
                      <v-col cols="9">
                        <v-text-field
                          label="Mensaje"
                          :placeholder="messages.subtitle"
                          outlined
                          dense
                          color="primary"
                          prepend-inner-icon="mdi-account"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn color="success">Guardar cambios</v-btn>
                  <v-btn text>Cancelar</v-btn>
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
                    <v-btn color="error"> SI, QUIERO ELIMINARLO </v-btn>
                  </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-list-item-title>
      <v-list-item-subtitle
        v-html="messages.contenido"
        class="subtitle"
      ></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>



<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";

import Vue from "vue";

@Component
export default class Messages extends Vue {
  public dialog = false;
  public dialogEdit = false;

  @Prop({
    required: true,
  })
  public messages!: [];
}
</script>

<style scoped>
.hola {
  background-color: #0c2a52;
  color: white;
  max-height: 100vh;
  overflow-x: auto;
}

.holaa {
  z-index: 2;
}

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