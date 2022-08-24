export default {
    namespaced: true,
    state: () => ({
        listSong: {
            // vietnam: [
            //     {
            //         img: "https://i.ytimg.com/vi/HK31DrqpztM/maxresdefault.jpg",
            //         title: "Nếu ngày ấy",
            //         singer: "Soobin",
            //         album: "Playah (Album)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1dQzoVIgyQe6SYYduJm6o0OhFm0on_nWL'
            //     },
            //     {
            //         img: "https://images.genius.com/cfb3f64ab2fc08506b2365b1d8ab959b.600x600x1.webp",
            //         title: "Thay mọi cô gái yêu anh",
            //         singer: "AMEE",
            //         album: "Chạy Về Khóc Với Anh (Single)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1_ds2_IIEpt_bhzBO9Sxtl6_xdZIbia69'
            //     },
            //     {
            //         img: "https://vtimes.com.au/up/images/11-21/3689716-gducky-hoang-dung-lam-moi-0.jpg",
            //         title: "Thói quen",
            //         singer: "G-Ducky",
            //         album: "Chạy Về Khóc Với Anh (Single)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1M70gkE9pOrvt41-IJNf1hdOgnbYtBmWm'
            //     },
            //     {
            //         img: "https://avatar-nct.nixcdn.com/mv/2020/03/16/7/c/6/a/1584345171871_640.jpg",
            //         title: "Như anh mơ",
            //         singer: "PC",
            //         album: "Playah (Album)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=13pxiViqy3jLIArC29Oufuf8FIMN38F1a'
            //     },
            //     {
            //         img: "https://zmp3-photo-fbcrawler.zadn.vn/thumb_video/4/3/9/f/439f8b9d834adfe6b2b3cfa01bdb5355.jpg",
            //         title: "24h",
            //         singer: "Lyly",
            //         album: "Playah (Album)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1Mmxg-UXH0KwlFEMQxOzi2pKWRkU17rsS'
            //     },
            // ],
            // usuk: [
            //     {
            //         img: "https://i.ytimg.com/vi/HK31DrqpztM/maxresdefault.jpg",
            //         title: "Nếu ngày ấy",
            //         singer: "Soobin",
            //         album: "Playah (Album)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1dQzoVIgyQe6SYYduJm6o0OhFm0on_nWL'
            //     },
            //     {
            //         img: "https://images.genius.com/cfb3f64ab2fc08506b2365b1d8ab959b.600x600x1.webp",
            //         title: "Thay mọi cô gái yêu anh",
            //         singer: "AMEE",
            //         album: "Chạy Về Khóc Với Anh (Single)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1_ds2_IIEpt_bhzBO9Sxtl6_xdZIbia69'
            //     },
            //     {
            //         img: "https://i.ytimg.com/vi/DYdMUzHwAMY/hqdefault.jpg",
            //         title: "Em bỏ hút thuốc chưa",
            //         singer: "Erik",
            //         album: "Chạy Về Khóc Với Anh (Single)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1a_dgCSHWj_AFd1-Gto6ogEByva5v-AMR'
            //     },
            //     {
            //         img: "https://zmp3-photo-fbcrawler.zadn.vn/thumb_video/4/3/9/f/439f8b9d834adfe6b2b3cfa01bdb5355.jpg",
            //         title: "24h",
            //         singer: "Lyly",
            //         album: "Playah (Album)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1Mmxg-UXH0KwlFEMQxOzi2pKWRkU17rsS'
            //     },
            //     {
            //         img: "https://i.ytimg.com/vi/zEWSSod0zTY/mqdefault.jpg",
            //         title: "Ghé qua",
            //         singer: "PC",
            //         album: "Chạy Về Khóc Với Anh (Single)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1W5bKTaMUi2BbYQCaS7EcDgtSRZWVgrzL'
            //     }
            // ],
            // kpop: [
            //     {
            //         img: "https://i.ytimg.com/vi/HK31DrqpztM/maxresdefault.jpg",
            //         title: "Nếu ngày ấy",
            //         singer: "Soobin",
            //         album: "Playah (Album)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1dQzoVIgyQe6SYYduJm6o0OhFm0on_nWL'
            //     },
            //     {
            //         img: "https://i.ytimg.com/vi/DYdMUzHwAMY/hqdefault.jpg",
            //         title: "Em bỏ hút thuốc chưa",
            //         singer: "Erik",
            //         album: "Chạy Về Khóc Với Anh (Single)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1a_dgCSHWj_AFd1-Gto6ogEByva5v-AMR'
            //     },
            //     {
            //         img: "https://avatar-nct.nixcdn.com/mv/2020/03/16/7/c/6/a/1584345171871_640.jpg",
            //         title: "Như anh mơ",
            //         singer: "PC",
            //         album: "Playah (Album)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=13pxiViqy3jLIArC29Oufuf8FIMN38F1a'
            //     },
            //     {
            //         img: "https://zmp3-photo-fbcrawler.zadn.vn/thumb_video/4/3/9/f/439f8b9d834adfe6b2b3cfa01bdb5355.jpg",
            //         title: "24h",
            //         singer: "Lyly",
            //         album: "Playah (Album)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1Mmxg-UXH0KwlFEMQxOzi2pKWRkU17rsS'
            //     },
            //     {
            //         img: "https://i.ytimg.com/vi/zEWSSod0zTY/mqdefault.jpg",
            //         title: "Ghé qua",
            //         singer: "PC",
            //         album: "Chạy Về Khóc Với Anh (Single)",
            //         time: "03:44",
            //         src: 'https://docs.google.com/uc?id=1W5bKTaMUi2BbYQCaS7EcDgtSRZWVgrzL'
            //     }
            // ]
        },
        songs: [],
        pause: false,
        index_weekly_rank: -1

    }),
    getters: {
        listSong: state => state.listSong,
        songs: state => state.songs,
        pause: state => state.pause,
        index_weekly_rank: state => state.index_weekly_rank
    },
    actions: {
        updateListSong({ commit }, payload) {
            commit('updateListSong', payload)
        },
        updateSongs({ commit }, payload) {
            commit('updateSongs', payload)
        },
        checkPause({commit, getters, dispatch, rootGetters}, payload){
            if (!(rootGetters['fixedplay/nameSpacedComponent']).includes('weeklyRank') && rootGetters['fixedplay/nameSpacedComponent'] !== '') {
                var number = (rootGetters['chart/songs']).length
                dispatch(rootGetters['fixedplay/nameSpacedComponent'] + '/updateSongs', new Array(number).fill(false), { root: true })
            }
            if(getters.songs[payload]){
                commit('updateSongs', new Array(getters.songs.length).fill(false))
                commit('updatePause', false)
                commit('index_weekly_rank', payload)
                dispatch('fixedplay/playAudio', true, { root: true })
            }else{
                commit('updateSongs', new Array(getters.songs.length).fill(false))
                getters.songs[payload] = true
                commit('updatePause', true)
                let indexBeforeChange = getters.index_weekly_rank
                var temp = []
                if(payload >= 0 && payload < 5){
                    if(!(indexBeforeChange >= 0 && indexBeforeChange < 5)){
                        dispatch('fixedplay/updateSongs', getters.listSong.vietnam, { root: true })
                    }
                    dispatch('fixedplay/updateLiveSong', getters.listSong.vietnam[payload], { root: true })
                    for(let i = payload; i < getters.listSong.vietnam.length; i++){
                        temp.push(getters.listSong.vietnam[i])
                    }
                    dispatch('sidebarRight/updateItems', temp, { root: true })
        
                    temp = []
                    for(let i = 0; i <= payload; i++){
                        temp.push(getters.listSong.vietnam[i])
                    }
                    dispatch('sidebarRight/updateSongPlayed', temp, { root: true })
                    dispatch('fixedplay/updateNameSpacedComponent', 'weeklyRankVietNam', { root: true})
                    dispatch('fixedplay/updateIndexSong', payload, { root: true })
                    dispatch('fixedplay/updateSrc', getters.listSong.vietnam[payload].src, { root: true})
                }else if(payload >= 5 && payload < 10){
                    if(!(indexBeforeChange >= 5 && indexBeforeChange < 10)){
                        dispatch('fixedplay/updateSongs', getters.listSong.usuk, { root: true })
                    }
                    dispatch('fixedplay/updateLiveSong', getters.listSong.usuk[payload - 5], { root: true })
                    for(let i = payload - 5; i < getters.listSong.usuk.length; i++){
                        temp.push(getters.listSong.usuk[i])
                    }
                    dispatch('sidebarRight/updateItems', temp, { root: true })
        
                    temp = []
                    for(let i = 0; i <= payload - 5; i++){
                        temp.push(getters.listSong.usuk[i])
                    }
                    dispatch('sidebarRight/updateSongPlayed', temp, { root: true })
                    dispatch('fixedplay/updateNameSpacedComponent', 'weeklyRankUsuk', { root: true})
                    dispatch('fixedplay/updateIndexSong', payload - 5, { root: true })
                    dispatch('fixedplay/updateSrc', getters.listSong.usuk[payload - 5].src, { root: true})
                }else if(payload >= 10 && payload <= 14){
                    if(!(indexBeforeChange >= 10 && indexBeforeChange < 14)){
                        dispatch('fixedplay/updateSongs', getters.listSong.kpop, { root: true })
                    }
                    dispatch('fixedplay/updateLiveSong', getters.listSong.kpop[payload - 10], { root: true })
                    for(let i = payload - 10; i < getters.listSong.kpop.length; i++){
                        temp.push(getters.listSong.kpop[i])
                    }
                    dispatch('sidebarRight/updateItems', temp, { root: true })
        
                    temp = []
                    for(let i = 0; i <= payload - 10; i++){
                        temp.push(getters.listSong.kpop[i])
                    }
                    dispatch('sidebarRight/updateSongPlayed', temp, { root: true })
                    dispatch('fixedplay/updateNameSpacedComponent', 'weeklyRankKpop', { root: true})
                    dispatch('fixedplay/updateIndexSong', payload - 10, { root: true })
                    dispatch('fixedplay/updateSrc', getters.listSong.kpop[payload - 10].src, { root: true})
                }
                commit('index_weekly_rank', payload)
    
                var aud = document.getElementById("myAudio")
                aud.load()
                dispatch('fixedplay/playAudio', false, { root: true })
                
            }
        },
        index_weekly_rank({commit}, payload){
            commit('index_weekly_rank', payload)
        }
    },
    mutations: {
        updateListSong(state, payload) {
            state.listSong = payload
        },
        updateSongs(state, payload) {
            state.songs = payload
        },
        updatePause(state, payload) {
            state.pause = payload
        },
        index_weekly_rank(state, payload){
            state.index_weekly_rank = payload
        }
    }
}