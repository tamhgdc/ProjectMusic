<template>
  <div style="background-color: #170f23;padding-bottom: 15px;width: 100%;" v-if="isJustNow">
    <h3 style="padding: 15px 0px">Nghe Gần Đây</h3>
    <v-row>
      <div :class="hide5 ? 'hide-five' : ''" style="margin: 0px auto;" v-for="(justNow, index) in listJustNow" :key="index">
        <v-card flat style="background-color: #170f23;"  class="opa">
          <v-img
            :src="justNow.img"
            :height="width + 'px'"
            :width="width + 'px'"
            style="object-fit: cover;margin : 0px; position: relative; border-radius: 10px;"
            class="hoverImg"
          ></v-img>
          <Option :to="justNow.to"/>
        </v-card>
        <v-card flat style="background-color: #170f23;">
          <v-card-title :style="'width:' + width + 'px'" style="padding: 6px 0px"><h6>{{ justNow.category }}</h6></v-card-title>
        </v-card>
      </div>

    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import Option from './Option.vue'
export default {
  components:{
    Option
  },
  data(){
    return{
      isJustNow: false,
      width: 218.5,
      hide5: false
    }
  },
  computed:{
    ...mapGetters('justNow',['listJustNow'])
  },
  created(){
    if(localStorage.getItem('music_token')){
      this.getPlaylistJustNow()
    }
  },
  updated(){
    this.firstLoad()
  },
  methods:{
    getPlaylistJustNow(){
      axios.get('/playlist/justnow')
      .then((response) => {
        var res = response.data.playlist
        var data = []
        for(let i = 0; i < res.length; i++){
          var obj = {}
          obj.img = 'https://docs.google.com/uc?id=' + res[i].image
          obj.category = res[i].name
          obj.to = res[i].link
          data.push(obj)
        }
        this.$store.dispatch('justNow/updateJustNow', data)
        if(data.length != 0) this.isJustNow = true
      })
      .catch(() => {
        console.log('fail to get playlist justnow')
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

<style>
.hide-five:nth-child(5){
  display: none;
}
</style>
