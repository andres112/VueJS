<template>
  <div class="history container">
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="item in history"
        :key="item.id"
      >
        <div class="col-sm-6 text-left">
          <span class= "head-time">{{ convertTime(item.timestamp.toDate()) }}:</span>
          <span> {{ item.player_1.name }} vs
          {{ item.player_2.name }}</span>
          
        </div>
        <div class="col-sm-6">
          <button
            class="btn btn-danger btn-sm"
            @click.prevent="removeBattleDB(item.id)"
          >
            <!-- This hide the word Remove for small screens -->
            <div class="d-none d-md-block">
              <i class="fa fa-trash-o"></i> Remove
            </div>
            <div class="d-block d-md-none"><i class="fa fa-trash-o"></i></div>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import support from "@/assets/scripts/functions.js";

export default {
  name: "BattleHistory",
  computed: {
    ...mapState(["history"]),
  },
  methods: {
    ...mapActions(["getHistory", "removeBattleDB"]),
    convertTime(timestamp) {
      return support.convertTime(timestamp);
    },
  },
  created() {
    this.getHistory();
  },
};
</script>
<style scoped>
li {
  font-family: "Baloo Da 2", cursive;
  font-weight: 400;
}
.head-time{
  font-weight: 700;
}
</style>
