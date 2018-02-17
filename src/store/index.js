import Vue from 'vue'
import Vuex from 'vuex'
import users from '@app/users/store'
import solicitacoes from '@app/acessos/store'
import detalheusuario from '@app/detalheusuario/store'
import meusdados from '@app/meusdados/store'

Vue.use(Vuex)

const modules = {
    users,
    meusdados,
    solicitacoes,
    detalheusuario
}

export default new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production',
    state: {}
})
