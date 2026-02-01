# API Documentation

This template uses TypeDoc to generate API documentation from your TypeScript source code.

## Overview

[TypeDoc](https://typedoc.org/) reads TypeScript source files and generates documentation from:

- Exported types, functions, classes, and interfaces
- TSDoc comments in your code
- Type information from TypeScript

The `typedoc-plugin-markdown` outputs Markdown files that integrate seamlessly with VitePress.

## Configuration

TypeDoc is configured in `typedoc.json`:

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs/api-generated",
  "name": "pkg_name API",
  "plugin": ["typedoc-plugin-markdown"],
  "readme": "none",
  "hideBreadcrumbs": true,
  "excludePrivate": true,
  "excludeProtected": true,
  "excludeInternal": true,
  "entryFileName": "index.md",
  "sort": ["source-order"]
}
```

### Key Options

| Option            | Value                     | Description                     |
| ----------------- | ------------------------- | ------------------------------- |
| `entryPoints`     | `["src/index.ts"]`        | Entry file(s) to document       |
| `out`             | `docs/api-generated`      | Output directory                |
| `plugin`          | `typedoc-plugin-markdown` | Output Markdown instead of HTML |
| `excludePrivate`  | `true`                    | Skip private members            |
| `excludeInternal` | `true`                    | Skip `@internal` marked items   |
| `entryFileName`   | `index.md`                | Name of the main generated file |
| `sort`            | `["source-order"]`        | Keep source code order          |

## Generating API Docs

Run TypeDoc manually:

```bash
pnpm run api:docs
```

Output goes to `docs/api-generated/`.

::: tip
`pnpm run docs:build` automatically runs `api:docs` first, so you don't need to run it separately for production builds.
:::

## Writing Documentation

### TSDoc Comments

Document your exports using TSDoc syntax:

````typescript
/**
 * Greets a user by name.
 *
 * @param name - The name of the person to greet
 * @returns A greeting message
 *
 * @example
 * ```typescript
 * hello("World"); // Returns "Hello, World!"
 * ```
 */
export function hello(name: string): string {
  return `Hello, ${name}!`;
}
````

### Supported Tags

| Tag           | Purpose                    |
| ------------- | -------------------------- |
| `@param`      | Document a parameter       |
| `@returns`    | Document the return value  |
| `@example`    | Provide usage examples     |
| `@throws`     | Document exceptions        |
| `@deprecated` | Mark as deprecated         |
| `@see`        | Reference related items    |
| `@internal`   | Exclude from documentation |
| `@remarks`    | Additional details         |

### Example: Documenting a Type

```typescript
/**
 * Configuration options for the library.
 */
export interface Config {
  /**
   * Enable debug mode.
   * @default false
   */
  debug?: boolean;

  /**
   * Timeout in milliseconds.
   * @default 5000
   */
  timeout?: number;
}
```

### Example: Documenting a Class

````typescript
/**
 * A simple counter implementation.
 *
 * @example
 * ```typescript
 * const counter = new Counter(10);
 * counter.increment();
 * console.log(counter.value); // 11
 * ```
 */
export class Counter {
  private _value: number;

  /**
   * Creates a new counter.
   * @param initial - The initial value (default: 0)
   */
  constructor(initial = 0) {
    this._value = initial;
  }

  /**
   * The current counter value.
   */
  get value(): number {
    return this._value;
  }

  /**
   * Increments the counter by one.
   */
  increment(): void {
    this._value++;
  }
}
````

## Integration with VitePress

### Linking to API Docs

The generated docs are accessible at:

- `/api` — Manual overview page (`docs/api.md`)
- `/api-generated/` — Auto-generated reference

The sidebar links to both:

```typescript
sidebar: [
  {
    text: "Reference",
    items: [
      { text: "API (Overview)", link: "/api" },
      { text: "API (Generated)", link: "/api-generated/" },
    ],
  },
];
```

### Manual API Page

`docs/api.md` provides a human-written overview:

```markdown
# API Reference

This API reference is generated from TypeScript using TypeDoc.

- 👉 Browse the generated API pages: **[Open API Index](./api-generated/)**

> Tip: Run `pnpm run api:docs` to regenerate after changing public types.
```

## Workflow

1. **Write code** with TSDoc comments in `src/`
2. **Generate docs**: `pnpm run api:docs`
3. **Preview**: `pnpm run docs:dev`
4. **Commit** the generated files (they're tracked in Git)

## Excluding from API Docs

### Private Members

Private class members are automatically excluded.

### Internal Code

Mark items as internal to exclude them:

```typescript
/**
 * @internal
 * This is an internal helper, not part of the public API.
 */
export function _internalHelper(): void {
  // ...
}
```

### Non-exported Code

Only exported items are documented. Keep internal code unexported:

```typescript
// Not documented (not exported)
function privateHelper(): void {}

// Documented
export function publicFunction(): void {}
```

## Troubleshooting

### Missing index.md

**Symptom:** Link to `/api-generated/` returns 404.

**Cause:** `entryFileName` not set correctly.

**Fix:** Ensure `typedoc.json` includes:

```json
{
  "entryFileName": "index.md"
}
```

Then regenerate: `pnpm run api:docs`

### Empty Documentation

**Symptom:** Generated files contain no content.

**Cause:** Nothing is exported from entry points.

**Fix:** Ensure `src/index.ts` exports public API items.

### Broken Links

**Symptom:** Links between API pages don't work.

**Cause:** VitePress routing differences.

**Fix:** This is usually handled by `typedoc-plugin-markdown`. If issues persist, check that the output directory matches the VitePress structure.

### Type Information Missing

**Symptom:** Types show as `any` or are incomplete.

**Cause:** TypeScript can't infer types.

**Fix:** Add explicit type annotations to exports.
