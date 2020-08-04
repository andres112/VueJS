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
                    class="font-weight-bold text-center"
                    v-model="$v.player1.name.$model"
                    :class="{ 'is-invalid': $v.player1.name.$error }"
                    placeholder="Player name"
                    required
                  />
                  <small
                    class="text-left text-danger"
                    v-show="!$v.player1.name.maxLength"
                    >Max 7 characters</small
                  >
                </td>
              </tr>
              <tr>
                <td class="text-center align-middle">
                  <b-form-select
                    v-model="player1.gender"
                    :options="genderOptions"
                  />
                </td>
                <td class="text-center align-middle">
                  <!-- This is used to the color picker -->
                  <v-swatches
                    v-model="player1.color"
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
                  <!-- is possible use this from bootstrap directly :state="checkLength(players[1].name)" -->
                  <b-form-input
                    type="text"
                    size="lg"
                    class="font-weight-bold text-center"
                    v-model="$v.player2.name.$model"
                    :class="{ 'is-invalid': $v.player2.name.$error }"
                    placeholder="Player name"
                    required
                  />
                  <small
                    class="text-left text-danger"
                    v-show="!$v.player2.name.maxLength"
                    >Max 7 characters</small
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
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "PlayersConfig",
  components: { VSwatches },
  data() {
    return {
      player1: {},
      player2: {},
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
  validations: {
    player1: {
      name: { required, maxLength: maxLength(7) },
    },
    player2: {
      name: { required, maxLength: maxLength(7) },
    },
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
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        // update database when players data is changed
        this.addBattleDB();
        router.push({ name: "Battle" });
      }
    },
    checkLength(text) {
      const validation = text.length > 0 && text.length <= 7;
      return validation;
    },
  },
  created() {
    this.setDefaultPlayers();
    // set the global player states to local ones
    // doing this makes possible to handle validations
    this.player1 = this.players[0];
    this.player2 = this.players[1];
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
