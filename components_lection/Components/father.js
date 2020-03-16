Vue.component("father", {
  /*html*/
  template: `
        <div class="p-5" :class="[{'text-success': $store.state.response}]">
            <div class="d-flex justify-content-center">
                <h2>Main component</h2>                
            </div>
            <h4>Du bist {{$store.state.response ? "" : "nicht"}} mein Vater </h4>
            <child></child>
        </div>
    `,
  data() {
    return {
      message: "Du bist mein Sohn?"
    };
  },
  mounted() {
    store.commit('setMessage', this.message)
  },
      
});
