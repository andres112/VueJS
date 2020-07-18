<template>
  <div>
    <Head msg="Pokemon Battle" />
    <h2 class="mt-5">User Register</h2>
    <form action="" class="mt-3">
      <div class="form-group">
        <input
          type="email"
          id="email"
          placeholder="email"
          v-model="email"
          class="border rounded-top"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          id="pass"
          placeholder="password"
          v-model="pass"
          class="border "
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          id="r_pass"
          placeholder="repeat password"
          v-model="r_pass"
          class="border rounded-bottom"
        />
      </div>
      <button type="submit" class="btn btn-outline-success">
        <i class="fa fa-user-plus"></i>Register
      </button>
    </form>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
export default {
  name: "Register",
  components: {
    Head,
  },
  data() {
    return {
      email: "",
      pass: "",
      r_pass: "",
    };
  },
};
</script>
