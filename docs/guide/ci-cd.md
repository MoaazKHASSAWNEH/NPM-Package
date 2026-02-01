# CI/CD

This template includes three GitHub Actions workflows for continuous integration and delivery.

## Workflows Overview

| Workflow | File          | Purpose              | Trigger                          |
| -------- | ------------- | -------------------- | -------------------------------- |
| CI       | `ci.yml`      | Quality checks       | PRs, pushes to main              |
| Docs     | `docs.yml`    | Deploy documentation | Pushes to main (docs paths)      |
| Release  | `release.yml` | Version and publish  | Pushes to main (changeset paths) |

## CI Workflow

**File:** `.github/workflows/ci.yml`

### Triggers

```yaml
on:
  pull_request:
  push:
    branches: [main]
```

Runs on:

- All pull requests
- Direct pushes to `main`

### Steps

1. **Checkout** — Clone the repository
2. **Setup Node** — Install Node.js 20
3. **Enable Corepack** — Activate pnpm from `packageManager` field
4. **Install dependencies** — `pnpm install --frozen-lockfile`
5. **Lint** — `pnpm run lint`
6. **Typecheck** — `pnpm run typecheck`
7. **Test** — `pnpm run test`
8. **Build** — `pnpm run build`
9. **Package lint** — `pnpm run lint:package`
10. **Unused deps check** — `pnpm run lint:deps`
11. **Markdown lint** — `pnpm run lint:md`
12. **Docs build** — `pnpm run docs:build`

### Why This Order?

The steps are ordered by:

1. **Fast failures first** — Lint and typecheck catch issues quickly
2. **Dependencies** — Build must succeed before publint
3. **Completeness** — Docs build verifies everything integrates

## Docs Workflow

**File:** `.github/workflows/docs.yml`

### Triggers

```yaml
on:
  push:
    branches: [main]
    paths:
      - "docs/**"
      - "package.json"
      - "pnpm-lock.yaml"
      - "typedoc.json"
      - "src/**"
  workflow_dispatch:
```

Runs on:

- Pushes to `main` that modify documentation-related files
- Manual dispatch (allows triggering from GitHub UI)

### Path Filtering

The workflow only runs when relevant files change:

| Path             | Reason                             |
| ---------------- | ---------------------------------- |
| `docs/**`        | Documentation content changed      |
| `package.json`   | Version or config may affect docs  |
| `pnpm-lock.yaml` | Dependencies may affect docs build |
| `typedoc.json`   | API docs configuration changed     |
| `src/**`         | API docs depend on source code     |

This saves CI minutes by not rebuilding docs for unrelated changes.

### Jobs

**Build Job:**

1. Checkout repository
2. Setup Node with Corepack
3. Install dependencies
4. Build docs (`pnpm run docs:build`)
5. Upload artifact to GitHub Pages

**Deploy Job:**

1. Deploy artifact to GitHub Pages

### Permissions

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

- `pages: write` — Required to deploy to GitHub Pages
- `id-token: write` — Required for GitHub's OIDC authentication

## Release Workflow

**File:** `.github/workflows/release.yml`

### Triggers

```yaml
on:
  push:
    branches: [main]
    paths:
      - ".changeset/**"
      - "package.json"
      - "pnpm-lock.yaml"
```

Runs on pushes to `main` that modify:

- Changeset files (new or consumed)
- Package configuration

### How It Works

The workflow uses [changesets/action](https://github.com/changesets/action):

1. **Check for changesets** — Are there pending changesets in `.changeset/`?

2. **If changesets exist:**
   - Creates or updates a "Version Packages" PR
   - PR contains version bumps and CHANGELOG updates

3. **If no changesets (and Version PR was merged):**
   - Publishes to npm
   - Creates GitHub release

### Quality Gates

Before releasing, the workflow runs:

```yaml
- name: Quality gates
  run: |
    pnpm run lint
    pnpm run typecheck
    pnpm run test
    pnpm run build
    pnpm run lint:package
```

This ensures only working code is published.

### Required Secrets

| Secret         | Purpose              | How to Set                     |
| -------------- | -------------------- | ------------------------------ |
| `GITHUB_TOKEN` | Create PRs, releases | Automatic (provided by GitHub) |
| `NPM_TOKEN`    | Publish to npm       | Add manually in repo settings  |

See [Releases](./releases.md) for npm token setup.

### Permissions

```yaml
permissions:
  contents: write
  pull-requests: write
```

- `contents: write` — Create releases, push version commits
- `pull-requests: write` — Create and update Version PR

## Common Issues

### pnpm Not Found

**Symptom:** CI fails with "pnpm: command not found"

**Cause:** Corepack not enabled

**Fix:** Ensure the workflow includes:

```yaml
- name: Enable Corepack
  run: corepack enable
```

### Frozen Lockfile Fails

**Symptom:** `pnpm install --frozen-lockfile` fails

**Cause:** `pnpm-lock.yaml` is out of sync with `package.json`

**Fix locally:**

```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: update lockfile"
git push
```

### Docs Deploy Fails

**Symptom:** Docs workflow succeeds but site shows 404

**Cause:** GitHub Pages not configured correctly

**Fix:** See [GitHub Pages Setup](./github-pages.md)

### Release Not Publishing

**Symptom:** Version PR merged but no npm publish

**Causes:**

1. `NPM_TOKEN` secret not set
2. Token doesn't have publish permissions
3. Package name already taken on npm

**Fix:** Check Actions logs for the specific error.

## Concurrency

All workflows use concurrency controls:

```yaml
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

This means:

- Only one run per branch at a time
- New pushes cancel in-progress runs
- Saves CI minutes on rapid iteration

The release workflow uses `cancel-in-progress: false` to prevent interrupted publishes.

## Running Locally

You can run the same checks locally:

```bash
# Full CI equivalent
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run lint:package
pnpm run lint:deps
pnpm run lint:md
pnpm run docs:build
```

This helps catch issues before pushing.
