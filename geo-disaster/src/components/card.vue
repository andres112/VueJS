<template>
  <nuxt-link class="card-top-level" :to="{name: 'project-slug', params: {slug: project.short_name}}">
    <div class="card is-borderless">
      <div class="card-image">
        <figure class="image is-4by3">
          <img v-if="project.info.hasOwnProperty('thumbnail_url')" :src="project.info.thumbnail_url" :alt="project.name">
          <img v-else src="@/assets/img/placeholder.project.png" :alt="project.name">
        </figure>
      </div>
      <div class="card-content is-paddingless" style="padding-top:16px !important">
        <h1 class="title is-6 is-capitalized has-text-weight-semibold">{{ project.name }}</h1>
        <h2 class="subtitle is-7 is-capitalized" style="font-size:16px;">{{ category(project).name }} </h2>
        <p class="subtitle is-7 has-text-grey" style="font-size:16px; margin-top:-1.5rem;">{{projectDate(project) }}</p>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import _ from 'lodash'
import moment from 'moment'
export default {
  props: ['project'],
  methods: {
    category (project) {
      return _.find(this.$store.state.categories, {id: project.category_id})
    },
    projectDate (project) {
      return moment(project.created).format('DD MMM')
    }
  }
}
</script>
<style lang="scss" scoped>
.is-borderless {
  width: 300px;
  box-shadow: none !important;
}
.card-top-level {
  width: 300px;
  border: none !important;
  padding-right: .75rem !important;
  padding-left: 0 !important;
  height: 300px;
}
</style>
