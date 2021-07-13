<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card rounded="lg" height="100%" width="100%">
          <v-row no-gutters>
            <v-col cols="7" class="arrow">
              <v-btn class="ma-2" text icon to="/dashboard">
                <v-icon large> mdi-arrow-left </v-icon>
              </v-btn>
            </v-col>
            <v-col class="d-flex align-center">
              <v-card-text align="center">
                <v-img
                  class="img mb-12"
                  :src="require('@/assets/logo.png')"
                  height="50%"
                  width="25%"
                />
                <v-col cols="8">
                  <v-text-field
                    label="Nombre"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account "
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Apellidos"
                    outlined
                    dense
                    color="primary"
                    class="hola"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Boleta o Número de empleado"
                    outlined
                    dense
                    color="primary"
                    prepend-inner-icon="mdi-credit-card-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-btn color="primary" class="white--text" block>
                    Editar Información
                  </v-btn>
                </v-col>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<style scoped >
.img {
  border-radius: 25px;
}
.pa {
  margin-top: 300px;
}
.arrow {
  position: absolute;
}
</style>