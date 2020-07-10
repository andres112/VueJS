import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-swatches/dist/vue-swatches.css'

Vue.config.productionTip = false

// Vue instance creation including router and store
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
