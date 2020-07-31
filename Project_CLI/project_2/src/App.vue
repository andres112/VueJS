<template>
  <div id="app">
    
    <!-- navbar-expand-sm allows to put the elements in nav inline -->
    <app-head></app-head>
    <br />
    <router-view />
  </div>
</template>
<script>
import Head from "@/components/Head.vue";

export default {
  components: {
    'app-head':Head,
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

.img404 {
  height: auto;
  width: 300px;
  position: relative;
}
</style>
