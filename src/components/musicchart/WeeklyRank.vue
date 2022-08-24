<template>
    <v-card style="max-width: 1238.4px; margin: 0px auto;background-image: url('https://i.pinimg.com/originals/e0/9e/92/e09e92bb2380849f81718680cf67a6b9.jpg')">
      <div class="blur_bg" style="background-image: linear-gradient( 0deg,hsla(0,0%,100%,0) 96%,#170f23);"></div>
      <div class="blur_bg" style="background-image: linear-gradient( 90deg,hsla(0,0%,100%,0) 95%,#170f23);"></div>
      <div class="blur_bg" style="background-image: linear-gradient( 180deg,hsla(0,0%,100%,0) 37%,#170f23);"></div>
      <div class="blur_bg" style="background-image: linear-gradient( 270deg,hsla(0,0%,100%,0) 95%,#170f23);"></div>
      <div class="blur_bg" style="background-image: linear-gradient( 180deg,#170f23,#170f23); opacity: 0.3;"></div>
      <v-card-title style="position:relative;z-index: 100000;">
        Bảng Xếp Hạng Tuần
      </v-card-title>
      <v-row>
        <v-col md="4" sm="12">
          <v-card elevation="24" color="transparent" style="padding-bottom: 22px;">
            <v-card-title>Việt Nam <v-icon color="white">mdi-play</v-icon></v-card-title>
            <v-row v-for="(song, index) in listSong.vietnam" :key="song.src+ index + 'a'">
              <v-col md="1" style="display: flex;vertical-align: middle;">
                <v-icon color="white" style="font-size: 30px;">mdi-numeric-{{ index + 1 }}-circle-outline</v-icon>
              </v-col>
              <v-col md="8">
                <v-row>
                    <v-col md="3">
                        <div style="width: 50px;" class="imgWeeklyRank">
                        <v-img :src="song.img" width="50px" height="50px" style="object-fit: cover;border-radius: 10%;" >
                            <v-btn height="100%" width="100%" color="transparent" style="padding:0px;min-width: 0;" @click="checkPause(index)">
                                <v-icon color="white" v-if="!songs[index]" style="visibility: hidden;">mdi-play</v-icon>
                                <v-icon color="white" v-else>mdi-pause</v-icon>
                            </v-btn>
                        </v-img>
                        </div>
                    </v-col>
                    <v-col md="8">
                        <v-card flat color="transparent" style="height: 100%;">
                            <v-card-subtitle style="padding: 0px;color:white;">{{ song.title }}</v-card-subtitle>
                            <v-card-text style="padding: 0px;color: whitesmoke">
                              <span
                                @mouseleave="leaveInforCard"
                                @mouseover="checkLoad(singer.user_id)"
                                style="position: relative"
                                v-for="singer in song.singer"
                                :key="singer.id"
                              >
                                <router-link
                                  class="link-singer"
                                  :to="'/singer/' + singer.id"
                                  style="opacity: 0.6"
                                >
                                  {{ singer.nickname }}
                                </router-link>
                                <div class="display-none">
                                  <SingerInfor
                                    v-if="!isHiddenInforCard"
                                    :singer="singerInfo"
                                  />
                                </div>
                              </span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
              </v-col>
              <v-col md="3">
                  <v-card flat color="transparent">
                      <v-card-subtitle style="color: whitesmoke;opacity: 0.6;">{{ song.time }}</v-card-subtitle>
                  </v-card>
              </v-col>
            </v-row>
          </v-card>
          <v-card flat color="transparent" style="text-align: center;margin-top:-18px;">
              <v-btn rounded outlined color="white">Xem tất cả</v-btn>
          </v-card>
        </v-col>
        <v-col md="4" sm="12">
          <v-card elevation="24" color="transparent"  style="padding-bottom: 22px;">
            <v-card-title>US-UK <v-icon color="white">mdi-play</v-icon></v-card-title>
            <v-row v-for="(song, index) in listSong.usuk" :key="song.src + index + 'b'">
              <v-col md="1" style="display: flex;vertical-align: middle;">
                <v-icon color="white" style="font-size: 30px;">mdi-numeric-{{ index + 1 }}-circle-outline</v-icon>
              </v-col>
              <v-col md="8">
                <v-row>
                    <v-col md="3"> 
                        <div style="width: 50px;" class="imgWeeklyRank">
                        <v-img :src="song.img" width="50px" height="50px" style="object-fit: cover;border-radius: 10%;" >
                            <v-btn height="100%" width="100%" color="transparent" style="padding:0px;min-width: 0;" @click="checkPause(index + 5)">
                                <v-icon color="white" v-if="!songs[index + 5]" style="visibility: hidden;">mdi-play</v-icon>
                                <v-icon color="white" v-else>mdi-pause</v-icon>
                            </v-btn>
                        </v-img>
                        </div>
                    </v-col>
                    <v-col md="8">
                        <v-card flat color="transparent" style="height: 100%;">
                            <v-card-subtitle style="padding: 0px;color:white;">{{ song.title }}</v-card-subtitle>
                            <v-card-text style="padding: 0px;color: whitesmoke;">
                              <span
                                @mouseleave="leaveInforCard"
                                @mouseover="checkLoad(singer.user_id)"
                                style="position: relative"
                                v-for="singer in song.singer"
                                :key="singer.id"
                              >
                                <router-link
                                  class="link-singer"
                                  :to="'/singer/' + singer.id"
                                  style="opacity: 0.6"
                                >
                                  {{ singer.nickname }}
                                </router-link>
                                <div class="display-none">
                                  <SingerInfor
                                    v-if="!isHiddenInforCard"
                                    :singer="singerInfo"
                                  />
                                </div>
                              </span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
              </v-col>
              <v-col md="3">
                  <v-card flat color="transparent">
                      <v-card-subtitle style="color: whitesmoke;opacity: 0.6;">{{ song.time }}</v-card-subtitle>
                  </v-card>
              </v-col>
            </v-row>
          </v-card>
          <v-card flat color="transparent" style="text-align: center;margin-top:-18px;">
              <v-btn rounded outlined color="white">Xem tất cả</v-btn>
          </v-card>
        </v-col>
        <v-col md="4" sm="12">
          <v-card elevation="24" color="transparent"  style="padding-bottom: 22px;">
            <v-card-title color="white">K-Pop <v-icon color="white">mdi-play</v-icon></v-card-title>
            <v-row v-for="(song, index) in listSong.kpop" :key="song.src+ index + 'c'">
              <v-col md="1" style="display: flex;vertical-align: middle;">
                <v-icon color="white" style="font-size: 30px;">mdi-numeric-{{ index + 1 }}-circle-outline</v-icon>
              </v-col>
              <v-col md="8">
                <v-row>
                    <v-col md="3"> 
                        <div style="width: 50px;" class="imgWeeklyRank">
                        <v-img :src="song.img" width="50px" height="50px" style="object-fit: cover;border-radius: 10%;" >
                            <v-btn height="100%" width="100%" color="transparent" style="padding:0px;min-width: 0;" @click="checkPause(index + 10)">
                                <v-icon color="white" v-if="!songs[index + 10]" style="visibility: hidden;">mdi-play</v-icon>
                                <v-icon color="white" v-else>mdi-pause</v-icon>
                            </v-btn>
                        </v-img>
                        </div>
                    </v-col>
                    <v-col md="8">
                        <v-card flat color="transparent" style="height: 100%;">
                            <v-card-subtitle style="padding: 0px;color:white;">{{ song.title }}</v-card-subtitle>
                            <v-card-text style="padding: 0px;color: whitesmoke">
                              <span
                                @mouseleave="leaveInforCard"
                                @mouseover="checkLoad(singer.user_id)"
                                style="position: relative"
                                v-for="singer in song.singer"
                                :key="singer.id"
                              >
                                <router-link
                                  class="link-singer"
                                  :to="'/singer/' + singer.id"
                                  style="opacity: 0.6"
                                >
                                  {{ singer.nickname }}
                                </router-link>
                                <div class="display-none">
                                  <SingerInfor
                                    v-if="!isHiddenInforCard"
                                    :singer="singerInfo"
                                  />
                                </div>
                              </span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
              </v-col>
              <v-col md="3">
                  <v-card flat color="transparent">
                      <v-card-subtitle style="color: whitesmoke;opacity: 0.6;">{{ song.time }}</v-card-subtitle>
                  </v-card>
              </v-col>
            </v-row>
          </v-card>
          <v-card flat color="transparent" style="text-align: center;margin-top:-18px;">
              <v-btn rounded outlined color="white">Xem tất cả</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import SingerInfor from "../general/SingerInfo.vue"
