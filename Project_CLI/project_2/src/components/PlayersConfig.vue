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
                  <b-form-input
                    type="text"
                    size="lg"
                    :state="checkLength(players[0].name)"
                    class="font-weight-bold text-center"
                    v-model="players[0].name"
                    placeholder="Player name"
                    required
                  />
                  <small
                    class="text-left text-danger"
                    v-show="!checkLength(players[0].name)"
                    >Max 6 characters</small
                  >
                </td>
              </tr>
              <tr>
                <td class="text-center align-middle">
                  <b-form-select
                    v-model="players[0].gender"
                    :options="genderOptions"
                  />
                </td>
                <td class="text-center align-middle">
                  <!-- This is used to the color picker -->
                  <v-swatches
                    v-model="players[0].color"
                    popover-x="left"
                    swatches="text-advanced"
                    shapes="circles"
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
                  <b-form-input
                    type="text"
                    size="lg"
                    :state="checkLength(players[1].name)"
                    class="font-weight-bold text-center"
                    v-model="players[1].name"
                    placeholder="Player name"
                    required
                  />
                  <small
                    class="text-left text-danger"
                    v-show="!checkLength(players[1].name)"
                    >Max 6 characters</small
                  >
                </td>
              </tr>
              <tr>
                <td class="text-center align-middle">
                  <b-form-select
                    v-model="players[1].gender"
                    :options="genderOptions"
                  />
                </td>
                <td class="text-center align-middle">
                  <v-swatches
                    v-model="players[1].color"
                    popover-x="left"
                    swatches="text-advanced"
                    shapes="circles"
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
import { mapState, mapActions, mapMutations } from "vuex";
import VSwatches from "vue-swatches";
import router from "@/router";

export default {
  name: "PlayersConfig",
  components: { VSwatches },
  data() {
    return {
      genderOptions: [
        { value: "m", text: "👦 Male" },
        { value: "f", text: "👧 Female" },
        { value: "a", text: "👽 Alien" },
        { value: "r", text: "🤖 Robot" },
        { value: "p", text: "👻 Phantom" },
        { value: "s", text: "💩	 Sh*+%" },
        { value: "n", text: "No Apply" },
      ],
    };
  },
  computed: {
    ...mapState({
      players: (state) => state.battle.players,
    }),
  },
  methods: {
    ...mapActions({ addBattleDB: "battle/addBattleDB" }),
    ...mapMutations({ setDefaultPlayers: "battle/setDefaultPlayers" }),
    startBattle() {
      // update database when players data is changed
      this.addBattleDB();
      router.push({ name: "Battle" });
    },
    checkLength(text) {
      const validation = text.length > 0 && text.length <= 7;
      return validation;
    },
  },
  created() {
    this.setDefaultPlayers();
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
