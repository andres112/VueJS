<template>
  <div class="history">
    <Tittle msg="Pokemon Previous Battles" />
    <History></History>
  </div>
</template>

<script>
import Tittle from "@/components/Tittle.vue";
import History from "@/components/BattleHistory.vue";

export default {
  name: "HistoryView",
  components: {
    Tittle,
    History,
  },
};
</script>
