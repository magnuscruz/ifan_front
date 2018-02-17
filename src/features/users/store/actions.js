import http from '@/service/http'

const fetch = async ({ commit }, params) => {
    const { ativo, perfil } = params
    const query = (ativo && perfil) ? `?ativo=${ativo}&perfil=${perfil}` : ''
    const response = await http.get(`/auth/users${query}`)
    if (response) {
        if (response.status === 200) {
            const usuarios = response.data
            commit('SET_USUARIOS', usuarios)
        } else if (response.status === 204) {
            commit('SET_USUARIOS', [])
        }
    } 
}

export default {
    fetch
}
