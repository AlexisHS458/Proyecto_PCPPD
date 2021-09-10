<template>
  <v-hover>
    <v-list-item slot-scope="{ hover }" @click="toRouterSpace">
      <v-list-item-icon>
        <v-icon color="white">{{ icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="title">
          <!--  <router-link :to="'/space/' + '/' + this.item.uid"> -->

          {{ item.nombre }}
          <!--  </router-link> -->
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu v-model="menu" offset-y>
          <template #activator="{ on }">
            <v-btn text icon v-on="on" :class="{ hidden: !hover && !menu }">
              <v-icon color="white">mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-list color="secondary">
            <v-list-item-content class="justify-center card-list">
              <div class="mx-auto text-right">
                <v-menu open-on-hover bottom offset-x>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      text
                      block
                      class="btn"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="info" class="mr-6">
                        mdi-account-multiple-outline
                      </v-icon>
                      Conceder acceso a
                    </v-btn>
                  </template>
                  <v-list color="secondaryDark">
                    <v-list-item
                      v-for="item in userList"
                      :key="item.text"
                      class="list-title"
                      color="secondaryDark"
                    >
                      <v-checkbox
                        class="black--text"
                        color="infoDark"
                        v-model="model"
                        :label="item.text"
                        :value="item"
                        @click.stop="() => {}"
                      ></v-checkbox>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="dialogRenameChanel"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      text
                      block
                      class="btn"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="info" class="mr-6"> mdi-pencil </v-icon>
                      Renombrar canal
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="secondary" dark>
                      Ingresa el nuevo nombre del canal
                    </v-toolbar>
                    <v-card-text>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row align="center" justify="center" class="mt-6">
                          <v-col cols="9">
                            <v-text-field
                              label="Nuevo nombre del canal"
                              placeholder="Nuevo nombre del canal"
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
                      <v-btn color="success">Aceptar</v-btn>
                      <v-btn text @click="dialogRenameChanel = false"
                        >Cancelar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="dialogDelete"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      text
                      block
                      class="btn"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="error" class="mr-6"> mdi-delete </v-icon>
                      Eliminar
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="error" dark>
                      Solicitud de confirmación
                    </v-toolbar>
                    <v-card-text>
                      <div class="text-h6 pa-5 text-center">
                        <p>¿SEGURO QUE DESEAS ELIMINAR ESTE CANAL?</p>
                        <p>ESTA ACCIÓN NO SE PUEDE DESAHACER</p>
                      </div>
                      <v-row align="center" justify="center">
                        <v-btn color="error"> SI, QUIERO ELIMINARLO </v-btn>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialogDelete = false">Cancelar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-list-item-content>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
  </v-hover>
</template>

<script lang="ts">
import { TextChannel } from "@/models/textChannel";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NameChannels extends Vue {
  public show = false;
  public menu = false;
  public dialog = false;
  public dialogRenameChanel = false;
  public dialogDelete = false;
  public model = [];
  public valid = true;

  @Prop({
    required: true,
  })
  public item!: TextChannel;

  @Prop({
    required: true,
  })
  public icon!: string;

  @Prop({
    required: true,
  })
  public userList!: [];

  @Prop({
    required: true,
  })
  public urll!: string;

  toRouterSpace() {
    console.log("Entro");
    console.log("/space/" + this.urll + "/" + this.item.uid);
    if (this.$route.path != "/space/" + this.urll + "/" + this.item.uid) {
      this.$router.replace("/space/" + this.urll + "/" + this.item.uid);
    }
  }
}
</script>

<style scoped>
.list-title {
  color: white;
}
.hidden {
  visibility: hidden;
}

.v-btn,
.v-btn * {
  /* turn off transitions for hide/show on hover */
  transition: none;
}

.card-list {
  padding: 0 0 0 0 !important;
}

.btn {
  justify-content: left !important;
  color: white;
}

.list-title {
  color: white;
}
.hidden {
  visibility: hidden;
}

.title {
  color: white;
}
.v-list .v-list-item--active .v-icon {
  color: white;
}

.black--text /deep/ label {
  color: white;
}
</style>