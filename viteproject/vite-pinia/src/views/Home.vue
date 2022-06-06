<template>
  <div>
    <!-- Computed function -->
    <a-typography-title>Hello {{ username }}</a-typography-title>
    <!-- Call to state from store directly -->
    <a-typography-title :level="3">
      email: {{ userStore.userEmail }}
    </a-typography-title>
    <!-- Call to getter from store directly -->
    <a-typography-title :level="3">
      provider: {{ userStore.emailProvider }}
    </a-typography-title>
    <hr />
    <h3 style="color: greenyellow">Url shortener</h3>
    <a-form @submit.prevent="handleForm()">
      <a-input
        v-model="url"
        placeholder="Enter your long url"
        auto-size
      />
      <a-button type="submit">Convert</a-button>
    </a-form>
    <hr />
    <h3 style="color: orangered">Url Remover</h3>
    <a-form @submit.prevent="deleteUrl()">
      <a-input
        v-model="urlId"
        placeholder="Enter Url id"
        auto-size
      />
      <a-button type="submit">Remove</a-button>
    </a-form>

    <hr />
    <pre>
      {{ dbStore.documents }}
    </pre>
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
