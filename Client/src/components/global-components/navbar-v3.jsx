import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Social from "../section-components/social"
import logo2 from "@/assets/img/logo-2.png"
import logo from "@/assets/img/logo.png"
import product1 from "@/assets/img/product/1.png"
import product2 from "@/assets/img/product/2.png"
import product3 from "@/assets/img/product/3.png"
import product4 from "@/assets/img/product/4.png"

export default function NavbarV3() {
  const [search, setSearch] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", function () {
      var scroll = window.pageYOffset || document.documentElement.scrollTop
      var headerSticky = document.querySelector(".ltn__header-sticky")

      if (scroll < 445) {
        headerSticky.classList.remove("sticky-active")
      } else {
        headerSticky.classList.add("sticky-active")
      }
    })
    ;(function () {
      var ltnUtilizeToggle = document.querySelectorAll(".ltn__utilize-toggle"),
        ltnUtilize = document.querySelectorAll(".ltn__utilize"),
        ltnUtilizeOverlay = document.querySelectorAll(".ltn__utilize-overlay"),
        mobileMenuToggle = document.querySelectorAll(".mobile-menu-toggle")

      ltnUtilizeToggle.forEach(function (toggle) {
        toggle.addEventListener("click", function (e) {
          e.preventDefault()
          var thisToggle = this,
            target = thisToggle.getAttribute("href")
          document.body.classList.add("ltn__utilize-open")
          document.querySelector(target).classList.add("ltn__utilize-open")
          ltnUtilizeOverlay.forEach(function (overlay) {
            overlay.style.display = "block"
          })
          if (
            thisToggle.parentElement.classList.contains("mobile-menu-toggle")
          ) {
            thisToggle.classList.add("close")
          }
        })
      })

      var utilizeClose = document.querySelectorAll(
        ".ltn__utilize-close, .ltn__utilize-overlay",
      )
      utilizeClose.forEach(function (element) {
        element.addEventListener("click", function (e) {
          e.preventDefault()
          document.body.classList.remove("ltn__utilize-open")
          ltnUtilize.forEach(function (utilize) {
            utilize.classList.remove("ltn__utilize-open")
          })
          ltnUtilizeOverlay.forEach(function (overlay) {
            overlay.style.display = "none"
          })
          mobileMenuToggle.forEach(function (toggle) {
            toggle.querySelector("a").classList.remove("close")
          })
        })
      })
    })()
  })
  return (
    <div>
      <header className="ltn__header-area ltn__header-5 ltn__header-logo-and-mobile-menu-in-mobile ltn__header-logo-and-mobile-menu ltn__header-transparent gradient-color-2">
        <div className="ltn__header-top-area section-bg-6 top-area-color-white---">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="ltn__top-bar-menu">
                  <ul>
                    <li>
                      <a href="mailto:info@webmail.com?Subject=Flower%20greetings%20to%20you">
                        <i className="icon-mail" /> info@webmail.com
                      </a>
                    </li>
                    <li>
                      <a href="locations.html">
                        <i className="icon-placeholder" /> 15/A, Nest Tower, NYC
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="top-bar-right text-end">
                  <div className="ltn__top-bar-menu">
                    <ul>
                      <li>
                        <Social />
                      </li>
                      <li>
                        {/* header-top-btn */}
                        <div className="header-top-btn">
                          <Link to="/add-listing">
                            <i className="far fa-plus" /> Add Listing
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-black">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="site-logo-wrap">
                  <div className="site-logo go-top">
                    <Link to="/">
                      <img loading="lazy" src={logo2} alt="Logo" />
                    </Link>
                  </div>
                  <div className="get-support clearfix d-none">
                    <div className="get-support-icon">
                      <i className="icon-call" />
                    </div>
                    <div className="get-support-info">
                      <h6>Get Support</h6>
                      <h4>
                        <a href="tel:+123456789">123-456-789-10</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col header-menu-column menu-color-white">
                <div className="header-menu d-none d-xl-block go-top">
                  <nav>
                    <div className="ltn__main-menu go-top">
                      <ul>
                        <li>
                          <Link to="/">Beranda</Link>
                        </li>
                        <li>
                          <Link to="/shop-grid/?kategori=Beli">Beli</Link>
                        </li>
                        <li>
                          <Link to="/shop-grid/?kategori=Sewa">Sewa</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact</Link>
                        </li>
                        <li className="menu-icon">
                          <a href="/#">Lainya</a>
                          <ul>
                            <li>
                              <Link to="/about">About</Link>
                            </li>
                            <li>
                              <Link to="/faq">Faq</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="col ltn__header-options d-none d-xl-block text-white ">
                <ul>
                  <li className="header-search-wrap p-1">
                    {/* header-search-1 */}
                    <div
                      className="header-search-1"
                      onClick={() => setSearch(!search)}
                    >
                      <div className="search-icon">
                        <i
                          className={
                            search
                              ? "fa fa-xmark fa-lg text-danger"
                              : "icon-search for-search-show"
                          }
                        />
                      </div>
                    </div>
                    <div
                      className={
                        (search ? "search-open" : "") + " header-search-1-form"
                      }
                    >
                      <form id="#" method="get" action="#">
                        <input
                          type="text"
                          name="search"
                          defaultValue
                          placeholder="Search here..."
                        />
                        <button type="submit" aria-label="search-button">
                          <span>
                            <i className="icon-search" />
                          </span>
                        </button>
                      </form>
                    </div>
                  </li>

                  <li>
                    {/* mini-cart */}
                    <div className="mini-cart-icon text-white p-1">
                      <a
                        href="#ltn__utilize-cart-menu"
                        className="ltn__utilize-toggle"
                        style={{
                          position: "relative",
                          display: "block",
                          overflow: "hidden",
                          width: "30px",
                          height: "36px",
                        }}
                      >
                        <i className="icon-shopping-cart"></i>
                        <span
                          className="text-white rounded-circle"
                          style={{
                            position: "absolute",
                            top: "0",
                            padding: "1px",
                            backgroundColor: "#ff5a3c",
                            right: "0",
                            zIndex: "2",
                            display: "block",
                            textAlign: "center",
                            width: "17px",
                            height: "17px",
                            lineHeight: "16px",
                            fontSize: "12px",
                          }}
                        >
                          20
                        </span>
                      </a>
                    </div>
                  </li>
                  <li>
                    {/* user-menu */}
                    <div className="ltn__drop-menu user-menu p-1">
                      <ul>
                        <li>
                          <Link to="#" aria-label="user">
                            <i className="icon-user" />
                          </Link>
                          <ul className="go-top">
                            <li>
                              <Link to="/login">Sign in</Link>
                            </li>
                            <li>
                              <Link to="/register">Register</Link>
                            </li>
                            <li>
                              <Link to="/my-account">My Account</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </li>
                  {/* mini-cart */}
                </ul>
              </div>
              <div className="col--- ltn__header-options ltn__header-options-2 ">
                {/* Mobile Menu Button */}
                <div className="mobile-menu-toggle d-xl-none">
                  <a
                    href="#ltn__utilize-mobile-menu"
                    className="ltn__utilize-toggle"
                  >
                    <svg viewBox="0 0 800 600">
                      <path
                        d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                        id="top"
                      />
                      <path d="M300,320 L540,320" id="middle" />
                      <path
                        d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                        id="bottom"
                        transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        id="ltn__utilize-mobile-menu"
        className="ltn__utilize ltn__utilize-mobile-menu"
      >
        <div className="ltn__utilize-menu-inner ltn__scrollbar">
          <div className="ltn__utilize-menu-head sticky-top bg-white">
            <div className="site-logo">
              <Link to="/">
                <img loading="lazy" src={logo} alt="Logo" />
              </Link>
            </div>
            <button className="ltn__utilize-close" aria-label="close-button">
              ×
            </button>
          </div>
          <div className="ltn__utilize-menu-search-form">
            <form action={"#"}>
              <input type="text" placeholder="Search..." />
              <button aria-label="search-button">
                <i className="fas fa-search" />
              </button>
            </form>
          </div>
          <div className="ltn__utilize-menu">
            <ul>
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/shop-grid/?kategori=Beli">Beli</Link>
              </li>
              <li>
                <Link to="/shop-grid/?kategori=Sewa">Sewa</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li className="menu-icon">
                <a href="/#">Lainya</a>
                <ul>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/faq">Faq</Link>
                  </li>
                </ul>
              </li>
              <li className="special-link">
                <Link to="/add-listing">
                  <i className="far fa-plus" /> Add Listing
                </Link>
              </li>
            </ul>
          </div>
          <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
            <ul>
              <li>
                <Link to="/my-account" title="My Account">
                  <span className="utilize-btn-icon">
                    <i className="far fa-user" />
                  </span>
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/wishlist" title="Wishlist">
                  <span className="utilize-btn-icon">
                    <i className="far fa-heart" />
                    <sup>3</sup>
                  </span>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" title="Shoping Cart">
                  <span className="utilize-btn-icon">
                    <i className="fas fa-shopping-cart" />
                    <sup>5</sup>
                  </span>
                  Shoping Cart
                </Link>
              </li>
            </ul>
          </div>
          <div className="ltn__social-media-2">
            <ul>
              <li>
                <a href="/#" title="Facebook">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="/#" title="Twitter">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="/#" title="Linkedin">
                  <i className="fab fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="/#" title="Instagram">
                  <i className="fab fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Utilize Cart Menu Start */}
      <div
        id="ltn__utilize-cart-menu"
        className="ltn__utilize ltn__utilize-cart-menu"
      >
        <div className="ltn__utilize-menu-inner ltn__scrollbar">
          <div className="ltn__utilize-menu-head">
            <span className="ltn__utilize-menu-title">Wishlist</span>
            <button className="ltn__utilize-close" aria-label="close-button">
              ×
            </button>
          </div>
          <div className="mini-cart-product-area ltn__scrollbar">
            <div className="mini-cart-item clearfix">
              <div className="mini-cart-img go-top">
                <Link to="/product-details">
                  <img loading="lazy" src={product1} alt="Gambar" />
                </Link>
                <span className="mini-cart-item-delete">
                  <i className="icon-cancel" />
                </span>
              </div>
              <div className="mini-cart-info go-top">
                <h6>
                  <Link to="/product-details">Wheel Bearing Retainer</Link>
                </h6>
                <span className="mini-cart-quantity">1 x $65.00</span>
              </div>
            </div>
            <div className="mini-cart-item clearfix">
              <div className="mini-cart-img go-top">
                <Link to="/product-details">
                  <img loading="lazy" src={product2} alt="Gambar" />
                </Link>
                <span className="mini-cart-item-delete">
                  <i className="icon-cancel" />
                </span>
              </div>
              <div className="mini-cart-info go-top">
                <h6>
                  <Link to="/product-details">Brake Conversion Kit</Link>
                </h6>
                <span className="mini-cart-quantity">1 x $85.00</span>
              </div>
            </div>
            <div className="mini-cart-item clearfix">
              <div className="mini-cart-img go-top">
                <Link to="/product-details">
                  <img loading="lazy" src={product3} alt="Gambar" />
                </Link>
                <span className="mini-cart-item-delete">
                  <i className="icon-cancel" />
                </span>
              </div>
              <div className="mini-cart-info go-top">
                <h6>
                  <Link to="/product-details">OE Replica Wheels</Link>
                </h6>
                <span className="mini-cart-quantity">1 x $92.00</span>
              </div>
            </div>
            <div className="mini-cart-item clearfix">
              <div className="mini-cart-img go-top">
                <Link to="/product-details">
                  <img loading="lazy" src={product4} alt="Gambar" />
                </Link>
                <span className="mini-cart-item-delete">
                  <i className="icon-cancel" />
                </span>
              </div>
              <div className="mini-cart-info go-top">
                <h6>
                  <Link to="/product-details">Shock Mount Insulator</Link>
                </h6>
                <span className="mini-cart-quantity">1 x $68.00</span>
              </div>
            </div>
          </div>
          <div className="mini-cart-footer">
            <div className="mini-cart-sub-total">
              <h5>
                Subtotal: <span>$310.00</span>
              </h5>
            </div>
            <div className="btn-wrapper go-top">
              <Link to="/cart" className="theme-btn-1 btn btn-effect-1">
                View Wishlist
              </Link>
              {/* <Link to="/cart" className="theme-btn-2 btn btn-effect-2">
                  Checkout
                </Link> */}
            </div>
            <p>Free Shipping on All Orders Over $100!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
