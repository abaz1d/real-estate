import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import PropertiBox from "@/features/properti/PropertiBox.jsx"

import AboutBox from "@/components/AboutBox.jsx"
import FaqBox from "@/components/FaqBox.jsx"
import Error from "@/components/404.jsx"

import ShopGridBox from "@/components/ShopGridBox.jsx"
import ProdductDetails from "@/components/ProductDetails.jsx"

import ContactBox from "@/components/ContactBox.jsx"
import CartBox from "@/components/CartBox.jsx"
import MyAccountBox from "@/features/user/MyaccountBox.jsx"
import LoginBox from "@/features/auth/LoginBox.jsx"
import RegisterBox from "@/features/user/RegisterBox.jsx"
import AddListing from "@/components/AddListing.jsx"

function App() {
  return (
    <HashRouter basename="/">
      <div>
        <Routes>
          <Route index path="/" element={<PropertiBox />} />
          <Route path="/shop-grid" element={<ShopGridBox />} />
          <Route path="/product-details/:id" element={<ProdductDetails />} />
          <Route path="/cart" element={<CartBox />} />
          <Route path="/contact" element={<ContactBox />} />
          <Route path="*" element={<Error />} />
          <Route path="/about" element={<AboutBox />} />
          <Route path="/faq" element={<FaqBox />} />

          <Route path="/login" element={<LoginBox />} />
          <Route path="/my-account" element={<MyAccountBox />} />
          <Route path="/register" element={<RegisterBox />} />
          <Route path="/add-listing" element={<AddListing />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
