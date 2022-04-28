<template>
  <div>
    <b-navbar class="" type="dark" toggleable="lg" variant="dark">
      <b-navbar-brand>
        <NuxtLink to="/">
          <h3 class="no-decoration">
            Logo
          </h3>
        </NuxtLink>
      </b-navbar-brand>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
