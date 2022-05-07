<template>
  <div>
    <!-- Computed function -->
    <h1>Hello {{ username}}</h1>
    <!-- Call to state from store directly -->
    <h2>email: {{ userStore.userData }}</h2>
    <!-- Call to getter from store directly -->
    <h3>provider: {{userStore.emailProvider}}</h3>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const username = computed(() => userStore.userData.split("@")[0]);
</script>