import { singerInforMixin } from '@/mixin/SingerInforMixin.js'

export default {
  mixins: [singerInforMixin],
  components:{SingerInfor},
    created(){
        this.$store.dispatch('weeklyRank/updateSongs', new Array(15).fill(false))
        this.getTop5All()
    },
    computed: {
        ...mapGetters('weeklyRank',['listSong','songs','pause','index_weekly_rank'])
    },
    methods: {
        ...mapActions('weeklyRank',['updateListSong','updateSongs','checkPause']),
        getTop5All(){
          axios.get('/song/get-top5-all-genre')
          .then( (response) => {
            var res = response.data.songs.vietnam
            var top5VN = []
            for(let i = 0; i < res.length; i++){
              var data = {
                id: res[i].id,
                img: 'https://docs.google.com/uc?id=' + res[i].image,
                title: res[i].name,
                singer: res[i].singer,
                src: 'https://docs.google.com/uc?id=' + res[i].src,
                mvId: res[i].mv_id
              }
              top5VN[i] = data
            }

            res = response.data.songs.usuk
            var top5Usuk = []
            for(let i = 0; i < res.length; i++){
              data = {
                img: 'https://docs.google.com/uc?id=' + res[i].image,
                title: res[i].name,
                singer: res[i].singer,
                src: 'https://docs.google.com/uc?id=' + res[i].src,
                mvId: res[i].mv_id
              }
              top5Usuk[i] = data
            }

            res = response.data.songs.kpop
            var top5Kpop = []
            for(let i = 0; i < res.length; i++){
              data = {
                img: 'https://docs.google.com/uc?id=' + res[i].image,
                title: res[i].name,
                singer: res[i].singer,
                src: 'https://docs.google.com/uc?id=' + res[i].src,
                mvId: res[i].mv_id
              }
              top5Kpop[i] = data
            }
            var temp = {}
            temp.vietnam = top5VN
            temp.usuk = top5Usuk
            temp.kpop = top5Kpop
            this.$store.dispatch('weeklyRank/updateListSong', temp)
          })
          .catch(() => {
            console.log('fail to get top 5 all')
          })
        }
    }
}
</script>

<style>
.imgWeeklyRank:hover .v-image__image{
    animation: zoomIn 1s ease forwards;

}
.imgWeeklyRank:hover .v-icon{
    visibility: visible !important;
}
    @keyframes zoomIn{
      from{
        transform: scale(1);
      }
      to{
        transform: scale(1.2);
      }
    }
</style>