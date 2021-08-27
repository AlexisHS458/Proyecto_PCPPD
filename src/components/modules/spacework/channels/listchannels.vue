<template>
  <v-expansion-panels v-model="panel" class="expansion-panels">
    <v-expansion-panel>
      <v-expansion-panel-header color="primaryDark" class="title">
        <template v-slot:actions>
          <v-icon color="white" class="icon"> $expand </v-icon>
        </template>

        <span class="header"> {{ item.title }}</span>
        <v-dialog
          transition="dialog-top-transition"
          max-width="600"
          v-model="dialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click.stop="() => {}"
              class="add mx-2"
              icon
              color="white"
              small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-toolbar color="secondary" dark>
              Crear nuevo canal de {{ item.text }}
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row align="center" justify="center" class="mt-6">
                  <v-col cols="9">
                    <v-text-field
                      label="Nombre del canal"
                      placeholder="Nombre del canal"
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
              <v-btn color="success">Crear</v-btn>
              <v-btn text>Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-expansion-panel-header>
      <v-expansion-panel-content color="primaryDark" class="expansion-content">
        <v-list color="primaryDark">
          <namechannels
            v-for="child in item.items"
            :key="child.title"
            :item="child"
            :icon="item.icon"
            :userList="user"
          ></namechannels>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import namechannels from "@/components/modules/spacework/channels/namechannels.vue";
@Component({
  components: {
    namechannels,
  },
})
export default class ListChannels extends Vue {
  @Prop({
    required: true,
  })
  public item!: [];

  @Prop({
    required: true,
  })
  public user!: [];

  public panel = [0, 1];
  public show = false;
  public dialog = false;
  public valid = true;
}
</script>

<style scoped>
.list-title {
  color: white;
}
.hidden {
  visibility: hidden;
}
.hola {
  background-color: #000029;
  color: white;
}
.title {
  color: white;
}
.v-list .v-list-item--active .v-icon {
  color: white;
}

.expansion-panels {
  z-index: auto;
  border-radius: 0px;
}

.expansion-content {
  padding-bottom: 0px;
  flex: 1 1 auto;
  max-width: 100%;
}

.v-expansion-panel-content__wrap {
  padding-bottom: 0px !important;
}

.icon {
  order: 0;
}

.header {
  order: 1;
}

.add {
  order: 2;
}
</style>