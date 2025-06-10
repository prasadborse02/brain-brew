import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Brain Dump",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "brainbrew.theprasad.tech",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Space Grotesk",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#0f0f23",
          lightgray: "#1a1a2e",
          gray: "#7209b7",
          darkgray: "#c4b5fd",
          dark: "#e5e7eb",
          secondary: "#00ff9f",
          tertiary: "#ff6b6b",
          highlight: "rgba(0, 255, 159, 0.1)",
          textHighlight: "#4c1d95",
        },
        // darkMode: {
        //   light: "#2b2b2b",
        //   lightgray: "#393639",
        //   gray: "#646464",
        //   darkgray: "#d4d4d4",
        //   dark: "#F2E5BC",
        //   secondary: "#928374",
        //   tertiary: "#a89984",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        //   textHighlight: "#7b6e1b",
        // },
        darkMode: {
          light: "#0a0a0f",
          lightgray: "#16161f",
          gray: "#8b5cf6",
          darkgray: "#d8b4fe",
          dark: "#f3f4f6",
          secondary: "#10f596",
          tertiary: "#ef4444",
          highlight: "rgba(16, 245, 150, 0.1)",
          textHighlight: "#581c87",
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
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
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
