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
  context?: string
}>()

const presets: Record<StatusKey, StatusPreset> = {
  'rapidly-changing': {
    color: '#838d86',
    title: 'Rapidly Changing',
    description: 'This page is being updated often and may shift without much notice.'
  },
  'newly-added': {
    color: '#5a74d6',
    title: 'Newly Added',
    description: 'This documentation is new and may still be expanding.'
  },
  'under-review': {
    color: '#7b5edb',
    title: 'Under Review',
    description: 'This page is being checked for accuracy and may change soon.'
  },
  'needs-verification': {
    color: '#fa005a',
    title: 'Needs Verification',
    description: 'This information should be confirmed against the source or runtime behavior.'
  },
  'version-specific': {
    color: '#86d7dc',
    title: 'Version-Specific',
    description: 'This note applies only to a particular engine version or release line.'
  },
  'unstable-api': {
    color: '#ff7f26',
    title: 'Unstable API',
    description: 'The underlying API is still shifting and may not stay compatible.'
  },
  'breaking-change': {
    color: '#fa005a',
    title: 'Breaking Change',
    description: 'This behavior differs from older versions in a way that can break existing content.'
  },
  'partial-documentation': {
    color: '#7f8a96',
    title: 'Partial Documentation',
    description: 'Only part of this topic is documented right now.'
  },
  'missing-examples': {
    color: '#5fb39a',
    title: 'Missing Examples',
    description: 'This page needs practical examples before it is fully useful.'
  },
  legacy: {
    color: '#7a7a7a',
    title: 'Legacy',
    description: 'This content describes older behavior that is still worth keeping around.'
  },
  'scheduled-for-removal': {
    color: '#ffc500',
    title: 'Scheduled for Removal',
    description: 'This feature or page is planned to go away in a future update.'
  },
  'known-issue': {
    color: '#fa005a',
    title: 'Known Issue',
    description: 'There is a confirmed problem here that readers should be aware of.'
  },
  archived: {
    color: '#838d86',
    title: 'Archived',
    description: 'This page is kept for reference and is no longer actively maintained.'
  }
}

const preset = computed(() => presets[props.status])
const noticeTitle = computed(() => props.title ?? preset.value.title)
const noticeDescription = computed(() => props.description ?? preset.value.description)
const noticeContext = computed(() => props.context ?? props.reason ?? '')
const separatorColor = computed(() => preset.value.color)
</script>

<template>
  <aside
    class="status-notice"
    :class="`status-notice--${status}`"
    :style="{ '--notice-separator': separatorColor }"
  >
    <div class="status-notice__body">
      <div class="status-notice__title-row">
        <b class="status-notice__title">{{ noticeTitle }}</b>
      </div>

      <div class="status-notice__rule" aria-hidden="true" />

      <div class="status-notice__text">
        {{ noticeDescription }}
      </div>

      <div v-if="version || noticeContext" class="status-notice__context">
        <small v-if="version"><b>Version:</b> {{ version }}</small>
        <small v-if="noticeContext"><b>Context:</b> {{ noticeContext }}</small>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.status-notice {
  display: block;
  width: 100%;
  padding: 0;
  margin: 1rem 0 0.25rem;
  box-sizing: border-box;
  background: transparent;
  box-shadow: none;
  overflow: visible;
}

.status-notice__body {
  width: min(92%, 100%);
  margin: 0 auto 10px auto;
  padding: 8px 14px;
  box-sizing: border-box;
  background: var(--vp-c-bg);
  border-left: 9px solid var(--notice-separator);
  color: var(--vp-c-text-1);
  font-size: 16px;
  line-height: 160%;
  min-height: 96px;
}

.status-notice__title-row {
  text-align: center;
}

.status-notice__title {
  display: block;
  font-size: 1.05rem;
  font-weight: 700;
}

.status-notice__rule {
  width: min(200px, 100%);
  height: 4px;
  margin: 8px auto 0;
  background: var(--notice-separator);
}

.status-notice__text {
  margin-top: 8px;
  font-size: 0.85rem;
  text-align: left;
}

.status-notice__context {
  margin-top: 8px;
  font-size: 0.78rem;
  text-align: left;
  opacity: 0.95;
}

.status-notice__context small {
  display: block;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .status-notice {
    padding: 0;
  }

  .status-notice__body {
    width: 100%;
    padding: 8px 12px;
  }

  .status-notice__rule {
    width: 100%;
  }
}
</style>
