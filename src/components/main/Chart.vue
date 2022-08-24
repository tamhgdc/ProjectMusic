<template>
  <div
    class="d-flex pa-3 mb-10"
    style="background-color: #ba68c8;border-radius: 10px;width: 100%;"
  >
    <div style="width: 33%; margin-right: 2%">
      <v-btn text rounded color="white" class="btn-musicchart">
        <router-link to="/music-chart" style="color: white"
          >#musicchart</router-link
        >
        <v-icon>mdi-play-circle</v-icon>
      </v-btn>
      <div
        style="
          width: 100%;
          height: 81%;
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
        "
      >
        <div v-for="(top3, index) in listTop3" :key="index+'n'" style="width: 100%">
          <v-card
            class="d-flex px-1"
            :style="{ backgroundColor: gradient[index] }"
            @click="updateFill(index + 1)"
          >
            <div style="display: flex; align-items: center">
              <v-icon color="white">{{ icons[index] }}</v-icon>
              <v-btn text class="btn-play">
                <v-img
                  :src="top3.img"
                  height="65px"
                  width="65px"
                  style="object-fit: cover; border-radius: 3px"
                ></v-img>
                <div
                  style="position: absolute"
                  v-if="songs[index] === true"
                  @click="checkPause(index)"
                >
                  <v-icon>mdi-pause</v-icon>
                </div>
                <div
                  style="position: absolute"
                  v-else
                  @click="checkPause(index)"
                >
                  <v-icon>mdi-play</v-icon>
                </div>
              </v-btn>
            </div>
            <div>
              <v-card-title>{{ top3.title }}</v-card-title>
              <v-card-text>
                  <span
                    @mouseleave="leaveInforCard"
                    @mouseover="checkLoad(singer.user_id)"
                    style="position: relative"
                    v-for="singer in top3.singer"
                    :key="singer.id"
                  >
                    <router-link
                      class="link-singer"
                      :to="'/singer/' + singer.id"
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
            </div>
          </v-card>
        </div>
      </div>
      <div style="text-align: center; width: 100%; margin: 10px auto">
        <v-btn outlined rounded color="white">
          <router-link to="/music-chart" style="color: white"
            >Xem thêm</router-link
          >
        </v-btn>
      </div>
    </div>
    <v-card style="margin-top: 36px" width="calc(65% - 15px)">
      <line-chart
      ></line-chart>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import LineChart from "../musicchart/LineChart.vue";
import SingerInfor from "../general/SingerInfo.vue"
import { singerInforMixin } from '@/mixin/SingerInforMixin.js'

export default {
  mixins: [singerInforMixin],
  components: { LineChart, SingerInfor},
  created(){
    this.getTop3()
    this.$store.dispatch('updateBgImgGlobal',"url('https://yt3.ggpht.com/wqnYLDZRw2-BzwdIVeh0xHSmdohneRlmhG4GC9Dkh-ZA5ok48bSenQDVuUU2OoH-GNgXMYbF0tQ=s900-c-k-c0x00ffffff-no-rj')")
  },
  methods: {
    ...mapActions('chart',['checkPause','updateFill','updateSongs']),
    getTop3(){
      axios.get('/song/get-top3')
      .then((response) => {
        var res = response.data.top3
        var top3 = []
        for(let i = 0; i < res.length; i++){
          // var singers = ''
          // for(let j = 0; j < res[i].singer.length; j++){
          //   singers += res[i].singer[j].nickname + ', '
          // }
          // singers = singers.substring(0, singers.length - 2)
          var data = {
            id: res[i].id,
            img: 'https://docs.google.com/uc?id=' + res[i].image,
            title: res[i].name,
            singer: res[i].singer,
            src: 'https://docs.google.com/uc?id=' + res[i].src
          }
          top3[i] = data
        }
        this.$store.dispatch('chart/updateListTop3', top3)
      })
      .catch(() => {
        console.log('fail to get top 3')
      })
    }
  },
  computed:{
    ...mapGetters('chart',['icons','listTop3','gradient','color','fill','bg_img','songs']),
  }
};
</script>

<style scope>
.btn-play:before {
  opacity: 0 !important;
}
.v-ripple__container {
  display: none;
}
.btn-musicchart:before {
  opacity: 0 !important;
}
</style>