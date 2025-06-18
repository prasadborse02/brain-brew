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
  
  const popup = window.open(
    url,
    "share-popup",
    "width=600,height=400,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no"
  )
  
  if (popup) {
    popup.focus()
  }
}