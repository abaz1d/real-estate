import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
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

class Root extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div>
          <Switch>
            <Route exact path="/" component={HomeV6} />
            <Route path="/shop-grid" component={ShopGrid} />
            <Route path="/product-details" component={ProdductDetails} />
            <Route path="/cart" component={Cart} />
            <Route path="/contact" component={Contact} />
            <Route path="/404" component={Error} />
            <Route path="/about" component={About} />
            <Route path="/faq" component={Faq} />

            <Route path="/login" component={Login} />
            <Route path="/my-account" component={MyAccount} />
            <Route path="/register" component={Register} />
            <Route path="/add-listing" component={AddListing} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById("quarter"));
