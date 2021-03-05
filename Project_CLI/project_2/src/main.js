import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { i18n } from "./i18n";
import VueAnalytics from "vue-analytics";

// Boostrap libraries and CSS files
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Validations dependecy
import Vuelidate from "vuelidate";

// For color picker
import "vue-swatches/dist/vue-swatches.css";
// For Check boxes and radio buttons style
import PrettyCheckbox from "pretty-checkbox-vue"; 
// scss for prety checkboxes
import "pretty-checkbox/src/pretty-checkbox.scss";

// for animations
import "animate.css";

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Install the vuelidate instance
Vue.use(Vuelidate);

// Install the Checkbox instance
Vue.use(PrettyCheckbox);

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: "UA-189236636-1",
  router, //Automatic google analytics tracking
});

import { auth } from "./firebase";

auth.onAuthStateChanged((user) => {
  if (user && user.emailVerified) {
    const payload = { email: user.email, uid: user.uid};
    store.dispatch("userStore/detectUser", payload);
  }
  else {
    store.dispatch("userStore/detectUser", null);
  }

  // Vue instance creation including router and store
  new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
  }).$mount("#app");
});
