import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式  【增加这一句】
import './styles/index.less'
import 'amfe-flexible'
import '@/vant'
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
