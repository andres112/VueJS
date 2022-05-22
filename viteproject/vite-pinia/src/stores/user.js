import { defineStore } from "pinia";
import { auth } from "../firebase.config";
import {
  sendSignInLinkToEmail,
  signOut,
  onAuthStateChanged,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
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
    getCurrentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userInfo = user;
            } else {
              this.userInfo = null;
            }
            resolve(user);
          },
          (error) => reject(error)
        );
        unsubscribe();
      });
    },
    isLinkEmail() {
      return new Promise((resolve, reject) => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
          let email = window.localStorage.getItem("emailForSignIn");
          if (!email) {
            email = window.prompt("Please provide your email for confirmation");
          } // Clear email from storage.
          signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
              window.localStorage.removeItem("emailForSignIn");
              resolve(result)
            })
            .catch((error) => {
              console.log(error);
            });
        }
        resolve();
      });
    },
    setUserInfo(payload) {
      this.userInfo = payload;
    },
  },
});

export { useUserStore };
