<template>
  <transition name="goLeft">
    <v-navigation-drawer
      absolute
      permanent
      right
      style="z-index:9999999;background-color: #120822;position: fixed;right:0; overflow: hidden;"
      :height="height+'px'"
      class="customScrollBar"
      v-if="isTurnOn"
    >
      <template v-slot:prepend>
        <h3 style="padding: 10px 16px;">Danh sách bài hát</h3>
        <div style="overflow-y: scroll;" :style="{'max-height': height/2 + 'px'}" class="customScrollBar">
          <v-list-item two-line :style="index !== songPlayed.length - 1?'opacity:0.5':''" v-for="(song, index) in songPlayed" :key="index+'a'"> 
            <v-list-item-avatar style="margin-top:0px;margin-bottom:0px;">
              <img :src="song.img">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ song.title }}</v-list-item-title>
              <v-list-item-subtitle style="color:white;opacity: 0.65;">
                <span v-for="singer in song.singer" :key="singer.id">
                  <router-link class="link-singer" :to="'/singer/' + singer.id">{{ singer.nickname }} </router-link>
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </template>

      <v-divider style="background-color: white;"></v-divider>

      <div style="padding: 8px 16px 0px 16px;">
        <p style="margin:0px;"><b>Tiếp theo</b></p>
      </div>

      <v-list dense style="padding-top: 0px;">
        <v-list-item
          v-for="index in (items.length - 1)"
          :key="index+'ab'"
        >
          <v-list-item-avatar>
            <img :src="items[index].img">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ items[index].title }}</v-list-item-title>
            <v-list-item-subtitle style="color:white;opacity: 0.65;">
                <span v-for="singer in items[index].singer" :key="singer.id">
                  <router-link class="link-singer" :to="'/singer/' + singer.id">{{ singer.nickname }} </router-link>
                </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('sidebarRight',['items','height','songPlayed','isTurnOn']),
      index: {
        get(){
          return this.$store.getters['fixedplay/index_song']
        }
      }
    },
    methods: {
      ...mapActions('sidebarRight',['updateHeight'])
    },
    created(){
      this.$store.dispatch('sidebarRight/updateHeight', window.innerHeight - 100)
      this.$store.dispatch('sidebarRight/firstUpdateSongPlayed', (this.$store.getters['sidebarRight/items'])[0])
    }

  }
</script>

<style>
.customScrollBar ::-webkit-scrollbar {
  width: 5px;
  background: #170f23;
}
.customScrollBar ::-webkit-scrollbar-track {
  border-radius: 10px;
}
.customScrollBar ::-webkit-scrollbar-thumb {
  background: grey; 
  border-radius: 10px;
}
.customScrollBar ::-webkit-scrollbar-thumb:hover {
  background: grey; 
}

</style>