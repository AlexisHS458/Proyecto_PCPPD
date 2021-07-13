<template>
  <v-col cols="4">
    <v-dialog transition="dialog-top-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-card v-bind="attrs" v-on="on">
          <v-card-title class="card-title"> + </v-card-title>
          <v-card-subtitle class="card-subtitle">
            Crear tu espacio de trabajo
          </v-card-subtitle>
          <v-card-actions class="card-actions"> </v-card-actions>
        </v-card>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            Crea tu espacio de trabajo
          </v-toolbar>
          <v-card-text>
            <v-row align="center" justify="center" class="mt-6">
              <v-col cols="9">
                <v-text-field
                  label="Ingresa el nombre del espacio de trabajo"
                  outlined
                  dense
                  color="primary"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="success">Aceptar</v-btn>
            <v-btn text @click="dialog.value = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>

 <script >
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    show: false,
    user: null,
    dialog: false,
    items: [{ title: "Aplicaciones para la comunicación" }],
  }),
});
</script>

<style scoped>
.card-title {
  height: 150px !important;
  background-color: #ffffff !important;
  font-size: 2.5rem !important;
  justify-content: center !important;
}

.card-subtitle {
  background-color: #0c2a52;
  font-size: 1rem !important;
  justify-content: center !important;
  color: #ffffff !important;
  padding-top: 16px !important;
  padding-bottom: 0px !important;
}

.card-actions {
  background-color: #0c2a52;
}

/* .card-text {
  width: 100%;
  height: 60px;
  align-items: center;
  display: flex;
} */
</style>