<template>
  <div style="margin-top:38px;">
    <div class="scrolling-wrapper-flexbox">
      <Card v-for="(project, index) in projects"
            v-bind:project="project"
            v-bind:index="index"
            v-bind:key="project.id">
      </Card>
    </div>
  </div>
</template>
<script>
import Card from '@/components/card.vue'
export default {
  props: [ 'projects' ],
  components: {
    Card
  }
}
</script>
<style lang="scss">
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  .card {
    flex: 0 0 auto;
  }
}
</style>
