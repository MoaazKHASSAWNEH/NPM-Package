# 📦 NPM Package Template

<div align="center">

**[🇬🇧 English](#-english)** | **[🇫🇷 Français](#-français)**

</div>

---

# 🇬🇧 English

> A professional and complete template for creating and publishing npm packages in TypeScript.

[![CI](https://github.com/YOUR_USERNAME/npm_package_template/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/npm_package_template/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/pkg_name.svg)](https://www.npmjs.com/package/pkg_name)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [✨ Features](#-features)
- [📁 Project Structure](#-project-structure)
- [📜 Available Scripts](#-available-scripts)
- [🔧 Configuration](#-configuration)
- [📝 Complete Guide: From Creation to Publication](#-complete-guide-from-creation-to-publication)
- [💡 Best Practices and Recommendations](#-best-practices-and-recommendations)
- [🔄 Version Management with Changesets](#-version-management-with-changesets)
- [📚 Documentation](#-documentation)
- [⚙️ CI / CD (GitHub Actions)](#️-ci--cd-github-actions)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Quick Start

### 1. Clone the template

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/npm_package_template.git my-package

# Enter the folder
cd my-package

# Delete existing git history and initialize a new repo
rm -rf .git
git init
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Initialize your package

```bash
pnpm run init:template
```

This interactive script will ask you for:

- **NPM package name**: The name under which your package will be published (e.g., `@my-scope/my-package` or `my-package`)
- **Description**: A short description of your package
- **Author**: Your name or username
- **Repository URL**: The git URL of your project
- **Keywords**: Tags for npm search (comma separated)

### 4. Verify everything works

```bash
pnpm test        # Run tests
pnpm run build   # Build the project
pnpm run lint    # Check code quality
```

---

## ✨ Features

This template includes everything you need to create a professional npm package:

| Feature              | Tool                                                   | Description                                   |
| -------------------- | ------------------------------------------------------ | --------------------------------------------- |
| 📦 **Build**         | [tsup](https://tsup.egoist.dev/)                       | Ultra-fast TypeScript compilation (ESM + CJS) |
| 🧪 **Tests**         | [Vitest](https://vitest.dev/)                          | Modern and fast testing framework             |
| 🔍 **Linting**       | [ESLint](https://eslint.org/)                          | Static code analysis                          |
| 💅 **Formatting**    | [Prettier](https://prettier.io/)                       | Automatic code formatting                     |
| 📖 **Documentation** | [VitePress](https://vitepress.dev/)                    | Static documentation site                     |
| 📚 **API Docs**      | [TypeDoc](https://typedoc.org/)                        | Automatic API documentation generation        |
| 🔄 **Versioning**    | [Changesets](https://github.com/changesets/changesets) | Semantic version management                   |
| ✅ **CI/CD**         | [GitHub Actions](https://github.com/features/actions)  | Continuous integration                        |
| 📋 **Package Lint**  | [publint](https://publint.dev/)                        | package.json validation                       |
| 🔎 **Dead Code**     | [Knip](https://knip.dev/)                              | Unused code detection                         |

---

## 📁 Project Structure

```text
npm_package_template/
├── 📁 src/                    # TypeScript source code
│   └── index.ts               # Main entry point
├── 📁 test/                   # Unit tests
│   └── index.test.ts          # Tests with Vitest
├── 📁 dist/                   # Compiled code (generated)
│   ├── index.js               # ESM bundle
│   ├── index.cjs              # CommonJS bundle
│   └── index.d.ts             # TypeScript declarations
├── 📁 docs/                   # VitePress documentation
│   ├── index.md               # Home page
│   ├── api.md                 # API documentation
│   ├── api-generated/         # Generated TypeDoc docs
│   └── .vitepress/            # VitePress configuration
├── 📁 scripts/                # Utility scripts
│   └── init-template.mjs      # Initialization script
├── 📁 .github/                # GitHub configuration
│   └── workflows/ci.yml       # CI/CD pipeline
├── 📄 package.json            # npm configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 tsconfig.build.json     # TS config for build
├── 📄 tsup.config.ts          # tsup configuration (bundler)
├── 📄 vitest.config.ts        # Vitest configuration
├── 📄 eslint.config.mjs       # ESLint configuration (flat config)
├── 📄 .prettierrc             # Prettier configuration
├── 📄 .editorconfig           # Editor configuration
├── 📄 typedoc.json            # TypeDoc configuration
├── 📄 CHANGELOG.md            # Version history
├── 📄 LICENSE                 # MIT License
└── 📄 README.md               # This file
```

---

## 📜 Available Scripts

### 🏗️ Build & Development

| Script      | Command              | Description                                                      |
| ----------- | -------------------- | ---------------------------------------------------------------- |
| `build`     | `pnpm run build`     | Compiles the project to ESM and CJS with TypeScript declarations |
| `dev`       | `pnpm run dev`       | Compiles in watch mode (auto-recompile on changes)               |
| `typecheck` | `pnpm run typecheck` | Checks TypeScript types without emitting files                   |

### 🧪 Tests

| Script          | Command                  | Description                                  |
| --------------- | ------------------------ | -------------------------------------------- |
| `test`          | `pnpm test`              | Runs all tests once                          |
| `test:watch`    | `pnpm run test:watch`    | Runs tests in watch mode (reruns on changes) |
| `test:coverage` | `pnpm run test:coverage` | Runs tests with code coverage report         |

### 🔍 Code Quality

| Script         | Command                 | Description                                  |
| -------------- | ----------------------- | -------------------------------------------- |
| `lint`         | `pnpm run lint`         | Analyzes code with ESLint                    |
| `lint:package` | `pnpm run lint:package` | Validates package.json with publint          |
| `lint:deps`    | `pnpm run lint:deps`    | Detects unused dependencies with Knip        |
| `lint:md`      | `pnpm run lint:md`      | Checks Markdown file formatting              |
| `format`       | `pnpm run format`       | Checks formatting with Prettier (no changes) |
| `format:write` | `pnpm run format:write` | Automatically formats all files              |

### 📖 Documentation

| Script         | Command                 | Description                                     |
| -------------- | ----------------------- | ----------------------------------------------- |
| `docs:dev`     | `pnpm run docs:dev`     | Starts documentation server in development mode |
| `docs:build`   | `pnpm run docs:build`   | Generates static documentation site             |
| `docs:preview` | `pnpm run docs:preview` | Previews generated documentation site           |
| `api:docs`     | `pnpm run api:docs`     | Generates API documentation with TypeDoc        |

### 📦 Publishing

| Script             | Command                     | Description                                   |
| ------------------ | --------------------------- | --------------------------------------------- |
| `changeset`        | `pnpm run changeset`        | Creates a new changeset (change description)  |
| `version-packages` | `pnpm run version-packages` | Updates versions according to changesets      |
| `release`          | `pnpm run release`          | Publishes the package to npm                  |
| `prepublishOnly`   | _(automatic)_               | Runs lint, tests, and build before publishing |

### 🛠️ Utilities

| Script          | Command                  | Description                                    |
| --------------- | ------------------------ | ---------------------------------------------- |
| `init:template` | `pnpm run init:template` | Initializes the template with your information |

---

## 🔧 Configuration

### TypeScript (`tsconfig.json`)

Strict and modern configuration:

```jsonc
{
  "compilerOptions": {
    "target": "ES2022", // Modern JavaScript
    "module": "ESNext", // Native ES modules
    "moduleResolution": "Bundler", // Resolution for modern bundlers
    "strict": true, // Strict mode enabled
    "verbatimModuleSyntax": true, // Explicit type/value imports
    "noUncheckedIndexedAccess": true, // Safe indexed access
  },
}
```

### tsup (`tsup.config.ts`)

Bundler configuration:

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Entry point
  format: ["esm", "cjs"], // Generates ESM and CommonJS
  dts: true, // Generates .d.ts declarations
  sourcemap: true, // Source maps for debugging
  clean: true, // Cleans dist/ before build
  treeshake: true, // Eliminates dead code
});
```

### ESLint (`eslint.config.mjs`)

Flat config with TypeScript:

- ESLint recommended
- TypeScript ESLint (recommended + strict + stylistic)
- Prettier integration (disables conflicting rules)

### Prettier (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

---

## 📝 Complete Guide: From Creation to Publication

### Step 1: Initialization

```bash
# 1. Clone and initialize
git clone https://github.com/YOUR_USERNAME/npm_package_template.git my-package
cd my-package
rm -rf .git && git init

# 2. Install dependencies
pnpm install

# 3. Configure your package
pnpm run init:template
```

### Step 2: Development

#### Write your code

Add your functions in `src/index.ts`:

```typescript
// src/index.ts
export function myFunction(param: string): string {
  return `Result: ${param}`;
}

export interface MyInterface {
  id: string;
  name: string;
}

export class MyClass {
  constructor(private value: string) {}

  getValue(): string {
    return this.value;
  }
}
```

#### Write tests

Add your tests in `test/`:

```typescript
// test/index.test.ts
import { describe, it, expect } from "vitest";
import { myFunction, MyClass } from "../src/index";

describe("myFunction", () => {
  it("should return formatted result", () => {
    expect(myFunction("test")).toBe("Result: test");
  });
});

describe("MyClass", () => {
  it("should store and return the value", () => {
    const instance = new MyClass("hello");
    expect(instance.getValue()).toBe("hello");
  });
});
```

#### Develop in watch mode

```bash
# Terminal 1: Auto compilation
pnpm run dev

# Terminal 2: Auto tests
pnpm run test:watch
```

### Step 3: Pre-publication verification

```bash
# Check everything
pnpm run lint           # Linting
pnpm run typecheck      # Types
pnpm test               # Tests
pnpm run build          # Build
pnpm run lint:package   # package.json validation
```

### Step 4: Create an npm account

If you don't have an npm account yet:

```bash
# Create an account at https://www.npmjs.com/signup
# Then login
npm login
```

### Step 5: First publication

#### Option A: Simple publication (first version)

```bash
# 1. Verify version is 0.0.0 or 1.0.0 in package.json

# 2. Manually update version for first release
npm version 1.0.0

# 3. Publish
npm publish --access public
```

#### Option B: Use Changesets (recommended for subsequent versions)

```bash
# 1. Create a changeset
pnpm run changeset

# Answer the questions:
# - What type of change? (patch/minor/major)
# - Change description

# 2. Apply changeset (updates version and CHANGELOG)
pnpm run version-packages

# 3. Commit changes
git add .
git commit -m "chore: version 1.0.0"

# 4. Publish
pnpm run release
```

### Step 6: Configure GitHub

```bash
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/my-package.git
git branch -M main
git push -u origin main
```

The GitHub Actions CI will automatically trigger on each push.

---

## 💡 Best Practices and Recommendations

### 📛 Package Naming

```bash
# Simple package
my-package

# Scoped package (recommended to avoid conflicts)
@my-username/my-package
@my-organization/my-package
```

### 📄 Essential Files

Make sure you have:

- ✅ `README.md` - Clear documentation with examples
- ✅ `LICENSE` - License (MIT by default)
- ✅ `CHANGELOG.md` - Version history
- ✅ `.gitignore` - Files to ignore
- ✅ Tests with good coverage

### 🔢 Semantic Versioning (SemVer)

| Version                 | When to use                          |
| ----------------------- | ------------------------------------ |
| `MAJOR` (1.0.0 → 2.0.0) | **Breaking** changes                 |
| `MINOR` (1.0.0 → 1.1.0) | New backward-compatible **features** |
| `PATCH` (1.0.0 → 1.0.1) | Backward-compatible bug **fixes**    |

### 📦 `package.json` Configuration

#### Important fields

```json
{
  "name": "@scope/package-name",
  "version": "1.0.0",
  "description": "Clear and concise description",
  "keywords": ["keyword1", "keyword2"],
  "author": "Your Name <email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo"
  },
  "bugs": {
    "url": "https://github.com/user/repo/issues"
  },
  "homepage": "https://github.com/user/repo#readme"
}
```

#### Modern exports (ESM + CJS)

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

#### Published files

```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

### 🔒 Security

- ✅ **Never** publish secrets (tokens, API keys)
- ✅ Use `.npmignore` or `files` in `package.json`
- ✅ Verify with `npm pack --dry-run` what will be published
- ✅ Enable 2FA on your npm account

### 📊 Quality

- ✅ Test coverage > 80%
- ✅ Up-to-date documentation
- ✅ Exported TypeScript types
- ✅ Usage examples in README
- ✅ Maintained CHANGELOG

---

## 🔄 Version Management with Changesets

### Why Changesets?

Changesets is a tool that allows you to:

- 📝 Document changes as you develop
- 🔢 Automatically calculate the next version (according to SemVer)
- 📋 Automatically generate the CHANGELOG
- 🚀 Simplify the publishing process

### Key Files

| File/Folder              | Purpose                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `CHANGELOG.md`           | Auto-generated version history. **Do not edit manually** — Changesets updates it automatically. |
| `.changeset/*.md`        | Pending change descriptions. Each file describes one change and its semver impact.              |
| `.changeset/config.json` | Changesets configuration (commit messages, changelog format, etc.).                             |

### Choosing a Version Type

| Type    | When to use                                                  | Example           |
| ------- | ------------------------------------------------------------ | ----------------- |
| `patch` | Bug fixes, documentation, internal refactors (no API change) | `1.0.0` → `1.0.1` |
| `minor` | New features that are backward-compatible                    | `1.0.0` → `1.1.0` |
| `major` | Breaking changes (removed/renamed APIs, changed behavior)    | `1.0.0` → `2.0.0` |

### Changesets Workflow

#### 1. Create a changeset

After making changes:

```bash
pnpm run changeset
```

Answer the questions:

1. **Which packages have changed?** → Select your package
2. **What type of change?** → `patch`, `minor`, or `major`
3. **Description**: Describe the change (will appear in CHANGELOG)

This creates a file in `.changeset/` (e.g., `.changeset/blue-lions-run.md`).

#### 2. Commit the changeset

```bash
git add .changeset/
git commit -m "chore: add changeset for feature X"
```

#### 3. Apply changesets (before release)

```bash
pnpm run version-packages
```

This:

- Updates `version` in `package.json`
- Adds entries to `CHANGELOG.md`
- Deletes consumed changeset files

#### 4. Publish

```bash
git add .
git commit -m "chore: release v1.1.0"
git tag v1.1.0
git push --follow-tags

pnpm run release
```

### Automated Release via CI (Recommended)

Instead of publishing manually, the recommended approach uses GitHub Actions:

1. **Push changesets to `main`** (via merged PR)
2. **`release.yml` workflow** detects pending changesets and opens a **Release PR**
3. **Review and merge** the Release PR
4. **Workflow publishes to npm** automatically using the `NPM_TOKEN` secret

This is handled by `.github/workflows/release.yml` using `changesets/action`.

> ⚠️ **Required**: Add `NPM_TOKEN` to your repository secrets (Settings → Secrets → Actions).

### Troubleshooting Releases

| Issue                           | Cause                       | Solution                                                  |
| ------------------------------- | --------------------------- | --------------------------------------------------------- |
| Release doesn't publish         | Missing/invalid `NPM_TOKEN` | Verify the secret exists with publish permissions         |
| Release doesn't publish         | Not on `main` branch        | Merge to `main` to trigger the release workflow           |
| CHANGELOG not updated           | No changeset merged yet     | Create a changeset with `pnpm run changeset` and merge it |
| CI fails on `--frozen-lockfile` | Lockfile out of sync        | Run `pnpm install` locally and commit `pnpm-lock.yaml`    |

---

## 📚 Documentation

### Run documentation locally

```bash
pnpm run docs:dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Generate API documentation

```bash
pnpm run api:docs
```

TypeDoc documentation is generated in `docs/api-generated/`.

### Documentation structure

```text
docs/
├── index.md              # Home page (Getting Started)
├── api.md                # Manual API documentation
├── api-generated/        # Auto-generated API docs (TypeDoc)
└── .vitepress/
    └── config.mts        # VitePress configuration
```

---

## 🚀 CI/CD with GitHub Actions

The `.github/workflows/ci.yml` file configures continuous integration:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run typecheck
      - run: pnpm run test
      - run: pnpm run build
```

### Add automatic publishing

To automatically publish to npm on each tag:

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - "v*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: "https://registry.npmjs.org"
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
      - run: pnpm publish --access public --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

> ⚠️ Don't forget to add `NPM_TOKEN` in your GitHub repository secrets.

---

## ⚙️ CI / CD (GitHub Actions)

This template includes three GitHub Actions workflows for continuous integration, releases, and documentation deployment.

### Workflows Overview

| Workflow    | File          | Trigger            | Purpose                                                                     |
| ----------- | ------------- | ------------------ | --------------------------------------------------------------------------- |
| **CI**      | `ci.yml`      | PR, push to `main` | Runs lint, typecheck, tests, build, publint, knip, markdownlint, docs build |
| **Release** | `release.yml` | push to `main`     | Uses Changesets to open a Release PR or publish to npm                      |
| **Docs**    | `docs.yml`    | push to `main`     | Builds VitePress docs and deploys to GitHub Pages                           |

### Prerequisites

#### 1. NPM Token (for publishing)

Create an npm access token and add it to your repository:

1. Go to [npmjs.com](https://www.npmjs.com/) → Access Tokens → Generate New Token (Automation)
2. In GitHub: Settings → Secrets and variables → Actions → New repository secret
3. Name: `NPM_TOKEN`, Value: your token

#### 2. GitHub Pages (for documentation)

Enable GitHub Pages with Actions as the source:

1. Go to your repository Settings → Pages
2. Under "Source", select **GitHub Actions**

#### 3. VitePress Base Path

Configure the base path in `docs/.vitepress/config.ts`:

```typescript
export default defineConfig({
  // If deploying to https://<user>.github.io/<repo>/
  base: "/<repo>/",

  // If deploying to https://<user>.github.io/ or custom domain
  // base: "/",
});
```

### How It Works

- **Corepack** is enabled in all workflows to automatically use the pnpm version pinned in `package.json` (`packageManager` field).
- **CI** runs on every pull request and push to `main`, ensuring code quality before merge.
- **Release** workflow uses `changesets/action` to either:
  - Open a "Release PR" when changesets are present, or
  - Publish to npm when the Release PR is merged.
- **Docs** workflow builds and deploys documentation automatically on every push to `main`.

### Troubleshooting

| Issue                                  | Cause                                          | Solution                                                                                |
| -------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` fails | Lockfile out of sync with `package.json`       | Run `pnpm install` locally and commit the updated `pnpm-lock.yaml`                      |
| Docs deployment broken                 | Wrong VitePress `base` or Pages source not set | Verify `base` in config matches your repo name; ensure Pages source is "GitHub Actions" |
| Release doesn't publish                | Missing or invalid `NPM_TOKEN`                 | Check the secret exists and has publish permissions; verify npm 2FA settings            |
| Workflow not triggering                | Branch protection or path filters              | Check workflow `on:` conditions and branch settings                                     |

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

### Contributor Workflow

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/npm_package_template.git
cd npm_package_template

# 2. Create a feature branch
git checkout -b feature/my-feature

# 3. Make your changes and run tests
pnpm install
pnpm test
pnpm run lint

# 4. Create a changeset (required for version bump)
pnpm run changeset
# Choose: patch / minor / major
# Write a short description of your change

# 5. Commit everything (including .changeset/*.md)
git add .
git commit -m "feat: add my feature"

# 6. Push and open a Pull Request
git push origin feature/my-feature
```

> 💡 **Tip**: Always include a changeset when your PR affects the public API or fixes a bug. The changeset description will appear in `CHANGELOG.md`.

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Type       | Description                 |
| ---------- | --------------------------- |
| `feat`     | New feature                 |
| `fix`      | Bug fix                     |
| `docs`     | Documentation               |
| `style`    | Formatting (no code change) |
| `refactor` | Refactoring                 |
| `test`     | Adding/modifying tests      |
| `chore`    | Maintenance                 |

---

## ❓ FAQ

### How to add sub-exports?

Modify `exports` in `package.json`:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./utils": {
      "types": "./dist/utils.d.ts",
      "import": "./dist/utils.js",
      "require": "./dist/utils.cjs"
    }
  }
}
```

And add the entry in `tsup.config.ts`:

```typescript
entry: ["src/index.ts", "src/utils.ts"],
```

### How to test the package locally?

```bash
# In the package folder
pnpm run build
pnpm link --global

# In another project
pnpm link --global my-package
```

### How to verify what will be published?

```bash
npm pack --dry-run
```

### How to unpublish a package?

```bash
# Within 72h of publication
npm unpublish my-package@1.0.0

# After 72h (deprecation only)
npm deprecate my-package@1.0.0 "This version is deprecated"
```

---

## 📄 License

MIT © [pkg_name_author](https://github.com/pkg_name_author)

---

<br><br><br>

---

# 🇫🇷 Français

> Une template professionnelle et complète pour créer et publier des packages npm en TypeScript.

[![CI](https://github.com/YOUR_USERNAME/npm_package_template/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/npm_package_template/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/pkg_name.svg)](https://www.npmjs.com/package/pkg_name)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📋 Table des matières

- [🚀 Démarrage rapide](#-démarrage-rapide)
- [✨ Fonctionnalités](#-fonctionnalités)
- [📁 Structure du projet](#-structure-du-projet)
- [📜 Scripts disponibles](#-scripts-disponibles)
- [🔧 Configuration](#-configuration-1)
- [📝 Guide complet : De la création à la publication](#-guide-complet--de-la-création-à-la-publication)
- [💡 Bonnes pratiques et recommandations](#-bonnes-pratiques-et-recommandations)
- [🔄 Gestion des versions avec Changesets](#-gestion-des-versions-avec-changesets)
- [📚 Documentation](#-documentation-1)
- [⚙️ CI / CD (GitHub Actions)](#️-ci--cd-github-actions-1)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

---

## 🚀 Démarrage rapide

### 1. Cloner la template

```bash
# Cloner le repository
git clone https://github.com/YOUR_USERNAME/npm_package_template.git mon-package

# Entrer dans le dossier
cd mon-package

# Supprimer l'historique git existant et initialiser un nouveau repo
rm -rf .git
git init
```

### 2. Installer les dépendances

```bash
pnpm install
```

### 3. Initialiser votre package

```bash
pnpm run init:template
```

Ce script interactif vous demandera :

- **Nom du package npm** : Le nom sous lequel votre package sera publié (ex: `@mon-scope/mon-package` ou `mon-package`)
- **Description** : Une courte description de votre package
- **Auteur** : Votre nom ou pseudo
- **URL du repository** : L'URL git de votre projet
- **Mots-clés** : Les tags pour la recherche npm (séparés par des virgules)

### 4. Vérifier que tout fonctionne

```bash
pnpm test        # Lancer les tests
pnpm run build   # Compiler le projet
pnpm run lint    # Vérifier le code
```

---

## ✨ Fonctionnalités

Cette template inclut tout ce dont vous avez besoin pour créer un package npm professionnel :

| Fonctionnalité       | Outil                                                  | Description                                     |
| -------------------- | ------------------------------------------------------ | ----------------------------------------------- |
| 📦 **Build**         | [tsup](https://tsup.egoist.dev/)                       | Compilation TypeScript ultra-rapide (ESM + CJS) |
| 🧪 **Tests**         | [Vitest](https://vitest.dev/)                          | Framework de test moderne et rapide             |
| 🔍 **Linting**       | [ESLint](https://eslint.org/)                          | Analyse statique du code                        |
| 💅 **Formatting**    | [Prettier](https://prettier.io/)                       | Formatage automatique du code                   |
| 📖 **Documentation** | [VitePress](https://vitepress.dev/)                    | Site de documentation statique                  |
| 📚 **API Docs**      | [TypeDoc](https://typedoc.org/)                        | Génération automatique de la doc API            |
| 🔄 **Versioning**    | [Changesets](https://github.com/changesets/changesets) | Gestion sémantique des versions                 |
| ✅ **CI/CD**         | [GitHub Actions](https://github.com/features/actions)  | Intégration continue                            |
| 📋 **Package Lint**  | [publint](https://publint.dev/)                        | Validation du package.json                      |
| 🔎 **Dead Code**     | [Knip](https://knip.dev/)                              | Détection du code inutilisé                     |

---

## 📁 Structure du projet

```text
npm_package_template/
├── 📁 src/                    # Code source TypeScript
│   └── index.ts               # Point d'entrée principal
├── 📁 test/                   # Tests unitaires
│   └── index.test.ts          # Tests avec Vitest
├── 📁 dist/                   # Code compilé (généré)
│   ├── index.js               # ESM bundle
│   ├── index.cjs              # CommonJS bundle
│   └── index.d.ts             # Déclarations TypeScript
├── 📁 docs/                   # Documentation VitePress
│   ├── index.md               # Page d'accueil
│   ├── api.md                 # Documentation API
│   ├── api-generated/         # Doc TypeDoc générée
│   └── .vitepress/            # Configuration VitePress
├── 📁 scripts/                # Scripts utilitaires
│   └── init-template.mjs      # Script d'initialisation
├── 📁 .github/                # Configuration GitHub
│   └── workflows/ci.yml       # Pipeline CI/CD
├── 📄 package.json            # Configuration npm
├── 📄 tsconfig.json           # Configuration TypeScript
├── 📄 tsconfig.build.json     # Config TS pour le build
├── 📄 tsup.config.ts          # Configuration tsup (bundler)
├── 📄 vitest.config.ts        # Configuration Vitest
├── 📄 eslint.config.mjs       # Configuration ESLint (flat config)
├── 📄 .prettierrc             # Configuration Prettier
├── 📄 .editorconfig           # Configuration éditeur
├── 📄 typedoc.json            # Configuration TypeDoc
├── 📄 CHANGELOG.md            # Historique des versions
├── 📄 LICENSE                 # Licence MIT
└── 📄 README.md               # Ce fichier
```

---

## 📜 Scripts disponibles

### 🏗️ Build & Development

| Script      | Commande             | Description                                                             |
| ----------- | -------------------- | ----------------------------------------------------------------------- |
| `build`     | `pnpm run build`     | Compile le projet en ESM et CJS avec les déclarations TypeScript        |
| `dev`       | `pnpm run dev`       | Compile en mode watch (recompile automatiquement à chaque modification) |
| `typecheck` | `pnpm run typecheck` | Vérifie les types TypeScript sans émettre de fichiers                   |

### 🧪 Tests

| Script          | Commande                 | Description                                                   |
| --------------- | ------------------------ | ------------------------------------------------------------- |
| `test`          | `pnpm test`              | Lance tous les tests une seule fois                           |
| `test:watch`    | `pnpm run test:watch`    | Lance les tests en mode watch (relance à chaque modification) |
| `test:coverage` | `pnpm run test:coverage` | Lance les tests avec rapport de couverture de code            |

### 🔍 Qualité du code

| Script         | Commande                | Description                                        |
| -------------- | ----------------------- | -------------------------------------------------- |
| `lint`         | `pnpm run lint`         | Analyse le code avec ESLint                        |
| `lint:package` | `pnpm run lint:package` | Vérifie la validité du package.json avec publint   |
| `lint:deps`    | `pnpm run lint:deps`    | Détecte les dépendances inutilisées avec Knip      |
| `lint:md`      | `pnpm run lint:md`      | Vérifie le formatage des fichiers Markdown         |
| `format`       | `pnpm run format`       | Vérifie le formatage avec Prettier (sans modifier) |
| `format:write` | `pnpm run format:write` | Formate automatiquement tous les fichiers          |

### 📖 Documentation

| Script         | Commande                | Description                                             |
| -------------- | ----------------------- | ------------------------------------------------------- |
| `docs:dev`     | `pnpm run docs:dev`     | Lance le serveur de documentation en mode développement |
| `docs:build`   | `pnpm run docs:build`   | Génère le site de documentation statique                |
| `docs:preview` | `pnpm run docs:preview` | Prévisualise le site de documentation généré            |
| `api:docs`     | `pnpm run api:docs`     | Génère la documentation API avec TypeDoc                |

### 📦 Publication

| Script             | Commande                    | Description                                               |
| ------------------ | --------------------------- | --------------------------------------------------------- |
| `changeset`        | `pnpm run changeset`        | Crée un nouveau changeset (description des modifications) |
| `version-packages` | `pnpm run version-packages` | Met à jour les versions selon les changesets              |
| `release`          | `pnpm run release`          | Publie le package sur npm                                 |
| `prepublishOnly`   | _(automatique)_             | Exécute lint, tests et build avant publication            |

### 🛠️ Utilitaires

| Script          | Commande                 | Description                                  |
| --------------- | ------------------------ | -------------------------------------------- |
| `init:template` | `pnpm run init:template` | Initialise la template avec vos informations |

---

## 🔧 Configuration

### TypeScript (`tsconfig.json`)

Configuration stricte et moderne :

```jsonc
{
  "compilerOptions": {
    "target": "ES2022", // JavaScript moderne
    "module": "ESNext", // Modules ES natifs
    "moduleResolution": "Bundler", // Résolution pour bundlers modernes
    "strict": true, // Mode strict activé
    "verbatimModuleSyntax": true, // Imports explicites type/value
    "noUncheckedIndexedAccess": true, // Accès indexés sécurisés
  },
}
```

### tsup (`tsup.config.ts`)

Configuration du bundler :

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Point d'entrée
  format: ["esm", "cjs"], // Génère ESM et CommonJS
  dts: true, // Génère les déclarations .d.ts
  sourcemap: true, // Source maps pour le debugging
  clean: true, // Nettoie dist/ avant build
  treeshake: true, // Élimine le code mort
});
```

### ESLint (`eslint.config.mjs`)

Configuration flat config avec TypeScript :

- ESLint recommended
- TypeScript ESLint (recommended + strict + stylistic)
- Intégration Prettier (désactive les règles conflictuelles)

### Prettier (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

---

## 📝 Guide complet : De la création à la publication

### Étape 1 : Initialisation

```bash
# 1. Cloner et initialiser
git clone https://github.com/YOUR_USERNAME/npm_package_template.git mon-package
cd mon-package
rm -rf .git && git init

# 2. Installer les dépendances
pnpm install

# 3. Configurer votre package
pnpm run init:template
```

### Étape 2 : Développement

#### Écrire votre code

Ajoutez vos fonctions dans `src/index.ts` :

```typescript
// src/index.ts
export function maFonction(param: string): string {
  return `Résultat: ${param}`;
}

export interface MonInterface {
  id: string;
  name: string;
}

export class MaClasse {
  constructor(private value: string) {}

  getValue(): string {
    return this.value;
  }
}
```

#### Écrire les tests

Ajoutez vos tests dans `test/` :

```typescript
// test/index.test.ts
import { describe, it, expect } from "vitest";
import { maFonction, MaClasse } from "../src/index";

describe("maFonction", () => {
  it("devrait retourner le résultat formaté", () => {
    expect(maFonction("test")).toBe("Résultat: test");
  });
});

describe("MaClasse", () => {
  it("devrait stocker et retourner la valeur", () => {
    const instance = new MaClasse("hello");
    expect(instance.getValue()).toBe("hello");
  });
});
```

#### Développer en mode watch

```bash
# Terminal 1 : Compilation automatique
pnpm run dev

# Terminal 2 : Tests automatiques
pnpm run test:watch
```

### Étape 3 : Vérification avant publication

```bash
# Vérifier tout
pnpm run lint           # Linting
pnpm run typecheck      # Types
pnpm test               # Tests
pnpm run build          # Build
pnpm run lint:package   # Validation package.json
```

### Étape 4 : Créer un compte npm

Si vous n'avez pas encore de compte npm :

```bash
# Créer un compte sur https://www.npmjs.com/signup
# Puis se connecter
npm login
```

### Étape 5 : Première publication

#### Option A : Publication simple (première version)

```bash
# 1. Vérifier que la version est 0.0.0 ou 1.0.0 dans package.json

# 2. Mettre à jour la version manuellement pour la première release
npm version 1.0.0

# 3. Publier
npm publish --access public
```

#### Option B : Utiliser Changesets (recommandé pour les versions suivantes)

```bash
# 1. Créer un changeset
pnpm run changeset

# Répondre aux questions :
# - Quel type de changement ? (patch/minor/major)
# - Description du changement

# 2. Appliquer le changeset (met à jour la version et CHANGELOG)
pnpm run version-packages

# 3. Commiter les changements
git add .
git commit -m "chore: version 1.0.0"

# 4. Publier
pnpm run release
```

### Étape 6 : Configurer GitHub

```bash
# Créer le repo sur GitHub, puis :
git remote add origin https://github.com/VOTRE_USERNAME/mon-package.git
git branch -M main
git push -u origin main
```

La CI GitHub Actions se déclenchera automatiquement à chaque push.

---

## 💡 Bonnes pratiques et recommandations

### 📛 Nommage du package

```bash
# Package simple
mon-package

# Package scopé (recommandé pour éviter les conflits)
@mon-username/mon-package
@mon-organisation/mon-package
```

### 📄 Fichiers essentiels

Assurez-vous d'avoir :

- ✅ `README.md` - Documentation claire avec exemples
- ✅ `LICENSE` - Licence (MIT par défaut)
- ✅ `CHANGELOG.md` - Historique des versions
- ✅ `.gitignore` - Fichiers à ignorer
- ✅ Tests avec bonne couverture

### 🔢 Versioning sémantique (SemVer)

| Version                 | Quand l'utiliser                                |
| ----------------------- | ----------------------------------------------- |
| `MAJOR` (1.0.0 → 2.0.0) | Changements **cassants** (breaking changes)     |
| `MINOR` (1.0.0 → 1.1.0) | Nouvelles **fonctionnalités** rétro-compatibles |
| `PATCH` (1.0.0 → 1.0.1) | **Corrections** de bugs rétro-compatibles       |

### 📦 Configuration `package.json`

#### Champs importants

```json
{
  "name": "@scope/package-name",
  "version": "1.0.0",
  "description": "Description claire et concise",
  "keywords": ["mot-clé1", "mot-clé2"],
  "author": "Votre Nom <email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo"
  },
  "bugs": {
    "url": "https://github.com/user/repo/issues"
  },
  "homepage": "https://github.com/user/repo#readme"
}
```

#### Exports modernes (ESM + CJS)

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

#### Fichiers publiés

```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

### 🔒 Sécurité

- ✅ Ne **jamais** publier de secrets (tokens, clés API)
- ✅ Utiliser `.npmignore` ou `files` dans `package.json`
- ✅ Vérifier avec `npm pack --dry-run` ce qui sera publié
- ✅ Activer 2FA sur votre compte npm

### 📊 Qualité

- ✅ Couverture de tests > 80%
- ✅ Documentation à jour
- ✅ Types TypeScript exportés
- ✅ Exemples d'utilisation dans le README
- ✅ CHANGELOG maintenu

---

## 🔄 Gestion des versions avec Changesets

### Pourquoi Changesets ?

Changesets est un outil qui permet de :

- 📝 Documenter les changements au fur et à mesure du développement
- 🔢 Calculer automatiquement la prochaine version (selon SemVer)
- 📋 Générer automatiquement le CHANGELOG
- 🚀 Simplifier le processus de publication

### Fichiers clés

| Fichier/Dossier          | Rôle                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `CHANGELOG.md`           | Historique des versions généré automatiquement. **Ne pas modifier manuellement** — Changesets le met à jour automatiquement. |
| `.changeset/*.md`        | Descriptions des changements en attente. Chaque fichier décrit un changement et son impact semver.                           |
| `.changeset/config.json` | Configuration de Changesets (messages de commit, format du changelog, etc.).                                                 |

### Choisir un type de version

| Type    | Quand l'utiliser                                                                  | Exemple           |
| ------- | --------------------------------------------------------------------------------- | ----------------- |
| `patch` | Corrections de bugs, documentation, refactoring interne (pas de changement d'API) | `1.0.0` → `1.0.1` |
| `minor` | Nouvelles fonctionnalités rétro-compatibles                                       | `1.0.0` → `1.1.0` |
| `major` | Changements cassants (APIs supprimées/renommées, comportement modifié)            | `1.0.0` → `2.0.0` |

### Workflow Changesets

#### 1. Créer un changeset

Après avoir fait des modifications :

```bash
pnpm run changeset
```

Répondez aux questions :

1. **Quels packages ont changé ?** → Sélectionnez votre package
2. **Quel type de changement ?** → `patch`, `minor`, ou `major`
3. **Description** : Décrivez le changement (apparaîtra dans le CHANGELOG)

Cela crée un fichier dans `.changeset/` (ex: `.changeset/blue-lions-run.md`).

#### 2. Commiter le changeset

```bash
git add .changeset/
git commit -m "chore: add changeset for feature X"
```

#### 3. Appliquer les changesets (avant release)

```bash
pnpm run version-packages
```

Cela :

- Met à jour `version` dans `package.json`
- Ajoute les entrées dans `CHANGELOG.md`
- Supprime les fichiers changeset consommés

#### 4. Publier

```bash
git add .
git commit -m "chore: release v1.1.0"
git tag v1.1.0
git push --follow-tags

pnpm run release
```

### Release automatisée via CI (Recommandé)

Plutôt que de publier manuellement, l'approche recommandée utilise GitHub Actions :

1. **Pushez les changesets sur `main`** (via une PR mergée)
2. **Le workflow `release.yml`** détecte les changesets en attente et ouvre une **Release PR**
3. **Vérifiez et mergez** la Release PR
4. **Le workflow publie sur npm** automatiquement en utilisant le secret `NPM_TOKEN`

Ceci est géré par `.github/workflows/release.yml` utilisant `changesets/action`.

> ⚠️ **Requis** : Ajoutez `NPM_TOKEN` aux secrets de votre repository (Settings → Secrets → Actions).

### Dépannage des releases

| Problème                          | Cause                         | Solution                                                          |
| --------------------------------- | ----------------------------- | ----------------------------------------------------------------- |
| Release ne publie pas             | `NPM_TOKEN` manquant/invalide | Vérifiez que le secret existe avec les permissions de publication |
| Release ne publie pas             | Pas sur la branche `main`     | Mergez sur `main` pour déclencher le workflow de release          |
| CHANGELOG non mis à jour          | Pas de changeset mergé        | Créez un changeset avec `pnpm run changeset` et mergez-le         |
| CI échoue sur `--frozen-lockfile` | Lockfile désynchronisé        | Lancez `pnpm install` localement et commitez `pnpm-lock.yaml`     |

---

## 📚 Documentation

### Lancer la documentation en local

```bash
pnpm run docs:dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

### Générer la documentation API

```bash
pnpm run api:docs
```

La documentation TypeDoc est générée dans `docs/api-generated/`.

### Structure de la documentation

```text
docs/
├── index.md              # Page d'accueil (Getting Started)
├── api.md                # Documentation API manuelle
├── api-generated/        # Documentation API auto-générée (TypeDoc)
└── .vitepress/
    └── config.mts        # Configuration VitePress
```

---

## 🚀 CI/CD avec GitHub Actions

Le fichier `.github/workflows/ci.yml` configure l'intégration continue :

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run typecheck
      - run: pnpm run test
      - run: pnpm run build
```

### Ajouter la publication automatique

Pour publier automatiquement sur npm à chaque tag :

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - "v*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: "https://registry.npmjs.org"
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
      - run: pnpm publish --access public --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

> ⚠️ N'oubliez pas d'ajouter `NPM_TOKEN` dans les secrets GitHub de votre repository.

---

## ⚙️ CI / CD (GitHub Actions)

Cette template inclut trois workflows GitHub Actions pour l'intégration continue, les releases et le déploiement de la documentation.

### Vue d'ensemble des workflows

| Workflow    | Fichier       | Déclencheur         | Fonction                                                                       |
| ----------- | ------------- | ------------------- | ------------------------------------------------------------------------------ |
| **CI**      | `ci.yml`      | PR, push sur `main` | Exécute lint, typecheck, tests, build, publint, knip, markdownlint, build docs |
| **Release** | `release.yml` | push sur `main`     | Utilise Changesets pour ouvrir une PR de Release ou publier sur npm            |
| **Docs**    | `docs.yml`    | push sur `main`     | Build la doc VitePress et déploie sur GitHub Pages                             |

### Prérequis

#### 1. Token NPM (pour la publication)

Créez un token d'accès npm et ajoutez-le à votre repository :

1. Allez sur [npmjs.com](https://www.npmjs.com/) → Access Tokens → Generate New Token (Automation)
2. Dans GitHub : Settings → Secrets and variables → Actions → New repository secret
3. Nom : `NPM_TOKEN`, Valeur : votre token

#### 2. GitHub Pages (pour la documentation)

Activez GitHub Pages avec Actions comme source :

1. Allez dans Settings → Pages de votre repository
2. Sous "Source", sélectionnez **GitHub Actions**

#### 3. Base Path VitePress

Configurez le chemin de base dans `docs/.vitepress/config.ts` :

```typescript
export default defineConfig({
  // Si déploiement sur https://<user>.github.io/<repo>/
  base: "/<repo>/",

  // Si déploiement sur https://<user>.github.io/ ou domaine personnalisé
  // base: "/",
});
```

### Fonctionnement

- **Corepack** est activé dans tous les workflows pour utiliser automatiquement la version de pnpm définie dans `package.json` (champ `packageManager`).
- **CI** s'exécute sur chaque pull request et push sur `main`, assurant la qualité du code avant merge.
- **Release** utilise `changesets/action` pour soit :
  - Ouvrir une "Release PR" quand des changesets sont présents, ou
  - Publier sur npm quand la Release PR est mergée.
- **Docs** build et déploie la documentation automatiquement à chaque push sur `main`.

### Dépannage

| Problème                                | Cause                                                   | Solution                                                                                              |
| --------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` échoue | Lockfile désynchronisé avec `package.json`              | Lancez `pnpm install` localement et commitez le `pnpm-lock.yaml` mis à jour                           |
| Déploiement docs cassé                  | Mauvais `base` VitePress ou source Pages non configurée | Vérifiez que `base` correspond au nom du repo ; assurez-vous que la source Pages est "GitHub Actions" |
| Release ne publie pas                   | `NPM_TOKEN` manquant ou invalide                        | Vérifiez que le secret existe et a les permissions de publication ; vérifiez les paramètres 2FA npm   |
| Workflow ne se déclenche pas            | Protection de branche ou filtres de chemin              | Vérifiez les conditions `on:` du workflow et les paramètres de branche                                |

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

### Workflow du contributeur

```bash
# 1. Fork et clonez le repository
git clone https://github.com/VOTRE_USERNAME/npm_package_template.git
cd npm_package_template

# 2. Créez une branche de fonctionnalité
git checkout -b feature/ma-feature

# 3. Faites vos modifications et lancez les tests
pnpm install
pnpm test
pnpm run lint

# 4. Créez un changeset (requis pour le bump de version)
pnpm run changeset
# Choisissez : patch / minor / major
# Écrivez une courte description de votre changement

# 5. Commitez tout (incluant .changeset/*.md)
git add .
git commit -m "feat: ajout de ma feature"

# 6. Pushez et ouvrez une Pull Request
git push origin feature/ma-feature
```

> 💡 **Astuce** : Incluez toujours un changeset quand votre PR affecte l'API publique ou corrige un bug. La description du changeset apparaîtra dans `CHANGELOG.md`.

### Convention de commits

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/) :

| Type       | Description                           |
| ---------- | ------------------------------------- |
| `feat`     | Nouvelle fonctionnalité               |
| `fix`      | Correction de bug                     |
| `docs`     | Documentation                         |
| `style`    | Formatage (pas de changement de code) |
| `refactor` | Refactoring                           |
| `test`     | Ajout/modification de tests           |
| `chore`    | Maintenance                           |

---

## ❓ FAQ

### Comment ajouter des sous-exports ?

Modifiez `exports` dans `package.json` :

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./utils": {
      "types": "./dist/utils.d.ts",
      "import": "./dist/utils.js",
      "require": "./dist/utils.cjs"
    }
  }
}
```

Et ajoutez l'entrée dans `tsup.config.ts` :

```typescript
entry: ["src/index.ts", "src/utils.ts"],
```

### Comment tester le package localement ?

```bash
# Dans le dossier du package
pnpm run build
pnpm link --global

# Dans un autre projet
pnpm link --global mon-package
```

### Comment vérifier ce qui sera publié ?

```bash
npm pack --dry-run
```

### Comment dépublier un package ?

```bash
# Dans les 72h suivant la publication
npm unpublish mon-package@1.0.0

# Après 72h (dépréciation uniquement)
npm deprecate mon-package@1.0.0 "Cette version est dépréciée"
```

---

## 📄 Licence

MIT © [pkg_name_author](https://github.com/pkg_name_author)

---

## 🙏 Remerciements

Cette template utilise des outils open source exceptionnels :

- [TypeScript](https://www.typescriptlang.org/)
- [tsup](https://tsup.egoist.dev/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [VitePress](https://vitepress.dev/)
- [Changesets](https://github.com/changesets/changesets)

---

<p align="center">
  <strong>⭐ Si cette template vous aide, n'hésitez pas à mettre une étoile sur GitHub !</strong>
</p>

---

## 📋 Table des matières

- [🚀 Démarrage rapide](#-démarrage-rapide)
- [✨ Fonctionnalités](#-fonctionnalités)
- [📁 Structure du projet](#-structure-du-projet)
- [📜 Scripts disponibles](#-scripts-disponibles)
- [🔧 Configuration](#-configuration)
- [📝 Guide complet : De la création à la publication](#-guide-complet--de-la-création-à-la-publication)
- [💡 Bonnes pratiques et recommandations](#-bonnes-pratiques-et-recommandations)
- [🔄 Gestion des versions avec Changesets](#-gestion-des-versions-avec-changesets)
- [📚 Documentation](#-documentation)
- [⚙️ CI / CD (GitHub Actions)](#️-ci--cd-github-actions-2)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

---

## 🚀 Démarrage rapide

### 1. Cloner la template

```bash
# Cloner le repository
git clone https://github.com/YOUR_USERNAME/npm_package_template.git mon-package

# Entrer dans le dossier
cd mon-package

# Supprimer l'historique git existant et initialiser un nouveau repo
rm -rf .git
git init
```

### 2. Installer les dépendances

```bash
pnpm install
```

### 3. Initialiser votre package

```bash
pnpm run init:template
```

Ce script interactif vous demandera :

- **Nom du package npm** : Le nom sous lequel votre package sera publié (ex: `@mon-scope/mon-package` ou `mon-package`)
- **Description** : Une courte description de votre package
- **Auteur** : Votre nom ou pseudo
- **URL du repository** : L'URL git de votre projet
- **Mots-clés** : Les tags pour la recherche npm (séparés par des virgules)

### 4. Vérifier que tout fonctionne

```bash
pnpm test        # Lancer les tests
pnpm run build   # Compiler le projet
pnpm run lint    # Vérifier le code
```

---

## ✨ Fonctionnalités

Cette template inclut tout ce dont vous avez besoin pour créer un package npm professionnel :

| Fonctionnalité       | Outil                                                  | Description                                     |
| -------------------- | ------------------------------------------------------ | ----------------------------------------------- |
| 📦 **Build**         | [tsup](https://tsup.egoist.dev/)                       | Compilation TypeScript ultra-rapide (ESM + CJS) |
| 🧪 **Tests**         | [Vitest](https://vitest.dev/)                          | Framework de test moderne et rapide             |
| 🔍 **Linting**       | [ESLint](https://eslint.org/)                          | Analyse statique du code                        |
| 💅 **Formatting**    | [Prettier](https://prettier.io/)                       | Formatage automatique du code                   |
| 📖 **Documentation** | [VitePress](https://vitepress.dev/)                    | Site de documentation statique                  |
| 📚 **API Docs**      | [TypeDoc](https://typedoc.org/)                        | Génération automatique de la doc API            |
| 🔄 **Versioning**    | [Changesets](https://github.com/changesets/changesets) | Gestion sémantique des versions                 |
| ✅ **CI/CD**         | [GitHub Actions](https://github.com/features/actions)  | Intégration continue                            |
| 📋 **Package Lint**  | [publint](https://publint.dev/)                        | Validation du package.json                      |
| 🔎 **Dead Code**     | [Knip](https://knip.dev/)                              | Détection du code inutilisé                     |

---

## 📁 Structure du projet

```text
npm_package_template/
├── 📁 src/                    # Code source TypeScript
│   └── index.ts               # Point d'entrée principal
├── 📁 test/                   # Tests unitaires
│   └── index.test.ts          # Tests avec Vitest
├── 📁 dist/                   # Code compilé (généré)
│   ├── index.js               # ESM bundle
│   ├── index.cjs              # CommonJS bundle
│   └── index.d.ts             # Déclarations TypeScript
├── 📁 docs/                   # Documentation VitePress
│   ├── index.md               # Page d'accueil
│   ├── api.md                 # Documentation API
│   ├── api-generated/         # Doc TypeDoc générée
│   └── .vitepress/            # Configuration VitePress
├── 📁 scripts/                # Scripts utilitaires
│   └── init-template.mjs      # Script d'initialisation
├── 📁 .github/                # Configuration GitHub
│   └── workflows/ci.yml       # Pipeline CI/CD
├── 📄 package.json            # Configuration npm
├── 📄 tsconfig.json           # Configuration TypeScript
├── 📄 tsconfig.build.json     # Config TS pour le build
├── 📄 tsup.config.ts          # Configuration tsup (bundler)
├── 📄 vitest.config.ts        # Configuration Vitest
├── 📄 eslint.config.mjs       # Configuration ESLint (flat config)
├── 📄 .prettierrc             # Configuration Prettier
├── 📄 .editorconfig           # Configuration éditeur
├── 📄 typedoc.json            # Configuration TypeDoc
├── 📄 CHANGELOG.md            # Historique des versions
├── 📄 LICENSE                 # Licence MIT
└── 📄 README.md               # Ce fichier
```

---

## 📜 Scripts disponibles

### 🏗️ Build & Development

| Script      | Commande             | Description                                                             |
| ----------- | -------------------- | ----------------------------------------------------------------------- |
| `build`     | `pnpm run build`     | Compile le projet en ESM et CJS avec les déclarations TypeScript        |
| `dev`       | `pnpm run dev`       | Compile en mode watch (recompile automatiquement à chaque modification) |
| `typecheck` | `pnpm run typecheck` | Vérifie les types TypeScript sans émettre de fichiers                   |

### 🧪 Tests

| Script          | Commande                 | Description                                                   |
| --------------- | ------------------------ | ------------------------------------------------------------- |
| `test`          | `pnpm test`              | Lance tous les tests une seule fois                           |
| `test:watch`    | `pnpm run test:watch`    | Lance les tests en mode watch (relance à chaque modification) |
| `test:coverage` | `pnpm run test:coverage` | Lance les tests avec rapport de couverture de code            |

### 🔍 Qualité du code

| Script         | Commande                | Description                                        |
| -------------- | ----------------------- | -------------------------------------------------- |
| `lint`         | `pnpm run lint`         | Analyse le code avec ESLint                        |
| `lint:package` | `pnpm run lint:package` | Vérifie la validité du package.json avec publint   |
| `lint:deps`    | `pnpm run lint:deps`    | Détecte les dépendances inutilisées avec Knip      |
| `lint:md`      | `pnpm run lint:md`      | Vérifie le formatage des fichiers Markdown         |
| `format`       | `pnpm run format`       | Vérifie le formatage avec Prettier (sans modifier) |
| `format:write` | `pnpm run format:write` | Formate automatiquement tous les fichiers          |

### 📖 Documentation

| Script         | Commande                | Description                                             |
| -------------- | ----------------------- | ------------------------------------------------------- |
| `docs:dev`     | `pnpm run docs:dev`     | Lance le serveur de documentation en mode développement |
| `docs:build`   | `pnpm run docs:build`   | Génère le site de documentation statique                |
| `docs:preview` | `pnpm run docs:preview` | Prévisualise le site de documentation généré            |
| `api:docs`     | `pnpm run api:docs`     | Génère la documentation API avec TypeDoc                |

### 📦 Publication

| Script             | Commande                    | Description                                               |
| ------------------ | --------------------------- | --------------------------------------------------------- |
| `changeset`        | `pnpm run changeset`        | Crée un nouveau changeset (description des modifications) |
| `version-packages` | `pnpm run version-packages` | Met à jour les versions selon les changesets              |
| `release`          | `pnpm run release`          | Publie le package sur npm                                 |
| `prepublishOnly`   | _(automatique)_             | Exécute lint, tests et build avant publication            |

### 🛠️ Utilitaires

| Script          | Commande                 | Description                                  |
| --------------- | ------------------------ | -------------------------------------------- |
| `init:template` | `pnpm run init:template` | Initialise la template avec vos informations |

---

## 🔧 Configuration

### TypeScript (`tsconfig.json`)

Configuration stricte et moderne :

```jsonc
{
  "compilerOptions": {
    "target": "ES2022", // JavaScript moderne
    "module": "ESNext", // Modules ES natifs
    "moduleResolution": "Bundler", // Résolution pour bundlers modernes
    "strict": true, // Mode strict activé
    "verbatimModuleSyntax": true, // Imports explicites type/value
    "noUncheckedIndexedAccess": true, // Accès indexés sécurisés
  },
}
```

### tsup (`tsup.config.ts`)

Configuration du bundler :

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Point d'entrée
  format: ["esm", "cjs"], // Génère ESM et CommonJS
  dts: true, // Génère les déclarations .d.ts
  sourcemap: true, // Source maps pour le debugging
  clean: true, // Nettoie dist/ avant build
  treeshake: true, // Élimine le code mort
});
```

### ESLint (`eslint.config.mjs`)

Configuration flat config avec TypeScript :

- ESLint recommended
- TypeScript ESLint (recommended + strict + stylistic)
- Intégration Prettier (désactive les règles conflictuelles)

### Prettier (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

---

## 📝 Guide complet : De la création à la publication

### Étape 1 : Initialisation

```bash
# 1. Cloner et initialiser
git clone https://github.com/YOUR_USERNAME/npm_package_template.git mon-package
cd mon-package
rm -rf .git && git init

# 2. Installer les dépendances
pnpm install

# 3. Configurer votre package
pnpm run init:template
```

### Étape 2 : Développement

#### Écrire votre code

Ajoutez vos fonctions dans `src/index.ts` :

```typescript
// src/index.ts
export function maFonction(param: string): string {
  return `Résultat: ${param}`;
}

export interface MonInterface {
  id: string;
  name: string;
}

export class MaClasse {
  constructor(private value: string) {}

  getValue(): string {
    return this.value;
  }
}
```

#### Écrire les tests

Ajoutez vos tests dans `test/` :

```typescript
// test/index.test.ts
import { describe, it, expect } from "vitest";
import { maFonction, MaClasse } from "../src/index";

describe("maFonction", () => {
  it("devrait retourner le résultat formaté", () => {
    expect(maFonction("test")).toBe("Résultat: test");
  });
});

describe("MaClasse", () => {
  it("devrait stocker et retourner la valeur", () => {
    const instance = new MaClasse("hello");
    expect(instance.getValue()).toBe("hello");
  });
});
```

#### Développer en mode watch

```bash
# Terminal 1 : Compilation automatique
pnpm run dev

# Terminal 2 : Tests automatiques
pnpm run test:watch
```

### Étape 3 : Vérification avant publication

```bash
# Vérifier tout
pnpm run lint           # Linting
pnpm run typecheck      # Types
pnpm test               # Tests
pnpm run build          # Build
pnpm run lint:package   # Validation package.json
```

### Étape 4 : Créer un compte npm

Si vous n'avez pas encore de compte npm :

```bash
# Créer un compte sur https://www.npmjs.com/signup
# Puis se connecter
npm login
```

### Étape 5 : Première publication

#### Option A : Publication simple (première version)

```bash
# 1. Vérifier que la version est 0.0.0 ou 1.0.0 dans package.json

# 2. Mettre à jour la version manuellement pour la première release
npm version 1.0.0

# 3. Publier
npm publish --access public
```

#### Option B : Utiliser Changesets (recommandé pour les versions suivantes)

```bash
# 1. Créer un changeset
pnpm run changeset

# Répondre aux questions :
# - Quel type de changement ? (patch/minor/major)
# - Description du changement

# 2. Appliquer le changeset (met à jour la version et CHANGELOG)
pnpm run version-packages

# 3. Commiter les changements
git add .
git commit -m "chore: version 1.0.0"

# 4. Publier
pnpm run release
```

### Étape 6 : Configurer GitHub

```bash
# Créer le repo sur GitHub, puis :
git remote add origin https://github.com/VOTRE_USERNAME/mon-package.git
git branch -M main
git push -u origin main
```

La CI GitHub Actions se déclenchera automatiquement à chaque push.

---

## 💡 Bonnes pratiques et recommandations

### 📛 Nommage du package

```bash
# Package simple
mon-package

# Package scopé (recommandé pour éviter les conflits)
@mon-username/mon-package
@mon-organisation/mon-package
```

### 📄 Fichiers essentiels

Assurez-vous d'avoir :

- ✅ `README.md` - Documentation claire avec exemples
- ✅ `LICENSE` - Licence (MIT par défaut)
- ✅ `CHANGELOG.md` - Historique des versions
- ✅ `.gitignore` - Fichiers à ignorer
- ✅ Tests avec bonne couverture

### 🔢 Versioning sémantique (SemVer)

| Version                 | Quand l'utiliser                                |
| ----------------------- | ----------------------------------------------- |
| `MAJOR` (1.0.0 → 2.0.0) | Changements **cassants** (breaking changes)     |
| `MINOR` (1.0.0 → 1.1.0) | Nouvelles **fonctionnalités** rétro-compatibles |
| `PATCH` (1.0.0 → 1.0.1) | **Corrections** de bugs rétro-compatibles       |

### 📦 Configuration `package.json`

#### Champs importants

```json
{
  "name": "@scope/package-name",
  "version": "1.0.0",
  "description": "Description claire et concise",
  "keywords": ["mot-clé1", "mot-clé2"],
  "author": "Votre Nom <email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo"
  },
  "bugs": {
    "url": "https://github.com/user/repo/issues"
  },
  "homepage": "https://github.com/user/repo#readme"
}
```

#### Exports modernes (ESM + CJS)

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

#### Fichiers publiés

```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

### 🔒 Sécurité

- ✅ Ne **jamais** publier de secrets (tokens, clés API)
- ✅ Utiliser `.npmignore` ou `files` dans `package.json`
- ✅ Vérifier avec `npm pack --dry-run` ce qui sera publié
- ✅ Activer 2FA sur votre compte npm

### 📊 Qualité

- ✅ Couverture de tests > 80%
- ✅ Documentation à jour
- ✅ Types TypeScript exportés
- ✅ Exemples d'utilisation dans le README
- ✅ CHANGELOG maintenu

---

## 🔄 Gestion des versions avec Changesets

### Pourquoi Changesets ?

Changesets est un outil qui permet de :

- 📝 Documenter les changements au fur et à mesure du développement
- 🔢 Calculer automatiquement la prochaine version (selon SemVer)
- 📋 Générer automatiquement le CHANGELOG
- 🚀 Simplifier le processus de publication

### Fichiers clés

| Fichier/Dossier          | Rôle                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `CHANGELOG.md`           | Historique des versions généré automatiquement. **Ne pas modifier manuellement** — Changesets le met à jour automatiquement. |
| `.changeset/*.md`        | Descriptions des changements en attente. Chaque fichier décrit un changement et son impact semver.                           |
| `.changeset/config.json` | Configuration de Changesets (messages de commit, format du changelog, etc.).                                                 |

### Choisir un type de version

| Type    | Quand l'utiliser                                                                  | Exemple           |
| ------- | --------------------------------------------------------------------------------- | ----------------- |
| `patch` | Corrections de bugs, documentation, refactoring interne (pas de changement d'API) | `1.0.0` → `1.0.1` |
| `minor` | Nouvelles fonctionnalités rétro-compatibles                                       | `1.0.0` → `1.1.0` |
| `major` | Changements cassants (APIs supprimées/renommées, comportement modifié)            | `1.0.0` → `2.0.0` |

### Workflow Changesets

#### 1. Créer un changeset

Après avoir fait des modifications :

```bash
pnpm run changeset
```

Répondez aux questions :

1. **Quels packages ont changé ?** → Sélectionnez votre package
2. **Quel type de changement ?** → `patch`, `minor`, ou `major`
3. **Description** : Décrivez le changement (apparaîtra dans le CHANGELOG)

Cela crée un fichier dans `.changeset/` (ex: `.changeset/blue-lions-run.md`).

#### 2. Commiter le changeset

```bash
git add .changeset/
git commit -m "chore: add changeset for feature X"
```

#### 3. Appliquer les changesets (avant release)

```bash
pnpm run version-packages
```

Cela :

- Met à jour `version` dans `package.json`
- Ajoute les entrées dans `CHANGELOG.md`
- Supprime les fichiers changeset consommés

#### 4. Publier

```bash
git add .
git commit -m "chore: release v1.1.0"
git tag v1.1.0
git push --follow-tags

pnpm run release
```

### Release automatisée via CI (Recommandé)

Plutôt que de publier manuellement, l'approche recommandée utilise GitHub Actions :

1. **Pushez les changesets sur `main`** (via une PR mergée)
2. **Le workflow `release.yml`** détecte les changesets en attente et ouvre une **Release PR**
3. **Vérifiez et mergez** la Release PR
4. **Le workflow publie sur npm** automatiquement en utilisant le secret `NPM_TOKEN`

Ceci est géré par `.github/workflows/release.yml` utilisant `changesets/action`.

> ⚠️ **Requis** : Ajoutez `NPM_TOKEN` aux secrets de votre repository (Settings → Secrets → Actions).

### Dépannage des releases

| Problème                          | Cause                         | Solution                                                          |
| --------------------------------- | ----------------------------- | ----------------------------------------------------------------- |
| Release ne publie pas             | `NPM_TOKEN` manquant/invalide | Vérifiez que le secret existe avec les permissions de publication |
| Release ne publie pas             | Pas sur la branche `main`     | Mergez sur `main` pour déclencher le workflow de release          |
| CHANGELOG non mis à jour          | Pas de changeset mergé        | Créez un changeset avec `pnpm run changeset` et mergez-le         |
| CI échoue sur `--frozen-lockfile` | Lockfile désynchronisé        | Lancez `pnpm install` localement et commitez `pnpm-lock.yaml`     |

---

## 📚 Documentation

### Lancer la documentation en local

```bash
pnpm run docs:dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

### Générer la documentation API

```bash
pnpm run api:docs
```

La documentation TypeDoc est générée dans `docs/api-generated/`.

### Structure de la documentation

```text
docs/
├── index.md              # Page d'accueil (Getting Started)
├── api.md                # Documentation API manuelle
├── api-generated/        # Documentation API auto-générée (TypeDoc)
└── .vitepress/
    └── config.mts        # Configuration VitePress
```

### Personnaliser VitePress

Éditez `docs/.vitepress/config.mts` :

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Mon Package",
  description: "Documentation de mon package",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/" },
      { text: "API", link: "/api" },
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Installation", link: "/installation" },
        ],
      },
      {
        text: "API Reference",
        items: [{ text: "API", link: "/api" }],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/user/repo" }],
  },
});
```

---

## 🚀 CI/CD avec GitHub Actions

Le fichier `.github/workflows/ci.yml` configure l'intégration continue :

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run typecheck
      - run: pnpm run test
      - run: pnpm run build
```

### Ajouter la publication automatique

Pour publier automatiquement sur npm à chaque tag :

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - "v*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: "https://registry.npmjs.org"
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
      - run: pnpm publish --access public --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

> ⚠️ N'oubliez pas d'ajouter `NPM_TOKEN` dans les secrets GitHub de votre repository.

---

## ⚙️ CI / CD (GitHub Actions)

Cette template inclut trois workflows GitHub Actions pour l'intégration continue, les releases et le déploiement de la documentation.

### Vue d'ensemble des workflows

| Workflow    | Fichier       | Déclencheur         | Fonction                                                                       |
| ----------- | ------------- | ------------------- | ------------------------------------------------------------------------------ |
| **CI**      | `ci.yml`      | PR, push sur `main` | Exécute lint, typecheck, tests, build, publint, knip, markdownlint, build docs |
| **Release** | `release.yml` | push sur `main`     | Utilise Changesets pour ouvrir une PR de Release ou publier sur npm            |
| **Docs**    | `docs.yml`    | push sur `main`     | Build la doc VitePress et déploie sur GitHub Pages                             |

### Prérequis

#### 1. Token NPM (pour la publication)

Créez un token d'accès npm et ajoutez-le à votre repository :

1. Allez sur [npmjs.com](https://www.npmjs.com/) → Access Tokens → Generate New Token (Automation)
2. Dans GitHub : Settings → Secrets and variables → Actions → New repository secret
3. Nom : `NPM_TOKEN`, Valeur : votre token

#### 2. GitHub Pages (pour la documentation)

Activez GitHub Pages avec Actions comme source :

1. Allez dans Settings → Pages de votre repository
2. Sous "Source", sélectionnez **GitHub Actions**

#### 3. Base Path VitePress

Configurez le chemin de base dans `docs/.vitepress/config.ts` :

```typescript
export default defineConfig({
  // Si déploiement sur https://<user>.github.io/<repo>/
  base: "/<repo>/",

  // Si déploiement sur https://<user>.github.io/ ou domaine personnalisé
  // base: "/",
});
```

### Fonctionnement

- **Corepack** est activé dans tous les workflows pour utiliser automatiquement la version de pnpm définie dans `package.json` (champ `packageManager`).
- **CI** s'exécute sur chaque pull request et push sur `main`, assurant la qualité du code avant merge.
- **Release** utilise `changesets/action` pour soit :
  - Ouvrir une "Release PR" quand des changesets sont présents, ou
  - Publier sur npm quand la Release PR est mergée.
- **Docs** build et déploie la documentation automatiquement à chaque push sur `main`.

### Dépannage

| Problème                                | Cause                                                   | Solution                                                                                              |
| --------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` échoue | Lockfile désynchronisé avec `package.json`              | Lancez `pnpm install` localement et commitez le `pnpm-lock.yaml` mis à jour                           |
| Déploiement docs cassé                  | Mauvais `base` VitePress ou source Pages non configurée | Vérifiez que `base` correspond au nom du repo ; assurez-vous que la source Pages est "GitHub Actions" |
| Release ne publie pas                   | `NPM_TOKEN` manquant ou invalide                        | Vérifiez que le secret existe et a les permissions de publication ; vérifiez les paramètres 2FA npm   |
| Workflow ne se déclenche pas            | Protection de branche ou filtres de chemin              | Vérifiez les conditions `on:` du workflow et les paramètres de branche                                |

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

### Workflow du contributeur

```bash
# 1. Fork et clonez le repository
git clone https://github.com/VOTRE_USERNAME/npm_package_template.git
cd npm_package_template

# 2. Créez une branche de fonctionnalité
git checkout -b feature/ma-feature

# 3. Faites vos modifications et lancez les tests
pnpm install
pnpm test
pnpm run lint

# 4. Créez un changeset (requis pour le bump de version)
pnpm run changeset
# Choisissez : patch / minor / major
# Écrivez une courte description de votre changement

# 5. Commitez tout (incluant .changeset/*.md)
git add .
git commit -m "feat: ajout de ma feature"

# 6. Pushez et ouvrez une Pull Request
git push origin feature/ma-feature
```

> 💡 **Astuce** : Incluez toujours un changeset quand votre PR affecte l'API publique ou corrige un bug. La description du changeset apparaîtra dans `CHANGELOG.md`.

### Convention de commits

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/) :

| Type       | Description                           |
| ---------- | ------------------------------------- |
| `feat`     | Nouvelle fonctionnalité               |
| `fix`      | Correction de bug                     |
| `docs`     | Documentation                         |
| `style`    | Formatage (pas de changement de code) |
| `refactor` | Refactoring                           |
| `test`     | Ajout/modification de tests           |
| `chore`    | Maintenance                           |

Exemples :

```bash
git commit -m "feat: add new utility function"
git commit -m "fix: resolve parsing error"
git commit -m "docs: update README with examples"
```

---

## ❓ FAQ

### Comment ajouter des sous-exports ?

Modifiez `exports` dans `package.json` :

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./utils": {
      "types": "./dist/utils.d.ts",
      "import": "./dist/utils.js",
      "require": "./dist/utils.cjs"
    }
  }
}
```

Et ajoutez l'entrée dans `tsup.config.ts` :

```typescript
entry: ["src/index.ts", "src/utils.ts"],
```

### Comment tester le package localement ?

```bash
# Dans le dossier du package
pnpm run build
pnpm link --global

# Dans un autre projet
pnpm link --global mon-package
```

### Comment vérifier ce qui sera publié ?

```bash
npm pack --dry-run
```

### Comment dépublier un package ?

```bash
# Dans les 72h suivant la publication
npm unpublish mon-package@1.0.0

# Après 72h (dépréciation uniquement)
npm deprecate mon-package@1.0.0 "Cette version est dépréciée"
```

---

## 📄 Licence

MIT © [pkg_name_author](https://github.com/pkg_name_author)

---

## 🙏 Remerciements

Cette template utilise des outils open source exceptionnels :

- [TypeScript](https://www.typescriptlang.org/)
- [tsup](https://tsup.egoist.dev/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [VitePress](https://vitepress.dev/)
- [Changesets](https://github.com/changesets/changesets)

---

<p align="center">
  <strong>⭐ Si cette template vous aide, n'hésitez pas à mettre une étoile sur GitHub !</strong>
</p>
