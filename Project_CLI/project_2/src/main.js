import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Boostrap libraries and CSS files
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Validations dependecy
import Vuelidate from "vuelidate";

import "vue-swatches/dist/vue-swatches.css"; // For color picker
import PrettyCheckbox from "pretty-checkbox-vue"; // For Check boxes and radio buttons style
import "pretty-checkbox/src/pretty-checkbox.scss"; // scss for prety checkboxes

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Install the vuelidate instance
Vue.use(Vuelidate);

Vue.use(PrettyCheckbox);

import { auth } from "./firebase";

auth.onAuthStateChanged((user) => {
  if (user) {
    const payload = { email: user.email, uid: user.uid };
    store.dispatch("userStore/detectUser", payload);
  } else {
    store.dispatch("userStore/detectUser", user);
  }

  // Vue instance creation including router and store
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
