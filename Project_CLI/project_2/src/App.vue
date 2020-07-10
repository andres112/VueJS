<template>
  <div id="app">
    <div id="nav">
      <!-- the router links in nav bar -->
      <router-link to="/">Menu</router-link> |
      <!-- <router-link to="/battle">Battle</router-link> | -->
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
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

.img404{
  height: auto;
  width: 300px;
  position: relative;
}  
</style>
