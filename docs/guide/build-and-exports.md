# Build and Exports

This template produces a dual-format package supporting both ESM and CommonJS consumers.

## Build Configuration

The build is configured in `tsup.config.ts`:

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
});
```

### Configuration Options

| Option      | Value              | Description                           |
| ----------- | ------------------ | ------------------------------------- |
| `entry`     | `["src/index.ts"]` | Entry point for bundling              |
| `format`    | `["esm", "cjs"]`   | Output both ES modules and CommonJS   |
| `dts`       | `true`             | Generate TypeScript declaration files |
| `sourcemap` | `true`             | Generate source maps for debugging    |
| `clean`     | `true`             | Clean `dist/` before each build       |
| `treeshake` | `true`             | Remove unused code from bundles       |

## Build Output

Running `pnpm run build` produces:

```text
dist/
├── index.js        # ESM bundle (ES modules)
├── index.cjs       # CommonJS bundle
├── index.d.ts      # TypeScript declarations (ESM)
├── index.d.cts     # TypeScript declarations (CJS)
├── index.js.map    # Source map (ESM)
└── index.cjs.map   # Source map (CJS)
```

### File Purposes

| File          | Format   | Used By                                      |
| ------------- | -------- | -------------------------------------------- |
| `index.js`    | ESM      | Modern bundlers, Node.js with `type: module` |
| `index.cjs`   | CommonJS | Node.js `require()`, older bundlers          |
| `index.d.ts`  | Types    | TypeScript consumers using ESM               |
| `index.d.cts` | Types    | TypeScript consumers using CJS               |

## Package Exports

The `package.json` exports field defines how consumers import your package:

```json
{
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

### Export Conditions

- **`import`** — Used when code uses `import` syntax (ESM)
- **`require`** — Used when code uses `require()` (CommonJS)
- **`types`** — Points TypeScript to declaration files

### Legacy Fields

For older tools that don't understand `exports`:

- **`main`** — CommonJS entry point
- **`module`** — ESM entry point (bundler convention)
- **`types`** — TypeScript declarations

## Consumer Usage

### ESM (Modern)

```javascript
import { myFunction } from "your-package";
```

Resolves to `dist/index.js` with types from `dist/index.d.ts`.

### CommonJS (Legacy)

```javascript
const { myFunction } = require("your-package");
```

Resolves to `dist/index.cjs` with types from `dist/index.d.cts`.

### TypeScript

```typescript
import { myFunction } from "your-package";
// Types are automatically resolved from exports
```

## Adding Multiple Entry Points

To export additional modules, update both `tsup.config.ts` and `package.json`:

### tsup.config.ts

```typescript
export default defineConfig({
  entry: {
    index: "src/index.ts",
    utils: "src/utils/index.ts",
  },
  // ... rest of config
});
```

### package.json

```json
{
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
      "require": { "types": "./dist/index.d.cts", "default": "./dist/index.cjs" }
    },
    "./utils": {
      "import": { "types": "./dist/utils.d.ts", "default": "./dist/utils.js" },
      "require": { "types": "./dist/utils.d.cts", "default": "./dist/utils.cjs" }
    }
  }
}
```

Consumers can then import:

```javascript
import { myFunction } from "your-package";
import { helper } from "your-package/utils";
```

## Files Included in Package

The `files` field in `package.json` controls what gets published to npm:

```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

This ensures only the built output and documentation are included, not source files or configuration.

## Validating Exports

Run publint to verify your exports configuration:

```bash
pnpm run build
pnpm run lint:package
```

publint checks that:

- All export paths resolve to existing files
- Types are correctly positioned
- Legacy fields are consistent with exports

## Side Effects

The `sideEffects: false` flag in `package.json` tells bundlers that all modules are pure and can be safely tree-shaken:

```json
{
  "sideEffects": false
}
```

If your package has side effects (e.g., polyfills, global modifications), either:

- Remove the flag, or
- List specific files with side effects: `"sideEffects": ["./dist/polyfill.js"]`
