<template>
  <div>
    <!-- This alert shows the error message, and close with closeAlert function -->
    <b-alert variant="danger" :show="error != null" dismissible fade>
      <b-icon icon="error"></b-icon>{{ error }}
    </b-alert>
    <h2 class="mt-5">User Register</h2>
    <b-form
      @submit.prevent="createUser({ email: email, password: pass })"
      class="mt-3"
    >
      <div class="form-group">
        <b-input
          type="email"
          id="email"
          size="lg"
          placeholder="email"
          v-model="$v.email.$model"
          :class="{ 'is-invalid': $v.email.$error }"
          class="border rounded-top"
        />
        <small v-if="!$v.email.email" class="text-danger"
          >This is not a correct email</small
        >
      </div>
      <div class="form-group">
        <b-input
          type="password"
          id="pass"
          size="lg"
          placeholder="password"
          v-model="$v.pass.$model"
          class="border"
          :class="{'is-invalid':$v.pass.$error}"
        />
        <small v-if="!$v.pass.minLength" class="text-danger"
          >Password min length: 6 characters</small
        >
      </div>
      <div class="form-group">
        <b-input
          type="password"
          id="r_pass"
          size="lg"
          placeholder="repeat password"
          v-model="$v.r_pass.$model"
          class="border rounded-bottom"
          :class="{'is-invalid':!$v.r_pass.sameAsPass}"
        />
      </div>
      
      <!-- This button is going to be disabled if deactivate function is false -->
      <b-button type="submit" variant="outline-success" :disabled="!deactivate">
        <i class="fa fa-user-plus"></i>Register
      </b-button>
    </b-form>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      pass: "",
      r_pass: "",
    };
  },
  validations: {
    email: { required, email }, // this is the same email considered in data
    pass: { required, minLength: minLength(6) },
    r_pass: { sameAsPass: sameAs("pass") },
  },
  methods: {
    ...mapActions({ createUser: "userStore/createUser" }),
    ...mapMutations({ setError: "userStore/setError" }),
    closeAlert() {
      this.setError(null); // Clean error
    },
  },
  computed: {
    ...mapState({ error: (state) => state.userStore.error }),
    // function to validate if password and repeat passwor are similar and different of empty
    deactivate() {
      return (
        this.pass === this.r_pass &&
        this.pass.trim() !== "" &&
        this.pass.length > 5
      );
    },
  },
  created() {},
};
</script>
