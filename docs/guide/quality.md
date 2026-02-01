# Code Quality

This template includes multiple tools to maintain code quality and consistency.

## Overview

| Tool         | Purpose                             | Script                  |
| ------------ | ----------------------------------- | ----------------------- |
| ESLint       | Linting TypeScript/JavaScript       | `pnpm run lint`         |
| Prettier     | Code formatting                     | `pnpm run format`       |
| publint      | Validate package.json exports       | `pnpm run lint:package` |
| knip         | Detect unused code and dependencies | `pnpm run lint:deps`    |
| markdownlint | Lint Markdown files                 | `pnpm run lint:md`      |

## ESLint

ESLint 9 uses the flat configuration format in `eslint.config.mjs`.

### Configuration

The config includes:

1. **Ignores** — Skip `dist/`, `coverage/`, `.vitepress/cache`, `api-generated/`
2. **Base rules** — ESLint recommended rules
3. **TypeScript rules** — `typescript-eslint` recommended, strict, and stylistic
4. **Prettier compatibility** — Disables formatting rules that conflict with Prettier

### Running ESLint

```bash
# Check for errors
pnpm run lint

# ESLint can auto-fix some issues
pnpm exec eslint . --fix
```

### Common Issues

**Unused variables:**

```typescript
// Error: 'x' is defined but never used
const x = 1;

// Fix: Remove or use the variable
// Or prefix with underscore if intentionally unused
const _x = 1;
```

**Type assertions:**

```typescript
// Warning: Avoid 'as' type assertions
const value = data as string;

// Prefer type guards or generics
function isString(val: unknown): val is string {
  return typeof val === "string";
}
```

## Prettier

Prettier handles code formatting with minimal configuration.

### Configuration

Prettier config is in `.prettierrc`. The template uses defaults with these considerations:

- `.prettierignore` excludes generated files
- ESLint config includes `eslint-config-prettier` to avoid conflicts

### Running Prettier

```bash
# Check formatting
pnpm run format

# Fix formatting
pnpm run format:write
```

### Editor Integration

For best experience, configure your editor to format on save:

**VS Code** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## publint

publint validates that your package can be correctly consumed by different tools and runtimes.

### What It Checks

- Export paths resolve to existing files
- Types are correctly ordered (types before default)
- `main`, `module`, and `types` fields are consistent with `exports`
- Package can be imported in Node.js ESM and CJS modes

### Running publint

```bash
# Requires dist/ to exist
pnpm run build
pnpm run lint:package
```

### Common Errors

**Missing dist files:**

```
✖ dist/index.js does not exist
```

Fix: Run `pnpm run build` first.

**Incorrect types order:**

```
✖ types should come before default in exports
```

Fix: In package.json exports, place `"types"` before `"default"`:

```json
{
  "import": {
    "types": "./dist/index.d.ts",
    "default": "./dist/index.js"
  }
}
```

## knip

knip finds unused dependencies, exports, and files.

### Configuration

Config is in `knip.json`:

```json
{
  "ignore": ["docs/.vitepress/**", "docs/api-generated/**", "dist/**"]
}
```

### Running knip

```bash
pnpm run lint:deps
```

### Understanding Output

**Unused dependencies:**

```
Unused dependencies:
- lodash
```

Fix: Remove from `package.json` or use the dependency.

**Unused exports:**

```
Unused exports:
- src/utils.ts: helperFunction
```

Fix: Remove the export or use it internally.

**False positives:**

Some exports may be intentionally public but unused internally. Add to knip config:

```json
{
  "ignore": ["..."],
  "ignoreDependencies": ["some-dev-tool"],
  "entry": ["src/index.ts"]
}
```

## markdownlint

markdownlint enforces consistent Markdown formatting.

### Configuration

The lint script excludes:

- `node_modules/`
- `docs/api-generated/` (auto-generated)

### Running markdownlint

```bash
pnpm run lint:md
```

### Common Rules

| Rule  | Description                             | Fix                             |
| ----- | --------------------------------------- | ------------------------------- |
| MD001 | Heading levels should increment         | Don't skip h1 to h3             |
| MD012 | Multiple consecutive blank lines        | Use single blank lines          |
| MD013 | Line length                             | Wrap long lines or disable rule |
| MD022 | Headings should be surrounded by blanks | Add blank lines around headings |
| MD032 | Lists should be surrounded by blanks    | Add blank lines around lists    |

### Disabling Rules

To disable a rule inline:

```markdown
<!-- markdownlint-disable MD013 -->

This very long line is allowed because we disabled the line length rule for this specific case.

<!-- markdownlint-enable MD013 -->
```

## Pre-commit Quality Checks

lint-staged runs on staged files before each commit:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,mjs,cjs}": ["eslint --fix", "prettier --write"],
    "*.{md,json,yml,yaml}": ["prettier --write"]
  }
}
```

This ensures:

- TypeScript/JavaScript files are linted and formatted
- Markdown and config files are formatted

## CI Quality Checks

The CI workflow runs all quality checks:

1. `pnpm run lint` — ESLint
2. `pnpm run typecheck` — TypeScript
3. `pnpm run test` — Vitest
4. `pnpm run build` — tsup
5. `pnpm run lint:package` — publint
6. `pnpm run lint:deps` — knip
7. `pnpm run lint:md` — markdownlint

All checks must pass for the CI to succeed.
