<template>
  <div class="flex items-top justify-center text-center">
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: 404
      })
    }
  }
}
</script>
