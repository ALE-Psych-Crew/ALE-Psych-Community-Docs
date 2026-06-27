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
    <h2 class="title">Credits</h2>

    <div class="grid">
      <div v-for="credit in normalizedCredits" :key="credit.name" class="card">
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
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.title {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  line-height: 1.2;
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
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.name {
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
