<template>
  <v-row>
    <v-col sm="6">
      <div style="height: 100%">
        <iframe
          width="0"
          height="0"
          :src="'https://www.youtube.com/embed/' + room.youtube_id + '?rel=0'" 
          title="YouTube video player"
          frameborder="0"
          allow="autoplay"
          ref="ytVideo"
          allowfullscreen
        >
        </iframe>
        <div
          class="d-flex"
          style="justify-content: center; align-items: center; height: 100%"
        >
          <div style="position: relative">
            <div class="absolute_two_child">
              <v-img
                height="300px"
                width="300px"
                id="circleImg"
                :src='"https://docs.google.com/uc?id=" + room.background_image'
                style="background-color:#170f23"
              >
              </v-img>
            </div>
            <div class="absolute_two_child">
              <v-btn
                color="white"
                plain
                outlined
                class="btn-play-radio"
                @click="openVideo()"
                v-if="!playing"
              >
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn
                v-else
                @click="openVideo()"
                plain
                outlined
                :style="playing ? 'border: none' : ''"
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
            </div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col sm="6" class="header-box-chat">
      <v-subheader style="border-bottom: 2px solid black">
        <h2 style="color: white">{{ room.name }}</h2>
        <v-divider></v-divider>
        <h3 style="color: white" v-if="userId">
          {{ numberOfUser }} thành viên
        </h3>
        <v-icon v-if="userId" color="green">mdi-circle</v-icon>
      </v-subheader>
      <div
        v-if="userId"
        style="
          height: 56vh;
          overflow-x: hidden;
          overflow-y: scroll;
          width: 100%;
          background-color: #242526;
        "
        ref="chatbox"
      >
        <v-layout row>
          <v-flex>
            <v-card class="chat-card">
              <v-list>
                <v-divider></v-divider>
                <v-list-item
                  class="p-3"
                  v-for="(item, index) in allMessages.slice().reverse()"
                  :key="index"
                >
                  <v-layout :align-end="userId === item.user_id" column>
                    <v-flex>
                      <v-layout column>
                        <v-flex>
                          <span
                            v-if="userId !== item.user_id"
                            class="small"
                            style="color: black"
                            >{{ item.fullname }}</span
                          >
                        </v-flex>
                        <v-flex>
                          <v-img
                            v-if="userId !== item.user_id"
                            class="avatar-public-chat"
                            :src="
                              'https://docs.google.com/uc?id=' + item.avatar
                            "
                            width="32px"
                            height="32px"
                          >
                          </v-img>
                          <v-chip
                            :color="
                              userId === item.user_id ? 'primary' : 'gray'
                            "
                          >
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-list-item-content
                                  v-bind="attrs"
                                  v-on="on"
                                  :style="
                                    userId === item.user_id
                                      ? 'color:white'
                                      : 'color:black'
                                  "
                                >
                                  {{ item.message }}
                                </v-list-item-content>
                              </template>
                              <span>{{
                                new Date(item.created_at).toLocaleString()
                              }}</span>
                            </v-tooltip>
                          </v-chip>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-list-item>
                <v-list-item v-if="typingUserId !== null">
                  {{ typingFullname }} đang nhập...
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
      <div
        class="d-flex py-2"
        style="
          border-top: 2px black solid;
          justify-content: center;
          height: 63.8vh;
          align-items: center;
        "
        v-else
      >
        <v-btn @click="login" :loading="loading" color="primary"
          >Đăng nhập để chat cùng mọi người nàoooo</v-btn
        >
      </div>
      <div style="border-top: 2px black solid" v-if="userId">
        <v-row class="txt-message">
          <v-text-field
            class="color-border-bottom"
            style="margin: 0px; padding: 0px"
            v-model="message"
            label="Nhập tin nhắn"
            single-line
            color="white"
            @keyup="onTyping"
            @keyup.enter="sendMessage"
          >
          </v-text-field>
          <v-menu bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" text style="margin: auto 0px">
                <v-icon color="white">mdi-emoticon-excited-outline</v-icon>
              </v-btn>
            </template>
            <picker set="facebook" title="Chọn biểu cảm" @select="onInputEmoji">
            </picker>
          </v-menu>
          <v-btn
            @click="sendMessage"
            dark
            class="white--text"
            small
            style="margin: auto 0px"
            color="primary"
            >Gửi
          </v-btn>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
import { Picker } from "emoji-mart-vue";

