import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import PropertiBox from "@/features/properti/PropertiBox.jsx"

import About from "@/components/about.jsx"
import Faq from "@/components/faq.jsx"
import Error from "@/components/404.jsx"

import ShopGridBox from "@/components/ShopGridBox.jsx"
import ProdductDetails from "@/components/ProductDetails.jsx"

import Contact from "@/components/contact.jsx"
import Cart from "@/components/cart.jsx"
import MyAccount from "@/components/my-account.jsx"
import Login from "@/components/login.jsx"
import Register from "@/components/register.jsx"
import AddListing from "@/components/add-listing.jsx"

function App() {
  return (
    <HashRouter basename="/">
      <div>
        <Routes>
          <Route index path="/" element={<PropertiBox />} />
          <Route path="/shop-grid" element={<ShopGridBox />} />
          <Route path="/product-details" element={<ProdductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />

          <Route path="/login" element={<Login />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-listing" element={<AddListing />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
