# Git Hooks

This template uses Husky and lint-staged to run automated checks before commits and pushes.

## Overview

| Hook         | Tool        | What Runs                           |
| ------------ | ----------- | ----------------------------------- |
| `pre-commit` | lint-staged | ESLint + Prettier on staged files   |
| `pre-push`   | Scripts     | Full lint, typecheck, test, publint |

## How It Works

### Husky

[Husky](https://typicode.github.io/husky/) manages Git hooks. Hooks are shell scripts in `.husky/` that Git executes at specific points.

### lint-staged

[lint-staged](https://github.com/lint-staged/lint-staged) runs commands only on files that are staged for commit, making pre-commit checks fast.

## Hook Configuration

### Pre-commit Hook

File: `.husky/pre-commit`

```bash
pnpm lint-staged
```

This runs lint-staged, which is configured in `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,mjs,cjs}": ["eslint --fix", "prettier --write"],
    "*.{md,json,yml,yaml}": ["prettier --write"]
  }
}
```

**What happens:**

1. You stage files: `git add src/index.ts`
2. You commit: `git commit -m "feat: add feature"`
3. Husky triggers pre-commit hook
4. lint-staged runs ESLint and Prettier on staged `.ts` files
5. If fixes are applied, they're automatically staged
6. If errors remain, commit is aborted

### Pre-push Hook

File: `.husky/pre-push`

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run lint:package
```

**What happens:**

1. You push: `git push origin main`
2. Husky triggers pre-push hook
3. Full project lint, typecheck, tests, and publint run
4. If any check fails, push is aborted

This prevents pushing broken code to the repository.

## Installing Hooks

Hooks are installed automatically when you run `pnpm install` via the `prepare` script:

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

To manually reinstall hooks:

```bash
pnpm run prepare
```

## Bypassing Hooks

In emergencies, you can skip hooks:

```bash
# Skip pre-commit
git commit --no-verify -m "emergency fix"

# Skip pre-push
git push --no-verify
```

::: warning
Use `--no-verify` sparingly. CI will still run all checks, so broken code may fail in the pipeline.
:::

## Troubleshooting

### Hooks Not Running

**Symptoms:** Commits succeed without linting, or `pnpm lint-staged` is not found.

**Causes:**

1. Hooks not installed
2. Husky not initialized
3. Git not detecting `.husky/` directory

**Fix:**

```bash
# Ensure Git is initialized
git status

# Reinstall hooks
pnpm run prepare

# Verify hooks exist
ls -la .husky/
```

### Hooks Not Running on Windows

**Symptoms:** Hooks work in Git Bash but not in PowerShell or CMD.

**Causes:**

- Windows line endings (CRLF) in hook files
- Shell not properly configured

**Fix:**

1. Ensure `.husky/` files use LF line endings (not CRLF)
2. Use Git Bash instead of PowerShell/CMD
3. Or configure Git to use bash:

```bash
git config core.hooksPath .husky
```

### lint-staged Errors

**Symptom:** `lint-staged` fails with ESLint errors.

**Fix options:**

1. Fix the errors manually
2. Let ESLint auto-fix: errors that can't be auto-fixed need manual attention
3. As last resort: `git commit --no-verify`

### Pre-push Hook Fails

**Symptom:** Push blocked due to test or lint failures.

**Fix:**

1. Run the failing command locally to see the error:

   ```bash
   pnpm run lint
   pnpm run typecheck
   pnpm run test
   pnpm run lint:package
   ```

2. Fix the issues
3. Commit the fixes
4. Push again

### publint Fails in Pre-push

**Symptom:** `lint:package` fails with "dist/index.js does not exist"

**Cause:** Pre-push runs publint, which requires built files.

**Fix:**

```bash
# Build first
pnpm run build

# Then push
git push
```

Or ensure you always build before pushing.

## Customizing Hooks

### Adding Commands to Pre-commit

Edit `.husky/pre-commit`:

```bash
pnpm lint-staged
pnpm run my-custom-check
```

### Adding Commands to Pre-push

Edit `.husky/pre-push`:

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run lint:package
pnpm run my-custom-check
```

### Changing lint-staged Configuration

Edit `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.css": ["stylelint --fix"],
    "*.md": ["markdownlint --fix", "prettier --write"]
  }
}
```

## Why Both Hooks?

### Pre-commit (Fast)

- Runs only on staged files
- Quick feedback loop
- Catches formatting and obvious lint errors
- Doesn't block development flow

### Pre-push (Comprehensive)

- Runs full project checks
- Catches issues that affect the whole codebase
- Ensures CI won't fail
- Last line of defense before code reaches remote

This two-tier approach balances development speed with code quality.
