export default {
  namespaced: true,
  state: () => ({
    itemSideBars: [
      // { title: "Cá Nhân", icon: "mdi-account-music" ,to:'/'},
      // { title: "Khám Phá", icon: "mdi-sort-alphabetical-variant",to:'/' },
      // { title: "#musicchart", icon: "mdi-music",to:'/music-chart' },
      // { title: "#Radio", icon: "mdi-radio",to:'/radio' },
      // { title: "Theo Dõi", icon: "mdi-bell",to:'/' },
    ],
    itemBelowSideBars: [
      // { title: "Nhạc Mới", icon: "mdi-new-box", to:'/new-songs'},
      // { title: "Thể Loại", icon: "mdi-shape", to:'/'},
      // { title: "Top 100", icon: "mdi-star", to:'/'},
      // { title: "MV", icon: "mdi-shopping-music", to:'/'},
    ],
    logo: 'logo-mountain.png',
  }),
  getters: {
    itemSideBars: state => state.itemSideBars,
    itemBelowSideBars: state => state.itemBelowSideBars,
    logo: state => state.logo
  },
  actions: {
    updateItemSideBars({ commit }, payload) {
      commit('updateItemSideBars', payload)
    },
    updateItemBelowSideBars({ commit }, payload) {
      commit('updateItemBelowSideBars', payload)
    },
  },
  mutations: {
    updateItemSideBars(state, payload) {
      state.itemSideBars = payload
    },
    updateItemBelowSideBars(state, payload) {
      state.itemBelowSideBars = payload
    },
  }
}