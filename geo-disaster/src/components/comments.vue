<template>
  <div :class="wrapperClass" v-if="shortname">
    <a :class="linkClass" @click="showComments = true" v-if="!showComments"
      ><b-icon icon="comment-text-multiple-outline" size="is-small"></b-icon>
      {{ $t("actions.showComments") }}</a
    ><a :class="linkClass" @click="showComments = false" v-else
      ><b-icon icon="comment-multiple-outline" size="is-small"></b-icon>
      {{ $t("actions.hideComments") }}</a
    >
    <vue-disqus
      v-if="showComments"
      :shortname="shortname"
      :identifier="$route.fullPath"
    ></vue-disqus>
  </div>
</template>
<script>
import localConfig from "@/assets/localConfig.js";
export default {
  props: ["linkClass", "wrapperClass"],
  data() {
    return {
      showComments: false,
    };
  },
  computed: {
    shortname() {
      if (localConfig.hasOwnProperty("disqusShortname")) {
        return localConfig.disqusShortname;
      } else {
        return null;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.link,
.linkMobile {
  margin-bottom: 8px;
  a {
    color: #2f67df;
    font-size: 16px;
  }
}

.linkMobile {
  a {
    font-size: 13px;
  }
}
</style>
