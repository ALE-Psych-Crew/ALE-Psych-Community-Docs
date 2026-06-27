---
title: Status Notices
description: Reusable status notices for documentation pages.
---

# Status Notices

Use these notices to show readers when a page is changing, incomplete, version-bound, or archived.

## Usage

```md
<StatusNotice
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

<StatusNotice status="rapidly-changing" reason="Engine behavior is still shifting." />
<StatusNotice status="newly-added" />
<StatusNotice status="under-review" reason="Waiting on a source check." />
<StatusNotice status="needs-verification" version="1.0.0" />
<StatusNotice status="version-specific" version="1.1.2" />
<StatusNotice status="unstable-api" reason="API names may change without notice." />
<StatusNotice status="breaking-change" reason="Older scripts will need updates." />
<StatusNotice status="partial-documentation" />
<StatusNotice status="missing-examples" reason="Need real mod examples." />
<StatusNotice status="legacy" />
<StatusNotice status="scheduled-for-removal" version="2.0.0" />
<StatusNotice status="known-issue" reason="Crash reproduced on desktop builds." />
<StatusNotice status="archived" />
