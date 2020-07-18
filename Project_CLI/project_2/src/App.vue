<template>
  <div id="app">
    <div id="nav">
      <!-- the router links in nav bar -->
      <router-link to="/">Menu</router-link> |
      <router-link to="/history">Previous Battles</router-link>
      <div class="topnav-right">
        <button
          class="btn btn-outline-success mr-2"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Log in"
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
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.topnav-right {
  float: right;
}

.img404 {
  height: auto;
  width: 300px;
  position: relative;
}

</style>
