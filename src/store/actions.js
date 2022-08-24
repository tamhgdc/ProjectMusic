import axios from "axios";

export const actions = {
    updatePlay ({ commit }, payload) {
        commit('updatePlay', payload);
    },
    updateBgImgGlobal({commit}, payload){
        commit('updateBgImgGlobal', payload)
    },
    updateSrcPlay({commit}, payload){
        commit('updateSrcPlay', payload)
    },
    updateNavRight({commit}){
        commit('updateNavRight')
    },
    updateLoadingAlbum({commit}, payload){
        commit('updateLoadingAlbum', payload)
    },
    updateShowSidebarLeft({commit}, payload){
        commit('updateShowSidebarLeft', payload)
    },
    updateShowMenu({commit}, payload){
        commit('updateShowMenu', payload)
    },
    updateShowFixedPlay({commit}, payload){
        commit('updateShowFixedPlay', payload)
    },
    updateUser({commit}, payload){
        commit('updateUser', payload)
    },
    getUser({commit}){
        axios.get("/user/current")
        .then( res => {
            commit("updateUser", res.data.user)
        })
        .catch( () => {
            console.log()
        })
    },
    updateWidth({commit}, payload){
        commit('updateWidth', payload)
    },
    updateIsShow({commit}, payload){
        commit('updateIsShow', payload)
    },
    updatePermissions({commit}, payload){
        commit('updatePermissions', payload)
    },
    updateIsHiddenSideBarLeft({commit}, payload){
        commit('updateIsHiddenSideBarLeft', payload)
    }
}