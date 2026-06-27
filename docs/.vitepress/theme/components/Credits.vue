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
</script>

<template>
  <section v-if="normalizedCredits.length" class="credits">
    <div class="header">
      <h2 class="title">Credits</h2>
      <p class="subtitle">Page authors and contributors listed in frontmatter.</p>
    </div>

    <div class="grid">
      <div v-for="credit in normalizedCredits" :key="credit.name" class="card">
        <div class="icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="currentColor" focusable="false" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.88-1.16-.88-1.16-.72-.49.05-.48.05-.48.79.06 1.21.81 1.21.81.7 1.21 1.84.86 2.29.66.07-.51.28-.86.51-1.06-1.77-.2-3.64-.88-3.64-3.93 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.06-1.87 3.73-3.65 3.93.29.25.54.74.54 1.5v2.22c0 .22.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
        </div>

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
  margin-bottom: 0.9rem;
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
  gap: 0.9rem;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 1.05rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.03);
}

.card:hover {
  border-color: var(--vp-c-brand-1);
}

.icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, var(--vp-c-bg));
  color: var(--vp-c-brand-1);
}

.icon svg {
  width: 1rem;
  height: 1rem;
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
