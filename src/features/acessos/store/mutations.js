// import Vue from 'vue'

const SET_SOLICITACOES = (state, obj) => {
  state.solicitacoes = obj
}

const SET_SELECT = (state, obj) => {
    if (state.selecionados.includes(obj)) {
        state.selecionados = state.selecionados.filter((selecionado) => {
            return selecionado !== obj
        })
    } else {
        state.selecionados.push(obj)
    }
}

const UPDATE_SOLICITACOES = (state) => {
    state.selecionados = []
}

const DETALHAR_USUARIO = (state, obj) => {
    state.selecionados = []
}

export default {
    SET_SELECT,
    SET_SOLICITACOES,
    UPDATE_SOLICITACOES,
    DETALHAR_USUARIO
}
