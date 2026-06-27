import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Credits from './components/Credits.vue'
import StatusNotice from './components/StatusNotice.vue'
import UtterancesComments from './components/UtterancesComments.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(Credits),
      'doc-footer-after': () => h(UtterancesComments)
    })
  },
  enhanceApp({ app }) {
    app.component('Credits', Credits)
    app.component('StatusNotice', StatusNotice)
    app.component('Notice', StatusNotice)
    app.component('UtterancesComments', UtterancesComments)
  }
}
