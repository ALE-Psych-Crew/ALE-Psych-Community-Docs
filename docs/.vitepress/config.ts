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
      {
        text: 'Docs',
        items: [
          { text: 'Overview', link: '/overview' },
          { text: 'Custom Settings', link: '/adding-custom-settings' },
          { text: 'Custom States', link: '/making-custom-states' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Reference', link: '/reference' },
          { text: 'Status Notices', link: '/status-notices' }
        ]
      },
      { text: 'GitHub', link: repoUrl }
    ],
    sidebar: {
      '/': [
        {
          text: 'Docs',
          items: [
            { text: 'Overview', link: '/overview' },
            { text: 'Custom Settings', link: '/adding-custom-settings' },
            { text: 'Custom States', link: '/making-custom-states' }
          ]
        },
        {
          text: 'Reference',
          items: [
            { text: 'Reference', link: '/reference' },
            { text: 'Status Notices', link: '/status-notices' }
          ]
        }
      ]
    },
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
