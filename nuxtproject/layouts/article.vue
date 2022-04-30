<template>
  <div>
    <b-navbar class="d-flex align-items-center">
      <b-navbar-brand>
        <NuxtLink to="/">
          <h3>Logo</h3>
        </NuxtLink>
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-text>
          <NuxtLink to="/articles">
            <h4>Articles</h4>
          </NuxtLink>
        </b-nav-text>
      </b-navbar-nav>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
