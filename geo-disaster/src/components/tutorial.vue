<template>
  <div v-if="currentStep === step && showTutorial" class="tutorial">
    <div class="wrapper" :class="isWrapper" :style="offset">
      <div v-if="isTop" :class="isClass">
        <img :src="isHandle">
      </div>
      <div class="tutorial-content" :class="position">
        <div class="tutorial-step">
          <span style="font-size:14px;">
            {{step}} {{$t('meta.of')}} {{totalSteps}}
          </span>
        </div>

        <div class="tutorial-text">
          <span style="font-size:16px;">
            {{content}}
          </span>
        </div>

        <div class="tutorial-carousel" v-if="isCarousel">
          <Carousel :paginationEnabled="true" :perPage="1" :autoplay="true" :navigationEnabled="true" :loop="true" navigationNextLabel="➡" navigationPrevLabel="⬅">
          <template v-for="(slide, index) of carousel">
            <template v-if="slide.hasOwnProperty('html')">
              <Slide v-html="slide.html" v-bind:key="index" class="has-text-centered"></Slide>
            </template>
            <template v-else>
              <Slide :key="index">
                <div class="imgContainer">
                  <img :src="slide.img" v-if="slide.img" class="tutorialImg"/>
                </div>
                <p>{{slide.txt}}</p>
              </Slide>
            </template>
          </template>
          </Carousel>
        </div>

        <div class="tutorial-actions">
          <div class="level is-mobile">
            <div class="level-left">
              <div>
                <button v-if="step !== totalSteps && tutorialFinished" @click="$store.commit('UPDATE_PROJECT_TUTORIAL', false)" class="button is-white">{{$t('actions.skiphelp')}}</button>
              </div>
            </div>
            <button v-if="step !== totalSteps" @click="$store.commit('INCREASE_TUTORIAL_STEP')" class="button next" :class="customClass">{{$t('actions.next')}}</button>
            <button v-else @click.stop="$store.commit('UPDATE_PROJECT_TUTORIAL', false)" class="button next" :class="customClass">{{$t('actions.done')}}</button>
          </div>
        </div>
      </div>
      <div v-if="isBottom" :class="isClass">
        <img :src="isHandle">
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  components: { Carousel, Slide },
  props: ['content', 'position', 'step', 'totalSteps', 'customClass', 'offset', 'carousel'],
  data () {
    let tutorialStr = `tutorial${this.$store.state.project.short_name}Finished`
    return {
      get tutorialFinished () {
        if (localStorage.getItem(tutorialStr) === 'false') {
          return false
        } else {
          return true
        }
      }
    }
  },
  computed: {
    isTop () {
      if (this.position === undefined) {
        return false
      }
      console.log(this.position)
      if (this.position.indexOf('top') >= 0) {
        return true
      } else {
        return false
      }
    },
    isBottom () {
      if (this.position === undefined) {
        return false
      }
      if (this.position.indexOf('bottom') >= 0) {
        return true
      } else {
        return false
      }
    },

    isCarousel () {
      if (this.carousel === undefined) {
        return false
      } else {
        return true
      }
    },
    currentStep () {
      return this.$store.state.projectTutorialStep
    },
    showTutorial () {
      return this.$store.state.projectTutorial
    },
    isClass () {
      if (this.position === 'top-left') {
        return `handle-top-left`
      }
      if (this.position === 'top-right') {
        return `handle-top-right`
      }
      if (this.position === 'left-top') {
        return `handle-left-top`
      }
      if (this.position === 'left-bottom') {
        return `handle-left-bottom`
      }
      if (this.position === 'bottom-left') {
        return `handle-bottom-left`
      }
      if (this.position === 'bottom-right') {
        return `handle-bottom-right`
      }
    },
    isHandle () {
      if ((this.position === 'top-left') || (this.position === 'top-right')) {
        return '/handle.svg'
      }

      if ((this.position === 'bottom-left') || (this.position === 'bottom-right')) {
        return '/handle-bottom.svg'
      }
      if ((this.position === 'left-top') || (this.position === 'left-bottom')) {
        return '/handle-left.svg'
      }
    },
    isWrapper () {
      if (this.customClass !== undefined) {
        return `${this.customClass} wrapper-left`
      } else {
        return 'wrapper-left'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tutorial {
    position: relative;
    z-index: 35;
    background: white;
    width:0;
    height:0;
}

.tutorial > .wrapper {
  position: absolute;
  box-shadow: 0 8px 15px -4px rgba(0, 0, 0, 0.25);
}

.tutorial > .wrapper > .handle-top-left {
  margin-top: -26px;
}

.tutorial >.wrapper >  .handle-top-right{
  margin-top: -26px;
  margin-left: 235px;
  @media(min-width: 1024px) {
    margin-left: 280px;
  }
}

.tutorial >.wrapper >  .handle-left-top {
  margin-top: 18px;
  margin-left: -26px;
}

.tutorial > .wrapper > .handle-left-bottom {
  margin-top: 135px;
  margin-left: -26px;
}

.tutorial > .wrapper > .handle-bottom-left {
  position: absolute;
  margin-top: -2px;
  margin-left: 5px;
}

.tutorial > .wrapper > .handle-bottom-right {
  position: absolute;
  margin-top: -2px;
  margin-left: 200px;
}

.tutorial >.wrapper >  .tutorial-content {
  padding: 1.8rem;
  background: white;
  max-width: 250px;
  min-width: 250px;
  overflow-y: scroll;
  @media(min-width: 1024px) {
    max-width: 300px;
    min-width: 300px;
  }
}

.tutorial >.wrapper >  .tutorial-content.left-top {
  margin-top: -40px;
}

.tutorial >.wrapper >  .tutorial-content.left-bottom {
  margin-top: -162px;
}
.tutorial-actions {
  margin-top: 0.75rem;
}
.VueCarousel-pagination {
  float: none !important;
}

.imgContainer {
  position: relative;
  width: 100%;
  padding-top: 100%;
}

.tutorialImg {
  position: absolute;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  object-fit: cover;
  width: 100%;
  height: 100%
}
</style>
