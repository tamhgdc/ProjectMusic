<template>
    <v-sheet :color="color" height="380px" style="position: relative;">
      <div :style="bgImg"></div>
      <div class="blur_bg" style="background-image: linear-gradient( 0deg,hsla(0,0%,100%,0) 37%,#170f23);"></div>
      <div class="blur_bg" style="background-image: linear-gradient( 90deg,hsla(0,0%,100%,0) 95%,#170f23);"></div>
      <div class="blur_bg" style="background-image: linear-gradient( 180deg,hsla(0,0%,100%,0) 37%,#170f23);"></div>
      <div class="blur_bg" style="background-image: linear-gradient( 270deg,hsla(0,0%,100%,0) 95%,#170f23);"></div>
      <div class="blur_bg" style="background-image: linear-gradient( 180deg,#170f23,#170f23); opacity: 0.3;"></div>
      <v-sparkline
        :labels="time"
        :value="value1"
        line-width="2"
        padding="16"
        auto-draw
        smooth="4"
        :fill="fill === 1"
        :gradient="gradient[0]"
        :style="fill === 1?'z-index: 99999':''"
        class="chart-line chart-line-1"
      ></v-sparkline>
      <v-sparkline
        :labels="time"
        :value="value2"
        line-width="2"
        padding="16"
        auto-draw
        smooth="4"
        :fill="fill === 2"
        :gradient="gradient[1]"
        :style="fill === 2?'z-index: 99999':''"
        class="chart-line chart-line-2"
      ></v-sparkline>
      <v-sparkline
        :labels="time"
        :value="value3"
        line-width="2"
        padding="16"
        auto-draw
        smooth="4"
        :fill="fill === 3"
        :gradient="gradient[2]"
        :style="fill === 3?'z-index: 99999':''"
        class="chart-line chart-line-3"
      ></v-sparkline>
    </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  // data(){
  //   return{
  //     bgImgGlobal: this.$store.getters['bgImgGlobal'],
  //   }
  // },
  computed: {
    ...mapGetters('lineChart',['time','value1','value2','value3','gradient','bgImg','fill','color']),
  },
  methods: {
    ...mapActions('lineChart',['updateFill'])
  },
  created(){
    this.$store.dispatch('lineChart/updateBgImg')
  }
};
</script>

<style>
    .chart-line {
      width: 100%;
      position: absolute;
      bottom: 0px;
      max-height: 380px;
    }
    .blur_bg{
      position:absolute;
      top: 0px ; 
      width: 100%;
      height: 100%; 
    }

</style>