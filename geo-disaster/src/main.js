import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "../node_modules/vue2-google-maps/src/main.js";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import VueI18n from "vue-i18n";
import { translations } from "./locales";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSplit from "vue-split-panel";

const localConfig = require("@/assets/localConfig.js");

Vue.config.productionTip = false;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// FIXME: Remove this dependency if appear
// /e2mc/datapi/v1.1/post/216558/tags/1

Vue.use(VueGoogleMaps, {
  load: {
    key: localConfig.GoogleMapsApiKey,
    libraries: "places,drawing,visualization,geometry",
  },
});
Vue.use(VueSplit);
Vue.use(VueI18n);
const messages = { ...translations };
const i18n = new VueI18n({
  locale: "en", // set locale
  messages, // set locale messages
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
