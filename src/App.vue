<template>
  <v-app style="background-color: #170f23;">
    <v-row  style="background-color: #170f23; padding-bottom: 0px;">
      <v-navigation-drawer
        v-if="!isHiddenSideBarLeft"
        permanent
        :mini-variant="!showSidebarLeft"
        fixed
        app
        style="background-color: #231b2e; z-index: 9999999"
      >
        <sidebar/>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <Menu v-if="showMenu" />
          <!-- <keep-alive> -->
            <router-view />
          <!-- </keep-alive> -->
        </v-container>
      </v-main>

      
        <div v-show="navRight">
          <SidebarRight />
        </div>
      
    </v-row>
    <fixed-play v-if="showFixedPlay" :isShow="isShow"></fixed-play>
    <div style="position: fixed; bottom: 25px; right: 0px">
      <v-btn text @click="isShow = true">
        <v-icon color="white">mdi-unfold-more-horizontal</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import SidebarRight from "./components/SidebarRight.vue";
import FixedPlay from "./components/FixedPlay.vue";
import Menu from "./components/Menu.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    Sidebar,
    SidebarRight,
    Menu,
    FixedPlay,
  },
  computed: {
    ...mapGetters([
      "navRight",
      "itemSideBars",
      "itemBelowSideBars",
      "right",
      "nameCom",
      "showSidebarLeft",
      "showMenu",
      "showFixedPlay",
      "user",
      "isHiddenSideBarLeft"
    ]),
    currentUser: {
      get() {
        return this.$store.state.user;
      },
    },
    isShow: {
      get() {
        return this.$store.state.isShow;
      },
      set() {
        return this.$store.dispatch("updateIsShow", true);
      },
    },
  },
  created() {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1"
    // axios.defaults.baseURL = 'https://be-coc-music.herokuapp.com/api/v1'
    var songWhenCreate = [];
    if (localStorage.getItem("music_token")) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("music_token");
      this.$store.dispatch("getUser", { root: true });
      axios
        .get("/song/get-songs-playlist-user")
        .then((response) => {
          var res = response.data.songs
          var songs = []
          if (res.length != 0) {
            for (let i = 0; i < res.length; i++) {
              var data = {
                id: res[i].id,
                img: "https://docs.google.com/uc?id=" + res[i].image,
                title: res[i].name,
                singer: res[i].singer,
                src: "https://docs.google.com/uc?id=" + res[i].src,
                mvId: res[i].mv_id
              };
              songs[i] = data;
            }
            songWhenCreate = songs;

            this.$store.dispatch("fixedplay/updateSongs", songWhenCreate, {
              root: true,
            });
            var temp = [];
            for (let i = 0; i < songWhenCreate.length; i++) {
              temp.push(songWhenCreate[i]);
            }
            this.$store.dispatch("sidebarRight/updateItems", temp, {
              root: true,
            });

            //get list played
            temp = [];
            temp.push(songWhenCreate[0]);
            this.$store.dispatch("sidebarRight/updateSongPlayed", temp, {
              root: true,
            });
            if(this.$route.path.includes('admin') || this.$route.path.includes('public-chat')){
              this.$store.dispatch("updateShowFixedPlay", false);
            }else{
              this.$store.dispatch("updateShowFixedPlay", true);
            }
            this.$store.dispatch("sidebarRight/updateIsTurnOn", true);
          }else {
            songWhenCreate = [
              {
                img: "https://i.ytimg.com/vi/HK31DrqpztM/maxresdefault.jpg",
                title: "Nếu ngày ấy",
                singer: 'Soobin',
                album: "Playah (Album)",
                time: "03:44",
                src: "https://docs.google.com/uc?id=1dQzoVIgyQe6SYYduJm6o0OhFm0on_nWL",
                mvId: 4
              },
              {
                img: "https://images.genius.com/cfb3f64ab2fc08506b2365b1d8ab959b.600x600x1.webp",
                title: "Thay mọi cô gái yêu anh",
                singer: "AMEE",
                album: "Chạy Về Khóc Với Anh (Single)",
                time: "03:44",
                src: "https://docs.google.com/uc?id=1_ds2_IIEpt_bhzBO9Sxtl6_xdZIbia69",
                mvId: 4
              },
              {
                img: "https://i.ytimg.com/vi/DYdMUzHwAMY/hqdefault.jpg",
                title: "Em bỏ hút thuốc chưa",
                singer: "Bích Phương",
                album: "Chạy Về Khóc Với Anh (Single)",
                time: "03:44",
                src: "https://docs.google.com/uc?id=1a_dgCSHWj_AFd1-Gto6ogEByva5v-AMR",
                mvId: 4
              },
            ]
          }
        })
        .catch(() => {
          console.log("fail to load first playlist");
        });
    } else {
      //Chưa login
      songWhenCreate = [
        {
          img: "https://i.ytimg.com/vi/HK31DrqpztM/maxresdefault.jpg",
          title: "Nếu ngày ấy",
          singer: "Soobin",
          album: "Playah (Album)",
          time: "03:44",
          src: "https://docs.google.com/uc?id=1dQzoVIgyQe6SYYduJm6o0OhFm0on_nWL"
        },
        {
          img: "https://images.genius.com/cfb3f64ab2fc08506b2365b1d8ab959b.600x600x1.webp",
          title: "Thay mọi cô gái yêu anh",
          singer: "AMEE",
          album: "Chạy Về Khóc Với Anh (Single)",
          time: "03:44",
          src: "https://docs.google.com/uc?id=1_ds2_IIEpt_bhzBO9Sxtl6_xdZIbia69",
        },
        {
          img: "https://i.ytimg.com/vi/DYdMUzHwAMY/hqdefault.jpg",
          title: "Em bỏ hút thuốc chưa",
          singer: "Bích Phương",
          album: "Chạy Về Khóc Với Anh (Single)",
          time: "03:44",
          src: "https://docs.google.com/uc?id=1a_dgCSHWj_AFd1-Gto6ogEByva5v-AMR",
        },
      ];
      this.$store.dispatch("fixedplay/updateSongs", songWhenCreate, {
        root: true,
      });
      var temp = [];
      for (let i = 0; i < songWhenCreate.length; i++) {
        temp.push(songWhenCreate[i]);
      }
      this.$store.dispatch("sidebarRight/updateItems", temp, { root: true });

      //get list played
      temp = [];
      temp.push(songWhenCreate[0]);
      this.$store.dispatch("sidebarRight/updateSongPlayed", temp, {
        root: true,
      });
      this.$store.dispatch("updateShowFixedPlay", true);
      this.$store.dispatch("sidebarRight/updateIsTurnOn", true);
    }
    if(this.$route.name == 'show-mv'){
      this.$store.dispatch('updateShowSidebarLeft', false)
      this.$store.dispatch("updateShowFixedPlay", false)
      this.$store.dispatch('updateIsHiddenSideBarLeft', true)
    }
  },
  mounted() {
    this.firstLoadSidebarApp();
    if(!this.$route.path.includes('admin')){
      var arr = [
        { title: "Cá Nhân", icon: "mdi-account-music" ,to:'/mymusic'},
        { title: "Khám Phá", icon: "mdi-sort-alphabetical-variant",to:'/' },
        { title: "Xếp Hạng", icon: "mdi-music",to:'/music-chart' },
        { title: "Radio", icon: "mdi-radio",to:'/radio' },
        { title: "Tin Tức", icon: "mdi-bell",to:'/post' },
      ]
      var itemBelowSideBars = [
        { title: "Nhạc Mới", icon: "mdi-new-box", to:'/new-songs'},
        { title: "Thể Loại", icon: "mdi-shape", to:'/hub'},
        { title: "Top 100", icon: "mdi-star", to:'/top-100'},
        { title: "MV", icon: "mdi-shopping-music", to:'/mv'},
      ]
      this.$store.dispatch('sideBar/updateItemSideBars', arr)
      this.$store.dispatch('sideBar/updateItemBelowSideBars', itemBelowSideBars)
    }
  },
  methods: {
    firstLoadSidebarApp() {
      if (this.$vuetify.breakpoint.mobile) {
        this.$store.dispatch("updateShowSidebarLeft", false);
      } else {
        this.$store.dispatch("updateShowSidebarLeft", true);
      }
    },
  },
  watch: {
    "$route.name": function () {
      if (this.$route.name === "login" || this.$route.name === "register") {
        this.$store.dispatch("updateShowSidebarLeft", false);
        this.$store.dispatch("updateShowMenu", false);
        this.$store.dispatch("updateShowFixedPlay", false);
      } else {
        this.$store.dispatch("updateShowSidebarLeft", true);
        this.$store.dispatch("updateShowMenu", true);
        this.$store.dispatch("updateShowFixedPlay", true);
        if(this.$route.path.includes('public-chat') || this.$route.path.includes('admin')){
          this.$store.dispatch('updateShowFixedPlay', false)
        }
      }
      if (this.$route.name === "login" && localStorage.getItem("music_token")) {
        this.$router.push("/");
      }

    },
    // "$vuetify.breakpoint.width"(){
    //   this.firstLoadSidebarApp()
    // }
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  color: white;
}
::-webkit-scrollbar {
  width: 10px;
  background-color: #170f23;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: grey;
}


/* .fade-active {
  transform: translate(0, 100%);
}

.fade-enter-active {
  transition: all 0.3s ease-out;
  transform: translate(-100%, 100%);
}

.fade-leave {
  transform: translate(-100%, 100%);
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  transform: translate(0, 100%);
}
.fade-enter-from,
.fade-leave-to {
  transform: translateX(-300px);
  opacity: 0;
} */
</style>
