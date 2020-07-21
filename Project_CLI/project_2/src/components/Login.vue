<template>
  <div>
    <div :hidden="isLogin">
      <button
        class="btn btn-outline-success mr-2"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Log in"
        @click="enterLogin"
      >
        <i class="fa fa-sign-in"></i>
      </button>
      <router-link to="/register">
        <button
          class="btn btn-outline-success"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Register"
        >
          <i class="fa fa-user-plus"></i>
        </button>
      </router-link>
    </div>
    <div :hidden="!isLogin">
      <form class="form-inline">
        <input
          type="email"
          class="mr-sm-2 border rounded-left"
          id="email_login"
          placeholder="email"
          required
        />
        <div class="input-group mr-sm-2">
          <input
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    cancel: function(params) {
      this.isLogin = false;
    },
    enterLogin: function(params) {
      this.isLogin = true;
    },
  },
};
</script>
