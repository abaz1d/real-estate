import React from "react"
import Navbar from "./global-components/navbar"
import PageHeader from "./global-components/page-header"
import ShopGridList from "./shop-components/shop-grid-list"
import CallToActionV1 from "./section-components/call-to-action-v1"
import Footer from "./global-components/footer"

const ShopGridBox = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Shop Grid" />
      <ShopGridList />
      <CallToActionV1 />
      <Footer />
    </div>
  )
}

export default ShopGridBox
