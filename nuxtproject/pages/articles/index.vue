<template>
  <div class="container">
    <h1>Articles</h1>
    <ul>
      <li v-for="article in articles" :key="article.id" class="text-danger">
        <NuxtLink :to="`/articles/${article.id}`">
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ArticlesPage',
  asyncData () {
    return {
      articles: [
        { id: 1, title: 'Article 1' },
        { id: 2, title: 'Article 2' },
        { id: 3, title: 'Article 3' },
        { id: 4, title: 'Article 4' },
        { id: 5, title: 'Article 5' }
      ]
    }
  }
}
</script>
