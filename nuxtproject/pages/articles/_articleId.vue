<template>
  <div class="container">
    <h1>Article {{ $route.params.articleId }}</h1>
  </div>
</template>

<script>
export default {
  name: 'ArticlePage',
  layout: 'article',
  head () {
    return {
      title: 'Articles',
      meta: [
        {
          hid: 'description',
          name: 'Article',
          content: `The article ${this.$route.params.articleId} description`
        }
      ]
    }
  }
}
</script>
