<template>
  <div class="px-6" style="max-width: 1238.4px; margin: 0px auto">
    <v-row style="position: relative">
      <v-col md="3" style="position: sticky; top: 0px">
        <div class="text-center">
          <v-img
            :src="liveAlbum.img"
            height="300px"
            width="300px"
            id="circleImg"
          ></v-img>
          <h3 style="margin-top: 10px">{{ liveAlbum.name }}</h3>
          <h5 style="opacity: 0.5">Cập nhật: {{ liveAlbum.updatedTime }}</h5>
          <h5 style="opacity: 0.5">{{ liveAlbum.artists }}</h5>
          <h5 style="opacity: 0.5; margin-bottom: 10px">
            {{ liveAlbum.numberOfLike }} người yêu thích
          </h5>
          <!-- <v-btn rounded color="#7200a1" style="margin-bottom:10px;" class="py-5" v-if="playing == false" @click="clickPlaying(!playing)">
                    <v-icon color="white">mdi-play</v-icon>
                    <span style="color:white">TIẾP TỤC PHÁT</span>
                </v-btn>
                <v-btn rounded color="#7200a1" style="margin-bottom:10px;" class="py-5" v-else @click="clickPlaying(!playing)">
                    <v-icon color="white">mdi-stop</v-icon>
                    <span style="color:white">TẠM DỪNG</span>
                </v-btn> -->
          <div class="text-center">
            <v-btn
              fab
              style="margin-right: 5px; background-color: rgb(35 27 46)"
            >
              <v-icon color="white">mdi-heart</v-icon>
            </v-btn>
            <v-btn
              fab
              style="margin-left: 5px; background-color: rgb(35 27 46)"
            >
              <v-icon color="white">mdi-dots-horizontal</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col
        md="9"
        style="overflow: auto"
        :style="{ height: height - 95 + 'px' }"
      >
        <div style="padding: 12px">
          <v-row
            style="background-color: transparent"
            class="py-2"
            align="center"
            align-content="center"
            v-for="(top100, index) in listTop100"
            :key="index"
          >
            <v-col md="1">
              <v-btn text class="btn-play">
                <v-img
                  :src="top100.img"
                  height="50px"
                  width="50px"
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
            </v-col>
            <v-col md="5">
              <p class="my-0">{{ top100.title }}</p>
              <v-btn text class="btn-name-singer" color="white">
                {{ top100.singer }}
              </v-btn>
            </v-col>
            <v-col md="5">
              <p class="my-0">{{ top100.album }}</p>
            </v-col>
            <v-col md="1">
              <p class="my-0">{{ top100.time }}</p>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row style="margin: 0px">
      <h3 class="py-5">Nghệ Sĩ Tham Gia</h3>
    </v-row>
    <div class="images-grid">
        <div class="image-item" v-for="(singer, index) in singers" :key="singer.id + '_' +index">
            <img :src="singer.img" alt="">
            <div class="btn-play-album-singer">
              <v-btn fab plain class="btn-play-album" color="white">
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </div>
            <div class="text-center pt-2">
                <h5>{{ singer.name }}</h5>
                <h6 style="opacity: 0.5">{{ singer.follow }} quan tâm</h6>
                <v-btn color="#2f2739" rounded>
                    <v-icon color="white">mdi-account-plus-outline</v-icon>
                    <span>QUAN TÂM</span>
                </v-btn>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.getAllSongPlayList();
  },
  mounted() {
    this.$store.dispatch("album/updateHeight", window.innerHeight);
    // if(this.$store.getters['fixedplay/index_song'] == 0){
    //     this.$store.dispatch('fixedplay/playAudio', true)
    // }
  },
  computed: {
    ...mapGetters("album", [
      "srcImg",
      "listTop100",
      "songs",
      "playing",
      "height",
      "singers",
      "liveAlbum",
    ]),
  },
  methods: {
    ...mapActions("album", ["checkPause", "updateHeight", "playingAction"]),
    clickPlaying(payload) {
      this.$store.dispatch("album/updatePlaying", payload);
    },
    getAllSongPlayList() {
      let id = this.$route.params.id;
      if (this.$route.path.includes("album")) {
        axios
          .get("/song/get-all-song-album/" + id)
          .then((response) => {
            var res = response.data.songs;
            var songs = [];
            for (let i = 0; i < res.length; i++) {
              var obj = {};
              obj.id = res[i].id
              obj.img = "https://docs.google.com/uc?id=" + res[i].image;
              obj.title = res[i].name;
              obj.singer = "Test singer";
              obj.album = "Test album";
              obj.time = res[i].timeDuration;
              obj.src = "https://docs.google.com/uc?id=" + res[i].src;
              obj.mvId = res[i].mv_id;
              songs.push(obj);
            }
            this.$store.dispatch("album/updateListTop100", songs);
            if (this.$store.getters["fixedplay/updateSongTrueFalse"][0]) {
              this.$store.getters["fixedplay/updateSongTrueFalse"][0] = false;
            }
            setTimeout(() => {
              this.checkPause(0);
            }, 500);
          })
          .catch((response) => {
            console.log(response);
          });
      } else {
        if (this.$route.path.includes("genre")) {
          axios
            .get(
              "/song/get-song-by-genre/" +
                this.$route.params.genre_id +
                "/singer/" +
                this.$route.params.singer_id
            )
            .then((response) => {
              var res = response.data.data;
              var songs = [];
              for (let i = 0; i < res.length; i++) {
                var obj = {};
                obj.id = res[i].id
                obj.img = "https://docs.google.com/uc?id=" + res[i].image;
                obj.title = res[i].name;
                obj.singer = "Test singer";
                obj.album = "Test album";
                obj.time = res[i].timeDuration;
                obj.src = "https://docs.google.com/uc?id=" + res[i].src;
                obj.mvId = res[i].mv_id;
                songs.push(obj);
              }
              this.$store.dispatch("album/updateListTop100", songs);
              if (this.$store.getters["fixedplay/updateSongTrueFalse"][0]) {
                this.$store.getters["fixedplay/updateSongTrueFalse"][0] = false;
              }
              setTimeout(() => {
                this.checkPause(0);
              }, 500);
            })
            .catch((response) => {
              console.log(response);
            });
        } else {
          axios
            .get("/song/get-all-song-playlist/" + id)
            .then((response) => {
              var res = response.data.songs;
              var songs = [];
              for (let i = 0; i < res.length; i++) {
                var obj = {};
                obj.id = res[i].id
                obj.img = "https://docs.google.com/uc?id=" + res[i].image;
                obj.title = res[i].name;
                obj.singer = "Test singer";
                obj.album = "Test album";
                obj.time = res[i].timeDuration;
                obj.src = "https://docs.google.com/uc?id=" + res[i].src;
                obj.mvId = res[i].mv_id;
                songs.push(obj);
              }
              this.$store.dispatch("album/updateListTop100", songs);
              if (this.$store.getters["fixedplay/updateSongTrueFalse"][0]) {
                this.$store.getters["fixedplay/updateSongTrueFalse"][0] = false;
              }
              setTimeout(() => {
                this.checkPause(0);
              }, 500);
            })
            .catch((response) => {
              console.log(response);
            });
        }
      }
    },
  },
  watch: {
    playing() {
      this.$store.dispatch("album/playingAction");
    },
    "$route.params.id"() {
      if (this.$route.params.id) {
        this.getAllSongPlayList();
      }
    },
  },
};
</script>

<style scoped>
.btn-play-album-singer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
}

.images-grid{
    display: grid;
    /* grid-template-columns: repeat(5, 1fr); */
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.image-item {
    border-radius: 100%;
    height: 200px;
    margin-bottom: 110px;
    position: relative;
}

.image-item:hover .btn-play-album{
    display: block;
}

.image-item img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
}

.btn-name-singer {
  min-width: 0px !important;
  padding: 0px !important;
  height: 0px !important;
}
::-webkit-scrollbar {
  display: none;
}
.col-xs-5ths {
  padding-right: 10px;
  padding-left: 10px;
  width: 20%;
}
.img-5ths {
  height: 200px;
}
.btn-play-album {
  display: none;
}
.col-xs-5ths:hover .btn-play-album {
  display: flex !important;
}
.rotate {
  animation: borderRadius 0.5s ease forwards, rotation 15s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
@keyframes borderRadius {
  from {
    border-radius: 10%;
  }
  to {
    border-radius: 50%;
  }
}
</style>