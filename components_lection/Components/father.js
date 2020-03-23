Vue.component("father", {
  /*html*/
  template: `
        <div class="p-5" :class="[{'text-success': response}]">
            <div class="d-flex justify-content-center">
                <h2>Main component</h2>                
            </div>
            <h4>Du bist {{response ? "" : "nicht"}} mein Vater </h4>
            <child></child>
        </div>
    `,
  data() {
    return {
      message: "Du bist mein Sohn?"
    };
  },
  computed:{
    ...Vuex.mapState(['response']) // States mapping, avoid calls to the store
  },
  mounted() {
    store.commit("setMessage", this.message);
  }
});
