export default {
    namespaced: true,
    state : () => ({
        listSelectedToday: [
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', category: 'Nhạc Mới Mỗi Ngày', to: '...', detail:'Trong thơ có nhạc, trong nhạc có thơ'},
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', category: 'Top Hits V-Pop', to: '...', detail:'Trong thơ có nhạc, trong nhạc có thơ'},
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', category: 'Top Hits V-Pop', to: '...', detail:'Trong thơ có nhạc, trong nhạc có thơ'},
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', category: 'Top Hits V-Pop', to: '...', detail:'Trong thơ có nhạc, trong nhạc có thơ'},
            // { img:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', category: 'Top Hits V-Pop', to: '...', detail:'Trong thơ có nhạc, trong nhạc có thơ'},
        ]
    }),
    getters: {
        listSelectedToday : state => state.listSelectedToday,
    },
    actions: {
        updateListSelectedToday({commit}, payload){
            commit('updateListSelectedToday', payload)
        }
    },
    mutations: {
        updateListSelectedToday(state, payload){
            state.listSelectedToday = payload
        }
    }
}