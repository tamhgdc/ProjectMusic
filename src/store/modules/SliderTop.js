export default {
    namespaced: true,
    state : () => ({
        sliders: [
            // {
            //   img: 'https://dienmaythudo.vn/wp-content/uploads/2020/07/tivi-sony-android-4k-ultra-hd-49-inch-49x8050h-1.gif',
            //   detail: "123",
            // }
        ],
    }),
    getters: {
        sliders : state => state.sliders,
    },
    actions: {
      updateSliders({commit}, payload){
        commit('updateSliders', payload)
      }
    },
    mutations: {
      updateSliders(state, payload){
        state.sliders = payload
      }
    }
}