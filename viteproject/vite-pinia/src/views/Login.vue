<template>
  <div>
    <a-typography-title>Login Without Password</a-typography-title>
    <a-space>
      <a-input v-model.trim="username" style="min-width: 30vw"/>
      <a-button type="dashed" @click="updateUserData()">Login</a-button>
    </a-space>
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
