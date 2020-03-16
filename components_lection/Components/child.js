Vue.component("child", {
  /*html*/
  template: `
        <div class= "py-5 text-dark">
            <h4> I am a secondary component</h4>
            <p>{{$store.state.message}} {{$store.state.emotion}}</p>
            <button class="btn-success" style="width:15%"@click="$store.commit('response', true)">Ja</button>
            <button class="btn-danger" style="width:15%" @click="$store.commit('response', false)">Nein</button>
        </div>
    `
});
