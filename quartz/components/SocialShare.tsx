import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments } from "../util/path"
import { JSX } from "preact"
import style from "./styles/socialShare.scss"
// @ts-ignore
import script from "./scripts/socialShare.inline"

interface SocialShareOptions {
  /**
   * Platforms to show share buttons for
   */
  platforms: Array<"twitter" | "linkedin" | "reddit" | "facebook" | "copy">
  /**
   * Whether to show as popup or direct link
   */
  usePopup: boolean
}

const defaultOptions: SocialShareOptions = {
  platforms: ["twitter", "linkedin", "reddit"],
  usePopup: true,
}

export default ((opts?: Partial<SocialShareOptions>) => {
  const options: SocialShareOptions = { ...defaultOptions, ...opts }

  const SocialShare: QuartzComponent = ({ cfg, fileData, displayClass }: QuartzComponentProps) => {
    const baseUrl = cfg.baseUrl ?? ""
    const slug = fileData.slug!
    const title = fileData.frontmatter?.title ?? fileData.slug ?? ""
    const url = new URL(`https://${baseUrl}`)
    const fullUrl = joinSegments(url.toString(), slug)
    
    const encodedUrl = encodeURIComponent(fullUrl)
    const encodedTitle = encodeURIComponent(title)
    const twitterHandle = cfg.author?.twitter ?? ""
    const shareText = encodeURIComponent(`Check out "${title}" by ${twitterHandle}`)

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      copy: fullUrl,
    }

    const platformLabels = {
      twitter: "X",
      linkedin: "LinkedIn",
      reddit: "Reddit",
      facebook: "Facebook",
      copy: "Copy Link",
    }

    if (options.platforms.length === 0) {
      return null
    }

    return (
      <div class={`social-share ${displayClass ?? ""}`}>
        <span class="share-label">Post your take:</span>
        <div class="share-buttons">
          {options.platforms.map((platform) => (
            <button
              key={platform}
              class={`share-button share-${platform}`}
              data-url={shareUrls[platform]}
              title={platformLabels[platform]}
            >
              {platformLabels[platform]}
            </button>
          ))}
        </div>
      </div>
    )
  }

  SocialShare.css = style
  SocialShare.afterDOMLoaded = script
  return SocialShare
}) satisfies QuartzComponentConstructor