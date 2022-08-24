<template>
  <div style="background-color: #170f23;padding-bottom: 15px;margin-bottom: 20px;width: 100%;">
    <h3 style="padding: 15px 0px">Nhạc Mới Mỗi Ngày</h3>
    <v-row>
      <div :class="hide5 ? 'hide-five' : ''" style="margin: 0px auto;" v-for="(eachDay, index) in listEachDay" :key="index">
        <v-card flat style="background-color: #170f23;" class="opa">
          <v-img
            :src="eachDay.img"
            :height="width + 'px'"
            :width="width + 'px'"
            style="object-fit: cover;margin : 0px; position: relative;border-radius: 10px;"
            class="hoverImg"
          ></v-img>
          <Option :to="eachDay.to"/>
        </v-card>
        <v-card flat style="background-color: #170f23;">
          <v-card-title style="padding: 0px"><h6>{{ eachDay.title }}</h6></v-card-title>
          <v-card-text :style="'width:' + width + 'px'" style="padding: 0px;color:gray">{{eachDay.detail}}</v-card-text>
        </v-card>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Option from './Option.vue'
import axios from 'axios'
export default {
  data(){
    return{
        width : 218.5,
        hide5 : false
    }
  },
  components:{
    Option
  },
  created(){
    this.getAllNewSongInMonth()
  },
  updated(){
    this.firstLoad()
  },
  computed: {
    ...mapGetters('newSongEachDay',['listEachDay'])
  },
  methods: {
    getAllNewSongInMonth(){
      axios.get('/playlist/get-all-new-playlist-in-month')
      .then( (response) => {
        var res = response.data.playlists
        var listEachDay = []
        for(let i = 0; i < res.length; i++){
          var data = {
            img: 'https://docs.google.com/uc?id=' + res[i].image,
            category: res[i].name,
            to: '/playlist/' + res[i].id,
            detail: 'Nhạc mới tháng 4'
          }
          listEachDay[i] = data
        }
        this.$store.dispatch('newSongEachDay/updateListEachDay', listEachDay)
      })
      .catch(() => {
        console.log('fail to get five selected today')
      })
    },
    firstLoad(){
      if(this.$vuetify.breakpoint.width >= 1536){
        this.width = 218.5
        this.hide5 = false
      }
      else if(this.$vuetify.breakpoint.width > 1264 && this.$vuetify.breakpoint.width < 1536){
        this.width = 198
        this.hide5 = false
      }else if(this.$vuetify.breakpoint.width > 960 && this.$vuetify.breakpoint.width <= 1264){
        this.width = 176
        this.hide5 = false
      }else if(this.$vuetify.breakpoint.width >= 759 && this.$vuetify.breakpoint.width <= 960){
        this.width = 250
        this.hide5 = true
      }else{
        this.width = 200
        this.hide5 = true
      }
    }
  },
  watch:{
    "$vuetify.breakpoint.width"(){
      this.firstLoad()
    }
  }
};
</script>
