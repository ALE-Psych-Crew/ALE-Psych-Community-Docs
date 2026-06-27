---
title: Status Notices
description: Reusable status notices for documentation pages.
---

# Status Notices

Use these notices to show readers when a page is changing, incomplete, version-bound, or archived.

## Usage

```md
<Notice
  status="needs-verification"
  version="1.0.0"
  reason="Source docs are incomplete"
/>
```

Available props:

- `status`: selects the preset notice
- `title`: overrides the preset title
- `description`: overrides the preset description
- `version`: optional version label
- `reason`: optional reason or note

## Presets

<Notice status="rapidly-changing" reason="Engine behavior is still shifting." />
<Notice status="newly-added" />
<Notice status="under-review" reason="Waiting on a source check." />
<Notice status="needs-verification" version="1.0.0" />
<Notice status="version-specific" version="1.1.2" />
<Notice status="unstable-api" reason="API names may change without notice." />
<Notice status="breaking-change" reason="Older scripts will need updates." />
<Notice status="partial-documentation" />
<Notice status="missing-examples" reason="Need real mod examples." />
<Notice status="legacy" />
<Notice status="scheduled-for-removal" version="2.0.0" />
<Notice status="known-issue" reason="Crash reproduced on desktop builds." />
<Notice status="archived" />
