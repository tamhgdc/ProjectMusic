export const mutations = {
    updatePlay(state, payload) {
        state.play = payload
    },
    updateBgImgGlobal(state, payload){
        state.bgImgGlobal = payload
    },
    updateSrcPlay(state, payload){
        state.srcPlay = payload
    },
    updateNavRight(state){
        state.navRight = !state.navRight
    },
    updateLoadingAlbum(state, payload){
        state.loadingAlbum = payload
    },
    updateShowSidebarLeft(state, payload){
        state.showSidebarLeft = payload
    },
    updateShowMenu(state, payload){
        state.showMenu = payload
    },
    updateShowFixedPlay(state, payload){
        state.showFixedPlay = payload
    },
    updateUser(state , payload){
        state.user = payload
    },
    updateWidth(state, payload){
        state.width = payload
    },
    updateIsShow(state, payload){
        state.isShow = payload
    },
    updatePermissions(state, payload){
        state.permissions = payload
    },
    updateIsHiddenSideBarLeft(state, payload){
        state.isHiddenSideBarLeft = payload
    }
}