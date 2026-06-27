<script setup lang="ts">
import { computed } from 'vue'

type StatusKey =
  | 'rapidly-changing'
  | 'newly-added'
  | 'under-review'
  | 'needs-verification'
  | 'version-specific'
  | 'unstable-api'
  | 'breaking-change'
  | 'partial-documentation'
  | 'missing-examples'
  | 'legacy'
  | 'scheduled-for-removal'
  | 'known-issue'
  | 'archived'

type StatusPreset = {
  icon: string
  color: string
  title: string
  description: string
}

const props = defineProps<{
  status: StatusKey
  title?: string
  description?: string
  version?: string
  reason?: string
}>()

const presets: Record<StatusKey, StatusPreset> = {
  'rapidly-changing': {
    icon: '↻',
    color: '#d97706',
    title: 'Rapidly Changing',
    description: 'This page is being updated often and may shift without much notice.'
  },
  'newly-added': {
    icon: '✦',
    color: '#2563eb',
    title: 'Newly Added',
    description: 'This documentation is new and may still be expanding.'
  },
  'under-review': {
    icon: '⌕',
    color: '#7c3aed',
    title: 'Under Review',
    description: 'This page is being checked for accuracy and may change soon.'
  },
  'needs-verification': {
    icon: '!',
    color: '#dc2626',
    title: 'Needs Verification',
    description: 'This information should be confirmed against the source or runtime behavior.'
  },
  'version-specific': {
    icon: 'v',
    color: '#0891b2',
    title: 'Version-Specific',
    description: 'This note applies only to a particular engine version or release line.'
  },
  'unstable-api': {
    icon: '⚗',
    color: '#c2410c',
    title: 'Unstable API',
    description: 'The underlying API is still shifting and may not stay compatible.'
  },
  'breaking-change': {
    icon: '✕',
    color: '#e11d48',
    title: 'Breaking Change',
    description: 'This behavior differs from older versions in a way that can break existing content.'
  },
  'partial-documentation': {
    icon: '◫',
    color: '#64748b',
    title: 'Partial Documentation',
    description: 'Only part of this topic is documented right now.'
  },
  'missing-examples': {
    icon: '{}',
    color: '#0f766e',
    title: 'Missing Examples',
    description: 'This page needs practical examples before it is fully useful.'
  },
  legacy: {
    icon: '◔',
    color: '#6b7280',
    title: 'Legacy',
    description: 'This content describes older behavior that is still worth keeping around.'
  },
  'scheduled-for-removal': {
    icon: '⏳',
    color: '#f59e0b',
    title: 'Scheduled for Removal',
    description: 'This feature or page is planned to go away in a future update.'
  },
  'known-issue': {
    icon: '⚠',
    color: '#b91c1c',
    title: 'Known Issue',
    description: 'There is a confirmed problem here that readers should be aware of.'
  },
  archived: {
    icon: '⌁',
    color: '#475569',
    title: 'Archived',
    description: 'This page is kept for reference and is no longer actively maintained.'
  }
}

const preset = computed(() => presets[props.status])

const noticeTitle = computed(() => props.title ?? preset.value.title)
const noticeDescription = computed(() => props.description ?? preset.value.description)
</script>

<template>
  <aside class="status-notice" :style="{ '--notice-accent': preset.color }">
    <div class="icon" aria-hidden="true">
      {{ preset.icon }}
    </div>

    <div class="content">
      <div class="heading-row">
        <h3 class="title">{{ noticeTitle }}</h3>
        <div class="meta">
          <span v-if="version" class="chip">Version {{ version }}</span>
          <span v-if="reason" class="chip reason">{{ reason }}</span>
        </div>
      </div>

      <p class="description">
        {{ noticeDescription }}
      </p>
    </div>
  </aside>
</template>

<style scoped>
.status-notice {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem 1.1rem;
  border: 1px solid color-mix(in srgb, var(--notice-accent) 28%, var(--vp-c-divider));
  border-left-width: 6px;
  border-radius: 16px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--notice-accent) 10%, transparent), transparent 75%),
    var(--vp-c-bg-soft);
  box-shadow: 0 8px 24px rgb(15 23 42 / 0.04);
}

.icon {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: var(--notice-accent);
  color: white;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
}

.content {
  min-width: 0;
}

.heading-row {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: space-between;
  gap: 0.75rem;
}

.title {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.2;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.24rem 0.5rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--notice-accent) 12%, transparent);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-weight: 600;
}

.chip.reason {
  background: color-mix(in srgb, var(--notice-accent) 18%, transparent);
}

.description {
  margin: 0.45rem 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}

@media (max-width: 640px) {
  .status-notice {
    grid-template-columns: 1fr;
  }

  .icon {
    width: 2.25rem;
    height: 2.25rem;
  }
}
</style>
