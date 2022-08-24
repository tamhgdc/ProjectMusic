export default {
    namespaced: true,
    state : () => ({
        listJustNow: []
    }),
    getters: {
        listJustNow : state => state.listJustNow,
    },
    actions: {
        updateListJustNow({commit}, payload){
            commit('updateListJustNow', payload)
        }
    },
    mutations: {
        updateListJustNow(state, payload){
            state.listJustNow = payload
        }
    }
}