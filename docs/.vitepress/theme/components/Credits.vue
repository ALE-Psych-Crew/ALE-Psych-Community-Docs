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
  <div v-if="normalizedCredits.length" class="written-by">
    <span class="label">Written by</span>
    <span class="names">
      <template v-for="(credit, index) in normalizedCredits" :key="credit.name">
        <a v-if="credit.link" :href="credit.link" target="_blank" rel="noreferrer">
          {{ credit.name }}
        </a>
        <span v-else>{{ credit.name }}</span>
        <span v-if="index < normalizedCredits.length - 1" class="separator">, </span>
      </template>
    </span>
  </div>
</template>

<style scoped>
.written-by {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: baseline;
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  line-height: 1.4;
}

.label {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.names a {
  color: inherit;
  text-decoration: none;
}

.names a:hover {
  text-decoration: underline;
}
</style>
