# Getting Started

This guide walks you through using the NPM Package Template to create your own TypeScript npm package.

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool    | Version | Purpose                             |
| ------- | ------- | ----------------------------------- |
| Node.js | >= 20   | JavaScript runtime                  |
| pnpm    | 9.0.0   | Package manager (via Corepack)      |
| Git     | >= 2.x  | Version control, required for Husky |

### Enable Corepack

Corepack is included with Node.js 16.10+ and manages the pnpm version specified in `package.json`:

```bash
corepack enable
```

After enabling, pnpm commands automatically use the correct version (9.0.0).

### Verify Installation

```bash
node --version    # v20.x.x or higher
pnpm --version    # 9.0.0
git --version     # 2.x.x
```

## Creating Your Package

### Option 1: Use as GitHub Template

1. Click **"Use this template"** on the [repository page](https://github.com/MoaazKHASSAWNEH/NPM-Package)
2. Choose a name for your repository
3. Clone your new repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### Option 2: Clone Directly

```bash
git clone https://github.com/MoaazKHASSAWNEH/NPM-Package.git my-package
cd my-package

# Remove template history and start fresh
rm -rf .git
git init
```

## Initial Setup

### 1. Install Dependencies

```bash
pnpm install
```

This also runs the `prepare` script which installs Husky git hooks.

### 2. Initialize the Template

Run the initialization script to replace placeholder values:

```bash
pnpm run init:template
```

The script prompts for:

- **Package name** — Your npm package name (e.g., `my-utils` or `@scope/my-utils`)
- **Description** — A brief description of your package
- **Author** — Your name or organization
- **GitHub repository** — Format: `owner/repo` or full URL

The script updates:

- `package.json` (name, description, author, repository, keywords)
- `docs/.vitepress/config.mts` (title, description)
- `typedoc.json` (project name)
- `LICENSE` (copyright holder)

### 3. Verify Everything Works

```bash
# Run the test suite
pnpm test

# Build the package
pnpm run build

# Check for linting errors
pnpm run lint
```

## Development Workflow

### Start Development

```bash
# Build in watch mode (rebuilds on file changes)
pnpm run dev
```

### Run Tests

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage
```

### Start Documentation Server

```bash
pnpm run docs:dev
```

Opens the VitePress dev server at `http://localhost:5173/`.

## Project Structure Overview

```text
├── src/                    # Source code
│   └── index.ts            # Package entry point
├── test/                   # Test files
├── docs/                   # VitePress documentation
├── dist/                   # Build output (generated)
├── .github/workflows/      # CI/CD automation
├── .husky/                 # Git hooks
├── package.json            # Package manifest
├── tsconfig.json           # TypeScript config
├── tsup.config.ts          # Build configuration
└── vitest.config.ts        # Test configuration
```

## Next Steps

- [Scripts Reference](./scripts.md) — Learn all available npm scripts
- [Build and Exports](./build-and-exports.md) — Understand the build output
- [Code Quality](./quality.md) — Configure linting and formatting
- [Releases](./releases.md) — Publish your package to npm
