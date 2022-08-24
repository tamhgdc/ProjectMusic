export default {
    namespaced: true,
    state : () => ({
        radios: []
    }),
    getters: {
        radios : state => state.radios,
    },
    actions: {
      updateRadios({commit}, payload){
        commit('updateRadios', payload)
      }
    },
    mutations: {
      updateRadios(state, payload){
        state.radios = payload
      }
    }
}