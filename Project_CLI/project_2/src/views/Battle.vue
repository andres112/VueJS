<template>
  <div id="app" class="container-fluid">    
    <Tittle msg="Pokemon Battle Stadium"/>
    <Battle></Battle>
  </div>
</template>

<script>
import Tittle from '@/components/Tittle.vue'
import Battle from '@/components/Battle.vue'

export default {
  name: 'BattleView',
  components: {
    Tittle,
    Battle
  }
}
</script>