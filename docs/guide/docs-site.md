# Documentation Site

This template includes a VitePress documentation site for your package.

## Overview

[VitePress](https://vitepress.dev/) is a static site generator built on Vite. It's designed for documentation with:

- Markdown-based content
- Vue-powered theming
- Fast hot reload in development
- Optimized static output for production

## Project Structure

```
docs/
├── .vitepress/
│   ├── config.mts       # VitePress configuration
│   ├── cache/           # Build cache (gitignored)
│   └── dist/            # Build output (gitignored)
├── api-generated/       # TypeDoc output (auto-generated)
├── guide/               # Guide pages
├── api.md               # API overview page
└── index.md             # Homepage
```

## Configuration

VitePress config is in `docs/.vitepress/config.mts`:

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "pkg_name",
  description: "pkg_name documentation",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/" },
      { text: "API", link: "/api" },
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [{ text: "Overview", link: "/" }],
      },
      {
        text: "Reference",
        items: [
          { text: "API (Overview)", link: "/api" },
          { text: "API (Generated)", link: "/api-generated/" },
        ],
      },
    ],
  },
});
```

### Key Options

| Option                | Description                       |
| --------------------- | --------------------------------- |
| `title`               | Site title (shown in browser tab) |
| `description`         | Meta description for SEO          |
| `themeConfig.nav`     | Top navigation links              |
| `themeConfig.sidebar` | Sidebar navigation structure      |

## Development

Start the development server:

```bash
pnpm run docs:dev
```

The site opens at `http://localhost:5173/` with hot reload.

## Building

Build the documentation for production:

```bash
pnpm run docs:build
```

Output is written to `docs/.vitepress/dist/`.

::: tip
`docs:build` automatically runs `api:docs` first to generate API documentation.
:::

## Preview

Preview the built site locally:

```bash
pnpm run docs:preview
```

This serves the production build, useful for testing before deployment.

## Adding Pages

### Create a Markdown File

Create a new `.md` file in `docs/`:

```markdown
# My New Page

Content goes here.
```

### Add to Sidebar

Update `docs/.vitepress/config.mts`:

```typescript
sidebar: [
  {
    text: "Guide",
    items: [
      { text: "Overview", link: "/" },
      { text: "My New Page", link: "/my-new-page" },
    ],
  },
];
```

### Page Routing

| File Path                       | URL                      |
| ------------------------------- | ------------------------ |
| `docs/index.md`                 | `/`                      |
| `docs/guide/intro.md`           | `/guide/intro`           |
| `docs/api.md`                   | `/api`                   |
| `docs/guide/getting-started.md` | `/guide/getting-started` |

## Markdown Features

VitePress supports enhanced Markdown:

### Frontmatter

```markdown
---
title: Custom Title
description: Page description for SEO
---

# Page Content
```

### Code Blocks

````markdown
```typescript
function hello(name: string): string {
  return `Hello, ${name}!`;
}
```
````

With line highlighting:

````markdown
```typescript{2}
function hello(name: string): string {
  return `Hello, ${name}!`; // This line is highlighted
}
```
````

### Custom Containers

```markdown
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a danger warning.
:::
```

### Tables

```markdown
| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```

## Sidebar Organization

### Single Level

```typescript
sidebar: [{ text: "Introduction", link: "/" }];
```

### Grouped

```typescript
sidebar: [
  {
    text: "Guide",
    items: [
      { text: "Getting Started", link: "/guide/getting-started" },
      { text: "Configuration", link: "/guide/config" },
    ],
  },
  {
    text: "Reference",
    items: [{ text: "API", link: "/api" }],
  },
];
```

### Collapsible

```typescript
sidebar: [
  {
    text: "Guide",
    collapsed: true,
    items: [{ text: "Getting Started", link: "/guide/getting-started" }],
  },
];
```

## Navigation

### Top Navigation

```typescript
nav: [
  { text: "Guide", link: "/guide/getting-started" },
  { text: "API", link: "/api" },
  {
    text: "Links",
    items: [
      { text: "GitHub", link: "https://github.com/..." },
      { text: "npm", link: "https://npmjs.com/..." },
    ],
  },
];
```

## Assets

### Images

Place images in `docs/public/` or alongside Markdown files:

```markdown
![Alt text](./images/screenshot.png)
```

### Linking

```markdown
[Internal link](/guide/getting-started)
[External link](https://example.com)
```

## Deployment

The documentation is automatically deployed to GitHub Pages by the `docs.yml` workflow when you push to `main`.

See [CI/CD](./ci-cd.md) for details on the deployment workflow.

See [GitHub Pages Setup](./github-pages.md) for configuration requirements.
