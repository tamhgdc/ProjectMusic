<template>
  <div>
    <v-row class="py-5">
      <v-col sm="12" class="pa-0">
        <v-list color="transparent" class="pa-0">
          <v-list-item-group
            active-class="border-active"
            mandatory
            class="d-flex rv-min-height-indi"
          >
            <v-list-item class="rv-width mr-5 d-flex">
              <v-list-item-content
                class="choose-header-indi-level2"
                @click="chooseLevel2(1)"
              >
                Yêu thích
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="rv-width mr-5 d-flex">
              <v-list-item-content
                class="choose-header-indi-level2"
                @click="chooseLevel2(2)"
              >
                Đã tải lên
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="songsLiked"
        :items-per-page="10"
        disable-sort
        :footer-props="{
          'items-per-page-text': 'Số dòng mỗi trang:',
        }"
        style="background-color: transparent; width: 100%;"
      >
        <template #item.name="{ item }">
          <v-card color="transparent" elevation="0">
            <v-card-actions class="pa-0">
              <v-list-item class="pa-0">
                <v-list-item-avatar rounded="0" color="transparent">
                  <v-img
                    :src="'https://docs.google.com/uc?id=' + item.image"
                    style="border-radius: 5px;"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <span
                    @mouseleave="leaveInforCard"
                    @mouseover="checkLoad(singer.user_id)"
                    v-for="singer in item.singers"
                    :key="singer.id"
                    >
                        <router-link class="link-singer" :to="'/singer/' + singer.id">
                            <span style="color: white; opacity: 0.5;">{{ singer.nickname }}</span>
                        </router-link>
                        <div class="display-none">
                            <SingerInfor v-if="!isHiddenInforCard" :singer="singerInfo" />
                        </div>
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </template>

        <template #item.like="{ item }">
            <v-btn color="#750691" @click="unlikeSong(item.id)" icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
        </template>

        <template v-slot:footer.page-text="props">
          {{ props.pageStart }}-{{ props.pageStop }} của
          {{ props.itemsLength }} kết quả
        </template>
      </v-data-table>
    </v-row>
    <ToastMessage ref="toastMessage" timeout="2000" />
  </div>
</template>

<script>
import { individualMixin } from "@/mixin/IndividualMixin.js";
import { singerInforMixin } from "@/mixin/SingerInforMixin.js";
import SingerInfor from "@/components/general/SingerInfo";
import ToastMessage from "@/components/general/ToastMessage";
import axios from "axios";

export default {
  mixins: [individualMixin, singerInforMixin],
  components: {
      SingerInfor,
      ToastMessage
  },
  data() {
    return {
      songsLiked: [],
      headers: [
        { text: "Bài hát", value: "name" },
        { text: "Thời gian", value: "timeDuration" },
        { text: "", value: "like" },
      ],
    };
  },
  created() {
    this.getAllFavoriteSongs();
  },
  methods: {
    getAllFavoriteSongs() {
      if (this.$store.getters["user"] != {}) {
        axios
          .get("/user/get-all-like-of-songs")
          .then((response) => {
            this.songsLiked = response.data.data;
          })
          .catch((response) => {
            console.log(response);
          });
      }
    },
    unlikeSong(id){
        axios.post('/user/unlike-song', {
          songId: id
        })
        .then(() => {
          this.$refs['toastMessage'].open('Bỏ ưu thích thành công' , false)
          let indexDelete = this.songsLiked.findIndex(x => x.id == id)
          this.songsLiked.splice (indexDelete, 1)
        })
        .catch(() => {
          this.$refs['toastMessage'].open('Bỏ ưu thích thất bại' , true)
        })
    },
    chooseLevel2(id){
      console.log(id)
    }
  },
};
</script>

<style>
.border-active {
  border-radius: 10px;
  border: 1px solid white;
  box-sizing: border-box !important;
}
.choose-header-indi-level2 {
  padding: 0px;
}
.rv-min-height-indi .v-list-item {
  min-height: 0px !important;
}

</style>