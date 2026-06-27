<script setup lang="ts">
import { onMounted, ref } from 'vue'

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!container.value || container.value.querySelector('script[data-utterances]')) {
    return
  }

  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('repo', 'ALE-Psych-Crew/ALE-Psych-Community-Docs')
  script.setAttribute('issue-term', 'pathname')
  script.setAttribute('label', 'Comments')
  script.setAttribute('theme', 'preferred-color-scheme')
  script.dataset.utterances = 'true'

  container.value.appendChild(script)
})
</script>

<template>
  <section class="utterances-comments">
    <div class="header">
      <h2 class="title">Comments</h2>
      <p class="subtitle">Discuss this page on GitHub.</p>
    </div>
    <div ref="container" class="embed" />
  </section>
</template>

<style scoped>
.utterances-comments {
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

.embed {
  width: 100%;
}
</style>
