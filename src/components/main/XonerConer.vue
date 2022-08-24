<template>
  <div style="background-color: #170f23;padding-bottom: 15px;width: 100%;">
    <h3 style="padding: 15px 0px">COC's CORNER</h3>
    <v-row>
      <div :class="hide5 ? 'hide-five' : ''" style="margin: 0px auto;" v-for="(justNow, index) in listJustNow" :key="index">
        <v-card flat style="background-color: #170f23;" class="opa">
          <v-img
            :src="justNow.img"
            :height="width + 'px'"
            :width="width + 'px'"
            style="object-fit: cover;margin : 0px;border-radius: 10px;"
            class="hoverImg"
          ></v-img>
          <Option :to="justNow.to"/>
        </v-card>
        <v-card flat style="background-color: #170f23;">
          <v-card-title style="background-color: #170f23;padding: 0px"><h6>{{ justNow.category }}</h6></v-card-title>
          <v-card-text :style="'width:' + width + 'px'" style="color: gray;padding: 0px">{{ justNow.detail }}</v-card-text>
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
  data(){
    return{
        width : 218.5,
        hide5 : false
    }
  },
  components:{
    Option
  },
  computed:{
    ...mapGetters('xonerConer',['listJustNow'])
  },
  created(){
    this.getCornerPlaylist()
  },
  updated(){
    this.firstLoad()
  },
  methods:{
    getCornerPlaylist(){
      axios.get('/playlist/get-corner')
      .then((response) => {
        var res = response.data.playlistCorner
        var listJustNow = []
        for(let i = 0; i < res.length; i++){
          var data = {
            img: 'https://docs.google.com/uc?id=' + res[i].image,
            category: res[i].name,
            to: '/playlist/' + res[i].id,
            detail: 'Mãi sau này anh mới biết'
          }
          listJustNow[i] = data
        }
        this.$store.dispatch('xonerConer/updateListJustNow', listJustNow)
      })
      .catch(() => {
        console.log('fail to get corner')
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
