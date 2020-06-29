<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/pokeball.png">
    <Head msg="Welcome to Pokemon Battle"/>
    <SearchPokes/>
  </div>
</template>

<script>
import Head from './components/Head.vue'
import SearchPokes from './components/SearchPokes.vue'

export default {
  name: 'App',
  components: {
    Head,
    SearchPokes
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
