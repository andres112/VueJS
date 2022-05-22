import { defineStore } from "pinia";
import { auth } from "../firebase.config";
import { sendSignInLinkToEmail, signOut } from "firebase/auth";
import router from "../router";

const useUserStore = defineStore("userStore", {
  /* Defining the initial state of the store. */
  state: () => ({
    userEmail: "andres.dorado90@gmail.com",
    userInfo: null,
  }),
  /* Getters that returns the email provider. */
  getters: {
    emailProvider(state) {
      return state.userEmail.split("@")[1];
    },
  },
  /* Actions that updates the userEmail state. */
  actions: {
    updateUserData(payload) {
      this.userEmail = payload;
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
    async signOut() {
      try {
        await signOut(auth);
        this.userInfo = null;
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    setUserInfo(payload) {
      this.userInfo = payload;
    }
  },
});

export { useUserStore };
