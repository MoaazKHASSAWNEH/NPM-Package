import { defineConfig } from "vitepress";

export default defineConfig({
  title: "NPM Package Template",
  description: "Modern TypeScript Package Starter",
  base: "/NPM-Package/",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/api" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Scripts Reference", link: "/guide/scripts" },
          ],
        },
        {
          text: "Build & Quality",
          items: [
            { text: "Build & Exports", link: "/guide/build-and-exports" },
            { text: "Code Quality", link: "/guide/quality" },
            { text: "Git Hooks", link: "/guide/git-hooks" },
          ],
        },
        {
          text: "Documentation",
          items: [
            { text: "Docs Site (VitePress)", link: "/guide/docs-site" },
            { text: "API Docs (TypeDoc)", link: "/guide/api-docs" },
            { text: "GitHub Pages", link: "/guide/github-pages" },
          ],
        },
        {
          text: "CI/CD & Releases",
          items: [
            { text: "CI/CD Workflows", link: "/guide/ci-cd" },
            { text: "Releases", link: "/guide/releases" },
          ],
        },
        {
          text: "Advanced",
          items: [
            { text: "Package Structure", link: "/guide/package-structure" },
            { text: "Troubleshooting", link: "/guide/troubleshooting" },
          ],
        },
      ],
      "/api": [
        {
          text: "API Reference",
          items: [
            { text: "Overview", link: "/api" },
            { text: "Generated Docs", link: "/api-generated/" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/MoaazKHASSAWNEH/NPM-Package" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present",
    },
    search: {
      provider: "local",
    },
  },
});
