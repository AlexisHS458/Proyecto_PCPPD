<template>
  <v-text-field
    prepend-inner-icon="mdi-paperclip"
    append-icon="mdi-send"
    placeholder="Escribe tu mensaje"
    filled
    rounded
    light
    dense
    class="text-input my-text-style form-input"
    background-color="primaryDark"
    color="white"
    autocomplete="off"
  ></v-text-field>
</template>

<style scoped>
.text-input {
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  flex: none;
}

.my-text-style >>> .v-text-field__slot input {
  color: white;
}

.v-text-field ::before,
::after {
  color: white;
}

#input-55 {
  color: white;
}

.theme--light.v-input.my-text-style input::placeholder {
  color: green !important;
}
</style>