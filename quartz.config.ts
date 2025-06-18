import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Brain Brew",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "brainbrew.theprasad.tech",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "published",
    author: {
      name: "Prasad Borse",
      twitter: "@luminary_lummox",
    },
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: {
          name: "Fraunces",
          weights: [400, 500, 600, 700, 900],
        },
        body: {
          name: "Inter", 
          weights: [300, 400, 500, 600, 700],
        },
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#f9fafb",
          lightgray: "#e2e8f0",
          gray: "#64748b",
          darkgray: "#374151",
          dark: "#111827",
          secondary: "#2563eb",
          tertiary: "#10b981",
          highlight: "rgba(37, 99, 235, 0.1)",
          textHighlight: "#fbbf24",
        },
        darkMode: {
          light: "#1f2937",
          lightgray: "#374151",
          gray: "#9ca3af",
          darkgray: "#d1d5db",
          dark: "#f9fafb",
          secondary: "#3b82f6",
          tertiary: "#10b981",
          highlight: "rgba(59, 130, 246, 0.15)",
          textHighlight: "#fbbf24",
        }
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.Poetry(),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ 
        markdownLinkResolution: "shortest",
        lazyLoad: true 
      }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
