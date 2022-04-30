<template>
  <div class="container pt-4">
    <p v-if="$fetchState.pending">
      Fetching Article...
    </p>
    <p v-else-if="$fetchState.error">
      An error occurred :(
    </p>
    <div v-else>
      <h1>{{ article.title }}</h1>
      <p class="small">
        {{ article.userId }} - {{ user.name }}
      </p>
      <p>{{ article.body }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticleComponent',
  data () {
    return {
      article: {},
      user: {}
    }
  },
  // Do requests in server side and render when are done in client side
  async fetch () {
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
      console.log('error:', error)
    }
  },
  activated () {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  }
}
</script>
