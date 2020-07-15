<template>
  <div class="history">
    <Head msg="Pokemon Previous Battles" />
    <History></History>
    <br />
    <router-link to="/battle" tag="button" class="btn btn-success btn-lg"
      ><i class="fa fa-fire"></i> Battle</router-link
    >
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import History from "@/components/BattleHistory.vue";

export default {
  name: "HistoryView",
  components: {
    Head,
    History,
  },
};
</script>
