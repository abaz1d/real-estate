import React from "react"

const ShareButton = () => {
  const handleShare = (e) => {
    e.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .then(() => {
          console.log("Page shared successfully")
        })
        .catch((error) => {
          console.error("Error sharing page:", error)
        })
    } else {
      console.warn("Web Share API is not supported in this browser")
    }
  }

  return (
    <a
      href="/#share"
      title="Bagikan"
      className="mx-1"
      onClick={(e) => handleShare(e)}
    >
      <i className="fa fa-share me-1 mt-1" /> Bagikan
    </a>
  )
}

export default ShareButton
