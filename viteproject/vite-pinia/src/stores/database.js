import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
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
          shortUrl: nanoid(10),
          uid: userStore.userInfo.uid,
        };
        const res = await addDoc(collection(db, "urls"), data);
        this.documents.push({ id: res.id, ...data });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUrl(id) {
      try {
        const userStore = useUserStore();
        const reference = doc(collection(db, "urls"), id);
        //Firs validate the document
        const docSnap = await getDoc(reference);
        if (!docSnap.exists) {
          throw new Error("Document does not exist");
        }
        if (docSnap.data().uid !== userStore.userInfo.uid) {
          throw new Error("Document does not belong to the user");
        }
        await deleteDoc(reference);
        this.documents = this.documents.filter((doc) => doc.id !== id);
      } catch (error) {
        console.log(error?.message);
      }
    },
  },
});
