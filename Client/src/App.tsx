import Routes from "./router/Routes.jsx"
import React, { Suspense } from "react"
import ScrollToTop from "./components/scroll-to-top.jsx"
function App() {
  return (
    <>
      <Routes />
      <Suspense>
        <ScrollToTop />
      </Suspense>
    </>
  )
}

export default App
