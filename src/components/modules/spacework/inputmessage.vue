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
    <v-textarea
      prepend-inner-icon="mdi-paperclip"
      append-icon="mdi-send"
      rounded
      class="text-input my-text-style form-input"
      placeholder="Escribe tu mensaje"
      autocomplete="off"
      auto-grow
      outlined
      filled
      dense
      rows="1"
      row-height="15"
      counter="500"
      :rules="[rules.lenght]"
      @click:append="() => {}"
      @click:prepend-inner="onButtonClick"
      background-color="primaryDark"
    ></v-textarea>
    <input
      ref="uploader"
      class="d-none"
      type="file"
      accept="image/*"
      @change="onFileChanged"
    />
  </v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class InputMessage extends Vue {
  public model = [];
  public imageName = "";
  public imageUrl: any;
  public imageFile = "";
  public isSelecting = false;
  public selectedFile = "";
  public rules = {
    lenght: (v: string): string | boolean =>
      v.length <= 500 || "Haz alcanzado el límite de caracteres",
  };

  onButtonClick() {
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

    // do something
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

.theme--light.v-input input,
.theme--light.v-input textarea {
  color: white;
}
</style>