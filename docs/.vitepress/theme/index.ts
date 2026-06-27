import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Contributors from './components/Contributors.vue'
import StatusNotice from './components/StatusNotice.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Contributors)
    })
  },
  enhanceApp({ app }) {
    app.component('Contributors', Contributors)
    app.component('StatusNotice', StatusNotice)
    app.component('Notice', StatusNotice)
  }
}
