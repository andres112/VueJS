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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
// those plugins should be imported with the corresponding css
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";

const userStore = useUserStore();
const username = ref("");

username.value = userStore.userEmail;
const updateUserData = () => {
  userStore.updateUserData(username.value);
  userStore.sendSignInEmail(username.value);
  message.info({
    content: "Please check your email to verify your account.",
    duration: 3,
  });
};
</script>
