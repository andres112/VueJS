<template>
  <div>
    <!-- If sesion is on the buttons for login disapear -->
    <div v-if="!isSessionOn">
      <!-- buttons section -->
      <div :hidden="isLogin">
        <b-button variant="outline-light" size="sm" @click="enterLogin">
          <!-- This hide the word Remove for small screens -->
          <div class="d-none d-md-block">
            <b-icon icon="box-arrow-right" class="mb-1"></b-icon> Sign in
          </div>
          <b-icon icon="box-arrow-right" class="d-block d-md-none"></b-icon>
        </b-button>
        <router-link to="/register">
          <b-button variant="outline-light" size="sm" class="ml-2" data-toggle="tooltip"
            data-placement="bottom"
            title="Register">
            <!-- This hide the word Remove for small screens -->
            <div class="d-none d-md-block">
              <b-icon icon="person-plus-fill" class="mb-1"></b-icon> Sign up
            </div>
            <b-icon icon="person-plus-fill" class="d-block d-md-none"></b-icon>
          </b-button>
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
            class="btn btn-outline-light mr-1 btn-sm"
            data-toggle="tooltip"
            data-placement="bottom"
            title="login"
          >
            <i class="fa fa-paper-plane-o"></i>
          </button>
          <button
            class="btn btn-outline-light btn-sm"
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
    <div v-if="isSessionOn">
      <b-nav-text><p class="text-light">{{ user.email.split("@")[0] }}</p></b-nav-text>
      <b-button
        variant="outline-light"
        size="sm"
        @click.prevent="signOut"
        class="ml-2"
      >
        <!-- This hide the word Remove for small screens -->
        <div class="d-none d-md-block">
          <b-icon icon="box-arrow-left" class="mb-1"></b-icon> Sign out
        </div>
        <b-icon icon="box-arrow-left" class="d-block d-md-none"></b-icon>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

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
    ...mapState(["error", "user"]),
    ...mapGetters(["isSessionOn"]),
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
.custom-color{
  color:whitesmoke
}
</style>
