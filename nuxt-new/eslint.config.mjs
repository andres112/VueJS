// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // ignore vue/multi-word-component-names
  {
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
)
