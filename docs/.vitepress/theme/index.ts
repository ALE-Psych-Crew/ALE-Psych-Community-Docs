import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Credits from './components/Credits.vue'
import StatusNotice from './components/StatusNotice.vue'
import UtterancesComments from './components/UtterancesComments.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-top': () => h(Credits),
      'doc-after': () => h(UtterancesComments)
    })
  },
  enhanceApp({ app }) {
    app.component('Credits', Credits)
    app.component('StatusNotice', StatusNotice)
    app.component('Notice', StatusNotice)
    app.component('UtterancesComments', UtterancesComments)
  }
}
