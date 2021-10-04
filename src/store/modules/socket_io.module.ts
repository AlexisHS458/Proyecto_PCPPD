import SocketioService from "@/services/socketio.service";
import { Action, Module, VuexModule } from "vuex-module-decorators";

/**
 * Modulo para el manejo de conexión con servidor de socket.io
 */
@Module({ namespaced: true })
class SocketIOModule extends VuexModule {
  @Action
  connect(): void {
    SocketioService.connect();
  }
}

export default SocketIOModule;
