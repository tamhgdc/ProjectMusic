<template>
  <v-card color="#231b2e" style="overflow: hidden">
    <v-row>
      <v-col md="8">
        <v-carousel class="carousel-post">
          <v-carousel-item v-for="content in post.contents" :key="content.id">
            <v-sheet height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <v-img
                  width="100%"
                  height="100%"
                  v-if="content.type == 'image'"
                  :src="'https://docs.google.com/uc?id=' + content.link"
                ></v-img>
                <video v-else width="100%" height="100%" controls id="myVideo">
                  <source
                    :src="'https://docs.google.com/uc?id=' + content.link"
                    type="video/mp4"
                  />
                </video>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col class="px-3" style="position: relative" md="4">
        <v-card-title class="pa-0"
          >{{ post.user.fullname }} <v-spacer></v-spacer>
          <div v-if="post.user.id != currentUser.id">
            <v-btn
              @click="unfollowing(post.user)"
              v-if="followings.some((x) => x.user_id == post.user.id)"
              color="transparent"
            >
              <v-icon color="white">mdi-bell-minus</v-icon>
              <span style="color: white">Bỏ quan tâm</span>
            </v-btn>
            <v-btn @click="following(post.user)" v-else color="transparent">
              <v-icon color="white">mdi-bell-plus-outline</v-icon>
              <span style="color: white">Quan tâm</span>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-title class="pa-0" style="font-size: 12px; opacity: 0.6">{{
          new Date(post.created_at).toLocaleString()
        }}</v-card-title>
        <v-card-title class="pa-0" style="font-size: 17px">{{
          post.description
        }}</v-card-title>
        <v-btn
          @click="like(post)"
          v-if="!post.likes.some((x) => x.user_id == currentUser.id)"
          icon
          color="white"
        >
          <v-icon>mdi-heart-multiple-outline</v-icon>
        </v-btn>
        <v-btn @click="unlike(post)" v-else icon color="white">
          <v-icon>mdi-heart-multiple</v-icon>
        </v-btn>
        <v-btn icon>
          <span style="font-size: 16px">{{ post.likes.length }}</span>
        </v-btn>
        <div
          ref="cmtbox"
          class="bg-scroll-cmt"
          style="overflow-y: scroll; height: 280px"
        >
          <div
            class="d-flex mb-2"
            v-for="comment in post.comments"
            :key="comment.id"
          >
            <div>
              <v-img
                style="border-radius: 100%"
                width="50px"
                height="50px"
                :src="'https://docs.google.com/uc?id=' + comment.user.avatar"
              ></v-img>
            </div>
            <div class="ml-2">
              <div class="pa-0">{{ comment.user.fullname }}</div>
              <div class="pa-0" style="font-size: 14px">
                {{ comment.content }}
              </div>
            </div>
          </div>
        </div>
        <div style="position: absolute; bottom: 20px; right: 12px; left: 0">
          <v-textarea
            rounded
            rows="2"
            class="textarea-cmt"
            color="white"
            style="border: 1px solid white"
            v-if="checkLogin"
            v-model="txtComment"
            @keyup.enter="comment()"
          >
          </v-textarea>
          <v-btn width="100%" v-else @click="login">Đăng nhập để bình luận</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { postMixin } from "@/mixin/PostMixin.js";
import axios from "axios";
export default {
  mixins: [postMixin],
  props: ["currentUser","post", "followings", "listPost"],
  data() {
    return {
      txtComment: null,
    };
  },
  mounted() {
    this.userEvent();
    setTimeout(this.scrollToEnd, 0);
  },
  computed:{
    checkLogin(){
      return localStorage.getItem('music_token')
    }
  },
  methods: {
    comment() {
      axios
        .post("/comment", {
          comment: this.txtComment,
          postId: this.post.id,
        })
        .then((response) => {
          if (response.data.message != "success") {
            console.log("fail to send");
          }
        })
        .catch(() => {
          console.log("fail to send comment");
        });
      this.txtComment = null;
    },
    userEvent() {
      if (localStorage.getItem("music_token")) {
        this.$echo
          .private("comment-" + this.post.id)
          .listen("CommentSent", (e) => {
            this.post.comments.push(e.comment);
            setTimeout(this.scrollToEnd, 0);
          });
      }
    },
    scrollToEnd() {
      var cmtbox = this.$refs.cmtbox;
      cmtbox.scrollTop = cmtbox.scrollHeight;
    },
    login() {
      sessionStorage.setItem("backLogin", "/post");
      this.$router.push("/login");
    },
  },
  watch: {
    post() {
      this.userEvent();
      setTimeout(this.scrollToEnd, 0);
    },
  },
};
</script>

<style>
.carousel-post .v-carousel__controls {
  display: none;
}
.textarea-cmt textarea {
  color: white !important;
}
.bg-scroll-cmt::-webkit-scrollbar {
  width: 8px;
  background-color: #231b2e;
}
.textarea-cmt {
  margin-right: 8px;
}
.textarea-cmt .v-input__slot {
  margin-bottom: 0;
}
.textarea-cmt .v-text-field__details {
  display: none;
}
</style>