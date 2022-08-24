export default {
  namespaced: true,
  state: () => ({
    listTop100: [
      // {
      //   img: "https://i.ytimg.com/vi/HK31DrqpztM/maxresdefault.jpg",
      //   title: "Nếu ngày ấy",
      //   singer: "Soobin",
      //   album: "Playah (Album)",
      //   time: "03:44",
      //   src: 'https://docs.google.com/uc?id=1dQzoVIgyQe6SYYduJm6o0OhFm0on_nWL'
      // },
    ],
    songs: [],
    color: "transparent",
    appear_top100: false,
  }),
  getters: {
    listTop100: state => state.listTop100,
    color: state => state.color,
    songs: state => state.songs,
    appear_top100: state => state.appear_top100,
  },
  actions: {
    checkPause({ commit, getters, dispatch, rootGetters }, index) {
      //xoá play của album cũ để sang album mới
      if (rootGetters['fixedplay/nameSpacedComponent'] !== 'musicChart' && rootGetters['fixedplay/nameSpacedComponent'] !== '') {
        var number = (rootGetters['chart/songs']).length
        if((rootGetters['fixedplay/nameSpacedComponent']).includes('weeklyRank')){
          dispatch('weeklyRank/updateSongs', new Array((rootGetters['weeklyRank/songs']).length).fill(false), { root: true })
        }else{
          dispatch(rootGetters['fixedplay/nameSpacedComponent'] + '/updateSongs', new Array(number).fill(false), { root: true })
        }
      }
      dispatch('fixedplay/updateIndexSong', index, { root: true })
      dispatch('fixedplay/updateSongs', getters.listTop100, { root: true })
      dispatch('fixedplay/updateNameSpacedComponent', 'musicChart', { root: true })
      if (getters.songs[index] == true) {
        commit('updatePause', new Array(getters.songs.length).fill(false))
        commit('updatePlay', true, { root: true })
        dispatch('fixedplay/playAudio', true, { root: true })
        // dispatch('fixedplay/updateLiveSong', getters.listTop100[index], { root: true })
        return;
      }
      commit('updatePause', new Array(getters.listTop100.length).fill(false))
      getters.songs[index] = true;

      if (getters.listTop100[index].src != rootGetters.srcPlay) {
        //sau khi update src moi thi load() lai audio
        var aud = document.getElementById("myAudio")
        aud.load()
        dispatch('fixedplay/updateLiveSong', getters.listTop100[index], { root: true })
      }

      var temp = []
      for (let i = index; i < getters.listTop100.length; i++) {
        temp.push(getters.listTop100[i])
      }
      dispatch('sidebarRight/updateItems', temp, { root: true })
      //get list played
      temp = []
      for (let i = 0; i <= index; i++) {
        temp.push(getters.listTop100[i])
      }
      dispatch('sidebarRight/updateSongPlayed', temp, { root: true })

      commit('updateSrcPlay', getters.listTop100[index].src, { root: true })
      commit('fixedplay/src', getters.listTop100[index].src, { root: true })

      commit('updatePlay', false, { root: true })
      dispatch('fixedplay/playAudio', false, { root: true })
      commit('fixedplay/updateLiveSong', getters.listTop100[index], { root: true })

    },
    updateAppearTop100({ commit, getters }) {
      commit('updateAppearTop100', !getters.appear_top100)
    },
    updateSongs({ commit }, payload) {
      commit('updateSongs', payload)
    },
    updateListTop100({commit}, payload){
      commit('updateListTop100', payload)
    }
  },
  mutations: {
    updatePause(state, payload) {
      state.songs = payload
    },
    updateAppearTop100(state, payload) {
      state.appear_top100 = payload
    },
    updateSongs(state, payload) {
      state.songs = payload
    },
    updateListTop100(state, payload){
      state.listTop100 = payload
    }
  }
}