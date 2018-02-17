const SET_USUARIO = (state, obj) => {
    state.usuario.perfil = obj.perfil
    state.usuario.nome = obj.nome
    state.usuario.id = obj.id
    state.usuario.cpf = obj.cpf
    state.usuario.email = obj.email
    state.usuario.senha = obj.password
}

const CLEAR_USUARIO = (state, obj) => {
    state.usuario = {}
}

const SET_SENHA = (state, obj) => {
    state.usuario.senha = obj
}

const SET_NOME = (state, obj) => {
    state.usuario.nome = obj
}

export default {
    SET_NOME,
    SET_SENHA,
    SET_USUARIO,
    CLEAR_USUARIO
}
