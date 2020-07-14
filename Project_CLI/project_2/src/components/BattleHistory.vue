<template>
  <div class="history">
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-left" v-for="item in history" :key="item.id">
          {{ convertTime(item.timestamp.toDate())}}: {{ item.player_1.name }} vs {{ item.player_2.name }}</li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import support from "@/assets/scripts/functions.js"

export default {
    name:"BattleHistory",
    computed: {
        ...mapState(['history'])
    },
    methods: {
        ...mapActions(['getHistory']),
        convertTime(timestamp){
            return support.convertTime(timestamp);
        }
    },
    created() {
        this.getHistory();
    },
}
</script>