export default {
  data() {
    return {
      message: null,
      allMessages: [],
      fullname: null,
      userId: null,
      numberOfUser: 0,
      typingUserId: null,
      typingFullname: null,
      deleteMessage: false,
      room: {},
      loading: true,
      playing: false,
    };
  },
  components: {
    Picker,
  },
  methods: {
    sendMessage() {
      if (!this.message) {
        return alert("Please enter message");
      }
      axios.post("/public-chat/messages", {
        message: this.message,
        room_id: this.$route.params.id,
      });
      this.message = "";
    },
    fetchMessage() {
      axios
        .get("/public-chat/messages/" + this.$route.params.id)
        .then((response) => {
          this.allMessages = response.data.messages;
          setTimeout(this.scrollToEnd, 100);
          this.loading = false;
        });
    },
    getUserCurrent() {
      axios.get("/user/current").then((response) => {
        this.userId = response.data.user.id;
        this.fullname = response.data.user.fullname;
      });
    },
    scrollToEnd() {
      var chatbox = this.$refs.chatbox;
      chatbox.scrollTop = chatbox.scrollHeight;
    },
    onTyping() {
      this.$echo.private("chat-" + this.$route.params.id).whisper("typing", {
        user: this.userId,
        fullname: this.fullname,
      });
    },
    onInputEmoji(e) {
      if (!e) {
        return false;
      }
      if (this.message === null || this.message === "") {
        this.message = e.native;
      } else {
        this.message += e.native;
      }
    },
    async firstLoad() {
      if (localStorage.getItem("music_token")) {
        await this.getUserCurrent();
        await this.fetchMessage();
        this.$echo
          .join("chat-" + this.$route.params.id)
          .here((users) => {
            this.numberOfUser = users.length;
          })
          .joining((user) => {
            this.numberOfUser += 1;
            var defaultMessage = {
              avatar: user.avatar,
              fullname: user.fullname,
              created_at: new Date(),
              id: -1,
              message: user.fullname + " đã tham gia phòng",
              updated_at: null,
              user: user,
              user_id: user.id,
            };
            this.allMessages.unshift(defaultMessage);
          })
          .leaving((user) => {
            this.numberOfUser -= 1;
            var defaultMessage = {
              avatar: user.avatar,
              fullname: user.fullname,
              created_at: new Date(),
              id: -1,
              message: user.fullname + " đã rời phòng",
              updated_at: null,
              user: user,
              user_id: user.id,
            };
            this.allMessages.unshift(defaultMessage);
          });
      } else {
        this.loading = false;
      }
    },
    userEvent() {
      if (localStorage.getItem("music_token")) {
        this.$echo
          .private("chat-" + this.$route.params.id)
          .listenForWhisper("typing", (e) => {
            if (this.deleteMessage) {
              this.typingUserId = null;
              this.deleteMessage = false;
            } else {
              this.typingUserId = e.user;
              this.typingFullname = e.fullname;
            }
          })
          .listenForWhisper("untyping", (e) => {
            this.typingUserId = e.user;
            this.deleteMessage = true;
          })
          .listen("MessageSent", (e) => {
            var info = e.message;
            info.avatar = e.user.avatar;
            info.fullname = e.user.fullname;
            this.allMessages.unshift(info);
            setTimeout(this.scrollToEnd, 0);
            this.deleteMessage = false;
          });
      }
    },
    getRoomChat() {
      axios
        .get("/public-chat/room-chat/" + this.$route.params.id)
        .then((response) => {
          if (response.data.room === null) {
            //xử lý lỗi khi không tồn tại phòng này
            this.$router.push("/");
          } else {
            this.room = response.data.room;
            this.firstLoad();
          }
        });
    },
    openVideo() {
      this.playing = !this.playing;
      if (this.playing) {
        this.$refs.ytVideo.src += "&autoplay=1"
        document.getElementById("circleImg").classList.add("rotate")
        this.$store.dispatch('updateShowFixedPlay', false)
      } else {
        this.$refs.ytVideo.src = this.$refs.ytVideo.src.substr(
          0,
          this.$refs.ytVideo.src.length - 11
        )
        document.getElementById("circleImg").classList.remove("rotate")
      }
    },
    login(){
      sessionStorage.setItem('backLogin', this.$route.path)
      this.$router.push('/login')
    }
  },
  created() {
    this.getRoomChat()
  },
  mounted() {
    this.userEvent()
  },
  watch: {
    message() {
      if (this.message === "") {
        this.$echo
          .private("chat-" + this.$route.params.id)
          .whisper("untyping", {
            user: null,
          });
      }
    },
    "$route.params.id"() {
      this.playing = false
      var circle = document.getElementById("circleImg")
      if(circle){
        circle.classList.remove("rotate")
      }
      if (this.$route.params.id) {
        this.getRoomChat()
      }
    },
  },
};
</script>

<style>
.floating-div {
  position: fixed;
}
.chat-card img {
  max-width: 300px;
  max-height: 200px;
}
.color-border-bottom .v-label {
  color: black !important;
}
.color-border-bottom input {
  color: black !important;
}
.txt-message {
  margin: 0px;
  padding: 10px 12px;
}
.color-border-bottom .v-text-field__details {
  display: none;
}
.color-border-bottom .v-input__slot {
  margin: 0px;
}
.avatar-public-chat {
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
.header-box-chat {
  margin: 0px auto;
  background: linear-gradient(to left, #dd3e54, #6be585);
  border-radius: 10px;
}

.btn-play-radio {
  border-radius: 100%;
  min-width: 0 !important;
  width: 50px;
  height: 50px !important;
}

.absolute_two_child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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