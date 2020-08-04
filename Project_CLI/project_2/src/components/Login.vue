<template>
  <div>
    <!-- If sesion is on the buttons for login disapear -->
    <div v-if="!isSessionOn">
      <!-- buttons section -->
      <div :hidden="isLogin">
        <b-button variant="outline-light" size="sm" @click="enterLogin">
          <!-- This hide the word Remove for small screens -->
          <div class="d-none d-sm-block">
            <b-icon icon="box-arrow-right" class="mb-1"></b-icon> {{ $t("header.nav_btn-user_signin") }}
          </div>
          <b-icon icon="box-arrow-right" class="d-block d-sm-none"></b-icon>
        </b-button>
        <router-link to="/register">
          <b-button
            variant="outline-light"
            size="sm"
            class="ml-2"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Register"
          >
            <!-- This hide the word Remove for small screens -->
            <div class="d-none d-sm-block">
              <b-icon icon="person-plus-fill" class="mb-1"></b-icon> {{ $t("header.nav_btn-user_signup") }}
            </div>
            <b-icon icon="person-plus-fill" class="d-block d-sm-none"></b-icon>
          </b-button>
        </router-link>
      </div>
      <!-- form section -->
      <div :hidden="!isLogin">
        <b-form
          inline
          @submit.prevent="
            loginUser({
              email: email,
              password: pass,
            })
          "
        >
          <b-form-input
            v-model="$v.email.$model"
            type="email"
            class="mr-sm-2 border rounded-left"
            :class="{ 'is-invalid': $v.email.$error }"
            id="email_login"
            placeholder="email"
            size="sm"
          />
          <b-form-input
            v-model="pass"
            type="password"
            class="border rounded-right mr-sm-2"
            placeholder="password"
            size="sm"
            required
          />
          <b-button
            variant="outline-light"
            size="sm"
            class="mr-1"
            type="submit"
            data-toggle="tooltip"
            data-placement="bottom"
            title="login"
          >
            <i class="fa fa-paper-plane-o"></i>
          </b-button>
          <b-button
            variant="outline-light"
            size="sm"
            data-toggle="tooltip"
            data-placement="bottom"
            title="cancel"
            @click.prevent="cancel"
          >
            <i class="fa fa-times"></i>
          </b-button>
        </b-form>
        <span class="error-text " v-show="error">{{ error }}</span>
      </div>
    </div>
    <div v-if="isSessionOn">
      <b-nav-text
        ><p class="text-light">{{ user.email.split("@")[0] }}</p></b-nav-text
      >
      <b-button
        variant="outline-light"
        size="sm"
        @click.prevent="signOut"
        class="ml-2"
      >
        <!-- This hide the word Remove for small screens -->
        <div class="d-none d-md-block">
          <b-icon icon="box-arrow-left" class="mb-1"></b-icon>
          {{ $t("header.nav_btn-user_signout") }}
        </div>
        <b-icon icon="box-arrow-left" class="d-block d-md-none"></b-icon>
      </b-button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
      isLogin: false,
    };
  },
  validations: {
    email: { required, email },
  },
  computed: {
    ...mapState({
      user: (state) => state.userStore.user,
      error: (state) => state.userStore.error,
    }),
    ...mapGetters({ isSessionOn: "userStore/isSessionOn" }),
  },
  methods: {
    ...mapActions({
      loginUser: "userStore/loginUser",
      unloginUser: "userStore/unloginUser",
    }),
    ...mapMutations({
      setError: "userStore/setError",
    }),
    cancel: function(params) {
      this.setError(null); // Clean error
      this.isLogin = false;
    },
    enterLogin: function(params) {
      this.setError(null); // Clean error
      this.isLogin = true;
    },
    signOut() {
      this.unloginUser();
      this.email = "";
      this.pass = "";
      this.isLogin = false;
    },
  },
};
</script>
<style scoped>
.error-text {
  font-family: "Baloo Da 2", cursive;
  font-size: small;
  color: rgb(255, 255, 255);
  float: left;
}
.custom-color {
  color: whitesmoke;
}
</style>
