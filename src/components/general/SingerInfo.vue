<template>
  <v-card width="400px" color="#432275">
    <v-list-item>
      <v-list-item-avatar size="70px">
        <v-img
          :src="'https://docs.google.com/uc?id=' + singer.user.avatar"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ singer.nickname }}</v-list-item-title>
        <v-list-item-subtitle style="color: white; opacity: 0.69"
          >100K quan tâm</v-list-item-subtitle
        >
      </v-list-item-content>
      <v-list-item-action>
        <v-btn color="primary" rounded>
          <v-icon>mdi-account-plus</v-icon>
          Quan tâm
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-list-item>
      <v-list-item-content class="py-0" v-if="singer.description">
        {{ singer.description }}
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="removeAfter">
      <v-list-item-title>Mới nhất</v-list-item-title>
    </v-list-item>
    <v-list color="transparent" class="py-0">
      <v-row class="ma-0">
        <v-col sm="4" class="py-0" v-for="song in singer.songs" :key="song.id">
          <v-list-item class="d-flex flex-column removeAfter pa-0 avatar-info">
            <v-list-item-avatar
              style="position: relative"
              width="100%"
              height="60px"
              rounded="0"
            >
              <div class="bg-btn-play">
                <div class="show-btn-play-mv" style="height: 100%">
                  <v-btn
                    @click="playSong(song)"
                    style="display: none"
                    dark
                    class="absolute-btn"
                    absolute
                    icon
                  >
                    <v-icon size="48px">mdi-play-outline</v-icon>
                  </v-btn>
                </div>
              </div>
              <v-img style="border-radius: 5px" :src="'https://docs.google.com/uc?id=' + song.image">
              </v-img>
            </v-list-item-avatar>
            <v-list-item-content class="px-0 pb-0 float-left">
              <v-card-subtitle class="pa-0">{{ song.name }}</v-card-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-list>
    <v-list color="transparent" class="pt-0">
      <v-row class="ma-0">
        <v-col sm="4" class="pa-0" v-for="song in singer.songs" :key="song.id">
          <v-list-item style="text-align: center">
            <v-list-item-content class="py-0">
              <v-card-subtitle class="pa-0">{{
                new Date(song.releaseDate).getFullYear()
              }}</v-card-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: ["singer"],
  methods: {
    playSong(item) {
      axios
        .get("/user/singer/get-singer-by-song/" + item.id)
        .then((response) => {
          try{
            var songs = this.$store.getters["fixedplay/songs"];
            var indexPlaying = this.$store.getters["fixedplay/index_song"];
            var data = response.data.singers;
            var singers = "";
            for (let j = 0; j < data.length; j++) {
              singers += data[j].nickname + ", ";
            }
            var song = {
              id: item.id,
              img: "https://docs.google.com/uc?id=" + item.image,
              title: item.name,
              singer: singers,
              src: "https://docs.google.com/uc?id=" + item.src,
              mvId: item.mv_id,
            };
            songs.splice(indexPlaying + 1, 0, song);
            this.$store.dispatch("fixedplay/updateSongs", songs);
            if(this.$route.fullPath.includes('/mv')){
              this.$router.push(sessionStorage.getItem('back'))
              sessionStorage.removeItem('back')
              setTimeout(() => {
                this.$store.dispatch("fixedplay/nextSong");
              }, 1000)
            }else{
              this.$store.dispatch("fixedplay/nextSong");
            }
          }catch(err){
            console.log(err)
          }
        })
        .catch(() => {
          console.log("fail to get song");
        });
    },
  },
};
</script>

<style>
.removeAfter:after {
  content: none;
}
.avatar-info .v-list-item__avatar:first-child {
  margin: 0px !important;
}
</style>