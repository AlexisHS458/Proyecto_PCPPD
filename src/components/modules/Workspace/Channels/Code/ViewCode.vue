<template>
  <div>
    <app-bar-options
      :nameChannel="nameCodeChannel"
      :color="'secondaryLight'"
    ></app-bar-options>
    <edit-code
      :idChannelCode="idChannelCode"
      v-if="codeFilePath != ''"
    ></edit-code>
    <not-code v-else></not-code>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import EditCode from "@/components/modules/Workspace/Channels/Code/EditCode.vue";
import NotCode from "@/components/modules/Workspace/Channels/Code/NotCode.vue";
import AppBarOptions from "@/components/modules/Workspace/Channels/Code/AppBarOptions.vue";
import { namespace } from "vuex-class";
import { ChannelType } from "@/utils/channels_types";
import ServiceChannels from "@/services/channels.service";
const CodeChannel = namespace("CodeChannelModule");
import CodeService from "@/services/code_channel.service";
const User = namespace("UserModule");
import { User } from "@/models/user";
import { Socket } from "socket.io-client";
import { codeChannelSocket } from "@/socketio";
@Component({
  components: {
    EditCode,
    NotCode,
    AppBarOptions,
  },
})
export default class ViewCode extends Vue {
  @Prop({
    required: true,
  })
  public idChannelCode!: string;

  @Watch("idChannelCode")
  onChildChanged() {
    this.changeView();
  }

  @CodeChannel.State("driverUID")
  private driverUID!: string;

  @CodeChannel.Action
  private setCodePath!: () => void;

  @CodeChannel.Action
  private changeFilePath!: (path: string) => void;

  @CodeChannel.State("codeFilePath")
  private codeFilePath!: string;

  @CodeChannel.Action
  private setDriverUIDStatus!: (uid: string) => void;

  @CodeChannel.Action
  private clearPathState!: () => void;

  @CodeChannel.Action
  private setCodeChanged!: (state: boolean) => void;

  @User.State("user")
  private currentUser!: User;

  public nameCodeChannel = "";
  public socket?: Socket;

  async nameCode() {
    this.nameCodeChannel = await ServiceChannels.getChannelName(
      ChannelType.CODE,
      this.$route.params.id,
      this.$route.params.idChannelCode
    );
  }

  changeView() {
    this.setCodePath();
    /* CodeService.joinToCodeChannel(
      this.socket!,
      this.$route.params.idChannelCode
    ); */
    this.nameCode();
  }
  destroyed() {
    this.$router.push({
      name: "notChannels",
    });
  }
  /*destroyed() {
    delete this.socket;
  } */
  mounted() {
    //  this.socket = codeChannelSocket(this.currentUser.uid!, true);
    CodeService.getDataCode(this.currentUser.uid!, (code) => {
      if (code.path !== "") {
        this.changeFilePath(code.path);
      }
    });
    CodeService.requestCurrentCode(
      this.currentUser.uid!,
      this.$route.params.idChannelCode
    );
    this.setDriverUIDStatus(this.currentUser.uid!);
    this.changeView();
  }
}
</script>
