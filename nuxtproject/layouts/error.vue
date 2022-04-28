<template>
  <div class="flex items-top justify-center text-center pt-5">
    <div v-if="error.statusCode === 404">
      <h1>Page not found</h1>
      <h1>404</h1>
      <b-img
        src="/img/404.gif"
        alt="Page not found"
        class="w-full"
      />
    </div>
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
