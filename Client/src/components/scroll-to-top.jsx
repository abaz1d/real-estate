import React, { useEffect, useState } from "react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const scrolltoTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    return false
  }

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <>
      {isVisible && (
        <a
          id="scrollUp"
          href="#"
          onClick={scrolltoTop}
          style={{
            position: "fixed",
            zIndex: "2147483647",
          }}
        >
          <i className="fa fa-angles-up fa-lg" />
        </a>
      )}
    </>
  )
}
