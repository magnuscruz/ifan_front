import http from '@/service/http'

const setUsuario = ({ commit }, obj) => {
    commit('SET_USUARIO', obj)
}

const setSenha = ({ commit }, obj) => {
    commit('SET_SENHA', obj)
}

const setNome = ({ commit }, obj) => {
    commit('SET_NOME', obj)
}

const limparUsuario = ({ commit }) => {
    commit('CLEAR_USUARIO')
}

const update = async ({ commit, state }) => {
    const response = await http.put('/auth/users/atualizar/meusdados', state.usuario)
    commit('CLEAR_USUARIO')
    return response
}

export default {
    update,
    setNome,
    setSenha,
    setUsuario,
    limparUsuario
}
