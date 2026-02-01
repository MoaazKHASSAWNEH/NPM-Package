# Scripts Reference

All scripts are defined in `package.json` and run via `pnpm run <script>`.

## Build Scripts

### `build`

```bash
pnpm run build
```

Builds the package for production. Runs tsup to generate ESM and CJS bundles, then copies TypeScript declarations for CJS consumers.

**Output:** `dist/` directory with `.js`, `.cjs`, `.d.ts`, `.d.cts`, and source maps.

### `dev`

```bash
pnpm run dev
```

Starts tsup in watch mode. Rebuilds automatically when source files change.

**Use for:** Active development when you need to test changes immediately.

### `types:cjs`

```bash
pnpm run types:cjs
```

Copies `dist/index.d.ts` to `dist/index.d.cts` for CommonJS type resolution. Called automatically by `build`.

## Type Checking

### `typecheck`

```bash
pnpm run typecheck
```

Runs TypeScript compiler in check-only mode using `tsconfig.build.json`. Does not emit files.

**Use for:** Verifying type correctness without building.

## Testing

### `test`

```bash
pnpm run test
```

Runs Vitest test suite once and exits. Used in CI pipelines.

### `test:watch`

```bash
pnpm run test:watch
```

Runs Vitest in watch mode. Tests re-run when files change.

**Use for:** Development with immediate test feedback.

### `test:coverage`

```bash
pnpm run test:coverage
```

Runs tests with V8 coverage reporting. Generates coverage report in `coverage/` directory.

## Code Quality

### `lint`

```bash
pnpm run lint
```

Runs ESLint across the entire project using the flat config in `eslint.config.mjs`.

### `lint:package`

```bash
pnpm run lint:package
```

Runs publint to validate `package.json` exports. Ensures consumers can correctly import your package.

**Important:** Requires `dist/` to exist. Run `build` first.

### `lint:deps`

```bash
pnpm run lint:deps
```

Runs knip to detect unused dependencies and exports. Helps keep the package lean.

### `lint:md`

```bash
pnpm run lint:md
```

Runs markdownlint-cli2 on all Markdown files except `node_modules/` and `docs/api-generated/`.

### `format`

```bash
pnpm run format
```

Checks all files against Prettier formatting rules without modifying them.

### `format:write`

```bash
pnpm run format:write
```

Applies Prettier formatting to all files.

## Documentation

### `docs:dev`

```bash
pnpm run docs:dev
```

Starts VitePress development server with hot reload at `http://localhost:5173/`.

### `docs:build`

```bash
pnpm run docs:build
```

Builds the documentation site for production. First runs `api:docs` to generate API documentation, then builds VitePress.

**Output:** `docs/.vitepress/dist/`

### `docs:preview`

```bash
pnpm run docs:preview
```

Serves the built documentation locally for preview before deployment.

### `api:docs`

```bash
pnpm run api:docs
```

Runs TypeDoc to generate API documentation from source code. Output goes to `docs/api-generated/`.

## Release

### `changeset`

```bash
pnpm run changeset
```

Opens the Changesets CLI to create a new changeset. Prompts for version bump type and changelog entry.

### `version-packages`

```bash
pnpm run version-packages
```

Applies pending changesets: bumps version in `package.json` and updates `CHANGELOG.md`.

### `release`

```bash
pnpm run release
```

Publishes the package to npm using Changesets. Requires npm authentication.

### `prepublishOnly`

Runs automatically before `npm publish`:

1. `lint` — ESLint check
2. `lint:package` — publint validation
3. `typecheck` — TypeScript check
4. `test` — Run test suite
5. `build` — Generate dist files

This prevents publishing broken packages.

## Utilities

### `init:template`

```bash
pnpm run init:template
```

Interactive script to initialize the template with your package details. Updates placeholder values across all relevant files.

### `prepare`

```bash
pnpm run prepare
```

Installs Husky git hooks. Runs automatically after `pnpm install`.

## Script Execution Order

Common workflows and their script sequences:

### Full Quality Check

```bash
pnpm run lint && pnpm run typecheck && pnpm test && pnpm run build && pnpm run lint:package
```

### Documentation Workflow

```bash
pnpm run api:docs    # Generate API docs
pnpm run docs:build  # Build full site
pnpm run docs:preview  # Preview locally
```

### Release Workflow

```bash
pnpm run changeset       # Create changeset
# ... commit and push ...
pnpm run version-packages  # (Usually handled by CI)
pnpm run release          # (Usually handled by CI)
```
