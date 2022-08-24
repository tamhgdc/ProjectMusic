export default {
    namespaced: true,
    state: () => ({
        items: [],
        height: 0,
        songPlayed: [],
        isTurnOn: false
    }),
    getters: {
        items: state => state.items,
        height: state => state.height,
        songPlayed: state => state.songPlayed,
        isTurnOn: state => state.isTurnOn
    },
    actions: {
        updateHeight( {commit}, payload){
            commit('updateHeight', payload)
        },
        updateItems({commit}, payload){
            commit('updateItems', payload)
        },
        updateSongPlayed({commit}, payload){
            commit('updateSongPlayed', payload)
        },
        firstUpdateSongPlayed({commit}, payload){
            commit('updateSongPlayed', [payload])
        },
        updateIsTurnOn({commit}, payload){
            commit('updateIsTurnOn', payload)
        }
    },
    mutations: {
        updateHeight(state, payload){
            state.height = payload
        },
        updateItems(state, payload){
            state.items = payload
        },
        updateSongPlayed(state, payload){
            state.songPlayed = payload
        },
        updateIsTurnOn(state, payload){
            state.isTurnOn = payload
        }
    }
}