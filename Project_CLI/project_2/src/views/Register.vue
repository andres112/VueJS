<template>
  <div>
    <Head msg="Pokemon Battle" />
    <!-- This alert shows the error message, and close with closeAlert function -->
    <div class="alert alert-danger alert-dismissible" v-show="error">
      {{ error }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="closeAlert"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <h2 class="mt-5">User Register</h2>
    <form
      @submit.prevent="createUser({ email: email, password: pass })"
      class="mt-3"
    >
      <div class="form-group">
        <input
          type="email"
          id="email"
          placeholder="email"
          v-model="email"
          class="border rounded-top"
          required
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
      <!-- This button is going to be disabled if deactivate function is false -->
      <button
        type="submit"
        class="btn btn-outline-success"
        :disabled="!deactivate"
      >
        <i class="fa fa-user-plus"></i>Register
      </button>
    </form>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import { mapActions, mapState } from "vuex";

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
  methods: {
    ...mapActions(["createUser"]),
    closeAlert() {
      this.$store.state.error = null;
    },    
  },
  computed: {
    ...mapState(["error"]),
    // function to validate if password and repeat passwor are similar and different of empty
    deactivate() {
      return this.pass === this.r_pass && this.pass.trim() !=='';
    },
  },
  created() {},
};
</script>
