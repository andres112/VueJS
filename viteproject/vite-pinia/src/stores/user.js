import { defineStore } from "pinia";

const useUserStore = defineStore("userStore", {
  /* Defining the initial state of the store. */
  state: () => ({
    userData: "andres.dorado@gmail.com",
  }),
  /* Getters that returns the email provider. */
  getters: {
    emailProvider(state) {
      return state.userData.split("@")[1];
    },
  },
  /* Actions that updates the userData state. */
  actions: {
    updateUserData(payload) {
      this.userData = payload;
    },
  },
});

export { useUserStore };
