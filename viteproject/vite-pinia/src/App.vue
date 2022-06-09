<template>
  <a-layout style="background-color: darkslategrey; min-height: 100vh">
    <a-layout-header>
      <a-menu theme="dark" mode="horizontal" v-model="selectedTab">
        <a-menu-item key="home">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="about">
          <router-link to="/about">About</router-link>
        </a-menu-item>
        <a-menu-item key="log">
          <router-link to="/login" v-if="!userStore.userInfo">
            Login
          </router-link>
          <a-button type="primary" @click="userStore.signOut()" v-else
            >Logout</a-button
          >
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px; color: azure">
      <a-typography-title :level="3" v-if="settingsStore.loading">
        Loading...
      </a-typography-title>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { useUserStore } from "./stores/user";
import { useSettingsStore } from "./stores/settings";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const settingsStore = useSettingsStore();
const route = useRoute();

const selectedTab = ref([]);

watchEffect(() => {
  console.log("watchEffect", route.path);
  if (route.path === "/") {
    selectedTab.value = ["home"];
  } else if (route.path === "/about") {
    selectedTab.value = ["about"];
  } else if (route.path === "/login") {
    selectedTab.value = ["log"];
  }
});
</script>
<style>
.ant-input {
  background: transparent !important;
  color: azure;
}
</style>
