<template>
  <div id="app" class="container-fluid">    
    <Head msg="Pokemon Battle Stadium"/>
    <SearchPokes></SearchPokes>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import SearchPokes from '@/components/SearchPokes.vue'

export default {
  name: 'Battle',
  components: {
    Head,
    SearchPokes
  }
}
</script>