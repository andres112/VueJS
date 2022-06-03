<template>
  <div>
    <h1>Login Without Password</h1>
    <input v-model.trim="username" style="min-width:30vw ;"/>
    <button @click="updateUserData()">Login</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const username = ref("");

username.value = userStore.userEmail;
const updateUserData = () => {
  userStore.updateUserData(username.value);
  userStore.sendSignInEmail(username.value);
};
</script>