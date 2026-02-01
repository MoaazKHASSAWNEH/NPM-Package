# Package Structure

This guide covers recommended patterns for organizing your package source code.

## Default Structure

The template starts with a minimal structure:

```text
src/
├── index.ts          # Main entry point, re-exports public API
```

This is perfect for small utilities. As your package grows, consider the patterns below.

## Utility Library

For packages that export multiple utility functions:

```text
src/
├── index.ts          # Re-exports everything
├── string/
│   ├── index.ts      # Re-exports string utilities
│   ├── capitalize.ts
│   ├── slugify.ts
│   └── truncate.ts
├── array/
│   ├── index.ts      # Re-exports array utilities
│   ├── chunk.ts
│   ├── unique.ts
│   └── shuffle.ts
└── types.ts          # Shared type definitions
```

### Entry Point Pattern

```typescript
// src/index.ts
export * from "./string";
export * from "./array";
export type * from "./types";
```

```typescript
// src/string/index.ts
export { capitalize } from "./capitalize";
export { slugify } from "./slugify";
export { truncate } from "./truncate";
```

### Benefits

- **Tree-shaking friendly** — Bundlers can eliminate unused code
- **Organized imports** — `import { capitalize } from 'your-pkg'`
- **Scalable** — Easy to add new utility groups

## Subpath Exports

For larger packages, expose subpaths so users can import selectively:

```json
// package.json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./string": {
      "import": "./dist/string/index.js",
      "require": "./dist/string/index.cjs",
      "types": "./dist/string/index.d.ts"
    },
    "./array": {
      "import": "./dist/array/index.js",
      "require": "./dist/array/index.cjs",
      "types": "./dist/array/index.d.ts"
    }
  }
}
```

Users can then:

```typescript
// Import everything
import { capitalize, chunk } from "your-pkg";

// Or import specific subpath (smaller bundle)
import { capitalize } from "your-pkg/string";
```

### tsup Configuration for Subpaths

```typescript
// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "string/index": "src/string/index.ts",
    "array/index": "src/array/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
});
```

## React Component Library

For packages that export React components:

```text
src/
├── index.ts              # Re-exports all components
├── components/
│   ├── Button/
│   │   ├── index.ts      # Re-exports Button
│   │   ├── Button.tsx    # Component implementation
│   │   ├── Button.test.tsx
│   │   └── types.ts      # Props interface
│   ├── Input/
│   │   ├── index.ts
│   │   ├── Input.tsx
│   │   └── types.ts
│   └── index.ts          # Re-exports all components
├── hooks/
│   ├── index.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
└── types/
    └── index.ts          # Shared types
```

### Component Pattern

```typescript
// src/components/Button/Button.tsx
import type { ButtonProps } from './types'

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  )
}
```

```typescript
// src/components/Button/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./types";
```

### External Dependencies

For React libraries, mark React as an external:

```typescript
// tsup.config.ts
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  external: ["react", "react-dom"],
});
```

And in `package.json`:

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

## CLI Tool

For command-line applications:

```text
src/
├── index.ts          # Library exports (if any)
├── cli.ts            # CLI entry point
├── commands/
│   ├── init.ts
│   ├── build.ts
│   └── serve.ts
├── lib/
│   ├── config.ts     # Configuration loading
│   ├── logger.ts     # Logging utilities
│   └── utils.ts
└── types.ts
```

### CLI Entry Point

```typescript
// src/cli.ts
#!/usr/bin/env node
import { Command } from 'commander'
import { initCommand } from './commands/init'
import { buildCommand } from './commands/build'

const program = new Command()

program
  .name('your-cli')
  .description('Your CLI tool')
  .version('1.0.0')

program.addCommand(initCommand)
program.addCommand(buildCommand)

program.parse()
```

### Package Configuration

```json
// package.json
{
  "bin": {
    "your-cli": "./dist/cli.js"
  },
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

### tsup for CLI

```typescript
// tsup.config.ts
export default defineConfig({
  entry: {
    index: "src/index.ts",
    cli: "src/cli.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
});
```

## Plugin Architecture

For extensible packages with plugin support:

```text
src/
├── index.ts              # Main exports
├── core/
│   ├── index.ts
│   ├── engine.ts         # Core functionality
│   └── types.ts          # Plugin interface
├── plugins/
│   ├── index.ts          # Built-in plugins
│   ├── json.ts
│   └── yaml.ts
└── utils/
    └── index.ts
```

### Plugin Interface

```typescript
// src/core/types.ts
export interface Plugin {
  name: string;
  setup(context: PluginContext): void | Promise<void>;
}

export interface PluginContext {
  registerLoader(ext: string, loader: Loader): void;
  config: Config;
}
```

### Using Plugins

```typescript
// src/core/engine.ts
import type { Plugin, PluginContext } from "./types";

export class Engine {
  private plugins: Plugin[] = [];

  use(plugin: Plugin): this {
    this.plugins.push(plugin);
    return this;
  }

  async init(): Promise<void> {
    const context: PluginContext = {
      /* ... */
    };
    for (const plugin of this.plugins) {
      await plugin.setup(context);
    }
  }
}
```

## Monorepo Considerations

If your package grows into a monorepo:

```text
packages/
├── core/             # Main package
│   ├── src/
│   └── package.json
├── cli/              # CLI wrapper
│   ├── src/
│   └── package.json
└── plugin-*/         # Plugins
    ├── src/
    └── package.json
```

This template is designed for single packages, but the patterns transfer to monorepos using pnpm workspaces.

## Best Practices

### 1. Single Responsibility

Each file should do one thing:

```typescript
// ✅ Good: Focused modules
// src/validators/email.ts
export function isValidEmail(email: string): boolean {
  /* ... */
}

// ❌ Bad: Kitchen sink module
// src/utils.ts
export function isValidEmail() {
  /* ... */
}
export function formatDate() {
  /* ... */
}
export function parseJSON() {
  /* ... */
}
export function chunk() {
  /* ... */
}
```

### 2. Explicit Exports

Re-export explicitly for better tree-shaking:

```typescript
// ✅ Good: Explicit exports
export { foo } from "./foo";
export { bar } from "./bar";

// ❌ Avoid: Barrel exports with side effects
export * from "./foo";
export * from "./bar";
```

### 3. Type-Only Exports

Separate type exports for smaller runtime bundles:

```typescript
// ✅ Good: Type-only export
export type { Config, Options } from "./types";

// Runtime exports
export { createConfig } from "./config";
```

### 4. Colocate Tests

Keep tests next to implementation:

```text
src/
├── utils/
│   ├── format.ts
│   └── format.test.ts    # Colocated test
```

Or use a parallel `test/` directory (as this template does):

```text
src/
├── utils/
│   └── format.ts
test/
├── utils/
│   └── format.test.ts    # Parallel structure
```

### 5. Index Files

Use `index.ts` for clean imports but avoid deep barrel files:

```typescript
// ✅ Good: One level of re-export
// src/index.ts
export { Button } from "./components/Button";

// ❌ Avoid: Chains of re-exports
// src/index.ts → src/components/index.ts → src/components/Button/index.ts
```

## Migration Path

As your package grows:

1. **Start simple** — Single `src/index.ts`
2. **Extract modules** — Move related code to folders
3. **Add subpaths** — Expose granular imports
4. **Consider monorepo** — Split into packages if needed

Don't over-engineer upfront. Let the structure evolve with your needs.
