<template>
  <div>
    <h1>Register</h1>
    <input v-model="username"/>
    <button @click="updateUserData()">Update Username</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const username = ref("");

username.value = userStore.userData;
const updateUserData = () => {
  userStore.updateUserData(username.value);
};
</script>
