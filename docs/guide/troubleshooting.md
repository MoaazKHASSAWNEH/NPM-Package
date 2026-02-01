# Troubleshooting

Common issues and solutions when working with this template.

## Installation Issues

### pnpm Not Found

**Symptom:**

```text
pnpm: command not found
```

**Solution:**

Enable Corepack (included with Node.js 16.13+):

```bash
corepack enable
```

Or install pnpm globally:

```bash
npm install -g pnpm
```

### Wrong pnpm Version

**Symptom:**

```text
ERR_PNPM_UNSUPPORTED_ENGINE  Unsupported pnpm version
```

**Solution:**

The template uses a specific pnpm version defined in `package.json`:

```json
{
  "packageManager": "pnpm@9.0.0"
}
```

Enable Corepack to use the correct version automatically:

```bash
corepack enable
corepack prepare
```

### Node Version Error

**Symptom:**

```text
error your-package@1.0.0: The engine "node" is incompatible
```

**Solution:**

This template requires Node.js 20+. Check your version:

```bash
node --version
```

Use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to install Node.js 20:

```bash
# With nvm
nvm install 20
nvm use 20

# With fnm
fnm install 20
fnm use 20
```

### Lockfile Out of Sync

**Symptom:**

```text
ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile"
```

**Solution:**

Update the lockfile:

```bash
pnpm install
```

Then commit the updated `pnpm-lock.yaml`.

## Build Issues

### TypeScript Errors in Build

**Symptom:**

```text
✘ [ERROR] Could not resolve "..."
```

**Possible causes:**

1. **Missing dependency** — Install the package
2. **Wrong import path** — Check relative paths
3. **tsconfig issue** — Verify paths configuration

**Debug:**

```bash
# Check types first
pnpm run typecheck

# Then build
pnpm run build
```

### tsup Build Fails

**Symptom:**

```text
Build failed with X error(s)
```

**Common fixes:**

1. Check `tsup.config.ts` entry points exist
2. Ensure source files have no syntax errors
3. Verify all imports resolve

**Verbose output:**

```bash
pnpm tsup --debug
```

### No Output in dist/

**Symptom:** Build succeeds but `dist/` is empty or missing files

**Check:**

1. Verify entry points in `tsup.config.ts`:

   ```typescript
   entry: ["src/index.ts"]; // Must match your source
   ```

2. Ensure source files exist at those paths

3. Check for `clean: true` running at unexpected times

## Lint Issues

### ESLint Flat Config Error

**Symptom:**

```text
ESLint couldn't find a configuration file
```

**Solution:**

This template uses ESLint 9 flat config. Ensure you're using ESLint 9+:

```bash
pnpm eslint --version
```

The config file is `eslint.config.mjs` (not `.eslintrc`).

### Prettier Conflicts

**Symptom:** ESLint and Prettier disagree on formatting

**Solution:**

This template uses `eslint-config-prettier` to disable conflicting rules. If you still see conflicts:

1. Run Prettier first, then ESLint:

   ```bash
   pnpm format
   pnpm lint --fix
   ```

2. Or use the combined command:

   ```bash
   pnpm lint:staged
   ```

### knip False Positives

**Symptom:** knip reports used code as unused

**Common cases:**

1. **Dynamic imports** — knip can't analyze them
2. **Config files** — Some patterns aren't detected
3. **Scripts** — Files only used in npm scripts

**Solution:**

Add to `knip.json`:

```json
{
  "ignore": ["scripts/**", "docs/.vitepress/**"],
  "ignoreDependencies": ["some-dev-dependency"]
}
```

### publint Errors

**Symptom:**

```text
npm WARN publint
```

**Common issues:**

| Error                 | Fix                               |
| --------------------- | --------------------------------- |
| Missing `exports`     | Add exports field to package.json |
| Wrong `types` path    | Point to correct `.d.ts` file     |
| Missing `files` entry | Add built files to `files` array  |

**Debug:**

```bash
pnpm publint
```

This shows detailed explanations for each issue.

## Test Issues

### Tests Not Found

**Symptom:**

```text
No test files found
```

**Check:**

1. Test files match the pattern in `vitest.config.ts`:

   ```typescript
   include: ["**/*.{test,spec}.{js,ts}"];
   ```

2. Test files are not excluded:

   ```typescript
   exclude: ["node_modules", "dist"];
   ```

### Import Errors in Tests

**Symptom:**

```text
Cannot find module '../src/...'
```

**Solution:**

Use the configured path aliases or relative imports:

```typescript
// If using aliases
import { hello } from "@/index";

// Or relative paths
import { hello } from "../src/index";
```

### Coverage Not Generating

**Symptom:** Tests pass but no coverage report

