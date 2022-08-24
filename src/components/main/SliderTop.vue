<template>
  <div style="width: 100%">
    <v-sheet
        class="slider-top"
        style="background-color:#170f23;"
    >
        <v-slide-group
        show-arrows
        @click:next="clickNext()"
        >
            <v-slide-item
                v-for="(slider, index) in sliders"
                :key="index"
            >
                <v-card
                class="card-img"
                style="border-radius: 10px;"
                >
                    <v-img :src="slider.img" style="object-fit:cover;border-radius: 8px;width: 377px;"></v-img>
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  data(){
    return{
      right: true
    }
  },
  created(){
    this.getSlider()
    this.autoMove()
  },
  computed:{
    ...mapGetters('sliderTop',['sliders'])
  },
  methods:{
    getSlider(){
      axios.get('/slide/get-slide')
      .then( (response) => {
        var res = response.data.slides
        var slides = []
        for(let i = 0;i < res.length; i++){
          var data = {}
          data.img =  "https://docs.google.com/uc?id=" + res[i].link
          slides.push(data)
        }
        this.$store.dispatch('sliderTop/updateSliders', slides)
      })
      .catch(()=>{
        console.log('fail to load slides')
      })
    },
    autoMove(){
        var interval = setInterval(() => {
          if(this.$route.name !== 'homepage'){
            clearInterval(interval)
            return
          }
          this.right = !this.right
          if(this.right){
            this.clickNext()
          }else{
            this.clickPrev()
          }
        }, 10000)
        setTimeout(interval, 0)
    },
    clickNext(){
      var next = document.getElementsByClassName("v-slide-group__next")[0]
      next.click()
    },
    clickPrev(){
      var prev = document.getElementsByClassName("v-slide-group__prev")[0]
      prev.click()
    }
  }
};
</script>

<style scope>
  .v-responsive__sizer{
    height: 200px;
    padding-bottom: 0px !important;
  }
  .mdi-chevron-left{
    font-size: 60px !important;
    color: black !important;
  }
  .mdi-chevron-right{
    font-size: 60px !important;
    color: black !important;
  }
  .slider-top .v-slide-group__prev{
    position: absolute;
    top: 37%;
    left: 0px;
    min-width: 0px !important;
    z-index: 10000;
    background-color: white;
    opacity: 0.5;
    border-radius: 50%;
    visibility: hidden;
  }
  .slider-top .v-slide-group__next{
    min-width: 0px !important;
    position: absolute;
    top: 37%;
    right: -0.1px;
    z-index: 10000;
    background-color: white;
    opacity: 0.5;
    border-radius: 50%;
    visibility: hidden;
  }
  .slider-top:hover .v-slide-group__prev{
    visibility: visible;
  }
  .slider-top:hover .v-slide-group__next{
    visibility: visible;
  }
  .card-img{
    margin : 0px 15px;
  }
  .card-img:nth-child(4n){
    margin-left: 0px;
  }
  .card-img:first-child{
    margin-left: 0px;
  }
  .card-img:nth-child(3n){
    margin-right: 0px;
  }
  .card-img:last-child{
    margin-right: 0px;
  }

</style>