<template>
  <v-container style="height:70vh;">
    <v-row align="center" justify="center">
      <v-col sm="8">
        <v-text-field class="input-white" v-model="name" label="Tên playlist" color="white"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col sm="8">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-form>
              <v-text-field
                v-bind="attrs"
                v-on="on"
                class="pa-0"
                placeholder="Nhập tên bài hát"
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
              v-for="(item, index) in recommends"
              :key="index"
              @click="chooseRecommended(index)"
            >
              <v-list-item-icon>
                <v-icon style="color: white">mdi-chart-line-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col sm="8">
          <v-card color="#170f23">
            <v-card-title class="pa-0">Danh sách bài hát đã chọn</v-card-title>
            <v-alert
              dense
              type="info"
              v-if="isInfo"
            >
              {{ txtInfo }}
            </v-alert>
            <v-list style="background-color: #432275; color: white;overflow-y: scroll;" max-height="40vh">
              <v-list-item
                v-for="(item, index) in choosed"
                :key="index + 'choosed'"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon @click="deleteChoosed(index)">
                  <v-icon color="white">mdi-close</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!$route.params.id" justify="center" align="center">
                    <v-alert
                      dense
                      type="success"
                      width="50%"
                      style="position: absolute; bottom: 30%; left: 25%;z-index: 1000;"
                      v-model="showUpdated"
                      transition="fab-transition"
                    >
                      Thêm thành công
                    </v-alert>
            <v-btn @click="createPlaylist()">Tạo playlist</v-btn>
    </v-row>
    <v-row v-else justify="center" align="center">
                    <v-alert
                      dense
                      type="success"
                      width="50%"
                      style="position: absolute; bottom: 30%; left: 25%;z-index: 1000;"
                      v-model="showUpdated"
                      transition="fab-transition"
                    >
                      Sửa thành công
                    </v-alert>
            <v-btn @click="editPlaylist()">Sửa playlist</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      recommends: [],
      timeout: null,
      debouncedInput: "",
      choosed: [],
      isInfo: false,
      txtInfo: null,
      name: null,
      showUpdated: false
    };
  },
  created() {
    if(this.$route.path.includes('edit')){
      this.getInforPlaylist()
    }
  },
  computed: {
    txtSearch: {
      get() {
        return this.debouncedInput;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedInput = val;
          axios
            .get("/song/search/" + val)
            .then((response) => {
              this.recommends = response.data.songs;
            })
            .catch(() => {
              console.log("fail to search");
            });
        }, 300);
      },
    },
  },
  methods: {
    chooseRecommended(index) {
      if(!this.choosed.find(x => x.id === this.recommends[index].id)){
        this.choosed.push(this.recommends[index]);
        this.isInfo = false
      }else{
        this.isInfo = true
        this.txtInfo = 'Bài này đã tồn tại trong playlist trước đó!'
        setTimeout(() => {
          this.isInfo = false
        }, 5000)
      }
    },
    deleteChoosed(index) {
      this.choosed.splice(index, 1);
    },
    createPlaylist(){
      if(this.choosed.length === 0){
        this.isInfo = true
        this.txtInfo = 'Hãy chọn bài hát'
        setTimeout(() => {
          this.isInfo = false
        }, 5000)
      }else{
        if(this.name !== null && this.name !== ''){
          var listSongId = this.choosed.map(x => x.id)
          axios.post('/playlist/store', {
            name: this.name,
            listSongId : listSongId
          })
          .then((response) => {
            if(response.data.message === 'success'){
              this.showUpdated = true
              setTimeout(() => {
                this.showUpdated = false
              }, 2000)
            }
          })
          .catch(() => {
            console.log('fail to store playlist')
          })
        }
      }
    },
    getInforPlaylist(){
      axios.get('/playlist/get-infor-playlist/' + this.$route.params.id)
      .then( (response) => {
        this.name = response.data.data.name
        this.choosed = response.data.data.songs
      })
      .catch( (response) => {
        console.log(response)
      })
    },
    editPlaylist(){
      if(this.choosed.length === 0){
        this.isInfo = true
        this.txtInfo = 'Hãy chọn bài hát'
        setTimeout(() => {
          this.isInfo = false
        }, 5000)
      }else{
        if(this.name !== null && this.name !== ''){
          var listSongId = this.choosed.map(x => x.id)
          axios.post('/playlist/update', {
            name: this.name,
            listSongId : listSongId,
            playlistId: this.$route.params.id
          })
          .then((response) => {
            if(response.data.message === 'success'){
              this.showUpdated = true
              setTimeout(() => {
                this.showUpdated = false
              }, 2000)
            }
          })
          .catch(() => {
            console.log('fail to store playlist')
          })
        }
      }
    }
  },
};
</script>

<style>
.input-white .v-label{
  color: white;
}
</style>