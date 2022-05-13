import { defineStore } from "pinia";
import { auth } from "../firebase.config";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const useUserStore = defineStore("userStore", {
  /* Defining the initial state of the store. */
  state: () => ({
    userData: "andres.dorado90@gmail.com",
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
    async sendSignInEmail(email) {
      const actionCodeSettings = {
        url: "http://localhost:3000",
        handleCodeInApp: true,
      };
      try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem("emailForSignIn", email);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { useUserStore };
