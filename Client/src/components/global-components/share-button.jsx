import React from "react"
import Swall from "sweetalert2"

const ShareButton = (props) => {
  const handleShare = (e) => {
    e.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: props.id
            ? window.location.origin + `#/product-details/${props.id}`
            : window.location.href,
        })
        .then(() => {
          console.log("Page shared successfully")
        })
        .catch((error) => {
          Swall.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
            footer:
              "<span class='text-danger'>Kesalahan Membagikan URL Properti</span>",
          })
          console.error("Error sharing page:", error)
        })
    } else {
      console.warn("Web Share API is not supported in this browser")
    }
  }

  if (props.id) {
    return (
      <a
        href="/#share"
        title="Bagikan"
        className="mx-1"
        style={{ marginTop: "-3px" }}
        onClick={(e) => handleShare(e)}
      >
        <i className="fa fa-share" />
      </a>
    )
  } else {
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
}

export default ShareButton
