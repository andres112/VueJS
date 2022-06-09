<template>
  <div>
    <a-typography-title>Login Without Password</a-typography-title>
    <a-row>
      <a-col :xs="{ span: 24 }" :md="{ span: 12, offset: 6 }">
        <a-space>
          <a-input v-model:value="username" style="min-width: 30vw" />
          <a-button type="dashed" @click="updateUserData()">Login</a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-row style="padding-top: 2rem" v-if="alertMsg">
      <a-col span="24">
        <a-alert message="Info Text" type="info" show-icon />
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const username = ref("");
const alertMsg = ref(false);

username.value = userStore.userEmail;
const updateUserData = () => {
  userStore.updateUserData(username.value);
  userStore.sendSignInEmail(username.value);
  alertMsg.value = true;
  setTimeout(() => {
    alertMsg.value = false;
  }, 5000);
};
</script>
