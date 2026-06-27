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
      { text: 'Core Setup', link: '/adding-custom-settings' },
      { text: 'Modding', link: '/making-songs' },
      { text: 'Scripting', link: '/making-custom-states' },
      { text: 'Contributing', link: '/making-pages-from-source' },
      { text: 'GitHub', link: repoUrl }
    ],
    sidebar: {
      '/': [
        {
          text: 'Home',
          items: [
            { text: 'Home', link: '/' }
          ]
        },
        {
          text: 'Core Setup',
          items: [
            { text: 'Custom Settings', link: '/adding-custom-settings' },
            { text: 'Meta JSON', link: '/meta-json' },
            { text: 'Mod Folder Structure', link: '/mod-folder-structure' },
            { text: 'Mod Asset Structure', link: '/mod-asset-structure' }
          ]
        },
        {
          text: 'Modding',
          items: [
            { text: 'Creating Songs', link: '/making-songs' },
            { text: 'Creating Characters', link: '/making-characters' }
          ]
        },
        {
          text: 'Scripting',
          items: [{ text: 'Custom States', link: '/making-custom-states' }]
        },
        {
          text: 'Contributing',
          items: [
            { text: 'Making Pages From Source', link: '/making-pages-from-source' },
            { text: 'Status Notices', link: '/status-notices' }
          ]
        },
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
