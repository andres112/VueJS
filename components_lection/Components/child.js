Vue.component("child", {
  /*html*/
  template: `
        <div class= "py-5 text-dark">
            <h4> I am a secondary component</h4>
            <p>{{message}} {{emotion}}</p>
            <button class="btn-success" style="width:15%"@click="$store.commit('setResponse', true)">Ja</button>
            <button class="btn-danger" style="width:15%" @click="setResponse(false)">Nein</button>
        </div>
    `,
  computed: {
    ...Vuex.mapState(["emotion", "message"])
  },
  methods: {
    ...Vuex.mapMutations(["setResponse"])
  }
});
