export default {
    namespaced: true,
    state : () => ({
        listEachDay: [
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', title: 'Nhạc Mới Mỗi Ngày', detail: 'Conan Gray, The Chainsmokers, Tate McRae...', to: '...'},
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', title: 'Top Hits V-Pop', detail: 'Conan Gray, The Chainsmokers, Tate McRae...', to: '...'},
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', title: 'Top Hits V-Pop',detail: 'Conan Gray, The Chainsmokers, Tate McRae...', to: '...'},
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', title: 'Top Hits V-Pop',detail: 'Conan Gray, The Chainsmokers, Tate McRae...', to: '...'},
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', title: 'Top Hits V-Pop',detail: 'Conan Gray, The Chainsmokers, Tate McRae...', to: '...'},
        ],
    }),
    getters: {
        listEachDay : state => state.listEachDay,
    },
    actions: {
        updateListEachDay({commit}, payload){
            commit('updateListEachDay', payload);
        }
    },
    mutations: {
        updateListEachDay(state, payload){
            state.listEachDay = payload
        }
    }
}