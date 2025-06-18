document.addEventListener("nav", () => {
  const shareButtons = document.querySelectorAll(".share-button")
  
  shareButtons.forEach((button) => {
    button.removeEventListener("click", handleShareClick)
    button.addEventListener("click", handleShareClick)
  })
})

function handleShareClick(this: HTMLElement, e: MouseEvent) {
  e.preventDefault()
  
  const url = this.getAttribute("data-url")
  if (!url) return
  
  // Handle copy link functionality
  if (this.classList.contains("share-copy")) {
    navigator.clipboard.writeText(url).then(() => {
      const originalText = this.textContent
      this.textContent = "Copied!"
      setTimeout(() => {
        this.textContent = originalText
      }, 2000)
    }).catch(() => {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement("textarea")
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      
      const originalText = this.textContent
      this.textContent = "Copied!"
      setTimeout(() => {
        this.textContent = originalText
      }, 2000)
    })
    return
  }
  
  // Handle other social sharing platforms
  const popup = window.open(
    url,
    "share-popup",
    "width=600,height=400,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no"
  )
  
  if (popup) {
    popup.focus()
  }
}