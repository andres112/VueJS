<template>
  <div class="home">
    <geo-location/>
  </div>
</template>

<script>
// @ is an alias to /src
import GeoLocation from '@/components/GeoLocation.vue'

export default {
  name: 'Home',
  components: {
    GeoLocation
  }
}
</script>
