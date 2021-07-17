<template>
  <v-col cols="4">
    <v-card>
      <v-card-title> TT-II </v-card-title>
      <v-card-subtitle>Trabajo Terminal II</v-card-subtitle>
      <v-card-actions>
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

          <v-card-text>
            <v-row align="center" justify="space-around">
              <v-btn color="success">
                Aceptar
                <v-icon class="ml-6"> mdi-check </v-icon>
              </v-btn>
              <v-btn color="error">
                Rechazar <v-icon class="ml-6"> mdi-close </v-icon>
              </v-btn>
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
.v-card__title {
  height: 150px !important;
  background-color: #ffffff !important;
  font-size: 2.5rem !important;
  justify-content: center !important;
}

.v-card__subtitle {
  background-color: #0c2a52;
  font-size: 1rem !important;
  justify-content: center !important;
  color: #ffffff;
}

.v-card__actions {
  background-color: #0c2a52;
}

.v-card__text {
  width: 100%;
  height: 60px;
  align-items: center;
  display: flex;
}

.theme--light.v-card > .v-card__text,
.theme--light.v-card > .v-card__subtitle {
  color: #ffffff;
}

.v-card__title + .v-card__subtitle,
.v-card__title + .v-card__text {
  padding-top: 16px;
  padding-bottom: 0px;
}
</style>