import { defineConfig } from 'vitepress'

const repoUrl = 'https://github.com/ALE-Psych-Crew/ALE-Psych-Community-Docs'

export default defineConfig({
  lang: 'en-US',
  title: 'ALE Psych Community Docs',
  description: 'Community-maintained documentation for ALE Psych Engine 5.',
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'ALE Psych Community Docs',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/overview' },
      { text: 'Custom Settings', link: '/adding-custom-settings' },
      { text: 'GitHub', link: repoUrl }
    ],
    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Overview', link: '/overview' },
          { text: 'Custom Settings', link: '/adding-custom-settings' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: `${repoUrl}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub'
    },
    lastUpdatedText: 'Last updated',
    socialLinks: [{ icon: 'github', link: repoUrl }]
  }
})
