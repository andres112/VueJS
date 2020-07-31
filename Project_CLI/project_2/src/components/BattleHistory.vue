<template>
  <div class="history">
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item d-inline-flex justify-content-between justify-content-sm-center align-items-center"
          v-for="item in history"
          :key="item.id"
        >
          <!-- The v-bind here is to use a class with css dynamic -->
          <div
            class="col-sm-5 text-left"
            v-bind:class="{ 'text-success': checkBattle(item.id) }"
          >
            <span class="head-time"
              >{{ convertTime(item.timestamp.toDate()) }}:</span
            >
            <span> {{ item.player_1.name }} vs {{ item.player_2.name }}</span>
            <span class="ml-2" v-show="checkBattle(item.id)">
              <b-icon icon="controller" font-scale="1.2"></b-icon>
            </span>
          </div>
          <div class="col-sm-5 text-right">
            <!-- Select button -->
            <b-button
              variant="success"
              size="sm"
              @click.prevent="selectBattle(item.id)"
            >
              <!-- This hide the word Remove for small screens -->
              <div class="d-none d-md-block">
                <b-icon icon="lightning-fill" class="mb-1"></b-icon> Battle
              </div>
              <b-icon icon="lightning-fill" class="d-block d-md-none"></b-icon>
            </b-button>
            <!-- Remove button -->
            <b-button
              variant="danger"
              size="sm"
              class="ml-1 "
              @click.prevent="removeBattleDB(item.id)"
            >
              <!-- This hide the word Remove for small screens -->
              <div class="d-none d-md-block">
                <b-icon icon="trash" class="mb-1"></b-icon> Remove
              </div>
              <b-icon icon="trash" class="d-block d-md-none"></b-icon>
            </b-button>
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
    ...mapState({ history: (state) => state.battle.history }),
    ...mapGetters({
      isSessionOn: "userStore/isSessionOn",
      checkBattle: "battle/checkBattle",
      getHistory: "battle/getHistory",
    }),
  },
  methods: {
    ...mapActions({
      removeBattleDB: "battle/removeBattleDB",
      getBattles: "battle/getBattles",
      updateCurrentBattle: "battle/updateCurrentBattle",
    }),
    ...mapMutations({
      setLoadPlayers: "battle/setLoadPlayers",
      setCurrentBattleId: "battle/setCurrentBattleId",
    }),
    convertTime(timestamp) {
      return support.convertTime(timestamp);
    },
    selectBattle(battle_id) {
      this.setLoadPlayers(this.history.find((x) => x.id === battle_id));
      this.setCurrentBattleId(battle_id);
      router.push("/battle");

      this.updateCurrentBattle(battle_id);
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
