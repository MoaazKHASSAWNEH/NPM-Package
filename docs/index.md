---
layout: home

hero:
  name: NPM Package Template
  text: Modern TypeScript Package Starter
  tagline: Everything you need to build, test, document, and publish high-quality npm packages.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/MoaazKHASSAWNEH/NPM-Package

features:
  - icon: 📦
    title: Dual Package Support
    details: Build ESM and CommonJS with tsup. Ship packages that work everywhere.
  - icon: 🧪
    title: Testing with Vitest
    details: Fast unit testing with coverage reports. Catch bugs before they ship.
  - icon: 📝
    title: Automated Documentation
    details: VitePress for guides, TypeDoc for API reference. Deploy to GitHub Pages.
  - icon: 🔍
    title: Quality Tooling
    details: ESLint 9, Prettier, publint, and knip. Keep your code clean and your package valid.
  - icon: 🪝
    title: Git Hooks
    details: Husky + lint-staged. Automatic linting on commit, full checks on push.
  - icon: 🚀
    title: Automated Releases
    details: Changesets for versioning, GitHub Actions for CI/CD. Publish with confidence.
---

## Quick Start

```bash
# Clone the template
git clone https://github.com/MoaazKHASSAWNEH/NPM-Package.git my-package
cd my-package

# Initialize your package
node scripts/init-template.mjs

# Start developing
pnpm dev
```

## What's Included

| Category      | Tools                           |
| ------------- | ------------------------------- |
| Build         | tsup (ESM + CJS + types)        |
| Test          | Vitest with V8 coverage         |
| Lint          | ESLint 9 flat config + Prettier |
| Documentation | VitePress + TypeDoc             |
| Git Hooks     | Husky + lint-staged             |
| CI/CD         | GitHub Actions                  |
| Releases      | Changesets                      |

## Next Steps

- **[Getting Started](/guide/getting-started)** — Prerequisites and setup
- **[Scripts Reference](/guide/scripts)** — All available npm scripts
- **[Build & Exports](/guide/build-and-exports)** — How the build works
- **[CI/CD](/guide/ci-cd)** — GitHub Actions workflows
- **[Releases](/guide/releases)** — Publishing with Changesets
