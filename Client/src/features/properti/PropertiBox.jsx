import React from "react"
import Navbar from "@/components/global-components/navbar-v3.jsx"
import BannerV6 from "@/components/section-components/banner-v6.jsx"
import ProductListing from "@/components/section-components/product-listing.jsx"
import Featuresv1 from "@/components/section-components/features-v1.jsx"
import CallToActionV1 from "@/components/section-components/call-to-action-v1.jsx"
import Footer from "@/components/global-components/footer.jsx"

export default function PropertiBox(props) {
  return (
    <div>
      <Navbar CustomClass="ltn__header-transparent gradient-color-2" />
      <BannerV6 />
      <ProductListing />
      <Featuresv1 customClass="ltn__feature-area section-bg-1 pt-120 pb-90 mb-120---" />
      <CallToActionV1 />
      <Footer />
    </div>
  )
}
