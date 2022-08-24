export default {
    namespaced: true,
    state : () => ({
        // srcImg: 'https://httl.com.vn/wiki/wp-content/uploads/2021/07/imager_1_13161_700.jpg',
        // listTop100: [
        //     {
        //         img: "https://i.ytimg.com/vi/HK31DrqpztM/maxresdefault.jpg",
        //         title: "Nếu ngày ấy",
        //         singer: "Soobin",
        //         album: "Playah (Album)",
        //         time: "03:44",
        //         src: 'https://docs.google.com/uc?id=1dQzoVIgyQe6SYYduJm6o0OhFm0on_nWL'
        //     },
        // ],
        listTop100 : [],
        songs: [],
        playing: false,
        height: 0,
        singers: [
            {img: 'https://i.ytimg.com/vi/oiikgEzTotg/maxresdefault.jpg',name: 'Đức Phúc',follow: '399K'},
            {img: 'https://i.ytimg.com/vi/oiikgEzTotg/maxresdefault.jpg',name: 'Đức Phúc',follow: '399K'},
            {img: 'https://i.ytimg.com/vi/oiikgEzTotg/maxresdefault.jpg',name: 'Đức Phúc',follow: '399K'},
            {img: 'https://i.ytimg.com/vi/oiikgEzTotg/maxresdefault.jpg',name: 'Đức Phúc',follow: '399K'},
            {img: 'https://i.ytimg.com/vi/oiikgEzTotg/maxresdefault.jpg',name: 'Đức Phúc',follow: '399K'}
        ],
        liveAlbum: {
            name: 'Rap Việt Kết Hợp',
            updatedTime: '02/03/2022',
            artists: 'Wren Evans, Lil Wuyn, Blacka, Low G',
            numberOfLike: '18K',
            img: 'https://httl.com.vn/wiki/wp-content/uploads/2021/07/imager_1_13161_700.jpg'
        }
    }),
    getters: {
        // srcImg : state => state.srcImg,
        listTop100 : state => state.listTop100,
        songs : state => state.songs,
        playing : state => state.playing,
        height : state => state.height,
        singers : state => state.singers,
        liveAlbum : state => state.liveAlbum,
    },
    actions: {
        updateHeight({commit}, payload){
            commit('updateHeight',payload)
        },
        checkPause({dispatch,commit, getters, rootGetters}, payload) {
            if(rootGetters['fixedplay/nameSpacedComponent'] !== 'album' && rootGetters['fixedplay/nameSpacedComponent'] !== ''){
                var number = (rootGetters['chart/songs']).length
                // dispatch(getters.nameSpacedComponent + '/updateSongs', new Array(number).fill(false), { root: true })
                if((rootGetters['fixedplay/nameSpacedComponent']).includes('weeklyRank')){
                    dispatch('weeklyRank/updateSongs', new Array((rootGetters['weeklyRank/songs']).length).fill(false), { root: true })
                }else{
                    dispatch(rootGetters['fixedplay/nameSpacedComponent'] + '/updateSongs', new Array(number).fill(false), { root: true })
                }
            }
            dispatch('fixedplay/updateIndexSong', payload, { root: true })
            dispatch('fixedplay/updateSongs', getters.listTop100, { root: true })
            dispatch('fixedplay/updateNameSpacedComponent', 'album', { root: true })

            if (getters.songs[payload] == true) {
                commit('updateSongs', new Array(getters.listTop100.length).fill(false))
                commit('updatePlaying', false)
                commit('updatePlay', true,  { root: true })
                dispatch('fixedplay/playAudio', true, { root: true })
                return;
            }
            commit('updateSongs', new Array(getters.listTop100.length).fill(false))
            getters.songs[payload] = true;
            if(getters.listTop100[payload].src != rootGetters.srcPlay){
                //sau khi update src moi thi load() lai audio
                var aud = document.getElementById("myAudio")
                aud.load()
                dispatch('fixedplay/updateLiveSong', getters.listTop100[payload], { root: true })
            }

            dispatch('fixedplay/updateSongTrueFalse', getters.songs, { root: true })

            var temp = []
            for (let i = payload; i < getters.listTop100.length; i++) {
              temp.push(getters.listTop100[i])
            }
            dispatch('sidebarRight/updateItems', temp, { root: true })
            //get list played
            temp = []
            for (let i = 0; i <= payload; i++) {
              temp.push(getters.listTop100[i])
            }
            dispatch('sidebarRight/updateSongPlayed', temp, { root: true })


            commit('updateSrcPlay', getters.listTop100[payload].src, {root: true})
            commit('fixedplay/src', getters.listTop100[payload].src, {root: true})
            
            // commit('updateSongs', getters.songs)
            commit('updatePlaying', true)
            commit('updatePlay', false,  { root: true })
            dispatch('fixedplay/playAudio', false, { root: true })
        },
        playingAction({getters}){
            if(getters.playing){
                document.getElementById("circleImg").classList.add('rotate')
            }else{
                document.getElementById("circleImg").classList.remove('rotate')
            }
        },
        updateSongs({commit}, payload){
            commit('updateSongs', payload)
        },
        updateListTop100({commit}, payload){
            commit('updateListTop100', payload)
        }
    },
    mutations: {
        updateHeight(state, payload){
            state.height = payload
        },
        updatePlaying(state, payload){
            state.playing = payload
        },
        updateSongs(state, payload){
            state.songs = payload
        },
        updateLiveAlbum(state, payload){
            state.liveAlbum = payload
        },
        updateListTop100(state, payload){
            state.listTop100 = payload
        }
    }
}