<template>
  <div id="app">
    <!-- navbar-expand-sm allows to put the elements in nav inline -->
    <div id="nav" class="navbar navbar-expand-sm">
      <!-- the router links in nav bar -->
      <!-- The mr-auto class split the elements inside the nav-bar -->
      <ul class="navbar-nav mr-auto mt-2 ">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Menu</router-link>
        </li>
        <li class="nav-item" v-if="isSessionOn">
          <router-link to="/history" class="nav-link"
            >Previous Battles</router-link
          >
        </li>
      </ul>
      <!-- The login part was separated and build in a component -->
      <Login></Login>
    </div>
    <router-view />
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
    ...mapGetters(["isSessionOn"]),
  },
};
</script>

<style>
#app {
  font-family: "Gloria Hallelujah", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  overflow: hidden;
}

#nav a {
  font-weight: bold;
  font-size: large;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.img404 {
  height: auto;
  width: 300px;
  position: relative;
}
</style>
