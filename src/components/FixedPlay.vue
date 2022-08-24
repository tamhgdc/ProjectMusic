<template>
  <v-row style="height: 95px; z-index: 10000000;background-color: #170f23;padding: 0px;margin: 0px;" v-show="isShow">
    <div
    class="row"
      style="
        border-top: 1px solid white;
        justify-content: space-between;
        background-color: #170f23;
        width: 100%;
        position: fixed;
        bottom:0px;
        right: 0px;
        margin: 0px;
      "
    >
      <div class="d-flex col-sm-3 ">
        <div class="d-flex align-center">
          <v-img
            :src="live_song.img"
            :width="width + 'px'"
            :height="width + 'px'"
            style="object-fit: cover; border-radius: 50%"
          >
          </v-img>
        </div>
        <div class="d-flex" style="align-items: center; margin-left: 10px">
          <div>
            <p style="margin: 0px"><b>{{ live_song.title }}</b></p>
            <div style="display: flex">
              <p v-if="!live_song.singer"
                class="text-center px-2"
                style="
                  background: red;
                  border-radius: 6px;
                  font-size: 10px;
                  margin: 0px;
                "
              >
                <b>LIVE RADIO </b>
              </p>
              <p v-if="!live_song.singer"
                style="
                  font-size: 10px;
                  opacity: 0.6;
                  margin: 0px;
                  padding-left: 5px;
                "
              >
                467 đang nghe
              </p>
              <p v-if="live_song.singer"
                style="
                  font-size: 13px;
                  opacity: 0.6;
                  margin: 0px;
                  padding-left: 0px;
                "
              >
                <span v-for="singer in live_song.singer" :key="singer.id">
                  <router-link class="link-singer" :to="'/singer/' + singer.id">
                    <span>{{ singer.nickname }} </span>
                  </router-link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex" style="align-items: center" v-if="width === 88">
          <v-menu offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="mx-1"
                color="#432275"
                text
                icon
              >
                <v-icon style="color: white">mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list
              style="background-color: #432275; color: white; width: 250px"
            >
              <v-list-item @click="copy()">
                <v-list-item-icon>
                  <v-icon style="color: white">mdi-content-copy</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Sao chép link</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-menu offset-x>
                  <template v-slot:activator="{ on, links }">
                    <v-btn
                      v-bind="links"
                      v-on="on"
                      @click.prevent=""
                      style="width: 100%; padding: 0px"
                      color="#432275"
                      text
                    >
                      <v-list-item-icon>
                        <v-icon style="color: white">mdi-share</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          style="text-align: left; text-transform: initial"
                          >Chia sẻ</v-list-item-title
                        >
                      </v-list-item-content>
                      <v-icon style="color: white">mdi-unfold-more-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list style="background-color: #432275; color: white">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon style="color: white">mdi-facebook</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Facebook</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon style="color: white">mdi-twitter</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Twitter</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            class="mx-1"
            color="#432275"
            icon
            >
              <v-icon v-if="liked" @click="unlikeSong(live_song.id)" style="color: hotpink">mdi-heart</v-icon>
              <v-icon v-else @click="likeSong(live_song.id)" style="color: hotpink">mdi-heart-outline</v-icon>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div v-if="width !== 88" class="d-flex" >
          <v-btn text color="white" @click="emitParent()">
            <v-icon>mdi-unfold-less-horizontal</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="col-sm-6 " style="padding-top: 20px;">
        <div class="d-flex" style="align-items: center;justify-content: center;">
          <v-btn plain color="white" v-if="loop == true" @click="loopAudio()">
            <v-icon>mdi-repeat</v-icon>
          </v-btn>
          <v-btn plain color="white" v-else @click="loopAudio()">
            <v-icon>mdi-repeat-off</v-icon>
          </v-btn>
          <v-btn plain color="white" :style="index_song === 0? 'cursor: not-allowed;':''" @click="prevSong()">
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn outlined color="white" v-if="play == true" @click="playAudio(false)" class="btnPlayPause">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn outlined color="white" v-else @click="playAudio(true)" class="btnPlayPause">
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn plain color="white" :style="index_song === songs.length - 1? 'cursor: not-allowed;':''" @click="index_song !== songs.length - 1?nextSong() : ''">
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
          <v-btn plain color="white">
            <v-icon>mdi-shuffle-variant</v-icon>
          </v-btn>
        </div>
        <div class="d-flex" style="align-items: center;">
          <span style="opacity: 0.5;">{{timeViewDuration}}</span>
          <v-slider
            v-model="timeCurrent"
            :max="timeEnd"
            style="width:100%;"
            class="time-current-slider-2"
            @click="playTimeCurrent"
          ></v-slider>
          <span>{{duration}}</span>
        </div>
      </div>
      <div class="d-flex col-sm-3 " style="align-items: center;">
        <v-btn v-if="live_song.mvId != null" plain color="white" @click="goToMV(live_song.mvId)">
          <v-icon>mdi-movie-open-play</v-icon>
        </v-btn>
        <v-btn class="speakers" plain color="white" v-if="vol >= 80 && sing == true" @click="updateSing(false)">
          <v-icon>mdi-volume-high</v-icon>
        </v-btn>
        <v-btn class="speakers" plain color="white" v-if="vol >= 50 && vol < 80 && sing == true" @click="updateSing(false)">
          <v-icon>mdi-volume-medium</v-icon>
        </v-btn>
        <v-btn class="speakers" plain color="white" v-if="vol > 0 && vol < 50 && sing == true" @click="updateSing(false)">
          <v-icon>mdi-volume-low</v-icon>
        </v-btn>
        <v-btn class="speakers" plain color="white" v-if="vol == 0 || sing == false" @click="updateSing(true)">
          <v-icon>mdi-volume-off</v-icon>
        </v-btn>
        <v-slider
          v-model="vol"
          class="volumns"
          @click="updateSing(true)"
        >
        </v-slider>
        <v-btn plain v-if="live_song.singer" @click="showNavRight()">
          <v-icon  color="white" >mdi-playlist-music</v-icon>
        </v-btn>
      </div>
    </div>
    
    <audio style="visibility: hidden;" controls ref="player" id="myAudio" preload="metadata">
      <source :src="src" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  props: ['isShow'],
  data(){
    return{
      width: 88,
      liked: false
    }
  },
  created(){
    this.$store.dispatch('fixedplay/updateSrc')
    
    // this.unwatchVol = this.$store.watch(
    //   (state, getters) => getters.vol,
    //   (newValue) => {
    //     this.adjustVol = newValue
    //   }
    // )
  },
  beforeDestroy() {
    // this.unwatchVol()
  },
  mounted() {
    this.$store.dispatch('fixedplay/mounted')
  },
  updated(){
    this.firstLoadWidthImage()
  },
  methods: {
    ...mapActions('fixedplay',['playAudio','loopAudio','playTimeCurrent','updateSrc','updateSing','prevSong','nextSong','updateIndexSong','showNavRight']),
    firstLoadWidthImage(){
      if(this.$vuetify.breakpoint.mobile){
        this.width = 50
      }else{
        this.width = 88
      }
    },
    emitParent(){
      this.$store.dispatch('updateIsShow', false)
    },
    goToMV(id){
      this.$store.dispatch('updateIsHiddenSideBarLeft', true)
      this.$router.push( '/mv/' + id )
    },
    likeSong(id){
        axios.post('/user/like-song', {
          songId: id
        })
        .then(() => {
          this.liked = true
        })
        .catch(() => {
        })
    },
    unlikeSong(id){
        axios.post('/user/unlike-song', {
          songId: id
        })
        .then(() => {
          this.liked = false
        })
        .catch(() => {
        })
    }
  },
  computed:{
    ...mapGetters('fixedplay',['loop','sing','ended','duration','timeEnd','timeViewDuration','songs','src','live_song','index_song']),
    play: {
      get(){
        return this.$store.getters.play
      },
      set(newValue){
        this.$store.dispatch('updatePlay', newValue)
      }
    },
    //vi` thang nay la v-model
    timeCurrent: {
      get(){
        return this.$store.getters['fixedplay/timeCurrent']
      },
      set(newValue){
        this.$store.dispatch('fixedplay/updateTimeCurrent', newValue)
      }
    },
    vol: {
      get(){
        return this.$store.getters['fixedplay/vol']
      },
      set(newValue){
        this.$store.dispatch('fixedplay/updateVol', newValue)
      }
    }
  },
  watch: {
    sing(){
      this.$store.dispatch('fixedplay/updateSing', this.sing)
    },
    "$vuetify.breakpoint.width"(){
      this.firstLoadWidthImage()
    },
    live_song(){
      if(this.live_song.id != null){
        axios.get('/user/check-like-song', {params : {
          songId : this.live_song.id
        }})
        .then( (response) => {
          if(response.data.message == 'like'){
            this.liked = true
          }else{
            this.liked = false
          }
        })
        .catch( (response) => {
          console.log(response)
          this.liked = false
        })
      }
    }
  }
};
</script>

<style>
  .speakers{
    padding-right: 0px !important;
    padding-left: 0px !important;
    min-width: 0px !important;
  }
  .volumns{
    margin-top: 20px;
  }
  .btnPlayPause{
    border-radius: 50%;
    padding: 0px !important; 
    height: 48px !important; 
    min-width: 48px !important;
  }
  .time-current-slider-2  .v-messages{
    min-height: 0px !important;
  }
  .time-current-slider-2{
    margin-top: 0px;
  }
  .time-current-slider-2 .v-input__slot{
    margin: 0px;
  }
</style>