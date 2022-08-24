import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import {store} from './store/store'


Vue.config.productionTip = false

import Pusher from "pusher-js";
import VueEcho from "vue-echo-laravel";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = false;

Vue.use(VueEcho, {
  broadcaster: "pusher",
  key: "5d00e5d59639aeb24d7b",
  cluster: "ap1",
  forceTLS: true,
  encrypted: true,
  authEndpoint: "http://127.0.0.1:8000/api/v1/broadcasting/auth",
  // authEndpoint: "https://be-coc-music.herokuapp.com/api/v1/broadcasting/auth",
  auth: {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('music_token')
    }
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
