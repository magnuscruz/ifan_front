import http from '@/service/http'

const fetch = async ({ commit }) => {
    const response = await http.get('/auth/users/inativos')
    if (response != null) {
        const solicitacoes = response.data
        commit('SET_SOLICITACOES', solicitacoes)
    }
}

const aprovarLote = async ({ commit, state }) => {
    return new Promise(async (resolve) => {
        const response = await http.put('/auth/users/permitir/lote', state.selecionados)
        if (response != null) {
            if (response.status === 200) {
                commit('UPDATE_SOLICITACOES')
                resolve(response.data.msg)
            }
        }
    })
}

const limparSolicitacoes = ({ commit }) => {
    commit('UPDATE_SOLICITACOES')
}

const remove = async ({ commit, state }) => {
    return new Promise(async (resolve) => {
        const selecionados = state.selecionados
        console.log(selecionados)
        const response = await http.put('/auth/users/delete', selecionados)
        if (response != null) {
            if (response.status === 200) {
                commit('UPDATE_SOLICITACOES')
                resolve(response.data.msg)
            }
        }
    })
}

const checked = ({ commit }, item) => {
    commit('SET_SELECT', item)
}

const detalhar = ({ commit }, state) => {
    commit('DETALHAR_USUARIO')
}

export default {
    fetch,
    remove,
    checked,
    detalhar,
    aprovarLote,
    limparSolicitacoes
}
