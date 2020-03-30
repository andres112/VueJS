Vue.component("child", {
  /*html*/
  template: `
        <div class= "py-5 text-dark">
            <h4> I am a secondary component</h4>
            <p>{{message}} {{emotion}}</p>
            <button class="btn-success" style="width:15%"@click="$store.commit('setResponse', true)">Ja</button>
            <button class="btn-danger" style="width:15%" @click="setResponse(false)">Nein</button>
            <hr>
            <div class="input-group" v-if="books">
              <ul class="list-group list-group-flush">
                <li v-for ="book in books">{{book.volumeInfo.title}}</li>
              </ul>
            </div>
        </div>
    `,
  computed: {
    ...Vuex.mapState(["emotion", "message", "books"])
  },
  methods: {
    ...Vuex.mapMutations(["setResponse"])
  }
});
