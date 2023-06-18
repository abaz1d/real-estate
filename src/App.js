import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import HomeV6 from "./components/home-v6";

import About from "./components/about";
import Faq from "./components/faq";
import Error from "./components/404";

import ShopGrid from "./components/shop-grid";
import ProdductDetails from "./components/product-details";

import Contact from "./components/contact";
import Cart from "./components/cart";
import MyAccount from "./components/my-account";
import Login from "./components/login";
import Register from "./components/register";
import AddListing from "./components/add-listing";
import ScrollToTop from "./components/scroll-to-top";

function App() {
  return (
    <HashRouter basename="/">
      <div>
        <Routes>
          <Route exact path="/" element={<HomeV6 />} />
          <Route path="/shop-grid" element={<ShopGrid />} />
          <Route path="/product-details" element={<ProdductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<Error />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />

          <Route path="/login" element={<Login />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-listing" element={<AddListing />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
