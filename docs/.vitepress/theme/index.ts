import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Credits from './components/Credits.vue'
import StatusNotice from './components/StatusNotice.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(Credits)
    })
  },
  enhanceApp({ app }) {
    app.component('Credits', Credits)
    app.component('StatusNotice', StatusNotice)
    app.component('Notice', StatusNotice)
  }
}
