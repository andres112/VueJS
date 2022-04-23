<template>
  <div class="container">
    <h1>{{ article.title }}</h1>
    <p class="small">{{ article.userId }} - {{ user.name }}</p>
    <p>{{ article.body }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticlePage',
  layout: 'article',
  data () {
    return {
      article: {},
      user: {}
    }
  },
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
  },
  async created () {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.articleId}`
      )
      this.article = res.data
      const resUser = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${this.article.userId}`
      )
      this.user = resUser.data
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
