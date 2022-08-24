<template>
  <div
    class="moreTools"
    style="
      position: absolute;
      top: 40%;
      width: 100%;
      text-align: center;
      z-index: 9999997;
    "
  >
    <v-btn plain style="color: white">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <!--btn play-->
    <v-btn
      v-if="!loadingAlbum"
      @click="updateLoadingAlbum(!loadingAlbum)"
      plain
      outlined
      :style="loadingAlbum ? 'border: none' : ''"
      style="
        color: white;
        border-radius: 50%;
        padding: 0px !important;
        height: 48px;
        min-width: 48px;
      "
    >
      <router-link :to="to" style="color: white">
        <v-icon>mdi-play</v-icon>
      </router-link>
    </v-btn>

    <!--biên độ âm nhạc-->
    <v-btn
      v-else
      @click="updateLoadingAlbum(!loadingAlbum)"
      plain
      outlined
      :style="loadingAlbum ? 'border: none' : ''"
      style="
        padding: 0px !important;
        height: 48px;
        min-width: 48px;
        display: inline; 
      "
      class="btnLoaderHome">
        <div id="loader">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
    </v-btn>

    <v-menu offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click.prevent=""
          plain
          style="color: white"
        >
          <v-icon plain>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <v-list style="background-color: #432275; color: white">
        <v-list-item @click="addToList()">
          <v-list-item-icon>
            <v-icon style="color: white">mdi-play-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Thêm vào danh sách phát</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="addComment()">
          <v-list-item-icon>
            <v-icon style="color: white">mdi-comment</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Bình luận</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="download()">
          <v-list-item-icon>
            <v-icon style="color: white">mdi-download</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Tải xuống</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="copy()">
          <v-list-item-icon>
            <v-icon style="color: white">mdi-content-copy</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sao chép link</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-menu offset-x>
            <template v-slot:activator="{ on, links }">
              <v-btn
                v-bind="links"
                v-on="on"
                @click.prevent=""
                style="width: 100%; padding: 0px"
                color="#432275"
                text
              >
                <v-list-item-icon>
                  <v-icon style="color: white">mdi-share</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    style="text-align: left; text-transform: initial"
                    >Chia sẻ</v-list-item-title
                  >
                </v-list-item-content>
                <v-icon plain style="color: white"
                  >mdi-unfold-more-vertical</v-icon
                >
              </v-btn>
            </template>
            <v-list style="background-color: #432275; color: white">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon style="color: white">mdi-facebook</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Facebook</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon style="color: white">mdi-twitter</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Twitter</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon style="color: white">mdi-ember</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Link nhúng</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    to: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["loadingAlbum"]),
  },
  methods: {
    ...mapActions(["updateLoadingAlbum"]),
  }
};
</script>

<style>
#loader {
  height: 100%;
  width: 48px;
}

#loader > ul {
  margin: 0;
  list-style: none;
  position: relative;
  padding: 0;
  height: 100%;
  /* width: 48px; */
}

#loader ul li {
  position: absolute;
  width: 2px;
  height: 0;
  background-color: white;
  bottom: 0;
}

@keyframes sequence1 {
  0% {
    height: 30%;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 30%;
  }
}

@keyframes sequence2 {
  0% {
    height: 45%;
  }
  50% {
    height: 90%;
  }
  100% {
    height: 45%;
  }
}

#loader li:nth-child(1) {
  left: 0%;
  animation: sequence1 1s ease infinite 0s;
}
#loader li:nth-child(2) {
  left: 20%;
  animation: sequence2 1s ease infinite 0.1s;
}
#loader li:nth-child(3) {
  left: 40%;
  animation: sequence1 1s ease-in-out infinite 0.2s;
}
#loader li:nth-child(4) {
  left: 60%;
  animation: sequence2 1s ease-in infinite 0.3s;
}

#loader li:nth-child(5) {
  left: 80%;
  animation: sequence1 1s ease-in-out infinite 0.4s;
}
#loader li:nth-child(6) {
  left: 100%;
  animation: sequence2 1s ease infinite 0.5s;
}
.btnLoaderHome .v-btn__content{
  height: 100%;
  /* width: 48px; */
}
</style>

