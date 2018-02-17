import actions from './actions'
import state from './state'
import mutations from './mutations'

/**
* Store meus dados
*/
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
