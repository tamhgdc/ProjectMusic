export default {
    namespaced: true,
    state : () => ({
        txtSearch: '',
        Recommends: [],
        changeColorForm: true
    }),
    getters: {
        txtSearch : state => state.txtSearch,
        Recommends : state => state.Recommends,
        changeColorForm : state => state.changeColorForm
    },
    actions: {
        updateTxtSearch({commit}, payload){
            commit('updateTxtSearch', payload)
        },
        updateRecommends({commit}, payload){
            commit('updateRecommends', payload)
        }
    },
    mutations: {
        updateTxtSearch(state, payload){
            state.txtSearch = payload
        },
        updateRecommends(state, payload){
            state.Recommends = payload
        }
    }
}