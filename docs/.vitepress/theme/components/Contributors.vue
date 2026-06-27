<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type Contributor = {
  login: string
  avatar_url: string
  html_url: string
}

const repoApi = 'https://api.github.com/repos/ALE-Psych-Crew/ALE-Psych-Community-Docs/contributors?per_page=100&anon=1'

const contributors = ref<Contributor[]>([])
const loading = ref(true)
const error = ref('')

const uniqueContributors = computed(() => {
  const seen = new Set<string>()

  return contributors.value.filter((contributor) => {
    if (seen.has(contributor.login)) {
      return false
    }

    seen.add(contributor.login)
    return true
  })
})

onMounted(async () => {
  try {
    const response = await fetch(repoApi, {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    })

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`)
    }

    const data = (await response.json()) as Contributor[]
    contributors.value = data.filter((contributor, index, list) => {
      return list.findIndex((item) => item.login === contributor.login) === index
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load contributors.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="contributors">
    <p v-if="loading" class="status">Loading contributors...</p>
    <p v-else-if="error" class="status error">Could not load contributors: {{ error }}</p>

    <div v-else class="grid">
      <a
        v-for="contributor in uniqueContributors"
        :key="contributor.login"
        class="card"
        :href="contributor.html_url"
        target="_blank"
        rel="noreferrer"
      >
        <img
          class="avatar"
          :src="contributor.avatar_url"
          :alt="`${contributor.login} profile picture`"
          width="40"
          height="40"
        >
        <div class="login">{{ contributor.login }}</div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contributors {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.status {
  margin: 0;
  color: var(--vp-c-text-2);
}

.status.error {
  color: var(--vp-c-danger-1);
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
  gap: 0.75rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.06);
}

.avatar {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 999px;
}

.login {
  font-weight: 600;
  line-height: 1.2;
  word-break: break-word;
}
</style>
