<template>
  <div>
    <nav>
      <h3 v-if="settingsStore.loading">Loading...</h3>
      <div v-else>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/login" v-if="!userStore.userInfo">Login</router-link>
        <button @click="userStore.signOut()" v-else>Logout</button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useUserStore } from "./stores/user";
import { useSettingsStore } from "./stores/settings";

const userStore = useUserStore();
const settingsStore = useSettingsStore();
</script>
