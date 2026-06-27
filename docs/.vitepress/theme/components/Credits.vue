<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue'
import { useData } from 'vitepress'

type CreditEntry = string | {
  name: string
  link?: string
}

const { frontmatter } = useData()
const host = useTemplateRef<HTMLElement>('host')

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

const label = computed(() => {
  if (normalizedCredits.value.length !== 1) {
    return 'Written by'
  }

  return 'Written by'
})

onMounted(() => {
  const root = host.value
  if (!root) {
    return
  }

  const doc = root.closest('.VPDoc')
  const title = doc?.querySelector('.vp-doc > h1')

  if (!title || title.nextElementSibling?.classList.contains('written-by')) {
    return
  }

  title.insertAdjacentElement('afterend', root)
})
</script>

<template>
  <div ref="host" v-if="normalizedCredits.length" class="written-by">
    <span class="label">{{ label }}</span>
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
  margin: -0.65rem 0 1.25rem;
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
