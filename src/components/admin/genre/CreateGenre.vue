<template>
  <v-form ref="form_create_genre">
    <v-container style="padding-bottom: 100px">
      <v-row id="input-form-create-song">
        <v-col sm="12">
          <v-text-field
            v-model="name"
            label="Tên thể loại"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>
        <v-col sm="12">
          <v-text-field
            v-model="description"
            label="Mô tả"
            clearable
            :rules="rules"
            color="white"
          ></v-text-field>
        </v-col>
        <v-col sm="12">
          <v-text-field
            v-model="image"
            label="Ảnh"
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
            <v-btn @click="createGenre()">Tạo thể loại</v-btn>
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
            <v-btn @click="editGenre()">Sửa thể loại</v-btn>
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
            description: null,
            image: null,
            rules: [
                (value) => !!value || "Chưa nhập ký tự",
                (value) => (value && value.length >= 2) || "Ít nhất 2 ký tự",
            ],
            showUpdated: false
        }
    },
    created(){
      if(this.$route.params.id){
        this.getFullInforGenre()
      }
    },
    methods: {
        createGenre(){
          axios.post('/genre/store',{
            name: this.name,
            image: this.image,
            description: this.description
          })
          .then( (response) => {
            if(response.data.status === 'success'){
              this.showUpdated = true
              setTimeout(() => {
                this.showUpdated = false
              }, 2000)
              this.$refs.form_create_genre.reset()
              this.name = null
              this.image = null
              this.description = null
            }
          })
          .catch( (response) => {
            console.log(response)
          })
        },
        getFullInforGenre(){
            axios.get('/genre/get-full-infor-genre/' + this.$route.params.id)
            .then( (response) => {
                this.name = response.data.genre.name
                this.image = response.data.genre.image
                this.description = response.data.genre.description
            })
            .catch( () => {
                console.log('fail to get infor genre')
            })
        },
        editGenre(){
            if(this.$refs.form_create_genre.validate()){
                axios.post('/genre/store-edit',{
                    name : this.name,
                    image : this.image,
                    description : this.description,
                    genreId: this.$route.params.id
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
                    console.log('fail to get infor genre')
                })
            }
        }
    }
}
</script>