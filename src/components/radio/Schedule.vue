<template>
  <div
    class="pa-4"
    style="
      background-image: linear-gradient(#12c2e9, #c471ed, #f64f59);
      border-radius: 5px;width: 100%;
    "
  >
    <v-row>
      <v-col md="1">
        <div style="height: 78.5px; width: 100%"></div>
        <v-row v-for="(show, index) in listShow" :key="index + 1000">
          <v-col>
            <v-card style="background-color: transparent" flat>
              <v-card style="background-color: transparent" flat>
                <v-img
                  height="58px"
                  width="58px"
                  :src="show.imgChannel"
                  style="
                    object-fit: cover;
                    background-color: transparent;
                    border-radius: 50%;
                    border: 2px solid #dc143c;
                  "
                ></v-img>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="11" style="position: relative;z-index: 0;">
        <v-sheet max-width="100%" color="transparent" height="100%">
          <v-btn plain style="position: absolute;z-index: 1;top: 45%;left:-20px;" @click="clickDisplayRange(1)">
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
          <v-slide-group show-arrows class="dpbl" style="height: 100%" ref="auto_scroll" next-icon="" prev-icon="">
            <div>
              <div
                style="display: flex; margin-left: 6px"
                class="time-schedule"
              >
                <div
                  v-for="(n, index) in 25"
                  :key="n"
                  style="margin-left: 12px"
                >
                  <v-card
                    width="240px"
                    style="background-color: transparent"
                    flat
                  >
                    <v-card-text style="color: white"
                      >{{ index }}:00</v-card-text
                    >
                  </v-card>
                </div>
              </div>
            </div>
            <div class="time-current" :style="{left: -4 + current_time_location +'px'}">
              <v-card :loading="loading_time" flat >
                  {{current_time}}
              </v-card>
            </div>
            <div class="line-hozi-time-current" :style="{left: 16 + current_time_location +'px'}"></div>
            <div class="triangle-time-current" :style="{left: 8 + current_time_location +'px'}"></div>
            <div
              v-for="(show, index) in listShow"
              :key="index"
              style="display: flex; width: 100%;margin-left: 12px;"
            >
              <v-slide-item v-for="item in show.shows" :key="item.key">
                <div
                  :style="{
                    width: item.type * 80 + 12 * (item.type / 3 - 1) + 'px',
                  }"
                  style="margin: auto 6px"
                >
                  <div class="d-flex">
                    <div>
                      <v-card flat>
                        <v-img
                          :src="item.img"
                          height="58px"
                          width="58px"
                          style="object-fit: cover"
                        ></v-img>
                      </v-card>
                    </div>
                    <v-card width="100%">
                      <v-card-text style="padding: 0px 5px">{{
                        item.title
                      }}</v-card-text>
                      <v-card-text style="padding: 0px 5px">{{
                        item.duration
                      }}</v-card-text>
                    </v-card>
                  </div>
                </div>
              </v-slide-item>
            </div>
          </v-slide-group>
          <v-btn plain style="position: absolute;z-index: 1;top: 45%;right:-20px;" @click="clickDisplayRange(2)">
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  mounted() {
    setInterval(this.dispatchGetCurrentTime, 1000)
    setTimeout(this.dispatchGetCurrentLocation, 0)
    setInterval(this.dispatchGetLocationLine, 60000)
    
  },
  methods: {
    ...mapActions('schedule',['getCurrentTime','getCurrentLocation','getLocationLine']),
    clickDisplayRange(payload){
      this.$store.dispatch('schedule/display_range', payload)
    },
    dispatchGetCurrentTime(){
      this.$store.dispatch('schedule/getCurrentTime')
    },
    dispatchGetCurrentLocation(){
      this.$store.dispatch('schedule/getCurrentLocation')
    },
    dispatchGetLocationLine(){
      this.$store.dispatch('schedule/getLocationLine')
    }
  },
  computed: {
    ...mapGetters('schedule',['listShow','current_time','current_time_location','loading_time','display_schedule_range','width'])
  }
};
</script>

<style>
.dpbl .v-slide-group__content {
  flex-direction: column !important;
  justify-content: space-between !important;
}
.time-schedule > div:first-child {
  margin-left: 0px !important;
}
.line-hozi-time-current{
  position: absolute;
  background-color: #FF1493;
  top: 70px;
  left: 16px;
  width: 4px;
  height: 100%;
  z-index: 1;
}
.triangle-time-current{
  position: absolute;
  left: 8px;
  bottom: 0px;
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #FF1493;
  z-index: 1;
}
.time-current{
  position: absolute;
  left: -4px;
  top: 47px;
  background-color: #FF1493;
  z-index: 1;
  padding: 2px;
  border-radius: 10%;
}
.time-current .v-card{
  background-color: #FF1493;
  color: white;
}
</style>