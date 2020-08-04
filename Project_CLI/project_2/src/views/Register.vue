<template>
  <div>
    <Tittle :msg="$t('register.txt-title')" />
    <Register></Register>
  </div>
</template>

<script>
import Tittle from "@/components/Tittle.vue";
import Register from "@/components/Register.vue";

export default {
  name: "RegisterView",
  components: {
    Tittle,
    Register,
  },
};
</script>
