<template>
  <a-form @finish="handleForm" :model="url">
    <a-form-item
      name="value"
      :rules="[
        {
          required: true,
          message: 'This field is required',
          whitespace: true,
        },
        { type: 'url', message: 'Not a valid url' },
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
</template>

<script setup>
import { useDataBaseStore } from "../stores/database";
import { reactive } from "vue";

const dbStore = useDataBaseStore();
const url = reactive({
  value: "",
});
const handleForm = () => {
  dbStore.addUrl(url.value.trim());
  url.value = "";
};
</script>
