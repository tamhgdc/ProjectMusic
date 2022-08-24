<template>
    <div style="height: 100vh;">
        <v-row class="d-flex pt-2 px-10" style="border-bottom: 2px solid white;">
            <div>
                <h2 class="pr-8" style="height: 40px;line-height: 48px;color:hotpink;border-right: 2px solid white;">MV</h2>
            </div>
            <v-toolbar dense elevation="0" style="background-color: transparent">
                <v-btn text dark>
                    Việt Nam
                </v-btn>
                <v-btn text dark>
                    US-UK
                </v-btn>
                <v-btn text dark>
                    K-POP
                </v-btn>
            </v-toolbar>
        </v-row>
        <v-row class="d-flex px-10">
            <div class="py-4">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="rgb(35 27 46)"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >
                            {{ textGenre }}
                            <v-icon right>mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list color="#432275">
                        <v-list-item @click="getGenreById(0)" class="bg-hover-item" dense>
                            <v-list-item-title>Tất cả</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        v-for="(item, index) in listGenre"
                        :key="index"
                        dense
                        class="bg-hover-item"
                        @click="getGenreById(index + 1)"
                        >
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <div class="pa-4">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="rgb(35 27 46)"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        
                        >
                            <v-icon left>mdi-filter-variant</v-icon>
                            {{ textStatus }}
                            <v-icon right>mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list color="#432275">
                        <v-list-item @click="statusMv(0)" class="bg-hover-item" dense>
                            <v-list-item-title >Nghe nhiều</v-list-item-title>
                        </v-list-item>
                        <!-- <v-list-item class="bg-hover-item" dense>
                            <v-list-item-title @click="statusMv(1)">Nổi bật</v-list-item-title>
                        </v-list-item> -->
                        <v-list-item @click="statusMv(1)" class="bg-hover-item" dense>
                            <v-list-item-title >Mới nhất</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-row>
        <v-row class="px-10">
            <v-col md="4" v-for="mv in listMVChoosed" :key="mv.id">
                <div style="position: relative;">
                    <div class="bg-btn-play">
                        <div class="show-btn-play-mv" style="height: 100%;">
                            <v-btn @click="goToMv(mv.id)" style="display: none;" dark class="absolute-btn" absolute icon>
                                <v-icon size="48px">mdi-play-circle-outline</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <v-img style="border-radius: 6px;" :src='"https://docs.google.com/uc?id=" + mv.image'></v-img>
                </div>
                <v-card color="transparent" flat style="position: relative">
                    <v-list-item three-line class="px-0">
                        <v-list-item-avatar
                            tile
                            size="60"
                        >
                            <v-img style="border-radius: 100%;" :src='"https://docs.google.com/uc?id=" + mv.singerImg'></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="text-h5 mb-1">
                                {{ mv.songName }}
                            </v-list-item-title>
                            <v-card-subtitle style="color: white" class="pa-0">
                                <span 
                                @mouseleave="leaveInforCard"
                                @mouseover="checkLoad(singer.user_id)"
                                v-for="singer in mv.singers" 
                                :key='singer.id + "-singer"'>
                                    <router-link :to='"/singer/" + singer.id'  class="link-singer">
                                        {{ singer.nickname }}
                                    </router-link>
                                    <div class="display-none">
                                        <SingerInfor
                                            v-if="!isHiddenInforCard"
                                            :singer="singerInfo"
                                        />
                                    </div>
                                </span>
                            </v-card-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'
import SingerInfor from "../general/SingerInfo.vue"
import { singerInforMixin } from '@/mixin/SingerInforMixin.js'

export default {
    mixins: [singerInforMixin],
    components: {
        SingerInfor
    },
    data() {
        return{
            listGenre: [],
            listMVChoosed: [],
            status: 0,
            textStatus: 'Nghe nhiều',
            textGenre: 'Tất cả',
            indexGenre: 0,
            indexStatus: 0,
        }
    },
    created(){
        this.getAllGenre()
        this.getGenreById(0)
    },
    methods:{
        getAllGenre(){
            axios.get('/genre/get-all-genre')
            .then( (response) => {
                this.listGenre = response.data.genres
            })
            .catch( () => {
                console.log('fail to get all genre')
            })
        },
        getGenreById(index){
            this.indexGenre = index
            if(this.indexGenre === 0){
                this.textGenre = 'Tất cả'
                axios.get('/mv/get-all-mv')
                .then( (response) => {
                    this.listMVChoosed = response.data.mvs
                    this.sortByStatus(this.indexStatus)
                })
                .catch( response => {
                    console.log(response)
                })
            }else{
                this.textGenre = this.listGenre[index - 1].name
                axios.get('/mv/get-by-genre/' + this.listGenre[index - 1].id)
                .then( (response) => {
                    this.listMVChoosed = response.data.mvs
                    this.sortByStatus(this.indexStatus)
                })
                .catch(() => {
                    console.log('fail to get by genre')
                })
            }
        },
        statusMv(id){
            this.indexStatus = id
            if(this.indexStatus === 0){
                this.textStatus = 'Nghe nhiều'
            // }else if(this.statusMv === 1){
            //     this.textStatus = 'Nổi bật'
            }else{
                this.textStatus = 'Mới nhất'
            }
        },
        sortByStatus(status){
            if(status === 0){
                this.listMVChoosed = this.listMVChoosed.sort( (a, b) => (a.view > b.view) ? -1 : 1 )
            }else{
                this.listMVChoosed = this.listMVChoosed.sort( (a, b) =>  (a.created_at > b.created_at) ? -1 : 1 )
            }
        },
        goToMv(id){
            this.$router.push('/mv/' + id)
        }
    },
    watch:{
        indexStatus(){
            this.sortByStatus(this.indexStatus)
        }
    }
}
</script>

<style>
.bg-hover-item:hover{
    background: #767676;
}

.link-singer{
    color: white !important;
}
.link-singer:hover{
    color: #9198e5 !important;
    text-decoration: underline;
}

.bg-btn-play{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0; 
    right: 0;
    z-index: 2;
}

.absolute-btn{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.show-btn-play-mv:hover button{
    display: block !important;
}
</style>