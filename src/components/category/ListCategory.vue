<template>
  <div>
    <v-row>
      <v-col>
        <h2>Tâm Trạng Và Hoạt Động</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="4" @click="goToPlayList(0)" 
        v-for="(bg, index) in bground"
        :key="index">
        <v-card
          color="transparent"
          class="position-relative card-hub"
          height="218.5px"

        >
          <div class="bg-image-hub">
            <v-img
              class="rounded"
              style="object-fit: cover"
              height="218.5px"
              width="100%"
              :src="bg.backgr"
            ></v-img>
          </div>
          <span class="txt-hub px-2">{{ bg.title }}</span>
          <div
            class="position-absolute d-flex px-2 card-hub-sub"
            style="z-index: 2"
          >
            <div class="pr-1" v-for="(sub, id) in bg.subBg" :key="'sub' + id">
              <v-img
                style="top: 130px; border-radius: 5px"
                height="50px"
                width="50px"
                :src="sub"
              ></v-img>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-for="(category, index) in listCategory" :key="index">
      <v-col sm="12" class="py-0">
        <h3 style="text-transform: capitalize; width: 100%">
          {{ category.name }}
        </h3>
      </v-col>
      <v-col
        sm="6"
        md="3"
        v-for="(playlist, idx) in category.listPlaylist"
        :key="idx + '-pl'"
      >
        <div style="margin: 0px auto">
          <v-card
            flat
            style="background-color: #170f23"
            class="opa"
          >
            <v-img
              :src="playlist.img"
              height="300px"
              width="300px"
              style="object-fit: cover; margin: 0px; border-radius: 10px"
              class="hoverImg"
            ></v-img>
            <Option :to="playlist.to" />
          </v-card>
          <v-card flat style="background-color: #170f23">
            <v-card-title style="background-color: #170f23; padding: 0px"
              ><h6>{{ playlist.name }}</h6></v-card-title
            >
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Option from "@/components/main/Option";
import axios from 'axios';

export default {
  components: {
    Option,
  },
  data() {
    return {
      listCategory: [
        // {
        //   name: "Nhạc trữ tình",
        //   listPlaylist: [
        //     {
        //       name: "Test1",
        //       detail: "Test2 1 222",
        //       img: "https://img.etimg.com/photo/msid-68721421,quality-100/nature.jpg",
        //     },
        //     {
        //       name: "Test1",
        //       detail: "Test2 1 222",
        //       img: "https://img.etimg.com/photo/msid-68721421,quality-100/nature.jpg",
        //     },
        //   ],
        // }
      ],
      bground: [
          {
              backgr: 'https://docs.google.com/uc?id=1eN2NDSr7f3VkZNlfyU3ZxIBZ3kK_mSHB',
              subBg: [
                    'https://img.etimg.com/photo/msid-68721421,quality-100/nature.jpg',
                    'https://docs.google.com/uc?id=1Gz0CuajLTHKZDlrby6VDvpBm2_R8RkOd',
                    'https://docs.google.com/uc?id=19pQA3fr0aiMr-f01b3t3HcuJAg1IttVs'
              ],
              title: 'Tình yêu'
          },
          {
              backgr: 'https://docs.google.com/uc?id=1RrHZS1aK_ymW5xRsBf1JCuQRZPfGoSW0',
              subBg: [
                    'https://docs.google.com/uc?id=17dvtnfzWUH8mzFYZ3FLhkDMGGe3iy1Sk',
                    'https://docs.google.com/uc?id=1EIpL9YaSG5hC97r-1u4NXJtu-CbQ3ZAl',
                    'https://docs.google.com/uc?id=18rGmaVhD7-e4dMguj0c8YGDhIX1CAgGL'
              ],
              title: 'Du lịch'
          },
          {
              backgr: 'https://docs.google.com/uc?id=13gmqw4Ux5KrK-bsYAeYopBXaCMtFy0PN',
              subBg: [
                    'https://docs.google.com/uc?id=1tp0GlgLabtVhKXeXlCVnjhNBFicdbVbz',
                    'https://docs.google.com/uc?id=1Y1u4_xHDS8s11P_z-O1JGSrLsVo6wRc2',
                    'https://docs.google.com/uc?id=1qFCxir-y_X6vY0sMrQExJ3HFvGs137qu'
              ],
              title: 'Tiệc tùng'
          }
      ]
    };
  },
  created() {
      this.getFullInfoAlbum()
  },
  methods: {
    firstLoad() {
      if (this.$vuetify.breakpoint.width >= 1536) {
        this.$store.dispatch("updateShowSidebarLeft", true);
      } else if (
        this.$vuetify.breakpoint.width > 1264 &&
        this.$vuetify.breakpoint.width < 1536
      ) {
        this.$store.dispatch("updateShowSidebarLeft", true);
      } else if (
        this.$vuetify.breakpoint.width > 960 &&
        this.$vuetify.breakpoint.width <= 1264
      ) {
        this.$store.dispatch("updateShowSidebarLeft", false);
      } else if (
        this.$vuetify.breakpoint.width >= 759 &&
        this.$vuetify.breakpoint.width <= 960
      ) {
        this.$store.dispatch("updateShowSidebarLeft", false);
      } else {
        this.$store.dispatch("updateShowSidebarLeft", false);
      }
    },
    goToPlayList(id) {
      console.log(id);
    },
    getFullInfoAlbum(){
        axios.get('/album/get-full-info-album')
        .then( (res) => {
            this.listCategory = []
            var resData = Object.keys(res.data.data)
            for(let i = 0; i < resData.length; i++){
                let obj = {}
                obj.name = resData[i]
                obj.listPlaylist = []
                let objSingers = Object.keys(res.data.data[resData[i]]);
                for(let j = 0; j < objSingers.length; j++){
                    let info = {}
                    info.name = "Tổng hợp của " + res.data.data[resData[i]][objSingers[j]].nickname
                    info.img = "https://docs.google.com/uc?id=" + res.data.data[resData[i]][objSingers[j]].img
                    info.singer_id = res.data.data[resData[i]][objSingers[j]].singer_id
                    info.genre_id = res.data.data[resData[i]][objSingers[j]].genre_id
                    info.to = '/playlist/singer/' + info.singer_id + '/genre/' + info.genre_id
                    obj.listPlaylist.push(info)
                }

                this.listCategory.push(obj)
            }
        })
    },
    // getImageTop(){
    //     axios.get('/user/singer/get-image-hub')
    // }
  },
  watch: {
    "$vuetify.breakpoint.width"() {
      this.firstLoad();
    },
  },
};
</script>

<style>
.bg-image-hub {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.card-hub .bg-image-hub:hover .v-image__image {
  animation: zoomIn 1s ease forwards;
}
.txt-hub {
  text-transform: uppercase;
  position: relative;
  top: 50%;
  font-weight: bolder;
}
.card-hub {
  cursor: pointer;
}
</style>