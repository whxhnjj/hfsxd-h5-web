import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultToken = ''

try {
  if (localStorage.token) {
    defaultToken = localStorage.token
  }
} catch (e) {}

export default new Vuex.Store({
  state: {
    Token: defaultToken
  },
  mutations: {
    Token (state, token) {
      state.token = token
      try {
        localStorage.token = token
      } catch (e) {}
    }
  }
})
