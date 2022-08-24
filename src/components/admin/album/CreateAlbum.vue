<template>
  <v-form ref="form_create_album">
    <v-container style="padding-bottom: 100px">
      <v-row id="input-form-create-song">
        <v-col sm="12">
            <v-menu offset-y>
                <template v-slot:activator="{attrs, on}">
                    <v-text-field label="Chọn ca sỹ" v-bind="attrs" v-on="on" v-model="nameSingerChoose" readonly :rules="selectRules"></v-text-field>
                </template>
                <v-list-item-group
                    style="background-color: #231b2e;height: 200px;"
                    class="overflow-y-auto"
                    multiple
                    v-model="choosedSingers"
                >
                    <v-list-item
                    v-for="(singer, i) in singers"
                    :key="i"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="singer.nickname"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-menu>
        </v-col>

        <v-col sm="12">
          <v-text-field
            v-model="name"
            label="Tên album"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>

        <v-col sm="12">
          <v-text-field
            v-model="image"
            label="Ảnh đại diện album"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>

        <v-col sm="12">
          <v-text-field
            v-model="releaseDate"
            label="Ngày phát hành album"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
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
            <v-btn @click="createAlbum()">Tạo album</v-btn>
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
            <v-btn @click="editAlbum()">Sửa album</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            name: null,
            releaseDate: null,
            image: null,
            rules: [
                (value) => !!value || "Chưa nhập ký tự",
                (value) => (value && value.length >= 4) || "Ít nhất 4 ký tự",
            ],
            selectRules: [
                (value) => !!value || "Chưa chọn người",
            ],
            singers: null,
            nameSingerChoose: null,
            showUpdated: false,
            choosedSingers: [],
            objectSingers : [],
        }
    },
    created(){
        this.getAllSinger()
    },
    mounted(){
      this.loadInforAlbum()
    },
    methods: {
        getAllSinger(){
            axios.get('/user/singer/get-all-singer')
            .then( (response) => {
                this.singers = response.data.singers
            })
            .catch(() => {
                console.log('fail')
            })
        },
        createAlbum(){
          axios.post('/album/store',{
            singers: this.objectSingers,
            name: this.name,
            image: this.image,
            releaseDate: this.releaseDate
          })
          .then( (response) => {
            if(response.data.status === 'success'){
              this.showUpdated = true
              setTimeout(() => {
                this.showUpdated = false
              }, 2000)
              this.$refs.form_create_album.reset()
            }
          })
          .catch( () => {
            console.log('fail to create album')
          })
        },
        loadInforAlbum(){
          if(this.$route.params.id){
            axios.get('/album/get-full-infor-album/'+this.$route.params.id)
            .then( (response) => {
              var res = response.data.album
              this.name = res.album.name
              this.image = res.album.image
              this.releaseDate = res.album.releaseDate
              this.objectSingers = res.singers
              for(let i = 0;i < res.singers.length; i++){
                this.objectSingers.push(res.singers[i].id)
                for(let j = 0; j < this.singers.length; j++){
                  if(this.objectSingers[i] === this.singers[j].id){
                    if(this.nameSingerChoose === null){
                      this.nameSingerChoose = ''
                    }
                    this.nameSingerChoose += this.singers[j].nickname + ', '
                    this.choosedSingers.push(j)
                  }
                }
              }
            })
            .catch( () => {
              console.log('fail to get full infor')
            })
          }
        },
        editAlbum(){
          if(this.$refs.form_create_album.validate()){
            axios.post('/album/store-edit', {
              singers: this.objectSingers,
              name: this.name,
              image: this.image,
              releaseDate: this.releaseDate,
              albumId: this.$route.params.id
            })
            .then( (response) => {
              if(response.data.status === 'success'){
                this.showUpdated = true
                setTimeout(() => {
                  this.showUpdated = false
                }, 2000)
              }
            })
            .catch( () => {
              console.log('fail to editAlbum')
            }) 
          }
        }
    },
    watch: {
        choosedSingers(){
            this.nameSingerChoose = ''
            this.objectSingers = []
            for(let i = 0; i < this.choosedSingers.length; i++){
                this.nameSingerChoose += this.singers[this.choosedSingers[i]].nickname + ', '
                this.objectSingers.push(this.singers[this.choosedSingers[i]].id)
            }
        },
    }
}
</script>