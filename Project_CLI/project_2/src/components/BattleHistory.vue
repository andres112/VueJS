<template>
  <div class="history">
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item d-inline-flex justify-content-between justify-content-sm-center align-items-center"
        v-for="item in history"
        :key="item.id"
      >
      <!-- The v-bind here is to use a class with css dynamic -->
        <div class="col-sm-5 text-left" v-bind:class="{'text-success': checkBattle(item.id)}">
          <span class="head-time"
            >{{ convertTime(item.timestamp.toDate()) }}:</span
          >
          <span> {{ item.player_1.name }} vs {{ item.player_2.name }}</span>
          <span class="ml-2" v-show="checkBattle(item.id)">
          <i class="fa fa-gamepad"></i>
        </span>
        </div>
        <div class="col-sm-5 text-right">
          <!-- Select button -->
          <button
            class="btn btn-success btn-sm"
            @click.prevent="selectBattle(item.id)"
          >
            <!-- This hide the word Remove for small screens -->
            <div class="d-none d-md-block">
              <i class="fa fa-fire"></i> Select
            </div>
            <div class="d-block d-md-none"><i class="fa fa-fire"></i></div>
          </button>
          <!-- Remove button -->
          <button
            class="btn btn-danger btn-sm ml-1"
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
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import support from "@/assets/scripts/functions.js";
import router from "@/router";

export default {
  name: "BattleHistory",
  computed: {
    ...mapState(["history"]),
    ...mapGetters(["isSessionOn", "checkBattle"]),
  },
  methods: {
    ...mapActions(["removeBattleDB", "getBattles"]),
    ...mapMutations(["setLoadPlayers", "setCurrentBattleId"]),
    convertTime(timestamp) {
      return support.convertTime(timestamp);
    },
    selectBattle(battle_id) {
      this.setLoadPlayers(
        this.$store.state.history.find((x) => x.id === battle_id)
      );
      this.setCurrentBattleId(battle_id);
      router.push("/battle");
    },
  },
  created() {
    // Then load players from database
    if (this.isSessionOn) {
      this.getBattles();
    }
  },
};
</script>
<style scoped>
li {
  font-family: "Baloo Da 2", cursive;
  font-weight: 400;
}
.head-time {
  font-weight: 700;
}
</style>
