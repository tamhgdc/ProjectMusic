<template>
    <div class="my-5" style="max-width: 1200px;margin: 0px auto;position: relative;">

        <v-row style="position: absolute;top:0px;height: 11%;width:100%;background-image: url('https://i.pinimg.com/originals/e0/9e/92/e09e92bb2380849f81718680cf67a6b9.jpg')">
            <div class="blur_bg" style="background-image: linear-gradient( 0deg,hsla(0,0%,100%,0) 96%,#170f23);"></div>
            <div class="blur_bg" style="background-image: linear-gradient( 90deg,hsla(0,0%,100%,0) 95%,#170f23);"></div>
            <div class="blur_bg" style="background-image: linear-gradient( 180deg,hsla(0,0%,100%,0) 37%,#170f23);"></div>
            <div class="blur_bg" style="background-image: linear-gradient( 270deg,hsla(0,0%,100%,0) 95%,#170f23);"></div>
            <div class="blur_bg" style="background-image: linear-gradient( 180deg,#170f23,#170f23); opacity: 0.3;"></div>
        </v-row>

        <v-row class="mb-4">
            <h1 style="position:relative;z-index: 100">Mới phát hành <v-btn rounded color="primary"><v-icon>mdi-play</v-icon></v-btn></h1>
        </v-row>

        <v-row
          style="background-color: transparent;"
          class="py-2"
          align="center"
          align-content="center"
          v-for="(top100, index) in listTop100"
          :key="index"
        >
          <v-col md="1">
            <v-icon color="white" v-if="index < 10">mdi-numeric-{{ index + 1 }}</v-icon>
            <div v-else-if="index >= 10 && index < 99">
              <v-icon color="white" style="margin-left: -3px;">mdi-numeric-{{ ((index + 1) - (index + 1) % 10) / 10 }}</v-icon>
              <v-icon color="white" style="margin-left: -17px;">mdi-numeric-{{ (index + 1) % 10 }}</v-icon>
            </div>
            <div v-else>
              <v-icon color="white">mdi-numeric-10</v-icon>
              <v-icon color="white" style="margin-left: -13px;">mdi-numeric-0</v-icon>
            </div>
          </v-col>
          <v-col md="1">
            <v-icon color="white">mdi-minus</v-icon>
          </v-col>
          <v-col md="1">
            <v-btn text class="btn-play">
              <v-img
                :src="top100.img"
                height="50px"
                width="50px"
                style="object-fit: cover; border-radius: 3px"
              ></v-img>
              <div
                style="position: absolute"
                v-if="songs[index] === true"
                @click="checkPause(index)"
              >
                <v-icon>mdi-pause</v-icon>
              </div>
              <div style="position: absolute" v-else @click="checkPause(index)">
                <v-icon>mdi-play</v-icon>
              </div>
            </v-btn>
          </v-col>
          <v-col md="3">
            <p class="my-0" style="position:relative;z-index: 100">{{ top100.title }}</p>
            <span
              @mouseleave="leaveInforCard"
              @mouseover="checkLoad(singer.user_id)"
              style="position: relative"
              v-for="singer in top100.singer"
              :key="singer.id"
            >
              <router-link class="link-singer" :to="'/singer/' + singer.id">
                {{ singer.nickname }}
              </router-link>
              <div class="display-none">
                <SingerInfor v-if="!isHiddenInforCard" :singer="singerInfo" />
              </div>
            </span>
          </v-col>
          <v-col md="5">
            <p class="my-0" style="position:relative;z-index: 100">{{ top100.album }}</p>
          </v-col>
          <v-col md="1">
            <p class="my-0" style="position:relative;z-index: 100">{{ top100.time }}</p>
          </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
import SingerInfor from "../general/SingerInfo.vue"
import { singerInforMixin } from '@/mixin/SingerInforMixin.js'

export default {
    mixins: [singerInforMixin],
    components: {
      SingerInfor
    },
    computed: {
        ...mapGetters('newSongs', ['listTop100','color','songs'])
    },
    created(){
      if(this.$route.path.includes('new-songs')){
        this.getNewSongs()
      }else{
        this.getTopSongs()
      }
    },
    methods: {
        ...mapActions('newSongs', ['checkPause','updateListTop100']),
        getNewSongs(){
          axios.get('/song/get-top-new-songs')
          .then( (response) => {
            var res = response.data.songs
            var top = []
            for(let i = 0; i < res.length; i++){
              var data = {
                id: res[i].id,
                img: 'https://docs.google.com/uc?id=' + res[i].image,
                title: res[i].name,
                singer: res[i].singer,
                src: 'https://docs.google.com/uc?id=' + res[i].src,
                mvId: res[i].mv_id
              }
              top[i] = data
            }
            this.$store.dispatch('newSongs/updateListTop100', top)
          })
          .catch(() => {
            console.log('fail to load new songs')
          })
        },
        getTopSongs(){
          axios.get('/song/get-top100')
          .then( (response) => {
            var res = response.data.songs
            var top = []
            for(let i = 0; i < res.length; i++){
              var data = {
                img: 'https://docs.google.com/uc?id=' + res[i].image,
                title: res[i].name,
                singer: res[i].singer,
                src: 'https://docs.google.com/uc?id=' + res[i].src,
                mvId: res[i].mv_id
              }
              top[i] = data
            }
            this.$store.dispatch('newSongs/updateListTop100', top)
          })
          .catch(() => {
            console.log('fail to load new songs')
          })
        }
    }
}
</script>

<style scoped>
.btn-name-singer {
  min-width: 0px !important;
  padding: 0px !important;
  height: 0px !important;
}
.bg-music-chart {
  background-image: url("http://hanoimoi.com.vn/Uploads/lequyen/2019/1/16/1(3).jpg");
}

.style-top-3 > div:first-child > div:first-child > i {
  color: #FF1744 !important;
}

.style-top-3 div:nth-child(2) div:first-child i {
  color: #1E88E5 !important;
}

.style-top-3 div:nth-child(3) div:first-child i {
  color: #C0CA33 !important;
}

.style-top-3 i{
  font-size: 35px;
}

    .blur_bg{
      position:absolute;
      top: 0px ; 
      width: 100%;
      height: 100%; 
    }
</style>