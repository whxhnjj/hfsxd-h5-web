// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import global from './store/global'
import 'vant/lib/index.css'
import './assets/css/reset.css'
import VueWechatTitle from 'vue-wechat-title'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.prototype.GLOBAL = global
Vue.prototype.$axios = axios
Vue.use(VueWechatTitle)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
