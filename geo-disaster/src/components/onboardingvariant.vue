<template>
  <div class="onboarding has-text-centered" :class="activeClass">
    <div class="section">
      <div class="column" v-if="!show">
        <img :src="img" style="max-width:190px;">
        <h1 class="title is-5 has-text-white has-text-weight-semibold" style="margin-top:38px;">{{title}}</h1>
        <p class="subtitle has-text-white is-6" style="margin-top:14px;">{{subtitle}}</p>
        <button @click="show = true" class="button is-aquamarine">{{$t('actions.getstarted')}}</button>
      </div>
      <div v-else :perPage="1" @pageChange="handleClick">
        <section class="section verticalhelp">
          <div v-for="(c, idx) in carrousel" :key="idx">
            <div v-html="c.html" class="images"></div>
          </div>
        </section>
        <section class="section images">
            <h1 class="title">{{$t('actions.letsGo')}}</h1>
            <!-- <img src="/completed.svg"/> -->
            <button @click="startTutorial" class="button is-aquamarine">{{$t('actions.getstarted')}}</button>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['img', 'title', 'subtitle', 'customClass', 'carrousel'],
  data () {
    return {
      show: false,
			showFinal: false
    }
  },
  computed: {
    activeClass () {
      if (this.show) {
        return 'is-white'
      } else {
        return this.customClass
      }
    }
  },
  mounted () {
    this.$store.commit('SET_GLOBAL_MODAL_PROPS', {canCancel: false})
  },
  methods: {
		handleClick (page) {
			if (page === this.carrousel.length) {
				this.showFinal = true
			}
		},
    startTutorial () {
      this.$store.commit('UPDATE_PROJECT_TUTORIAL', true)
      this.$store.commit('SET_MODAL_ACTIVE', false)
    }
  }
}
</script>
<style lang="scss">
.modal-background {
  background-color: rgba(2, 31, 39, 0.86) !important;
}
</style>
<style lang="scss" scoped>
.onboarding {
  min-height: 200px;
  color: white;
  border-radius: 5px;
}

.onboarding > img {
  margin-top: 25px;
}
.onboarding > h1 {
  margin-top: 38px;
}
.images {
  color: black;
}
.is-white {
  background-color: white !important;
  color: black !important;
}
.images {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
	.text {
	width: 100%;
	text-align: left;

	}
}

.verticalhelp {
  max-height: 65vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

</style>
