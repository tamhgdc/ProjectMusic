<template>
    <v-container fluid style="background: linear-gradient(to left, #00FF00 0%, #00FFFF 100%);height: 100%;">
        <v-row style="max-width:1200px;margin:0px auto;">
            <v-col md="6" offset-md="3" class="my-md-6" style="background-color:white;border-radius: 15px;">
                <div class="ma-md-4">
                    <h1 class="text-center ma-md-6" style="color: black">Đăng ký</h1>
                    <v-card-text v-if="message !== ''">
                        <h3 style="color: red;">{{ message }}</h3>
                    </v-card-text>
                    <v-card-text>
                        <v-form ref="form" class="form-validate">
                         <v-text-field class="text_input_login_register"
                            v-model="fullname"
                            :rules="rules"
                            label="Họ và tên"
                            required
                            prepend-icon="mdi-account-details"
                            color="black"
                        ></v-text-field>
                        <v-text-field class="text_input_login_register"
                            v-model="username"
                            :rules="rules"
                            label="Tài khoản"
                            required
                            prepend-icon="mdi-account"
                            color="black"
                        ></v-text-field>
                        <v-text-field class="text_input_login_register"
                            v-model="email"
                            :rules="emailRules"
                            label="Tài khoản Email"
                            required
                            color="black"
                            prepend-icon="mdi-email"
                        >
                        </v-text-field>
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
                        >
                        </v-text-field>
                        <v-text-field class="text_input_login_register"
                            v-model="repassword"
                            :rules="rules"
                            label="Nhập lại mật khẩu"
                            required
                            :type="type"
                            color="black"
                            prepend-icon="mdi-lock"
                            append-icon="mdi-eye"
                            @click:append="showPassword()"
                        >
                        </v-text-field>
                        <v-btn class="mt-3 py-md-5" rounded width="100%" style="background: linear-gradient(to left, #00FF00 0%, #00FFFF 100%);" @click="register()">
                            Đăng ký
                        </v-btn>
                        </v-form>
                        <div class="pa-4">
                            <router-link to="/login"><v-card-text class="pa-0" style="color: black">Đăng nhập</v-card-text></router-link>
                            <router-link to="/"><v-card-text class="pa-0" style="color: black">Trở về trang chủ</v-card-text></router-link>
                        </div>
                    </v-card-text>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return{
            fullname: '',
            username: '',
            password: '',
            repassword: '',
            email: '',
            rules: [
                value => !!value || 'Chưa nhập ký tự',
                value => (value && value.length >= 6) || 'Ít nhất 6 ký tự',
            ],
            emailRules: [
                v => !!v || 'Chưa nhập ký tự',
                v => /.+@.+\..+/.test(v) || 'Chưa đúng định dạng Email',
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
    methods:{
        showPassword(){
            if(this.type === 'password'){
                this.type = 'text'
            }else{
                this.type = 'password'
            }
        },
        register(){
            if(this.$refs.form.validate()){
                if(this.password === this.repassword){
                    axios.post('/user/createUser',{
                        fullname: this.fullname,
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                    .then( res => {
                        localStorage.setItem('music_token', res.data.access_token)
                        this.$router.push('/')
                    })
                    .catch( ({response}) => {
                        this.message = response.data.message
                    })
                }else{
                    this.message == 'Mật khẩu không khớp'
                }
            }
        }
    }
}
</script>