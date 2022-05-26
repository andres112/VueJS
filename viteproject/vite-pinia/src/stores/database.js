import { defineStore } from "pinia";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebase.config";

import { useUserStore } from "../stores/user";

export const useDataBaseStore = defineStore("dataBaseStore", {
  state: () => ({
    documents: [],
  }),
  actions: {
    // Get all documents of the user
    async getUrls() {
      try {
        const userStore = useUserStore();
        this.documents = [];
        const question = query(
          collection(db, "urls"),
          where("uid", "==", userStore.userInfo.uid)
        );
        const docs = await getDocs(question);
        docs.forEach((doc) => {
          this.documents.push({ id: doc.id, data: doc.data() });
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  },
});
