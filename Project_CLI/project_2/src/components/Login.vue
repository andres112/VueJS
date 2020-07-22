<template>
  <div>
    <!-- If sesion is on the buttons for login disapear -->
    <div v-show="!isSession">
      <!-- buttons section -->
      <div :hidden="isLogin">
        <button
          class="btn btn-outline-success mr-2"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Log in"
          @click="enterLogin"
        >
          <i class="fa fa-sign-in"></i> Sign in
        </button>
        <router-link to="/register">
          <button
            class="btn btn-outline-success"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Register"
          >
            <i class="fa fa-user-plus"></i> Sign up
          </button>
        </router-link>
      </div>
      <!-- form section -->
      <div :hidden="!isLogin">
        <form
          class="form-inline"
          @submit.prevent="
            loginUser({
              email: email,
              password: pass,
            })
          "
        >
          <input
            v-model="email"
            type="email"
            class="mr-sm-2 border rounded-left"
            id="email_login"
            placeholder="email"
            required
          />
          <div class="input-group mr-sm-2">
            <input
              v-model="pass"
              type="password"
              class="border rounded-right"
              id="inlineFormInputGroupUsername2"
              placeholder="password"
              required
            />
          </div>
          <button
            class="btn btn-outline-success mr-1 btn-sm"
            data-toggle="tooltip"
            data-placement="bottom"
            title="login"
          >
            <i class="fa fa-paper-plane-o"></i>
          </button>
          <button
            class="btn btn-outline-danger btn-sm"
            data-toggle="tooltip"
            data-placement="bottom"
            title="cancel"
            @click.prevent="cancel"
          >
            <i class="fa fa-times"></i>
          </button>
        </form>
        <span class="error-text " v-show="error">{{ error }}</span>
      </div>
    </div>
    <div v-show="isSession">
      {{ email }}
      <button class="btn btn-outline-danger btn-sm" @click.prevent="signOut">
        <i class="fa fa-sign-out" aria-hidden="true"></i> Sign out
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
      isLogin: false,
    };
  },
  computed: {
    ...mapState(["error", "isSession"]),
  },
  methods: {
    ...mapActions(["loginUser", "unloginUser"]),
    ...mapMutations(["setError"]),
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
      this.isLogin= false;
    },
  },
};
</script>
<style scoped>
.error-text {
  font-family: "Baloo Da 2", cursive;
  font-size: small;
  color: red;
  float: left;
}
</style>
