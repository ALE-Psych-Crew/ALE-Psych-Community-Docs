import DefaultTheme from 'vitepress/theme'
import Contributors from './components/Contributors.vue'
import StatusNotice from './components/StatusNotice.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Contributors', Contributors)
    app.component('StatusNotice', StatusNotice)
  }
}