**Solution:**

Run tests with coverage flag:

```bash
pnpm test --coverage
```

Or use the coverage script:

```bash
pnpm run test:coverage
```

## Git Hooks Issues

### Hooks Not Running

**Symptom:** Commit succeeds without running lint-staged

**Possible causes:**

1. **Husky not installed** — Run:

   ```bash
   pnpm exec husky install
   ```

2. **Git version too old** — Husky requires Git 2.9+

   ```bash
   git --version
   ```

3. **Hooks bypassed** — Someone used `--no-verify`

### lint-staged Failing

**Symptom:**

```text
✖ lint-staged failed
```

**Debug:**

```bash
# Run lint-staged manually with verbose output
pnpm lint-staged --verbose
```

**Common fixes:**

1. Fix the linting errors shown
2. Stage the fixes: `git add .`
3. Try the commit again

### Permission Denied on Hook

**Symptom:**

```text
.husky/pre-commit: Permission denied
```

**Solution (Unix/Mac):**

```bash
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

**Solution (Windows):**

This usually happens in WSL. Try:

```bash
git config core.filemode false
```

## Documentation Issues

### VitePress Build Fails

**Symptom:**

```text
[vitepress] Error when building
```

**Common causes:**

1. **Broken links** — Check for dead internal links
2. **Invalid frontmatter** — YAML syntax errors
3. **Missing files** — Referenced images/files don't exist

**Debug:**

```bash
pnpm docs:dev
```

Development mode shows more detailed errors.

### API Docs Not Updating

**Symptom:** Changed source code but API docs are outdated

**Solution:**

Regenerate API documentation:

```bash
pnpm run docs:api
```

TypeDoc needs to run again after source changes.

### 404 on GitHub Pages

**Symptom:** Docs deploy succeeds but pages show 404

**Causes:**

1. **Wrong base path** — Check `docs/.vitepress/config.mts`:

   ```typescript
   base: "/your-repo-name/";
   ```

2. **Pages not enabled** — Go to Settings → Pages → set Source to "GitHub Actions"

3. **First deploy** — Wait a few minutes, then hard refresh

See [GitHub Pages](./github-pages.md) for detailed setup.

## Release Issues

### Changeset Not Found

**Symptom:**

```text
No changesets found
```

**Solution:**

Create a changeset before committing:

```bash
pnpm changeset
```

### Version PR Not Created

**Symptom:** Pushed changesets but no Version PR appears

**Check:**

1. Release workflow ran (Actions tab)
2. Workflow has `pull-requests: write` permission
3. `GITHUB_TOKEN` has correct scope

### npm Publish Fails

**Symptom:**

```text
npm ERR! 403 Forbidden
```

**Causes:**

1. **No NPM_TOKEN** — Add it to repository secrets
2. **Token expired** — Generate a new one
3. **Name taken** — Package name already exists on npm
4. **No publish access** — Token needs write permission

**Check npm token:**

```bash
npm whoami --registry https://registry.npmjs.org/
```

### Wrong Version Published

**Symptom:** Published version doesn't match expected

**Check:**

1. Changeset specified correct bump (patch/minor/major)
2. No manual `package.json` version edits
3. Version PR was reviewed before merge

## IDE Issues

### TypeScript Errors Not Matching

**Symptom:** VS Code shows different errors than `pnpm typecheck`

**Solution:**

1. Restart TypeScript server:
   - `Cmd+Shift+P` → "TypeScript: Restart TS Server"

2. Check VS Code uses workspace TypeScript:
   - `Cmd+Shift+P` → "TypeScript: Select TypeScript Version"
   - Choose "Use Workspace Version"

### ESLint Not Working in VS Code

**Symptom:** No ESLint errors shown in editor

**Solution:**

1. Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. Enable flat config support (VS Code settings):

   ```json
   {
     "eslint.experimental.useFlatConfig": true
   }
   ```

3. Reload VS Code window

## Getting More Help

If your issue isn't covered here:

1. **Search existing issues** — [GitHub Issues](https://github.com/your-username/your-repo/issues)
2. **Check tool documentation** — Each tool has its own docs
3. **Create a minimal reproduction** — Helps identify the problem
4. **Open an issue** — Include error messages and steps to reproduce

### Useful Debug Commands

```bash
# Check all versions
node --version
pnpm --version
pnpm eslint --version
pnpm tsc --version

# Verbose output
pnpm install --reporter=ndjson
pnpm tsup --debug
pnpm lint-staged --verbose
pnpm vitest --reporter=verbose

# Check package.json validity
pnpm pack --dry-run
pnpm publint

# Clear caches
rm -rf node_modules
rm -rf dist
pnpm store prune
pnpm install
```
