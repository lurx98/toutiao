import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const userKey = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(userKey) || {}

  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      console.log(data)
      setItem(userKey, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
