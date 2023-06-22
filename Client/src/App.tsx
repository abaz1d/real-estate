import Routes from "./router/Routes.jsx"
import React, { Suspense, useEffect, useState } from "react"
import ScrollToTop from "./components/scroll-to-top.jsx"
function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 500))
      setLoading((loading) => !loading)
    }

    loadData()
  }, [])

  const style: object = {
    position: "fixed",
    top: "0",
    zIndex: "999999",
    width: "100%",
    height: "100%",
    left: "0",
    display: "block",
    background: "#222",
  }
  if (loading) {
    return (
      <div style={style}>
        <div className="cv-spinner">
          <span className="spinner"></span>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Routes />
        <Suspense>
          <ScrollToTop />
        </Suspense>
      </>
    )
  }
}

export default App
