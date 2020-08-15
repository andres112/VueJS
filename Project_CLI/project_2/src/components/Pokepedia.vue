<template>
  <div>
    <b-row align-h="center">
      <b-col cols="12" md="8" lg="6">
        <b-input
          v-model="search"
          size="sm"
          :placeholder="$t('pokepedia.search-input')"
        ></b-input>
      </b-col>
    </b-row>
    <div class="mt-3">
      <!-- Pagination section only -->
      <b-pagination
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="perPage"
        align="center"
        aria-controls="my-table"
      ></b-pagination>
      <p>{{ this.pokemonList.length }} {{ $t("pokepedia.species-label") }}</p>
      <div class="col-sm-10 mx-auto">
        <!-- Table section, would be modified by pagination defined previously -->
        <b-table
          id="my-table"
          :items="pokemonList"
          :per-page="perPage"
          :current-page="currentPage"
          small
          responsive
          striped
        >
          <!-- button in url column -->
          <template v-slot:cell(url)="row">
            <b-button
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
              variant="success"
            >
              {{$t("pokepedia.details-modal-button")}}
            </b-button>
          </template>
        </b-table>
        <!-- Info modal -->
        <b-modal
          :id="infoModal.id"
          :title="infoModal.title"
          ok-only
          @hide="resetInfoModal"
          scrollable 
        >
          <pre>{{ infoModal.content }}</pre>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Pokepedia",
  data() {
    return {
      search: null,
      currentPage: 1,
      perPage: 15,
      pokemonList: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      getFilteredPokemons: "pokemon/getFilteredPokemons",
    }),
    totalItems() {
      return Object.keys(this.pokemonList).length;
    },
  },
  methods: {
    ...mapActions({
      getPokemons: "pokemon/getPokemons",
      getPokemon: "pokemon/getPokemon",
    }),
    // This method inilialize every time page reload
    async setPokemonList() {
      this.pokemonList = await this.getPokemons();
    },
    // funtion to control the modal
    async info(item, index, button) {
      this.infoModal.title = item.name.toUpperCase();
      // this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = await this.getPokemon(item.url);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    // Close the modal anc clean the info in there
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
  },
  watch: {
    //search is the variable we want to watch
    search: function(newValue, oldValue) {
      this.pokemonList = this.getFilteredPokemons(newValue.toLowerCase());
    },
  },
  created() {
    this.setPokemonList();
  },
};
</script>
