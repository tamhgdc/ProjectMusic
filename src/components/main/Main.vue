<template>
    <v-row class="px-6" style="max-width: 1238.4px; margin: 0px auto;">
        <slider-top></slider-top>
        <just-now></just-now>
        <selected-today></selected-today>
        <xoner-coner></xoner-coner>
        <Radio></Radio>
        <NewSongEachDay/>
        <Chart/>
    </v-row>
</template>

<script>
import SliderTop from './SliderTop.vue'
import JustNow from './JustNow.vue'
import SelectedToday from './SelectedToday.vue'
import XonerConer from './XonerConer.vue'
import Radio from './Radio.vue'
import NewSongEachDay from './NewSongEachDay.vue'
import Chart from './Chart.vue'

export default {
    components:{
        SliderTop,
        JustNow,
        SelectedToday,
        XonerConer,
        Radio,
        NewSongEachDay,
        Chart
    }
}
</script>

<style>
    .moreTools{
      display: none;
    }

    .opa:hover > .moreTools{
      display: block;
    }
    .opa:hover .v-image__image{
      animation: zoomIn 1s ease forwards;
    }
    @keyframes zoomIn{
      from{
        transform: scale(1);
      }
      to{
        transform: scale(1.2);
        opacity: 0.6;
      }
    }

</style>