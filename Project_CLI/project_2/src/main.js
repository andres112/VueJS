import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Boostrap libraries and CSS files
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "vue-swatches/dist/vue-swatches.css"; // For color picker
import PrettyCheckbox from 'pretty-checkbox-vue'; // For Check boxes and radio buttons style
import 'pretty-checkbox/src/pretty-checkbox.scss'; // scss for prety checkboxes

Vue.config.productionTip = false;
Vue.use(PrettyCheckbox)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import { auth } from "./firebase";

auth.onAuthStateChanged((user) => {
  if (user) {
    const payload = { email: user.email, uid: user.uid };
    store.dispatch("detectUser", payload);
  } else {
    store.dispatch("detectUser", user);
  }

  // Vue instance creation including router and store
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
