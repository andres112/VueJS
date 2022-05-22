import { defineStore } from "pinia";

const useSettingsStore = defineStore("settingsStore", {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(payload) {
      this.loading = payload;
    },
  },
});

export { useSettingsStore };
