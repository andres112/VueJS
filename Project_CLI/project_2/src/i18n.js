import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "es",
  messages: {
    en: {
      "menu-title": "Pokemon Battle",
    },
    es: {
      "menu-title": "Batalla Pokemon",
    },
  },
});
