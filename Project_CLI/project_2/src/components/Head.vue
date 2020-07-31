<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="danger" class="align-center">
      <b-container>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav-collapse">
          <b-navbar-nav class="text-left">
            <b-nav-item :to="{ name: 'Menu' }" exact
              ><strong>Menu</strong>
            </b-nav-item>
            <b-nav-item :to="{ name: 'History' }" v-if="isSessionOn"
              ><strong>History</strong>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <Login></Login>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Login,
  },
  computed: {
    ...mapGetters({ isSessionOn: "userStore/isSessionOn" }),
  },
};
</script>
