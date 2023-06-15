import React from "react";
import Navbar from "./global-components/navbar-v3";
import BannerV6 from "./section-components/banner-v6";
import ProductListing from "./section-components/product-listing";
import Featuresv1 from "./section-components/features-v1";
import CallToActionV1 from "./section-components/call-to-action-v1";
import Footer from "./global-components/footer";

const Home_V5 = () => {
  return (
    <div>
      <Navbar CustomClass="ltn__header-transparent gradient-color-2" />
      <BannerV6 />
      <ProductListing />
      <Featuresv1 customClass="ltn__feature-area section-bg-1 pt-120 pb-90 mb-120---" />
      <CallToActionV1 />
      <Footer />
    </div>
  );
};

export default Home_V5;
