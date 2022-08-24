<template>
  <v-row
    style="
      position: sticky;
      z-index: 9999998;
      top: 0;
      background-color: #170f23;
      margin: 0px;
    "
  >
    <v-col md="2">
      <v-btn plain @click="closeSidebar()" class="btn-menu">
        <v-icon color="white">mdi-menu-open</v-icon>
      </v-btn>
    </v-col>
    <v-col md="5">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-form>
            <v-text-field
              v-bind="attrs"
              v-on="on"
              class="pa-0"
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
              prepend-inner-icon="mdi-magnify"
              color="white"
              background-color="#231b2e"
              rounded
              v-model="txtSearch"
            >
            </v-text-field>
          </v-form>
        </template>
        <v-list style="background-color: #432275; color: white">
          <v-list-item
            v-for="(item, index) in Recommends"
            :key="index"
            @click="chooseRecommended(item)"
          >
            <v-list-item-icon>
              <v-icon style="color: white">mdi-chart-line-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>

    <!-- <v-spacer></v-spacer> -->
    <v-col md="5" v-if="!loggedIn">
      <div class="float-right">
        <v-btn plain class="btn-menu secondary" v-if="!loggedIn">
          <router-link to="/login">
            <v-icon color="white"> mdi-account-circle-outline </v-icon>
          </router-link>
        </v-btn>
      </div>
    </v-col>

    <v-col md="5" v-else-if="hideDropdownMenu" class="remove-pdr">
      <div class="float-right">
        <v-btn plain class="btn-menu secondary">
          <v-icon> mdi-shape </v-icon>
        </v-btn>
        <v-btn plain class="btn-menu secondary">
          <v-icon> mdi-tray-arrow-up </v-icon>
        </v-btn>
        <v-btn plain class="btn-menu secondary">
          <v-icon> mdi-cog-outline </v-icon>
        </v-btn>
        <v-btn plain class="btn-menu secondary" v-if="!loggedIn">
          <router-link to="/login">
            <v-icon color="white"> mdi-account-circle-outline </v-icon>
          </router-link>
        </v-btn>

        <!-- <v-icon> mdi-logout-variant </v-icon> -->
        <v-menu offset-y v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" plain class="btn-menu secondary"
              ><v-icon>mdi-menu-down</v-icon></v-btn
            >
          </template>
          <v-list style="background-color: #432275; color: white">
            <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
              ref="dialogEditInfor"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-on="on" v-bind="attrs" @click="getInformation()">
                  <v-list-item-icon>
                    <v-icon style="color: white">mdi-account-cog</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Thông tin cá nhân</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="primary" dark>Thông tin cá nhân </v-toolbar>
                  <v-card-text class="enterInfor">
                    <v-row v-if="message !== ''" class="mt-1">
                      <p
                        class="text-center ma-0"
                        style="color: black; width: 100%"
                      >
                        {{ message }}
                      </p>
                    </v-row>
                    <v-form ref="formEditInfor">
                      <v-row class="mt-2">
                        <v-text-field
                          :rules="rules"
                          label="Họ và tên"
                          prepend-icon="mdi-account-cowboy-hat-outline"
                          style="color: black"
                          v-model="user.fullname"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field
                          :rules="emailRules"
                          label="Email"
                          prepend-icon="mdi-email-outline"
                          style="color: black"
                          v-model="user.email"
                        ></v-text-field>
                      </v-row>
                      <v-row class="mt-6">
                        <v-icon style="margin-right: 9px"
                          >mdi-camera-outline</v-icon
                        >
                        <span style="color: gray">Ảnh đại diện</span>
                      </v-row>
                      <v-row>
                        <v-file-input
                          @change="Preview_image"
                          accept="image/png, image/jpeg, image/bmp"
                          v-model="image"
                          style="display: none"
                          ref="inputFile"
                        ></v-file-input>
                      </v-row>
                      <v-row>
                        <v-img
                          @click="showInputFile"
                          :src="user.avatar"
                          height="250px"
                          style="object-fit: cover"
                        ></v-img>
                      </v-row>
                      <v-row>
                        <v-text-field
                          label="Ngày tạo tài khoản"
                          readonly
                          prepend-icon="mdi-calendar-clock"
                          style="color: black"
                          :value="user.created_at"
                        ></v-text-field>
                      </v-row>
                    </v-form>
                  </v-card-text>

                    <v-alert
                      dense
                      type="success"
                      width="50%"
                      style="position: absolute; bottom: 6%; left: 25%;"
                      v-model="showUpdated"
                      transition="fab-transition"
                    >
                      Cập nhật thành công
                    </v-alert>
                  <v-card-actions class="justify-end btn-loading-black">
                    <v-btn text :loading="loading" @click="editInformation()"
                      >Lưu</v-btn
                    >
                    <v-btn text @click="dialog.value = false">Đóng</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <v-list-item @click="logout()">
              <v-list-item-icon>
                <v-icon style="color: white">mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Đăng xuất</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-col>

    <v-col md="5" v-else class="remove-pdr">
      <div class="float-right">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on"
            v-bind="attrs"
            plain
            color="white"
            outlined
            rounded
            >
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list style="background-color: #432275; color: white">
            <v-list-item>
              <v-list-item-icon>
                  <v-icon color="white"> mdi-shape </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Thể loại</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                  <v-icon color="white"> mdi-tray-arrow-up </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Đăng tải</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                  <v-icon color="white"> mdi-cog-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Cài đặt</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
              ref="dialogEditInfor"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-on="on" v-bind="attrs" @click="getInformation()">
                  <v-list-item-icon>
                    <v-icon style="color: white">mdi-account-cog</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Thông tin cá nhân</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="primary" dark>Thông tin cá nhân </v-toolbar>
                  <v-card-text class="enterInfor">
                    <v-row v-if="message !== ''" class="mt-1">
                      <p
                        class="text-center ma-0"
                        style="color: black; width: 100%"
                      >
                        {{ message }}
                      </p>
                    </v-row>
                    <v-form ref="formEditInfor">
                      <v-row class="mt-2">
                        <v-text-field
                          :rules="rules"
                          label="Họ và tên"
                          prepend-icon="mdi-account-cowboy-hat-outline"
                          style="color: black"
                          v-model="user.fullname"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field
                          :rules="emailRules"
                          label="Email"
                          prepend-icon="mdi-email-outline"
                          style="color: black"
                          v-model="user.email"
                        ></v-text-field>
                      </v-row>
                      <v-row class="mt-6">
                        <v-icon style="margin-right: 9px"
                          >mdi-camera-outline</v-icon
                        >
                        <span style="color: gray">Ảnh đại diện</span>
                      </v-row>
                      <v-row>
                        <v-file-input
                          @change="Preview_image"
                          accept="image/png, image/jpeg, image/bmp"
                          v-model="image"
                          style="display: none"
                          ref="inputFile"
                        ></v-file-input>
                      </v-row>
                      <v-row>
                        <v-img
                          @click="showInputFile"
                          :src="user.avatar"
                          height="250px"
                          style="object-fit: cover"
                        ></v-img>
                      </v-row>
                      <v-row>
                        <v-text-field
                          label="Ngày tạo tài khoản"
                          readonly
                          prepend-icon="mdi-calendar-clock"
                          style="color: black"
                          :value="user.created_at"
                        ></v-text-field>
                      </v-row>
                    </v-form>
                  </v-card-text>

                    <v-alert
                      dense
                      type="success"
                      width="50%"
                      style="position: absolute; bottom: 6%; left: 25%;"
                      v-model="showUpdated"
                      transition="fab-transition"
                    >
                      Cập nhật thành công
                    </v-alert>
                  <v-card-actions class="justify-end btn-loading-black">
                    <v-btn text :loading="loading" @click="editInformation()"
                      >Lưu</v-btn
                    >
                    <v-btn text @click="dialog.value = false">Đóng</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <v-list-item @click="logout()">
              <v-list-item-icon>
                <v-icon style="color: white">mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Đăng xuất</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-col>

  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      timeout: null,
      user: null,
      image: null,
      message: "",
      rules: [
        (value) => !!value || "Chưa nhập ký tự",
        (value) => (value && value.length >= 6) || "Ít nhất 6 ký tự",
      ],
      emailRules: [
        (v) => !!v || "Chưa nhập ký tự",
        (v) => /.+@.+\..+/.test(v) || "Chưa đúng định dạng Email",
      ],
      // avatarRules: [
      //   (value) =>
      //     !value ||
      //     value.size < 5000000 ||
      //     "Avatar size should be less than 5 MB!",
      // ],
      loading: false,
      imageChanged: false,
      showUpdated: false,
      showSBLeft: null,
      hideDropdownMenu: true
    };
  },
  created(){
    this.getRecommends()
  },
  mounted(){
      if(this.$vuetify.breakpoint.width >= 1264){
        this.showSBLeft = true
      }else{
        this.showSBLeft = false
      }
    this.firstLoad()
  },
  methods: {
    chooseRecommended(song) {
      var index_song_now = this.$store.getters['fixedplay/index_song']
      this.$store.getters['fixedplay/songs'].splice(index_song_now + 1, 0, song)
      this.$store.dispatch('fixedplay/nextSong')
    },
    // debounceInput: _.debounce(function() {
    //   this.$store.dispatch('menu/updateTxtSearch', this.txtSearch)
    // }, 500)
    logout() {
      localStorage.removeItem("music_token");
      this.$store.dispatch("login/updateLoggedIn", false);
      window.location.replace("/login");
    },
    getInformation() {
      this.user = this.$store.getters["user"];
      if (!this.user.avatar.includes("uc?id=")) {
        this.user.avatar = "https://docs.google.com/uc?id=" + this.user.avatar;
      }
    },
    Preview_image() {
      this.user.avatar = URL.createObjectURL(this.image)
      this.imageChanged = true
    },
    editInformation() {
      if (this.$refs.formEditInfor.validate()) {
        this.loading = true;
        let formData = new FormData();
        formData.append("username", this.user.username);
        formData.append("fullname", this.user.fullname);
        formData.append("email", this.user.email);
        if(this.imageChanged){
          formData.append("avatar", this.image);
        }
        axios
          .post("/user/update-user", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            this.loading = false;
            this.imageChanged = false;
            this.showUpdated = true;
            setTimeout(() => {
              this.showUpdated = false
            }, 2000)
            this.$store.dispatch("getUser", null, { root: true });
          })
          .catch(({ response }) => {
            console.log(response);
          });
      } else {
        this.message = "Hãy kiểm tra lại thông tin!";
      }
    },
    showInputFile() {
      this.$refs.inputFile.$refs.input.click();
    },
    closeSidebar(){
      this.$store.dispatch('updateShowSidebarLeft', !this.showSBLeft)
      this.showSBLeft = !this.showSBLeft
    },
    getRecommends(){
      axios.get('/song/get-top3')
      .then( (response) => {
        var res = response.data.top3 
        var songs = []
        for(let i = 0; i < 3; i++){
          var song = {}
          song.title = res[i].name
          var singers = ''
          for(let j = 0; j < res[i].singer.length; j++){
            singers += res[i].singer[j].nickname + ', '
          }
          song.singer = singers
          song.img = 'https://docs.google.com/uc?id=' + res[i].image
          song.id = res[i].id
          song.src = 'https://docs.google.com/uc?id=' + res[i].src
          song.lyrics = res[i].lyrics
          songs.push(song)
        }
        this.$store.dispatch('menu/updateRecommends', songs)
      })
      .catch( () => {
        console.log('fail to get top 3 recommends')
      })
    },
    firstLoad(){
        if(this.$vuetify.breakpoint.width <= 1264){
          this.hideDropdownMenu = false
        }else{
          this.hideDropdownMenu = true
        }
    }
  },
  computed: {
    ...mapGetters("menu", ["Recommends", "changeColorForm"]),
    txtSearch: {
      get() {
        return this.$store.getters["menu/txtSearch"];
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.$store.dispatch("menu/updateTxtSearch", val)
          axios.get('/song/search/' + val)
          .then( (response) => {
            var res = response.data.songs 
            var songs = []
            for(let i = 0; i < res.length; i++){
              var song = {}
              song.title = res[i].name
              var singers = ''
              for(let j = 0; j < res[i].singer.length; j++){
                singers += res[i].singer[j].nickname + ', '
              }
              song.singer = singers
              song.img = 'https://docs.google.com/uc?id=' + res[i].image
              song.id = res[i].id
              song.src = 'https://docs.google.com/uc?id=' + res[i].src
              song.lyrics = res[i].lyrics
              songs.push(song)
            }
            this.$store.dispatch('menu/updateRecommends', songs)
          })
          .catch(() => {
            this.$store.dispatch('menu/updateRecommends', [])
          })
        }, 600);
      },
    },
    loggedIn() {
      if (localStorage.getItem("music_token")) {
        return true;
      }
      return false;
    },
  },
  watch:{
    "$vuetify.breakpoint.width"(){
      this.firstLoad()
    }
  }
};
</script>

<style scope>
.btn-menu {
  min-width: 36px !important;
  padding: 0px 0px !important;
  margin-left: 10px;
  border-radius: 50% !important;
}
.btn-menu:first-child {
  margin-left: 0px;
}
.remove-pdr {
  padding-right: 0px;
}
.mdi-arrow-left,
.mdi-arrow-right {
  color: white !important;
}
.mdi-magnify {
  color: white !important;
  opacity: 0.7;
}
::placeholder {
  color: white !important;
  opacity: 0.3;
}
input {
  color: white !important;
  opacity: 0.7;
}
.enterInfor .v-text-field__slot input {
  color: black !important;
}
.imagePreview {
  width: 100px;
  height: 100px;
  display: block;
  background-size: cover;
}
.btn-loading-black circle {
  color: #0062cc !important;
}
</style>