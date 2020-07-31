<template>
  <div id="app" class="container-fluid">    
    <Tittle msg="Pokemon Battles"/>
    <SearchPokes></SearchPokes>
  </div>
</template>

<script>
import Tittle from './components/Tittle.vue'
import SearchPokes from './components/SearchPokes.vue'

export default {
  name: 'App',
  components: {
    Tittle,
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
  margin-top: 10px;
}
</style>
