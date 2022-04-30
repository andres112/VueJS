<template>
  <div class="container pt-4">
    <h1 class="pb-2">
      Some Implementations with Nuxt
    </h1>
    <nuxt-link to="/articles">
      <b-button variant="outline-primary">
        Articles
      </b-button>
    </nuxt-link>
    <nuxt-link to="/todolist">
      <b-button variant="outline-secondary">
        Todo List
      </b-button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>
