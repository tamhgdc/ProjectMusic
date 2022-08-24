<template>
  <v-form ref="form_create_song">
    <v-container style="padding-bottom: 100px">
      <v-row id="input-form-create-song">
        <v-col sm="12">
            <v-menu offset-y>
                <template v-slot:activator="{attrs, on}">
                    <v-text-field label="Chọn người dùng" v-bind="attrs" v-on="on" v-model="nameUserChoose" readonly :rules="selectRules"></v-text-field>
                </template>
                <v-list-item-group
                    style="background-color: #231b2e;height: 200px;"
                    class="overflow-y-auto"
                    v-model="choosedUsers"
                >
                    <v-list-item
                    v-for="(user, i) in users"
                    :key="i"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="user.fullname + ' - id: ' + user.id" ></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-menu>
        </v-col>
        <v-col sm="12">
            <div v-if="!alreadySinger">
                <v-checkbox
                v-model="chbSinger"
                :label="`Ca sỹ`" 
                class="input-chx"
                ></v-checkbox>
                <v-text-field 
                v-if="chbSinger"
                v-model="nicknameSinger"
                label="Nhập biệt danh của ca sỹ"
                :rules="rules"
                ></v-text-field>
            </div>
        </v-col>
        <v-col sm="12">
            <div v-if="!alreadyComposer">
                <v-checkbox
                v-model="chbComposer"
                :label="`Người sáng tác`"
                class="input-chx"
                ></v-checkbox>
                <v-text-field 
                v-if="chbComposer"
                v-model="nicknameComposer"
                label="Nhập biệt danh của người sáng tác"
                :rules="rules"
                ></v-text-field>
            </div>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
                    <v-alert
                      dense
                      type="success"
                      width="50%"
                      style="position: absolute; bottom: 30%; left: 25%;z-index: 1000;"
                      v-model="showUpdated"
                      transition="fab-transition"
                    >
                      Thiết lập tài khoản thành công
                    </v-alert>
            <v-btn @click="setupAccount()">Thiết lập</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            users: [],
            showUpdated : false,
            nameUserChoose: null,
            choosedUsers: null,
            selectRules: [
                (value) => !!value || "Chưa chọn người dùng",
            ],
            rules: [
                (value) => !!value || "Chưa nhập ký tự",
                (value) => (value && value.length >= 2) || "Ít nhất 2 ký tự",
            ],
            chbSinger: false,
            chbComposer: false,
            nicknameComposer: null,
            nicknameSinger: null,
            objectUsers: null,
            alreadySinger: false,
            alreadyComposer: false
        }
    },
    methods:{
        setupAccount(){
            if(this.$refs.form_create_song.validate()){
                axios.post('/user/setup-account',{
                    userId: this.objectUsers,
                    chbSinger: this.chbSinger,
                    chbComposer: this.chbComposer,
                    nicknameComposer: this.nicknameComposer,
                    nicknameSinger: this.nicknameSinger
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
                    console.log('fail to setup')
                })
            }
        },
        getAllUser(){
            axios.get('/user/get-all-user')
            .then( (response) => {
                this.users = response.data.users
            })
            .catch( () => {
                console.log('fail to get all user')
            })
        }
    },
    created(){
        this.getAllUser()
        this.$store.dispatch('updateShowMenu', false)
        this.$store.dispatch('sideBar/updateItemSideBars', this.$store.getters['sideBar/itemSideBars'])
    },
    watch:{
        choosedUsers(){
            this.nicknameComposer = null
            this.nicknameSinger = null
            this.chbSinger = false
            this.chbComposer = false
            this.alreadySinger = false
            this.alreadyComposer = false
            this.objectUsers = null
            this.nameUserChoose = null
            if(this.choosedUsers || this.choosedUsers === 0){
                this.nameUserChoose = this.users[this.choosedUsers].fullname
                this.objectUsers = this.users[this.choosedUsers].id
                axios.get('/user/already-singer-composer/' + this.objectUsers)
                .then( (response) => {
                    this.alreadySinger = response.data.already.singer 
                    this.alreadyComposer = response.data.already.composer
                })
                .catch( () =>{
                    console.log('fail to get already singer or composer')
                })
            }
        }
    }
}
</script>

<style>
.input-chx .v-input--selection-controls__input{
    background-color: white;
}
</style>