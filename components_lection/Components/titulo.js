Vue.component("titulo", {
  /*html*/
  template: `
    <div class="container">
      <div class="row d-flex justify-content-between">
        <h3>{{date}}</h3>
        <h2>{{time}} </h2>     
      </div>
    </div>
  `,
  // data is a function here in the component
  computed:{
    ...Vuex.mapState(['time', 'date'])
  },
  methods: {
    getDateTime() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          let d = new Date();
          store.commit("setCurrentTime", d); // update current time state
        }, 1000);
      }
    }
  },
  mounted() {
    this.getDateTime();
  }
});
