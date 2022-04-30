<template>
  <div class="container pt-4">
    <h1 class="sticky-top float-right">
      Articles
    </h1>
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
  async asyncData () {
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?_limit=100'
      )
      const articles = res.data
      return { articles }
    } catch (error) {
      console.error(error)
    }
  },
  data () {
    return {}
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
  }
}
</script>
