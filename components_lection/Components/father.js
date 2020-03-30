Vue.component("father", {
  /*html*/
  template: `
        <div class="p-5" :class="[{'text-success': response}]">
          <div class = "container">
            <div class="row d-flex justify-content-center">
              <h2>Main component</h2>     
            </div>
            <div class="row">
              <div class="col-sm-6">
                <h4>Du bist {{response ? "" : "nicht"}} mein Vater </h4>
              </div>
              <div class="col-sm-6">
                <form class="form-inline">
                  <div class="form-group sm-6">
                    <input type="text" class="form-control-plaintext" id="book_name" paceholder="Book Name" 
                    v-model ="book" required v-on:keydown.enter.prevent='getBooks'>
                  </div>
                  <button type="button" class="btn btn-dark sm-2" @click = "getBooks">Search</button>
                </form>
              </div>
            </div>
          </div>
          <child></child>
        </div>
    `,
  data() {
    return {
      message: "Du bist mein Sohn?"
    };
  },
  computed: {
    ...Vuex.mapState(["response"]), // States mapping, avoid calls to the store
    // This get and set is a fast way to handle a state of vuex in an input automatically
    book: {
      get () {
        return this.$store.state.book
      },
      set (value) {
        this.$store.commit('setBook', value)
      }
    }
  },
  methods: {    
    ...Vuex.mapActions(["getBooks"]) //actions in the component like states and mutatio
  },
  mounted() {
    store.commit("setMessage", this.message);
  }
});
