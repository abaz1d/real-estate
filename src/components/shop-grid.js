import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import ShopGrid from "./shop-components/shop-grid-v1";
import CallToActionV1 from "./section-components/call-to-action-v1";
import Footer from "./global-components/footer";
import * as properti from "./product.json";

const ShopGrid_V1 = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Shop Grid" />
      <ShopGrid properti={properti} />
      <CallToActionV1 />
      <Footer />
    </div>
  );
};

export default ShopGrid_V1;
