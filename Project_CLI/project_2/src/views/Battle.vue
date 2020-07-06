<template>
  <div id="app" class="container-fluid">    
    <Head msg="Pokemon Battle Stadium"/>
    <Battle></Battle>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import Battle from '@/components/Battle.vue'

export default {
  name: 'BattleView',
  components: {
    Head,
    Battle
  }
}
</script>