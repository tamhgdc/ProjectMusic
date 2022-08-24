<template>
    <v-container fluid style="background: linear-gradient(to left, #00FF00 0%, #00FFFF 100%); height: 100%">
        <v-row style="max-width:1200px;margin:0px auto;">
            <v-col md="6" offset-md="3" class="my-md-6" style="background-color:white;border-radius: 15px;">
                <div class="ma-md-4">
                    <h1 class="text-center ma-md-6" style="color: black">Đăng nhập</h1>
                    <v-card-text>
                        <v-card-text v-if="message !== ''" style="color: red;">{{ message }}</v-card-text>
                        <v-form ref="form" class="form-validate">
                        <v-text-field class="text_input_login_register"
                            v-model="username"
                            :rules="rules"
                            label="Tài khoản"
                            required
                            prepend-icon="mdi-account"
                            color="black"
                            @keyup.enter="login()"
                        ></v-text-field>
                        <v-text-field class="text_input_login_register"
                            v-model="password"
                            :rules="rules"
                            label="Mật khẩu"
                            required
                            :type="type"
                            color="black"
                            prepend-icon="mdi-lock"
                            append-icon="mdi-eye"
                            @click:append="showPassword()"
                            @keyup.enter="login()"
                        >
                            <v-btn>
                                <v-icon color="black">mdi-eye</v-icon>
                            </v-btn>
                        </v-text-field>
                        <router-link to="/register"><v-card-text class="pa-0" style="color: black;text-align:right;">Quên mật khẩu</v-card-text></router-link>
                        <v-btn class="mt-3 py-md-5" rounded width="100%" style="background: linear-gradient(to left, #00FF00 0%, #00FFFF 100%);" @click="login()">
                            Đăng nhập
                        </v-btn>
                        </v-form>
                        <v-card-text style="color: black;text-align: center;">Hoặc đăng nhập bằng</v-card-text>
                        <div class="text-center pb-md-8">
                            <v-btn text><v-icon size="40px" color="primary">mdi-facebook</v-icon></v-btn>
                            <v-btn text><v-icon size="40px" color="blue">mdi-twitter</v-icon></v-btn>
                            <v-btn text><v-icon size="40px" color="red">mdi-gmail</v-icon></v-btn>
                        </div>
                        <v-card-text class="pa-0" style="color: black;text-align: center;">Bạn chưa có tài khoản?</v-card-text>
                        <router-link to="/register"><v-card-text class="pa-0" style="color: black;text-align: center;">ĐĂNG KÝ</v-card-text></router-link>
                    </v-card-text>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            username: '',
            password: '',
            rules: [
                value => !!value || 'Chưa nhập ký tự',
                value => (value && value.length >= 6) || 'Ít nhất 6 ký tự',
            ],
            type: 'password',
            message: ''
        }
    },
    created(){
        if(localStorage.getItem('music_token')){
            this.$router.push('/')
        }
        this.$store.dispatch('updateShowSidebarLeft', false)
        this.$store.dispatch('updateShowMenu', false)
        this.$store.dispatch('updateShowFixedPlay', false)
    },
    computed:{
        ...mapGetters('login',['loggedIn'])
    },
    methods:{
        showPassword(){
            if(this.type === 'password'){
                this.type = 'text'
            }else{
                this.type = 'password'
            }
        },
        login(){
            if(this.$refs.form.validate()){
                axios.post('/user/login',{
                    username : this.username,
                    password: this.password
                })
                .then( res => {
                    localStorage.setItem(
                        "music_token",
                        res.data.access_token
                    )
                    this.$store.dispatch('login/updateLoggedIn', true)
                    if(res.data.isMemberAdmin){
                        window.location.replace('/admin')
                    }else{
                        if(sessionStorage.getItem('backLogin')){
                            window.location.replace(sessionStorage.getItem('backLogin'))
                            sessionStorage.removeItem('backLogin')
                        }else{
                            this.$router.push('/')
                        }
                    }
                })
                .catch( ({response})  => {
                    this.message = response.data.message
                })
            }
        }
    }
}
</script>

<style>
    .text_input_login_register input{
      color:black !important;
    }
    .form-validate .v-messages__message{
        color:red;
    }
</style>