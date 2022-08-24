<template>
    <div class="pa-10" style="height: 100%;">
        <v-row>
            <v-col sm="12" class="px-0">
                <h1>Thư viện <v-icon size="48" color="#7200a1">mdi-play-circle</v-icon></h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="12" style="border-bottom: 2px solid grey" class="pa-0">
                <v-list color="transparent" class="pa-0">
                    <v-list-item-group active-class="choose-header-indi" mandatory class="d-flex">
                        <v-list-item class="rv-width px-0 mr-5">
                            <v-list-item-content @click="choose(1)">
                                Bài hát
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="rv-width px-0 mr-5">
                            <v-list-item-content @click="choose(2)">
                                Playlist
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="rv-width px-0 mr-5">
                            <v-list-item-content @click="choose(3)">
                                Album
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="rv-width px-0 mr-5">
                            <v-list-item-content @click="choose(4)">
                                MV
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
        <keep-alive>
            <router-view style="height: 100%;"></router-view>
        </keep-alive>
    </div>
</template>

<script>
import { individualMixin } from "@/mixin/IndividualMixin.js";
export default {
    mixins: [individualMixin],
    beforeRouteEnter (to, from, next) { 
        if(localStorage.getItem('music_token')){
            next()
        }else{
            sessionStorage.setItem('backLogin', to.path)
            window.location.replace("/login")
        }
    },
    data() {
        return{

        }
    },
    methods: {

    }
}
</script>

<style>
.choose-header-indi{
    border-bottom: 2px solid #7200a1;
}
.rv-width::before, .rv-width::after{
    display: none;
}

.rv-width{
    display: inline-block;
    flex: none !important;
}
</style>