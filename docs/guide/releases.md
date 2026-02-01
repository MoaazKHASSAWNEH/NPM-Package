# Releases

This template uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

## Overview

Changesets is a versioning workflow that:

1. **Decouples changes from releases** — Each PR adds a "changeset" describing what changed
2. **Accumulates changes** — Multiple changesets combine into a single release
3. **Automates versioning** — Determines the correct semver bump automatically
4. **Generates changelogs** — Creates `CHANGELOG.md` from changeset descriptions

## Workflow

```text
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Make code  │───▶│ Add         │───▶│ Merge PR    │───▶│ Merge       │
│  changes    │    │ changeset   │    │ to main     │    │ Version PR  │
└─────────────┘    └─────────────┘    └─────────────┘    └──────┬──────┘
                                                                │
                                                                ▼
                                                       ┌─────────────┐
                                                       │ Auto-publish│
                                                       │ to npm      │
                                                       └─────────────┘
```

## Adding a Changeset

When you make a change that should be released:

```bash
pnpm changeset
```

This interactive command asks:

1. **Which packages changed?** — Select from the list (usually just the root package)
2. **Semver bump type?** — patch, minor, or major
3. **Summary?** — A brief description for the changelog

### Choosing the Bump Type

| Bump  | When to Use                        | Example           |
| ----- | ---------------------------------- | ----------------- |
| patch | Bug fixes, docs, internal changes  | `1.0.0` → `1.0.1` |
| minor | New features (backward compatible) | `1.0.0` → `1.1.0` |
| major | Breaking changes                   | `1.0.0` → `2.0.0` |

### Writing Good Summaries

Changeset summaries become your changelog. Write them for users:

**Good:**

```text
Add `formatDate()` utility function for consistent date formatting
```

**Bad:**

```text
fixed stuff
```

### Generated File

The command creates a file like `.changeset/fuzzy-tigers-dance.md`:

```markdown
---
"your-package-name": minor
---

Add `formatDate()` utility function for consistent date formatting
```

Commit this file with your PR.

## The Version PR

When changesets exist on `main`, the release workflow creates a **Version Packages** PR:

- **Title:** `chore: version packages`
- **Changes:**
  - Bumps version in `package.json`
  - Updates `CHANGELOG.md`
  - Deletes consumed changesets

This PR stays open and updates automatically as new changesets merge.

### Reviewing the Version PR

Before merging:

1. Check the version bump is correct
2. Review the changelog looks good
3. Ensure CI passes

### Publishing

When you merge the Version PR:

1. Release workflow detects no pending changesets
2. Runs quality gates (lint, test, build)
3. Publishes to npm
4. Creates a GitHub release with changelog

## NPM Token Setup

The release workflow needs an npm token to publish.

### Creating a Token

1. Go to [npmjs.com](https://www.npmjs.com/) → Account Settings → Access Tokens
2. Click **Generate New Token** → **Granular Access Token**
3. Configure:
   - **Name:** `github-actions` (or similar)
   - **Expiration:** Choose based on your security needs
   - **Packages:** Select your package or "All packages"
   - **Permissions:** Read and write

4. Copy the token (shown only once)

### Adding to GitHub

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Click **New repository secret**
3. Name: `NPM_TOKEN`
4. Value: Paste your npm token
5. Click **Add secret**

## Manual Releases

If you need to release without the automated workflow:

```bash
# 1. Consume changesets and update versions
pnpm changeset version

# 2. Review changes
git diff

# 3. Commit
git add .
git commit -m "chore: version packages"

# 4. Publish
pnpm publish --access public

# 5. Push
git push
git push --tags
```

## Prerelease Versions

For alpha/beta releases:

### Enter Prerelease Mode

```bash
pnpm changeset pre enter alpha
```

This creates `.changeset/pre.json`. Now:

- `pnpm changeset version` creates versions like `1.0.0-alpha.0`
- Each version command increments the prerelease number

### Exit Prerelease Mode

```bash
pnpm changeset pre exit
```

The next version will be a stable release.

## Skip Changeset for a PR

Some changes don't need releases:

- Documentation-only changes
- CI/workflow changes
- Internal refactors with no external impact

For these, add an empty changeset:

```bash
pnpm changeset add --empty
```

This satisfies CI checks without triggering a version bump.

Alternatively, if your repo has a CI check for changesets, you can skip it with:

```text
[skip changeset]
```

in your PR title or description (if configured).

## Changeset Configuration

The config lives in `.changeset/config.json`:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

| Option                       | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `changelog`                  | Changelog format generator                    |
| `commit`                     | Auto-commit version changes                   |
| `access`                     | npm publish access (`public` or `restricted`) |
| `baseBranch`                 | The main branch name                          |
| `updateInternalDependencies` | How to bump internal workspace deps           |

## Troubleshooting

### "No changesets found"

**Cause:** PR doesn't include a changeset file

**Fix:** Run `pnpm changeset` and commit the generated file

### Version PR Not Updating

**Cause:** Release workflow may have failed

**Check:** Go to Actions tab and look for errors

### Publish Failed

**Common causes:**

1. `NPM_TOKEN` secret not set or expired
2. Package name already taken on npm
3. Version already published (can't overwrite)

**Check:** Release workflow logs for the specific error

### Wrong Version Bump

**Cause:** Incorrect bump type selected when creating changeset

**Fix:** Edit the changeset file directly:

```markdown
---
"your-package-name": patch  <!-- Change this -->
---

Your description
```

## Best Practices

1. **One changeset per PR** — Easier to track
2. **Write for users** — Changelog summaries are public
3. **Group related changes** — Multiple commits can share one changeset
4. **Review Version PRs** — Don't auto-merge without checking
5. **Use conventional commits** — Even though changesets don't require them
