<template>
  <div class="container">
    <h1>Articles</h1>
    <ul>
      <li
        v-for="article in articles"
        :key="article.id"
        class="text-danger article-link"
      >
        <NuxtLink :to="`/articles/${article.id}`">
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'ArticlesPage',
  data () {
    return {
      articles: []
    }
  },
  head: {
    title: 'Articles',
    meta: [
      {
        hid: 'description',
        name: 'Articles',
        content: 'The article list page'
      }
    ]
  },
  async created () {
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?_limit=10'
      )
      this.articles = res.data
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
