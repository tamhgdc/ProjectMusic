<template>
  <v-col md="12" class="px-2 py-0" >
    <v-card flat class="bg-hover-list-item">
        <v-row style="background-color:#231b2e;">
          <v-list-item>
            <v-list-item-content>
              <div style="width: 100%">
                <v-img class="logo-web" style="height: 48px; object-fit: cover;background-color:transparent;" :src="require('../assets/' + logo)">
                </v-img>
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-list dense nav width="100%">
            <v-list-item v-for="item in itemSideBars" :key="item.title" link>
              <router-link :to="item.to" >
              <v-list-item-icon>
                <v-icon style="color: white;">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              </router-link>

              <v-list-item-content>
                <router-link :to="item.to" >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>

        <v-divider class="pl-2" style="background-color:#FFFAF0;margin: 15px 0px 15px 0px;box-shadow: 0px 3px 5px white;"></v-divider>

        <v-row style="background-color:#231b2e;">
          <v-list dense nav style="height: 310px; width: 100%; overflow: hidden scroll;" class="customScroll">
            <v-list-item
              v-for="item in itemBelowSideBars"
              :key="item.title"
              link
              style="width: 100%"
            >
              <router-link :to="item.to" >
                <v-list-item-icon>
                  <v-icon style="color: white;">{{ item.icon }}</v-icon>
                </v-list-item-icon>
              </router-link>

              <v-list-item-content>
                <router-link :to="item.to" >
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
            <v-card 
            class="rounded-pill" 
            color="#7200a1" 
            style="padding-bottom: 15px;" 
            v-if="!login && !$route.path.includes('admin') && hideVip"
            >
              <v-card-text style="color:white;text-align:center;padding-bottom: 5px;">Đăng nhập để khám phá playlist riêng của bạn</v-card-text>
              <v-btn plain outlined rounded color="white" class="d-flex justify-center"  style="margin: 0px auto;" ><router-link style="color:white" to="/login">ĐĂNG NHẬP</router-link></v-btn>
            </v-card>
            <v-card 
            class="rounded-pill" 
            style="margin-top: 10px;padding-bottom: 15px;background-image: linear-gradient(117deg,#5a4be7,#c86dd7 102%);"
            v-if="!$route.path.includes('admin') && hideVip"
            >
              <v-card-text style="color:white;text-align:center;padding-bottom: 5px;">Nghe nhạc không quảng cáo cùng kho nhạc VIP</v-card-text>
              <v-btn plain outlined rounded color="black" class="d-flex justify-center" style="margin: 0px auto;background-color:#ffdb00;" >NÂNG CẤP VIP</v-btn>
            </v-card>
          </v-list>
        </v-row>
        <v-row v-if="!$route.path.includes('admin') && hideVip" style="margin-top:0px;">
          <!-- Tao playlist moi -->
          <v-card color="#231b2e"  width="100%">
            <v-btn plain color="white" width="100%" style="padding: 0px" to="/playlist">
              <v-icon>mdi-playlist-music</v-icon>
              Danh sách playlist
            </v-btn>
          </v-card>
        </v-row>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data(){
    return{
      login : false,
      hideVip: true
    }
  },
  mounted(){
    if(localStorage.getItem('music_token')){
      this.login = true
    }
    this.hideVip = this.$store.getters['showSidebarLeft']
  },
  computed: {
    ...mapGetters('sideBar',['itemSideBars','itemBelowSideBars','logo'])
  },
  watch:{
    '$store.state.showSidebarLeft'(){
      this.hideVip = this.$store.getters['showSidebarLeft']
      if(!this.hideVip){
        this.itemBelowSideBars.push(
          { title: "Danh sách playlist", icon: "mdi-playlist-music", to:'/playlist'}
        )
      }else{
        this.itemBelowSideBars.pop()
      }
    }
  }
};
</script>

<style>
.v-list-item{
  margin-bottom: 0px !important;
}
a{
  text-decoration: none;
}
.logo-web .v-responsive__content{
  width: 0px !important;
}

.customScroll::-webkit-scrollbar {
  background-color: #231b2e;
}

.bg-hover-list-item .theme--light.v-list-item:hover::before {
    background-color: white;
    opacity: 0.15;
}
</style>