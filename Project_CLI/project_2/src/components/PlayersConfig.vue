<template>
  <div class="players">
    <b-form @submit.prevent="startBattle">
      <b-row class="justify-content-around">
        <b-col cols="12" md="6">
          <h3>Player 1</h3>
          <table class="table table-sm table-borderless">
            <tbody>
              <tr>
                <td class="text-center align-middle" colspan="2">
                  <input
                    type="text"
                    class="form-control form-control-lg font-weight-bold text-center"
                    v-model="players[0].name"
                    placeholder="Player name"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td class="text-center align-middle">
                  <select class="form-control" v-model="players[0].gender">
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="n">No Apply</option>
                  </select>
                </td>
                <td class="text-center align-middle">
                  <!-- This is used to the color picker -->
                  <v-swatches
                    v-model="players[0].color"
                    popover-x="left"
                    swatches="text-advanced"
                  ></v-swatches>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="12" md="6">
          <h3>Player 2</h3>
          <table class="table table-sm table-borderless">
            <tbody>
              <tr>
                <td class="text-center align-middle" colspan="2">
                  <input
                    type="text"
                    class="form-control form-control-lg font-weight-bold text-center"
                    v-model="players[1].name"
                    placeholder="Player name"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td class="text-center align-middle">
                  <select class="form-control" v-model="players[1].gender">
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="n">No Apply</option>
                  </select>
                </td>
                <td class="text-center align-middle">
                  <v-swatches
                    v-model="players[1].color"
                    popover-x="left"
                    swatches="text-advanced"
                  ></v-swatches>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
      <b-button variant="success" size="lg" type="submit">
        <b-icon icon="lightning-fill" class="mb-1"></b-icon> Start
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VSwatches from "vue-swatches";
import router from "@/router";

export default {
  name: "PlayersConfig",
  components: { VSwatches },
  computed: {
    ...mapState({
      players: (state) => state.battle.players,
    }),
  },
  methods: {
    ...mapActions({ addBattleDB: "battle/addBattleDB" }),
    startBattle() {
      // update database when players data is changed
      this.addBattleDB();
      router.push({ name: "Battle" });
    },
  },
};
</script>
<style scoped>
.players {
  margin-top: 50px;
}
.table {
  margin-top: 20px;
}
</style>
