<template>
  <div class="photo">
    <Photo></Photo>
    <br />
    <router-link to="/battle" tag="button" class="btn btn-danger">Battle</router-link>
  </div>
</template>

<script>
import Photo from "@/components/Photo.vue";

export default {
  name: 'PhotoView',
  components:{
    Photo
  }
}
</script>
