<template>
  <div class="home">
    <Head msg="Pokemon Battle Configuration"/>
    <PlayersConfig></PlayersConfig>    
  </div>
</template>
<script>
import Head from "@/components/Head.vue";
import PlayersConfig from "@/components/PlayersConfig.vue";

export default {
  name: 'Home',
  components:{
    Head,
    PlayersConfig
  },
}
</script>
