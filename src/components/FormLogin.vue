<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-card rounded="lg" height="100%" width="100%">
          <v-row no-gutters>
            <v-col cols="7" class="d-flex align-center">
              <v-card-text align="center">
                <v-img
                  class="img"
                  :src="require('@/assets/logo.png')"
                  height="50%"
                  width="25%"
                />

                <v-row align="center" justify="center" class="mt-15" no-gutters>
                  <v-col cols="2">
                    <v-img
                      class="mt-8"
                      :src="require('@/assets/google.png')"
                      height="30%"
                      width="30%"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-btn color="#F2F2F2" elevation="0" class="mt-8">
                      inicio de sesión
                    </v-btn>
                  </v-col>
                </v-row>
                <p class="mt-12 mb-12" color="primary">Regístrate con google</p>
              </v-card-text>
            </v-col>
            <v-col cols="5">
              <v-img
                :src="require('@/assets/background.jpg')"
                height="600"
                width="100%"
              >
                <p
                  class="text-h4 white--text text-center pa"
                  align="center"
                  justify="center"
                >
                  Bienvenido a <strong>Kun</strong>
                </p>
                <p
                  class="text-h5 white--text text-center"
                  align="center"
                  justify="center"
                >
                  Inicia sesión con tu cuenta de Google
                </p>
              </v-img>
              <!--  <div class="imm">Hola</div> -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style scoped>
.img {
  border-radius: 25px;
}
.imm {
  background: url(../assets/background.jpg);
  width: 100%;
  height: 100%;
}
.pa {
  margin-top: 300px;
}
</style>