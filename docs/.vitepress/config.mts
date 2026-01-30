import { defineConfig } from "vitepress";

export default defineConfig({
  title: "pkg_name",
  description: "pkg_name documentation",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/" },
      { text: "API", link: "/api" }
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [{ text: "Overview", link: "/" }]
      },
      {
        text: "Reference",
        items: [
          { text: "API (Overview)", link: "/api" },
          { text: "API (Generated)", link: "/api-generated/" }
        ]
      }
    ],
  },
});
