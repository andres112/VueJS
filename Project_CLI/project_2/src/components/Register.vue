<template>
  <div class="register">
    <!-- This alert shows the error message, and close with closeAlert function -->
    <b-alert variant="danger" :show="error != null" dismissible fade>
      <b-icon icon="error"></b-icon>{{ error }}
    </b-alert>
    <h2 class="mt-5">{{ $t("register.txt-subtitle") }}</h2>
    <b-form
      @submit.prevent="createUser({ email: email, password: pass })"
      class="mt-3"
    >
      <div class="form-group">
        <b-input
          type="email"
          id="email"
          size="lg"
          :placeholder="$t('register.input_placeholder-email')"
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
          :placeholder="$t('register.input_placeholder-password')"
          v-model="$v.pass.$model"
          class="border "
          :class="{ 'is-invalid': $v.pass.$error }"
        />
        <small v-if="!$v.pass.minLength" class="text-danger"
          >Min 6 characters</small
        >
      </div>
      <div class="form-group">
        <b-input
          type="password"
          id="r_pass"
          size="lg"
          :placeholder="$t('register.input_placeholder-repet_password')"
          v-model="$v.r_pass.$model"
          class="border rounded-bottom"
          :class="{ 'is-invalid': $v.r_pass.$error }"
        />
        <small v-if="!$v.r_pass.sameAsPass" class="text-danger"
          >Wrong password</small
        >
      </div>

      <!-- This button is going to be disabled if deactivate function is false -->
      <b-button type="submit" variant="outline-success" :disabled="$v.$invalid">
        <i class="fa fa-user-plus"></i> {{ $t("register.btn-register") }}
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
  },
  computed: {
    ...mapState({ error: (state) => state.userStore.error }),
  },
  created() {},
};
</script>

<style scoped>
.transparent-input {
  background-color: transparent !important;
  border: none !important;
}
.edit-input {
  background-color: rgba(0, 0, 0, 0.1) !important;
  border: none !important;
}
</style>
