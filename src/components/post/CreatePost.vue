<template>
    <v-card class="pa-6" color= "#231b2e">
        <v-form class="form-create-post">
            <v-text-field color="white" label="Mô tả" v-model="description"></v-text-field>
            <v-text-field color="white" label="Đường dẫn ảnh" v-model="linkImg"></v-text-field>
            <v-btn :loading="loading" color="primary" @click="createPost">Đăng bài</v-btn>
        </v-form>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return{
            description: '',
            linkImg: '',
            loading: false
        }
    },
    methods:{
        createPost(){
            if(this.description.trim() == '' && this.linkImg.trim() == ''){
                console.log('Nhap gi di')
            }else{
                this.loading = true
                axios.post('/post/store', {
                    description: this.description,
                    linkImg: this.linkImg,
                })
                .then( (response) => {
                    if(response.data.message == 'success'){
                        this.description = ''
                        this.linkImg = ''
                        this.loading = false
                    }
                })
                .catch( () => {
                    this.loading = false
                })
            }
        }
    }
}
</script>

<style>
.form-create-post .v-label{
    color: white !important;
}
</style>