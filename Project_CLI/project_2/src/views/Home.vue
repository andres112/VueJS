<template>
  <div class="home">
    <Tittle msg="Pokemon Battle Configuration"/>
    <PlayersConfig></PlayersConfig>    
  </div>
</template>
<script>
import Tittle from "@/components/Tittle.vue";
import PlayersConfig from "@/components/PlayersConfig.vue";

export default {
  name: 'Home',
  components:{
    Tittle,
    PlayersConfig
  },
}
</script>
