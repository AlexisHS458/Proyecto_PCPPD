<template>
  <v-col cols="4">
    <v-card>
      <v-card-title class="card-title"> TT-I </v-card-title>
      <v-card-subtitle class="card-subtitle"
        >Trabajo Terminal I</v-card-subtitle
      >
      <v-card-actions class="card-actions">
        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon color="white">{{
            show ? "mdi-chevron-up" : "mdi-chevron-down"
          }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show" color="primary">
          <v-divider></v-divider>
          <v-card-text class="card-text">
            <v-row align="center" justify="center">
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="error" text v-bind="attrs" v-on="on">
                    Abandonar espacio de trabajo
                    <v-icon color="error" class="ml-6"> mdi-arrow-left </v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="error" dark>
                      Solicitud de confirmación
                    </v-toolbar>
                    <v-card-text>
                      <div class="text-h6 pa-4 text-center">
                        <p>
                          ¿SEGURO QUE QUIERES ABANDONAR ESTE ESPACIO DE TRABAJO?
                        </p>
                        <p>YA NO TENDRÁS ACCESO A NINGUNO DE LOS CANALES.</p>
                      </div>
                      <v-row align="center" justify="center">
                        <v-btn color="error"> SI, QUIERO ABANDONARLO </v-btn>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Cancelar</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-row>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

 <script >
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    show: false,
    user: null,
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

.card-text {
  width: 100%;
  height: 60px;
  align-items: center;
  display: flex;
}
</style>