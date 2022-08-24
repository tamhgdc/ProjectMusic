<template>
    <v-row class="px-6 pb-10" style="max-width: 1238.4px; margin: 0px auto;">
        <Radio/>
        <Schedule/>
    </v-row>
</template>

<script>
import Radio from '../main/Radio.vue'
import Schedule from './Schedule.vue'
export default {
    components:{
        Radio,
        Schedule
    }
}
</script>