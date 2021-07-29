import { Gato } from "@/models/gato";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";



@Module({ namespaced: true })
class GatoModule extends VuexModule{
    public gatos: Gato[] = [];

    @Mutation
    public setNewGato(gato: Gato): void{
        this.gatos = [gato,...this.gatos]
    }

    @Action
    addGato(gato: Gato): void{
        this.context.commit("setNewGato",gato);
    }

}

export default GatoModule;