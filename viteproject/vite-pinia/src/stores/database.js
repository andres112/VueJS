import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebase.config";

import { useUserStore } from "../stores/user";

import { nanoid } from "nanoid";

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
          this.documents.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async addUrl(longUrl) {
      try {
        const userStore = useUserStore();
        const data = {
          longUrl,
          shortUrl: nanoid(6),
          uid: userStore.userInfo.uid,
        };
        const res = await addDoc(collection(db, "urls"), data);
        console.log(res);
        this.documents.push({ id: res.id, ...data });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
