<template>
  <div class="container-fluid dark-mode full-height">
    <article-component />
  </div>
</template>

<script>
import Article from '@/components/Article.vue'
export default {
  name: 'ArticlePage',
  components: {
    'article-component': Article
  },
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
