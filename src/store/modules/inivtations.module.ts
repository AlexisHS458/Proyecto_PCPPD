import { Module, VuexModule } from "vuex-module-decorators";


/**
 * Modulo de invitaciones a espacios de trabajo
 */
@Module({ namespaced: true })
class InivtationsModule extends VuexModule{

    //public myInivtations: Invitation[] =[]
}

export default InivtationsModule