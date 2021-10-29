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
              
              class="add flex-shrink-1 flex-grow-0 mx-2"
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
                      prepend-inner-icon="mdi-account-voice"
                      :rules="[rules.required, rules.regexNameChannel]"
                      v-model="nameChannel"
                      @keyup.enter="addChannelVoice"
                      @keydown.esc="closeAddSpace"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="success" :loading="loading" @click="addChannelVoice"
                >Crear</v-btn
              >
              <v-btn text @click="closeAddSpace">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-expansion-panel-header>
      <v-expansion-panel-content color="primaryDark" class="expansion-content">
        <v-list color="primaryDark" shaped>
          <namechannelsvoice
            v-for="channel in channels"
            :key="channel.uid"
            :channel="channel"
            :icon="item.icon"
            :users="users"
            :workspaceUID="workspaceUID"
          ></namechannelsvoice>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import namechannelsvoice from "@/components/modules/Workspace/Channels/Voice/NameChannelsVoice.vue";
import { namespace } from "vuex-class";

import { VForm } from "@/utils/types";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
import { VoiceChannel } from "@/models/voiceChannel";
const WorkspaceOptions = namespace("WorkspaceModule");
const User = namespace("UserModule");
@Component({
  components: {
    namechannelsvoice,
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
  private createVoiceChannel!: (voiceChannel: VoiceChannel) => Promise<void>;

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
  public voiceChannel = {} as VoiceChannel;
  public rules = {
    required: (v: string): string | boolean => !!v || "Campo requerido",
    regexNameChannel: (v: string): string | boolean =>
      /^[_A-z0-9]*((\s)*[_A-z0-9])*$/.test(v) || "Nombre inválido",
  };

  /**
   * Crear nuevo canal de voz
   */
  async addChannelVoice() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.loading = true;
      this.voiceChannel = {
        nombre: this.nameChannel,
        permisos: [],
      };
      await this.createVoiceChannel(this.voiceChannel);
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

  closeAddSpace() {
    this.form.resetValidation();
    this.form.reset();
    this.dialog = false;
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
}
</style>