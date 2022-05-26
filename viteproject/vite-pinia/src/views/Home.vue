<template>
  <div>
    <!-- Computed function -->
    <h1>Hello {{ username }}</h1>
    <!-- Call to state from store directly -->
    <h2>email: {{ userStore.userEmail }}</h2>
    <!-- Call to getter from store directly -->
    <h3>provider: {{ userStore.emailProvider }}</h3>
    <hr />
    <pre>
      {{dbStore.documents}}
    </pre>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/user";
import { useDataBaseStore } from "../stores/database";

const userStore = useUserStore();
const dbStore = useDataBaseStore();

dbStore.getUrls();
const username = computed(() => userStore.userEmail.split("@")[0]);
</script>
