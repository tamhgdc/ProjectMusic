export default {
    namespaced: true,
    state : () => ({
        loggedIn: false
    }),
    getters: {
        loggedIn : state => state.loggedIn,
    },
    actions: {
        updateLoggedIn({commit}, payload){
            commit('updateLoggedIn', payload)
        }
    },
    mutations: {
        updateLoggedIn(state, payload){
            state.loggedIn = payload
        }
    }
}