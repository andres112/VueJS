<template>
  <div>
    <!-- Computed function -->
    <h1>Hello {{ username }}</h1>
    <!-- Call to state from store directly -->
    <h2>email: {{ userStore.userEmail }}</h2>
    <!-- Call to getter from store directly -->
    <h3>provider: {{ userStore.emailProvider }}</h3>
    <hr />
    <h3>Url shortener</h3>
    <form @submit.prevent="handleForm()">
      <input
        type="text"
        v-model="url"
        placeholder="Enter your long url"
        style="min-width: 50vw"
      />
      <button type="submit">Convert</button>
    </form>
    <hr />
    <h3 style="color:red ;">Url Remover</h3>
    <form @submit.prevent="deleteUrl()">
      <input
        type="text"
        v-model="urlId"
        placeholder="Enter Url id"
        style="min-width: 50vw"
      />
      <button type="submit">Remove</button>
    </form>

    <hr />
    <pre>
      {{ dbStore.documents }}
    </pre>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useDataBaseStore } from "../stores/database";

const userStore = useUserStore();
const dbStore = useDataBaseStore();

const url = ref("");
const urlId = ref("");

dbStore.getUrls();
const username = computed(() => userStore.userEmail.split("@")[0]);
const handleForm = () => {
  dbStore.addUrl(url.value);
};
const deleteUrl = () => {
  dbStore.deleteUrl(urlId.value);
  urlId.value = "";
};
</script>
