<template>
  <v-form ref="form_create_song">
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
            <v-menu offset-y>
                <template v-slot:activator="{attrs, on}">
                    <v-text-field label="Chọn người sáng tác" v-bind="attrs" v-on="on" v-model="nameComposerChoose" readonly :rules="selectRules"></v-text-field>
                </template>
                <v-list-item-group
                    style="background-color: #231b2e;height: 200px;"
                    class="overflow-y-auto"
                    multiple
                    v-model="choosedComposers"
                >
                    <v-list-item
                    v-for="(composer, i) in composers"
                    :key="i"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="composer.nickname"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-menu>
        </v-col>

        <v-col sm="12">
            <v-menu offset-y>
                <template v-slot:activator="{attrs, on}">
                    <v-text-field label="Chọn thể loại nhạc" v-bind="attrs" v-on="on" v-model="nameGenreChoose" readonly :rules="selectRules"></v-text-field>
                </template>
                <v-list-item-group
                    style="background-color: #231b2e;height: 200px;"
                    class="overflow-y-auto"
                    multiple
                    v-model="choosedGenres"
                >
                    <v-list-item
                    v-for="(genre, i) in genres"
                    :key="i"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="genre.name"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-menu>
        </v-col>

        <v-col sm="12">
            <v-menu offset-y>
                <template v-slot:activator="{attrs, on}">
                    <v-text-field label="Chọn album" v-bind="attrs" v-on="on" v-model="nameAlbumChoose" readonly :rules="selectRules"></v-text-field>
                </template>
                <v-list-item-group
                    style="background-color: #231b2e;height: 200px;"
                    class="overflow-y-auto"
                    multiple
                    v-model="choosedAlbums"
                >
                    <v-list-item>
                      <v-list-item-content @click="noAlbum()">
                        <v-list-item-title>Không thuộc Album nào</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                    v-for="(album, i) in albums"
                    :key="i"
                    >
                    <v-list-item-content @click="hasAlbum()">
                        <v-list-item-title v-text="album.name"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-menu>
        </v-col>

        <v-col sm="12">
          <v-text-field
            v-model="name"
            label="Tên bài hát"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>

        <v-col sm="12">
          <v-textarea
            v-model="lyrics"
            label="Lời bài hát"
            clearable
            :rules="rules"
            color="white"
          ></v-textarea>
        </v-col>

        <v-col sm="12">
          <v-text-field
            v-model="timeDuration"
            label="Thời lượng bài hát"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>

        <v-col sm="12">
          <v-text-field
            v-model="image"
            label="Ảnh bìa"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>

        <v-col sm="12">
          <v-text-field
            v-model="src"
            label="Link source"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>

        <v-col sm="12">
          <v-text-field
            v-model="releaseDate"
            label="Ngày ra mắt"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="$route.path.includes('create')" justify="center" align="center">
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
            <v-btn @click="createSong()">Tạo bài hát</v-btn>
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
                      Chỉnh sửa thành công
                    </v-alert>
            <v-btn @click="editSong()">Sửa bài hát</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        name: null,
        lyrics: null,
        releaseDate: null,
        src: null,
        image: null,
        timeDuration: null,
        txtSinger: null,
        txtComposer: null,
        rules: [
            (value) => !!value || "Chưa nhập ký tự",
            (value) => (value && value.length >= 2) || "Ít nhất 2 ký tự",
        ],
        selectRules: [
            (value) => !!value || "Chưa chọn người",
        ],
        singers: null,
        nameSingerChoose: null,
        composers: null,
        nameComposerChoose: null,
        showUpdated: false,
        choosedSingers: [],
        choosedComposers: [],
        objectSingers : [],
        objectComposers : [],
        objectGenres: [],
        nameGenreChoose: null,
        choosedGenres: [],
        genres: null,
        objectAlbums: [],
        nameAlbumChoose: null,
        choosedAlbums: [],
        albums: null
      }
    },
    created(){
        this.getAllSinger()
        this.getAllComposer()
        this.getAllGenre()
        this.getAllAlbum()
    },
    mounted(){
      this.loadInforEdit()
    },
    methods:{
        createSong(){
            if(this.$refs.form_create_song.validate()){
                axios.post('/song/store',{
                    albums: this.objectAlbums,
                    genres: this.objectGenres,
                    singers: this.objectSingers,
                    composers: this.objectComposers,
                    name: this.name,
                    lyrics: this.lyrics,
                    src: this.src,
                    image: this.image,
                    timeDuration: this.timeDuration,
                    releaseDate: this.releaseDate
                })
                .then((response) => {
                    if(response.data.status === 'success'){
                        this.$refs.form_create_song.reset()
                        this.objectAlbums = []
                        this.nameAlbumChoose = null
                        this.choosedAlbums = []
                        this.choosedSingers = []
                        this.choosedComposers = []
                        this.objectSingers = []
                        this.objectComposers = []
                        this.objectGenres = []
                        this.nameGenreChoose = null
                        this.choosedGenres = []
                        this.showUpdated = true
                        this.nameComposerChoose = null
                        this.nameSingerChoose = null
                        this.name = null
                        this.lyrics = null
                        this.releaseDate = null
                        this.src = null
                        this.image = null
                        this.timeDuration = null
                        setTimeout(() => {
                            this.showUpdated = false
                        }, 2000)
                    }else{
                        console.log(response.data.status)
                    }
                })
                .catch(() => {
                    console.log('error')
                })
            }
        },
        getAllSinger(){
            axios.get('/user/singer/get-all-singer')
            .then( (response) => {
                this.singers = response.data.singers
            })
            .catch(() => {
                console.log('fail')
            })
        },
        getAllComposer(){
            axios.get('/user/composer/get-all-composer')
            .then( (response) => {
                this.composers = response.data.composers
            })
            .catch(() => {
                console.log('fail')
            })
        },
        getAllGenre(){
            axios.get('/genre/get-all-genre')
            .then( (response) => {
                this.genres = response.data.genres
            })
            .catch(() => {
                console.log('fail')
            })
        },
        getAllAlbum(){
            axios.get('/album/get-all-album')
            .then( (response) => {
                this.albums = response.data.albums
            })
            .catch(() => {
                console.log('fail')
            })
        },
        noAlbum(){
          this.nameAlbumChoose = ''
          this.objectAlbums = []
          this.choosedAlbums = []
        },
        hasAlbum(){
          if(this.choosedAlbums.includes(0)){
            this.choosedAlbums = this.choosedAlbums.filter( (album) =>{
              return album !== 0
            })
          }
        },
        editSong(){
          axios.post('/song/store-edit',{
            songId: this.$route.params.id,
            albums: this.objectAlbums,
            genres: this.objectGenres,
            singers: this.objectSingers,
            composers: this.objectComposers,
            name: this.name,
            lyrics: this.lyrics,
            src: this.src,
            image: this.image,
            timeDuration: this.timeDuration,
            releaseDate: this.releaseDate
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
            console.log('fail to edit')
          })
        },
        loadInforEdit(){
          if(this.$route.params.id){
            axios.get('/song/get-full-infor-song/' + this.$route.params.id)
            .then( (response) => {
              var res = response.data.song
              this.name = res.songFinded.name
              this.lyrics = res.songFinded.lyrics
              this.releaseDate = res.songFinded.releaseDate
              this.src = res.songFinded.src
              this.image = res.songFinded.image
              this.timeDuration = res.songFinded.timeDuration
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
              if(res.albums.length === 0){
                this.choosedAlbums.push(0)
              }else{
                for(let i = 0;i < res.albums.length; i++){
                  this.objectAlbums.push(res.albums[i].id)
                  for(let j = 0; j < this.albums.length; j++){
                    if(this.objectAlbums[i] === this.albums[j].id){
                      if(this.nameAlbumChoose === null){
                        this.nameAlbumChoose = ''
                      }
                      this.nameAlbumChoose += this.albums[j].name + ', '
                      this.choosedAlbums.push(j + 1)
                    }
                  }
                }
              }
              for(let i = 0;i < res.genres.length; i++){
                this.objectGenres.push(res.genres[i].id)
                for(let j = 0; j < this.genres.length; j++){
                  if(this.objectGenres[i] === this.genres[j].id){
                    if(this.nameGenreChoose === null){
                      this.nameGenreChoose = ''
                    }
                    this.nameGenreChoose += this.genres[j].name + ', '
                    this.choosedGenres.push(j)
                  }
                }
              }
              for(let i = 0;i < res.composers.length; i++){
                this.objectComposers.push(res.composers[i].id)
                for(let j = 0; j < this.composers.length; j++){
                  if(this.objectComposers[i] === this.composers[j].id){
                    if(this.nameComposerChoose === null){
                      this.nameComposerChoose = ''
                    }
                    this.nameComposerChoose += this.composers[j].nickname + ', '
                    this.choosedComposers.push(j)
                  }
                }
              }
            })
          }
        }
    },
    watch:{
        choosedSingers(){
            this.nameSingerChoose = ''
            this.objectSingers = []
            for(let i = 0; i < this.choosedSingers.length; i++){
                this.nameSingerChoose += this.singers[this.choosedSingers[i]].nickname + ', '
                this.objectSingers.push(this.singers[this.choosedSingers[i]].id)
            }
        },
        choosedComposers(){
            this.nameComposerChoose = ''
            this.objectComposers = []
            for(let i = 0; i < this.choosedComposers.length; i++){
                this.nameComposerChoose += this.composers[this.choosedComposers[i]].nickname + ', '
                this.objectComposers.push(this.composers[this.choosedComposers[i]].id)
            }
        },
        choosedGenres(){
            this.nameGenreChoose = ''
            this.objectGenres = []
            for(let i = 0; i < this.choosedGenres.length; i++){
                this.nameGenreChoose += this.genres[this.choosedGenres[i]].name + ', '
                this.objectGenres.push(this.genres[this.choosedGenres[i]].id)
            }
        },
        choosedAlbums(){
            this.nameAlbumChoose = ''
            this.objectAlbums = []
            if(!this.choosedAlbums.includes(0)){
              for(let i = 0; i < this.choosedAlbums.length; i++){
                  this.nameAlbumChoose += this.albums[this.choosedAlbums[i] - 1].name + ', '
                  this.objectAlbums.push(this.albums[this.choosedAlbums[i] - 1].id)
              }
            }else{
              this.nameAlbumChoose = "Không thuộc Album nào"
            }  
        }
    }
  }
</script>

<style>
#input-form-create-song .v-label{
    color: white;
}

#input-form-create-song .v-input__slot::before{
    background-color: white;
}

#input-form-create-song textarea{
    color:white;
}
</style>

