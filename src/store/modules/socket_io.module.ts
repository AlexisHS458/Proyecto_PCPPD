import { Module, Mutation, VuexModule } from "vuex-module-decorators";

/**
 * Modulo para el manejo de conexión con servidor de socket.io
 */
@Module({namespaced: true})
class SocketIOModule extends VuexModule{

    public io: any = {}


    @Mutation
    public setSocket(socket: any): void {
        this.io = socket;
    }



}

export default SocketIOModule;