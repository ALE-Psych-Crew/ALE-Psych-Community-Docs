<script setup lang="ts">
import { computed, onBeforeUnmount, nextTick, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

type CreditEntry = string | {
  name: string
  link?: string
}

const { frontmatter } = useData()
const host = ref<HTMLElement | null>(null)
const isPlaced = ref(false)
let observer: MutationObserver | null = null

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

onMounted(() => {
  const placeByline = () => {
    const root = host.value
    if (!root) {
      return
    }

    const doc = root.closest('.VPDoc')
    const title = doc?.querySelector('.vp-doc > h1')

    if (!title) {
      return
    }

    if (title.nextElementSibling !== root) {
      title.insertAdjacentElement('afterend', root)
    }

    isPlaced.value = true

    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  nextTick(() => {
    placeByline()

    if (isPlaced.value || observer) {
      return
    }

    observer = new MutationObserver(() => {
      placeByline()
    })
    observer.observe(document.body, { childList: true, subtree: true })
  })
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div
    v-show="normalizedCredits.length"
    ref="host"
    class="written-by"
    :class="{ 'is-placed': isPlaced }"
  >
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
  display: none;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: baseline;
  margin: 0.15rem 0 1.25rem 0.1rem;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  line-height: 1.4;
}

.written-by.is-placed {
  display: flex;
}

.written-by:not(.is-placed) {
  visibility: hidden;
}

.written-by {
  flex-wrap: wrap;
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
