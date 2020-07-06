<template>
  <div class="photo">
    <h1>This is an Photo page</h1>
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
