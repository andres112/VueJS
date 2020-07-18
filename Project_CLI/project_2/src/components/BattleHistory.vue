<template>
  <div class="history container">
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="item in history"
        :key="item.id"
      >
        {{ convertTime(item.timestamp.toDate()) }}: {{ item.player_1.name }} vs
        {{ item.player_2.name }}
        <button class="btn btn-danger btn-sm" @click.prevent = "removeBattleDB(item.id)">
          <i class="fa fa-trash-o"></i> Remove
        </button>
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
