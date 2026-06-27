---
title: Making Pages From Source
description: How to add new documentation pages to this VitePress site from the source files.
credits: ImMalloy
---

# Making Pages From Source

This page explains how to add a new page to the community docs directly from the source files in this repo.

<Notice
  status="newly-added"
  title="Contributor guide"
  description="Use this when you want to add or update docs pages in the source tree."
/>

## How to Add Pages

VitePress turns each markdown file in `docs/` into a route.

Examples:

- `docs/index.md` becomes `/`
- `docs/meta-json.md` becomes `/meta-json`
- `docs/making-pages-from-source.md` becomes `/making-pages-from-source`

### Before you test locally

You need the project dependencies installed before you can preview the docs site locally.

Run:

```bash
npm install
```

### Steps

1. Add a new `.md` file in `docs/`.
2. Add frontmatter at the top of the file.
3. Write the page content in markdown.
4. Add the page to the page tree in `docs/.vitepress/config.ts`.
5. Preview the site with `npm run docs:dev`.

### Recommended frontmatter

```md
---
title: Your Page Title
description: Short summary for search and page metadata.
credits: YourName
---
```

`title` and `description` are the important fields. `credits` is optional, but this repo already uses it on some docs pages.

## How to Update the Page Tree

The page tree lives in `docs/.vitepress/config.ts`.

Add your page in both places when you want it visible in the UI:

- `nav` for top-level links
- `sidebar` for grouped docs links

Example `nav` entry:

```ts
{ text: 'Contributing', link: '/making-pages-from-source' }
```

Example `sidebar` entry:

```ts
{
  text: 'Contributing',
  items: [{ text: 'Making Pages From Source', link: '/making-pages-from-source' }]
}
```

## How to Add Credits

Use the `credits` field in the frontmatter at the top of the page.

```md
---
title: Example Page
description: What this page teaches.
credits: YourName
---
```

If a page has more than one contributor, keep the main `credits` value on the page and mention others in the content if needed.

## Example Page

```md
---
title: Example Page
description: What this page teaches.
---

# Example Page

Write the main explanation here.
```

Example data:

```json
{
  "name": "Example"
}
```

Use `<Notice />` in the page content when you want to show a status note or work-in-progress warning.
