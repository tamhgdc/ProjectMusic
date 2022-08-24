import { getters } from "../getters";

export default {
    namespaced: true,
    state: () => ({
        time: ["0:00", "3:00", "6:00", "9:00", "12:00", "15:00", "18:00", "21:00"],
        value1: [229, 675, 410, 390, 310, 460, 250, 555],
        value2: [300, 125, 500, 390, 300, 456, 250, 240],
        value3: [100, 321, 456, 222, 333, 231, 777, 100],
        gradient: [["#FF1744"], ["#1E88E5"], ["#C0CA33"]],
        bgImg : {
          backgroundImage: getters.bgImgGlobal,
          'background-position' : 'center center',
          'background-size': 'cover',
          'height' : '100%',
        },
        fill: 0,
        color: ''
    }),
    getters: {
        time: state => state.time,
        value1: state => state.value1,
        value2: state => state.value2,
        value3: state => state.value3,
        gradient: state => state.gradient,
        bgImg: state => state.bgImg,
        fill: state => state.fill,
        color: state => state.color,
    },
    actions: {
        updateBgImg({commit, rootState}){
            commit('updateBgImg', rootState.bgImgGlobal)
        },
        updateFill({commit}, payload){
            commit('updateFill', payload)
        }
    },
    mutations : {
        updateBgImg(state, payload){
            state.bgImg.backgroundImage = payload
        },
        updateFill(state, payload){
            state.fill = payload
        }
    }
}