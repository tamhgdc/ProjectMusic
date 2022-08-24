<template>
  <v-form ref="form_create_slide">
    <v-container style="padding-bottom: 100px">
      <v-row id="input-form-create-song">
        <v-col sm="12">
          <v-text-field
            v-model="link"
            label="Link"
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
            <v-btn @click="createSlide()">Tạo slide</v-btn>
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
            <v-btn @click="editSlide()">Sửa slide</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            link: null,
            rules: [
                (value) => !!value || "Chưa nhập ký tự",
                (value) => (value && value.length >= 2) || "Ít nhất 2 ký tự",
            ],
            showUpdated: false
        }
    },
    created(){
      if(this.$route.params.id){
        this.getFullInforSlide()
      }
    },
    methods: {
        createSlide(){
          axios.post('/slide/store',{
            link: this.link,
          })
          .then( (response) => {
            if(response.data.status === 'success'){
              this.showUpdated = true
              setTimeout(() => {
                this.showUpdated = false
              }, 2000)
              this.$refs.form_create_slide.reset()
              this.link = null
            }
          })
          .catch( (response) => {
            console.log(response)
          })
        },
        getFullInforSlide(){
            axios.get('/slide/get-full-infor-slide/' + this.$route.params.id)
            .then( (response) => {
                this.link = response.data.slide.link
            })
            .catch( () => {
                console.log('fail to get infor slide')
            })
        },
        editSlide(){
            if(this.$refs.form_create_slide.validate()){
                axios.post('/slide/store-edit',{
                    link : this.link,
                    slideId: this.$route.params.id
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
                    console.log('fail to get infor slide')
                })
            }
        }
    }
}
</script>