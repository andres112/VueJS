<template>
  <div class="players container">
    <div class="row justify-content-between">
      <div class="col-sm-5">
        <h3>Player 1</h3>
        <table class="table table-sm table-borderless">
          <tbody>
            <tr>
              <td class="text-center align-middle" colspan="2">
                <input
                  type="text"
                  class="form-control form-control-lg font-weight-bold text-center"
                  v-model="players[0].name"
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
                ></v-swatches>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-5">
        <h3>Player 2</h3>
        <table class="table table-sm table-borderless">
          <tbody>
            <tr>
              <td class="text-center align-middle" colspan="2">
                <input
                  type="text"
                  class="form-control form-control-lg font-weight-bold text-center"
                  v-model="players[1].name"
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
                ></v-swatches>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button class="btn btn-success btn-lg" @click.prevent="startBattle">
      <i class="fa fa-fire"></i>Battle
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VSwatches from "vue-swatches";

export default {
  name: "PlayersConfig",
  components: { VSwatches },
  computed: {
    ...mapState(["players"]),
  },
  methods: {
    ...mapActions(["setPlayersDB", "addBattleDB"]),
    startBattle() {
      // update database when players data is changed
      this.setPlayersDB();
      this.addBattleDB();
      this.$router.push({ name: "Battle" });
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
