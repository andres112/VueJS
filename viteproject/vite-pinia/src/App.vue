<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login" v-if="!userStore.userInfo">Login</router-link>
      <button @click="userStore.signOut()" v-else>Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>
