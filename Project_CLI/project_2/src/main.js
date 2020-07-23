import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vue-swatches/dist/vue-swatches.css";

Vue.config.productionTip = false;

import { auth } from "./firebase";

auth.onAuthStateChanged((user) => {
  // initializr payload const
  const payload = {
    user: null,
    isSession: false,
  };
  if (user) {
    payload.user = { email: user.email, uid: user.uid };
    payload.isSession = true;
    store.dispatch("detectUser", payload);
  } else {
    store.dispatch("detectUser", payload);
  }

  // Vue instance creation including router and store
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
