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
    <a-form @finish="handleForm" :model="url">
      <a-form-item
        name="value"
        :rules="[
          { required: true, message: 'This field is required' },
          { whitespace: true, message: 'Not a valid field' },
        ]"
      >
        <a-input
          v-model:value="url.value"
          placeholder="Enter your long url"
          auto-size
        />
      </a-form-item>
      <a-button html-type="submit">Convert</a-button>
    </a-form>
    <hr />
    <h3 style="color: orangered">Url Remover</h3>
    <a-input v-model:value="urlId" placeholder="Enter Url id" auto-size />
    <a-button type="submit" @click="deleteUrl()">Remove</a-button>

    <hr />
    <pre>
      {{ dbStore.documents }}
    </pre>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useDataBaseStore } from "../stores/database";

const userStore = useUserStore();
const dbStore = useDataBaseStore();

const url = reactive({
  value: "",
});
const urlId = ref("");

dbStore.getUrls();
const username = computed(() => userStore.userEmail.split("@")[0]);
const handleForm = () => {
  debugger;
  dbStore.addUrl(url.value.trim());
  url.value = "";
};
const deleteUrl = () => {
  dbStore.deleteUrl(urlId.value);
  urlId.value = "";
};
</script>
