import Vue from 'vue'
import axios from 'axios'
import Vuesax from 'vuesax'
import App from './App'
import router from './router'
import store from './store'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  render: h => h(App),
  created () {
    this.$router.push('/')
  }
}).$mount('#app')
