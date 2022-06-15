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
    <UrlForm></UrlForm>
    <hr />
    <h3 style="color: cyan">Url Remover</h3>
    <a-space direction="vertical" style="width: 100%">
      <a-input v-model:value="urlId" placeholder="Enter Url id" auto-size />
      <a-popconfirm
        title="Are you sure delete this url?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="deleteUrl()"
      >
        <a-button type="submit" :disabled="!urlId">Remove</a-button>
      </a-popconfirm>
    </a-space>

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
import UrlForm from "../components/UrlForm.vue";

const userStore = useUserStore();
const dbStore = useDataBaseStore();

const urlId = ref("");

dbStore.getUrls();
const username = computed(() => userStore.userEmail.split("@")[0]);

const deleteUrl = () => {
  dbStore.deleteUrl(urlId.value);
  urlId.value = "";
};
</script>
