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
        <li class="nav-item">
          <router-link to="/history" class="nav-link"
            >Previous Battles</router-link
          >
        </li>
      </ul>
      <div>
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
  overflow: hidden;
}

#nav a {
  font-weight: bold;
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
