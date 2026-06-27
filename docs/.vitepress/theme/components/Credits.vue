<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

type CreditEntry = string | {
  name: string
  link?: string
}

const { frontmatter } = useData()

const credits = computed(() => {
  const value = frontmatter.value.credits as CreditEntry | CreditEntry[] | undefined

  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : [value]
})

const normalizedCredits = computed(() => {
  return credits.value
    .map((credit) => {
      if (typeof credit === 'string') {
        return { name: credit }
      }

      return credit
    })
    .filter((credit) => credit.name?.trim())
})

function githubAvatarUrl(name: string) {
  return `https://github.com/${encodeURIComponent(name)}.png?size=80`
}
</script>

<template>
  <section v-if="normalizedCredits.length" class="credits">
    <div class="header">
      <h2 class="title">Credits</h2>
    </div>

    <div class="grid">
      <div v-for="credit in normalizedCredits" :key="credit.name" class="card">
        <img
          class="avatar"
          :src="githubAvatarUrl(credit.name)"
          :alt="`${credit.name} avatar`"
          width="40"
          height="40"
          loading="lazy"
          referrerpolicy="no-referrer"
        >
        <div class="name">
          <a v-if="credit.link" :href="credit.link" target="_blank" rel="noreferrer">
            {{ credit.name }}
          </a>
          <span v-else>{{ credit.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.credits {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
}

.header {
  margin-bottom: 0.75rem;
}

.title {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.2;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.subtitle {
  margin: 0.35rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.4;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 0.95rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.03);
}

.card:hover {
  border-color: var(--vp-c-brand-1);
}

.avatar {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 999px;
}

.name {
  min-width: 0;
  font-weight: 600;
  line-height: 1.2;
  word-break: break-word;
}

.name a {
  color: inherit;
  text-decoration: none;
}

.name a:hover {
  text-decoration: underline;
}
</style>
