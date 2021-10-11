<template>
  <v-expansion-panels v-model="panel" class="expansion-panels" multiple dark>
    <v-expansion-panel>
      <v-expansion-panel-header
        color="primaryDark"
        class="title d-flex flex-row"
      >
        <template v-slot:actions>
          <v-icon
            color="white"
            class="icon mr-2 flex-shrink-1 flex-grow-0 mb-1"
          >
            $expand
          </v-icon>
        </template>

        <span class="header font-weight-bold flex-shrink-0 flex-grow-1">
          {{ item.title }}</span
        >
        <v-dialog
          v-if="workspace.uid_usuario == currentUser.uid"
          transition="dialog-top-transition"
          max-width="600"
          v-model="dialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="channels.length < 2"
              class="add flex-shrink-1 flex-grow-0 mx-2"
              icon
              color="white"
              small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-bind="attrs" v-on="on"> mdi-plus </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-toolbar color="secondary" dark>
              Crear nuevo canal de {{ item.text }}
            </v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent
              >
                <v-row align="center" justify="center" class="mt-6">
                  <v-col cols="9">
                    <v-text-field
                      label="Nombre del canal"
                      placeholder="Nombre del canal"
                      outlined
                      dense
                      color="primary"
                      prepend-inner-icon="mdi-forum"
                      :rules="[rules.required]"
                      v-model="nameChannel"
                      @keyup.enter="addChannelText"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="success" :loading="loading" @click="addChannelText"
                >Crear</v-btn
              >
              <v-btn text @click="dialog = false">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-expansion-panel-header>
      <v-expansion-panel-content color="primaryDark" class="expansion-content">
        <v-list color="primaryDark" shaped>
          <namechannels
            v-for="(channel, index) in channels"
            :key="index"
            :channel="channel"
            :icon="item.icon"
            :users="users"
            :workspaceUID="workspaceUID"
          ></namechannels>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import namechannels from "@/components/modules/Workspace/Channels/NameChannels.vue";
import { namespace } from "vuex-class";
import { TextChannel } from "@/models/textChannel";
import { VForm } from "@/utils/types";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
const WorkspaceOptions = namespace("WorkspaceModule");
const User = namespace("UserModule");
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
  public users!: User[];

  @Prop({
    required: false,
  })
  public channels!: [];

  @Prop({
    required: false,
  })
  public workspaceUID!: string;

  @Prop({
    required: false,
  })
  public workspaceChannels!: any;

  /**
   * Accion obtenida del @module Workspace
   */
  @WorkspaceOptions.Action
  private createTextChannel!: (textChannel: TextChannel) => Promise<void>;

  @WorkspaceOptions.State("status")
  private status!: any;

  /**
   * Estado obtenido del @module Workspace
   */
  @WorkspaceOptions.State("workspace")
  private workspace!: Workspace;

  /**
   * Getter obtenido del @module Workspace
   */
  @WorkspaceOptions.Getter
  private isChannelCreated!: boolean;

  @User.State("user")
  private currentUser!: User;

  @Ref("form") readonly form!: VForm;

  public panel = [0];
  public dialog = false;
  public loading = false;
  public valid = true;
  public nameChannel = "";
  public textChannel = {} as TextChannel;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
  };

  /**
   * Crear nuevo canal de texto
   */
  async addChannelText() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loading = true;
      this.textChannel = {
        nombre: this.nameChannel,
        permisos: [],
      };
   
      await this.createTextChannel(this.textChannel);
      if (this.status.showSnackbar && !this.status.showSnackbarError) {
        this.loading = false;
        this.form.reset();
        this.dialog = false;
      } else {
        this.loading = false;
        this.form.reset();
        this.dialog = false;
      }
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
  font-size: 1.13rem !important;
}

.add {
  order: 2;
  width: 24px;
  height: 24px;
}
</style>