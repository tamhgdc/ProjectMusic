<template>
  <div style="background-color: #170f23; padding-bottom: 15px; width: 100%">
    <h3>Radio Nổi Bật</h3>
    <v-row style="width: 100%">
      <v-sheet
        class="mx-auto"
        style="
          background-color: #170f23;
          margin: 0px !important;
          margin-left: 12px !important;
          width: 100%;
          margin-top: 20px;
        "
      >
        <v-slide-group show-arrows class="list-radio">
          <v-slide-item v-for="(radio, index) in radios" :key="index">
            <div class="mg">
              <v-card
                class="imgContainBtnPlay"
                height="173px"
                width="173px"
                style="border-radius: 50%"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  style="height: 173px; width: 173px; margin: 0px"
                >
                  <v-scale-transition>
                  <v-progress-circular
                    rotate="270"
                    value="35"
                    size="173"
                    width="8"
                    style="background-color: #170f23;"
                  >
                    <v-img
                      :src="radio.img"
                      style="
                        object-fit: cover;
                        height: 165px;
                        width: 165px;
                        border-radius: 50%;
                        position: relative;
                      "
                    >
                      <div
                        class="mask-play"
                        style="
                          position: relative;
                          height: 100%;
                          background-color:black;
                          opacity: 0.5;
                        "
                      ></div>
                      <div
                        class="btnPlay"
                        style="
                          position: absolute;
                          justify-content: center;
                          height: 100%;
                          width: 100%;
                          align-items: center;
                          top: 0px;
                        "
                      >
                        <v-btn
                          plain
                          outlined
                          style="
                            color: white;
                            min-width: 0px;
                            height: 50px;
                            width: 50px;
                            border-radius: 50px;
                          "
                          :to='radio.link'
                        >
                          <v-icon>mdi-play</v-icon>
                        </v-btn>
                      </div>
                    </v-img>
                  </v-progress-circular> 
                  </v-scale-transition>
                  <p class="live">LIVE</p>
                </v-row>
              </v-card>
              <div style="text-align: center; margin-top: 10px;">
                <h4 class="truncate">{{ radio.channel }}</h4>
                <h5>{{ radio.view }}</h5>
              </div>
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios'
export default {
  computed: {
    ...mapGetters("radio", ["radios"]),
  },
  created(){
    this.getPublicChatRoom()
  },
  methods: {
    getPublicChatRoom(){
      axios.get('/public-chat/get-rooms')
      .then((response) => {
        var res = response.data.rooms
        var radio = []
        for(let i = 0; i < res.length; i++){
          var data = {
            img: 'https://docs.google.com/uc?id=' + res[i].background_image,
            channel: res[i].name,
            link: '/public-chat/' + res[i].id,
            view: '1k đang nghe'
          }
          radio[i] = data
        }
        this.$store.dispatch('radio/updateRadios', radio)
      })
      .catch(() => {
        console.log('fail to get corner')
      })
    }
  }
};
</script>

<style scope>
.list-radio .mdi-chevron-left {
  color: black !important;
  font-size: 40px !important;
  background-color: white;
  border-radius: 50%;
  z-index: 10000;
}
.list-radio .mdi-chevron-right {
  color: black !important;
  font-size: 40px !important;
  background-color: white;
  border-radius: 50%;
  z-index: 10000;
}

.v-slide-group__prev {
  min-width: 0px !important;
}
.v-slide-group__next {
  min-width: 0px !important;
}
.live {
  background-color: red;
  color: white;
  font-size: 11px;
  padding: 0px 5px;
  border-radius: 3px;
  position: absolute;
  bottom: -8px;
  margin-bottom: 0px !important;
}
.mdi-play {
  font-size: 40px !important;
}
.mask-play {
  display: none;
}
.btnPlay {
  display: none;
}
.imgContainBtnPlay:hover .mask-play {
  display: block;
}
.imgContainBtnPlay:hover .v-image__image {
  animation: zoomIn 1s ease forwards;
}
.mask-play:hover + .btnPlay {
  display: flex;
}
.btnPlay:hover {
  display: flex;
}
.list-radio {
  width: 100%;
}
.list-radio .v-slide-group__prev {
  position: absolute;
  top: 30%;
  left: -1.7%;
}
.list-radio .v-slide-group__next {
  position: absolute;
  top: 30%;
  right: -1.7%;
}
.list-radio .mg:first-child {
  margin-left: 0px;
}
.list-radio .mg:nth-child(7n) {
  margin-left: 0px;
}
.list-radio .mg:nth-child(6n) {
  margin-right: 0px;
}
.list-radio .mg:last-child {
  margin-right: 0px;
}
.list-radio .mg {
  margin: 0px 15px;
}
.truncate {
  width: 165px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@keyframes zoomIn {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}
</style>