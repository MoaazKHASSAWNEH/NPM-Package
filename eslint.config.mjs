// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  // 1) Ignores (remplace .eslintignore)
  {
    ignores: [
      "**/dist/**",
      "**/coverage/**",
      "**/.vitepress/cache/**",
      "**/.vitepress/dist/**",
      "**/docs/api-generated/**",
      "**/*.min.*",
    ],
  },

  // 2) Base JS recommended
  eslint.configs.recommended,

  // 3) TypeScript ESLint (flat config)
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // 4) Globals + language options (Node par défaut pour un package)
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // ✅ process, console, __dirname, etc.
      },
    },
  },

  // 5) Override spécifique scripts (au cas où tu ajoutes du tooling)
  {
    files: ["scripts/**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // 6) Override tests (Vitest globals si tu utilises describe/it/expect sans import)
  // Si tu importes toujours depuis vitest (comme tu fais), tu peux supprimer ce bloc.
  {
    files: ["test/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // 7) Prettier en dernier (désactive les règles en conflit)
  prettier,
];
