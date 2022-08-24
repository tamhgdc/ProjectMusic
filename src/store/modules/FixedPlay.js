export default {
    namespaced: true,
    state: () => ({
        vol: 50,
        sing: true,
        loop: true,
        ended: false,
        duration: '00:00',
        timeEnd: 0,
        timeCurrent: 0,
        timeViewDuration: '0:00',
        songs: [],
        songTrueFalse: [],
        src: '',
        firstInteval: null,
        secondIntevel: null,
        live_song: {},
        index_song: 0,
        nameSpacedComponent: '',
    }),

    getters: {
        vol: state => {
            return state.vol
        },
        sing: state => {
            return state.sing
        },
        loop: state => {
            return state.loop
        },
        ended: state => {
            return state.ended
        },
        duration: state => {
            return state.duration
        },
        timeEnd: state => {
            return state.timeEnd
        },
        timeCurrent: state => {
            return state.timeCurrent
        },
        timeViewDuration: state => {
            return state.timeViewDuration
        },
        songs: state => {
            return state.songs
        },
        src: state => {
            return state.src
        },
        firstInteval: state => {
            return state.firstInteval
        },
        secondIntevel: state => {
            return state.secondIntevel
        },
        live_song: state => {
            return state.live_song
        },
        index_song: state => {
            return state.index_song
        },
        nameSpacedComponent: state => {
            return state.nameSpacedComponent
        },
        updateSongTrueFalse: state => {
            return state.songTrueFalse
        }
    },

    mutations: {
        sing(state, value) {
            state.sing = value
        },
        vol(state, value) {
            state.vol = value
        },
        loop(state, value) {
            state.loop = value
        },
        ended(state, value) {
            state.ended = value
        },
        duration(state, value) {
            state.duration = value
        },
        timeEnd(state, value) {
            state.timeEnd = value
        },
        timeCurrent(state, value) {
            state.timeCurrent = value
        },
        timeViewDuration(state, value) {
            state.timeViewDuration = value
        },
        songs(state, value) {
            state.songs = value
        },
        src(state, value) {
            state.src = value
        },
        firstInteval(state, value) {
            state.firstInteval = value
        },
        secondIntevel(state, value) {
            state.secondIntevel = value
        },
        updateTimeCurrent(state, value) {
            state.timeCurrent = value
        },
        updateSing(state, value) {
            state.sing = value
        },
        updateVol(state, value) {
            state.vol = value
        },
        updateLiveSong(state, value) {
            state.live_song = value
        },
        updateIndexSong(state, value) {
            state.index_song = value
        },
        nameSpacedComponent(state, value){
            state.nameSpacedComponent = value
        },
        updateSongTrueFalse(state, value){
            state.songTrueFalse = value
        }
    },

    actions: {
        playAudio({ commit, getters, dispatch }, data) {
            var aud = document.getElementById("myAudio");
            clearInterval(getters.firstInteval)
            commit('firstInteval', null)
            clearInterval(getters.secondIntevel)
            commit('secondIntevel', null)
            if (data == true) {
                commit('updatePlay', true, { root: true })
                aud.pause()
                clearInterval(getters.firstInteval)
                clearInterval(getters.secondIntevel)
                commit('firstInteval', null)
                commit('secondIntevel', null)
            } else {
                commit('updatePlay', false, { root: true })
                aud.play()
                //calculate to time to display
                commit('timeCurrent', aud.currentTime)
                commit('firstInteval', setInterval(() => {
                    commit('timeCurrent', getters.timeCurrent + 1)

                    if (getters.timeCurrent == getters.timeEnd) {
                        commit('timeCurrent', 0)
                        commit('timeViewDuration', '0:00')
                        if (!getters.loop) {
                            clearInterval(getters.firstInteval)
                            if (getters.songs.length - 1 === getters.index_song) {
                                commit('updatePlay', true, { root: true })
                            } else {
                                dispatch('nextSong')
                            }
                        } else {
                            dispatch('nextSong')
                        }
                    }

                    var minute = Math.floor(getters.timeCurrent / 60)
                    var second = Math.floor(getters.timeCurrent % 60)
                    if (second < 10) {
                        second = '0' + second
                    }
                    commit('timeViewDuration', minute + ':' + second)
                }, 1000))
            }
        },
        updateSrc({ commit, getters }, payload) {
            if (payload) {
                commit('src', payload)
            } else {
                commit('src', getters.songs[0].src)
            }
        },
        mounted({ commit, getters }) {
            var aud = document.getElementById("myAudio")
            aud.volume = getters.vol / 100
            aud.loop = true

            commit('ended', aud.ended)
            aud.onloadedmetadata = () => {
                if(Math.floor(aud.duration % 60) < 10){
                    commit('duration', Math.floor(aud.duration / 60) + ':0' + Math.floor(aud.duration % 60))
                }else{
                commit('duration', Math.floor(aud.duration / 60) + ':' + Math.floor(aud.duration % 60))
                }
                commit('timeEnd', Math.floor(aud.duration))
            }
            commit('updateLiveSong', getters.songs[0])
            setInterval(() => {
                commit('ended', aud.ended)
            }, 1000)
        },
        loopAudio({ commit, getters }) {
            commit('loop', !getters.loop)
            if (getters.loop) {
                document.getElementById("myAudio").loop = true;
            } else {
                document.getElementById("myAudio").loop = false;
            }
        },
        playTimeCurrent({ commit, getters, dispatch }) {
            var aud = document.getElementById("myAudio");
            aud.currentTime = getters.timeCurrent
            clearInterval(getters.firstInteval)
            clearInterval(getters.secondIntevel)
            commit('firstInteval', null)
            commit('secondIntevel', null)
            commit('secondIntevel', setInterval(() => {
                commit('timeCurrent', getters.timeCurrent + 1)
                if (getters.timeCurrent == getters.timeEnd) {
                    commit('timeCurrent', 0)
                    commit('timeViewDuration', '0:00')
                    if (!getters.loop) {
                        clearInterval(getters.secondIntevel)
                        if (getters.songs.length - 1 === getters.index_song) {
                            commit('updatePlay', true, { root: true })
                        } else {
                            dispatch('nextSong')
                        }
                    } else {
                        dispatch('nextSong')
                    }
                }

                var minute = Math.floor(getters.timeCurrent / 60)
                var second = Math.floor(getters.timeCurrent % 60)
                if (second < 10) {
                    second = '0' + second
                }
                commit('timeViewDuration', minute + ':' + second)
            }, 1000)
            )
        },
        updateTimeCurrent({ commit }, payload) {
            commit('updateTimeCurrent', payload)
        },
        updateSing({ commit, getters }, payload) {
            var aud = document.getElementById("myAudio");
            if (getters.sing == false) {
                aud.muted = true;
            } else {
                aud.muted = false;
            }
            commit('updateSing', payload)
        },
        updateVol({ commit }, payload) {
            var aud = document.getElementById("myAudio")
            aud.volume = payload / 100
            commit('updateVol', payload)
        },
        updateLiveSong({ commit }, payload) {
            commit('updateLiveSong', payload)
        },
        prevSong({ commit, getters, dispatch }) {
            if (getters.index_song  >= 1) {
                var payload = getters.songs[getters.index_song - 1]
                commit('updateLiveSong', payload)
                commit('updateIndexSong', getters.index_song - 1)
                dispatch('updateSrc', getters.songs[getters.index_song].src)

                commit('updateSongTrueFalse', new Array(getters.songs.length).fill(false))
                getters.updateSongTrueFalse[getters.index_song] = true
                //trường hợp mở 354 và khóa 351 lại thì k ăn, thế là thế nào ta
                // getters.updateSongTrueFalse[getters.index_song + 1] = false

                //get list haven't been played
                var temp = []
                for(let i = getters.index_song; i < getters.songs.length; i++){
                    temp.push(getters.songs[i])
                }
                dispatch('sidebarRight/updateItems', temp, { root: true })

                //get list played
                temp = []
                for(let i = 0; i <= getters.index_song; i++){
                    temp.push(getters.songs[i])
                }
                dispatch('sidebarRight/updateSongPlayed', temp, { root: true })

                var aud = document.getElementById("myAudio")
                aud.load()

                if(getters.nameSpacedComponent.includes('weeklyRank')){
                    let arrTemp = []
                    switch(getters.nameSpacedComponent){
                        case 'weeklyRankVietNam': {
                            arrTemp = getters.updateSongTrueFalse
                            arrTemp.push(...new Array(10).fill(false))
                            dispatch('weeklyRank/updateSongs', arrTemp, { root: true })
                            break
                        } 
                        case 'weeklyRankUsuk': {
                            arrTemp.push(...new Array(5).fill(false))
                            arrTemp.push(...getters.updateSongTrueFalse)
                            arrTemp.push(...new Array(5).fill(false))
                            dispatch('weeklyRank/updateSongs', arrTemp, { root: true })
                            break
                        } 
                        case 'weeklyRankKpop': {
                            arrTemp.push(...new Array(10).fill(false))
                            arrTemp.push(...getters.updateSongTrueFalse)
                            dispatch('weeklyRank/updateSongs', arrTemp, { root: true })
                            break
                        } 
                    }
                }else{
                    if(getters.nameSpacedComponent !== ''){
                        dispatch(getters.nameSpacedComponent + '/updateSongs', getters.updateSongTrueFalse, { root: true })
                    }
                }

                dispatch('playAudio', false)
            }

        },
        nextSong({ commit, getters, dispatch }) {
            var temp = []

            if (getters.index_song + 1 < getters.songs.length) {
                commit('updateLiveSong', getters.songs[getters.index_song + 1])
                commit('updateIndexSong', getters.index_song + 1)
                dispatch('updateSrc', getters.songs[getters.index_song].src)
                commit('updateSongTrueFalse', new Array(getters.songs.length).fill(false))
                getters.updateSongTrueFalse[getters.index_song] = true

            } else {
                commit('updateLiveSong', getters.songs[0])
                commit('updateIndexSong', 0)
                dispatch('updateSrc', getters.songs[0].src)
                commit('updateSongTrueFalse', new Array(getters.songs.length).fill(false))
                getters.updateSongTrueFalse[0] = true
            }

            for(let i = getters.index_song; i < getters.songs.length; i++){
                temp.push(getters.songs[i])
            }
            dispatch('sidebarRight/updateItems', temp, { root: true })

            temp = []
            for(let i = 0; i <= getters.index_song; i++){
                temp.push(getters.songs[i])
            }
            dispatch('sidebarRight/updateSongPlayed', temp, { root: true })

            var aud = document.getElementById("myAudio")
            aud.load()

            if(getters.nameSpacedComponent.includes('weeklyRank')){
                let arrTemp = []
                switch(getters.nameSpacedComponent){
                    case 'weeklyRankVietNam': {
                        arrTemp = getters.updateSongTrueFalse
                        arrTemp.push(...new Array(10).fill(false))
                        dispatch('weeklyRank/updateSongs', arrTemp, { root: true })
                        break
                    } 
                    case 'weeklyRankUsuk': {
                        arrTemp.push(...new Array(5).fill(false))
                        arrTemp.push(...getters.updateSongTrueFalse)
                        arrTemp.push(...new Array(5).fill(false))
                        dispatch('weeklyRank/updateSongs', arrTemp, { root: true })
                        break
                    } 
                    case 'weeklyRankKpop': {
                        arrTemp.push(...new Array(10).fill(false))
                        arrTemp.push(...getters.updateSongTrueFalse)
                        dispatch('weeklyRank/updateSongs', arrTemp, { root: true })
                        break
                    } 
                }
            }else{
                if(getters.nameSpacedComponent !== ''){
                    dispatch(getters.nameSpacedComponent + '/updateSongs', getters.updateSongTrueFalse, { root: true })
                }
            }
            

            dispatch('playAudio', false)
        },
        updateIndexSong({ commit }, payload) {
            commit('updateIndexSong', payload)
        },
        showNavRight({ commit }) {
            commit('updateNavRight', null, { root: true })
        },
        updateSongs({commit}, payload){
            commit('songs', payload)
        },
        updateNameSpacedComponent({commit}, payload){
            commit('nameSpacedComponent', payload)
        },
        updateSongTrueFalse({commit}, payload){
            commit('updateSongTrueFalse', payload)
        }
    }
}
