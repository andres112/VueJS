Vue.component('titulo', {
  template: /*html*/
  `
    <div class="container">
        <div class="row">
          <div class="col-sm-8">
              <h2>{{title}}: </h2>
          </div>
          <div class="col-sm-4">
            <h1>{{time}} </h1>
          </div>
        </div>
    </div>
  `,
  // data is a function here in the component
  data() {
    return {
      title:"Hallo Andres. Wie gehts?",
      time: ""
    };
  },
  methods: {
    getTime() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          let d = new Date();
          this.time = d.toLocaleTimeString();
        }, 1000);
      }
    }
  },
  mounted() {
    this.getTime();
  },
});
