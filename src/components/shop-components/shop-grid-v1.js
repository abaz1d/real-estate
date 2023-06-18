import React from "react";
import { Link } from "react-router-dom";
import { currencyString } from "../../utils/helper";

export default function ShopGridV1(props) {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const properti = props.properti.default;

  return (
    <div>
      <div className="ltn__product-area ltn__product-gutter mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__shop-options">
                <ul>
                  <li>
                    <div className="ltn__grid-list-tab-menu ">
                      <div className="nav">
                        <a
                          className="active show"
                          data-bs-toggle="tab"
                          href="#liton_product_grid"
                        >
                          <i className="fas fa-th-large" />
                        </a>
                        <a data-bs-toggle="tab" href="#liton_product_list">
                          <i className="fas fa-list" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="short-by text-center">
                      <select className="nice-select">
                        <option>Default sorting</option>
                        <option>Sort by popularity</option>
                        <option>Sort by new arrivals</option>
                        <option>Sort by price: low to high</option>
                        <option>Sort by price: high to low</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <div className="showing-product-number text-right">
                      <span>Showing 9 of 20 results</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="tab-content ">
                <div
                  className="tab-pane fade active show"
                  id="liton_product_grid"
                >
                  <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* Search Widget */}
                        <div className="ltn__search-widget mb-30">
                          <form action="#">
                            <input
                              type="text"
                              name="search"
                              placeholder="Search your keyword..."
                            />
                            <button type="submit">
                              <i className="fas fa-search" />
                            </button>
                          </form>
                        </div>
                      </div>
                      {/* 6 ltn__product-item */}
                      {properti.map((item, index) => (
                        <div key={index} className="col-lg-4 col-sm-6 col-12">
                          <div className="ltn__product-item ltn__product-item-4 text-center---">
                            <div className="product-img go-top">
                              <Link to="/product-details">
                                <img src={item.gambar} alt={"gambar" + index} />
                              </Link>
                              <div className="product-badge">
                                <ul>
                                  <li
                                    className={
                                      item.kategori === "Jual"
                                        ? "bg-green "
                                        : "bg-orange " | "sale-badge"
                                    }
                                  >
                                    {item.kategori}
                                  </li>
                                </ul>
                              </div>
                              <div className="product-img-location-gallery">
                                <div className="product-img-location go-top">
                                  <ul>
                                    <li>
                                      <Link to="/contact">
                                        <i className="flaticon-pin" />{" "}
                                        {item.kota}, {item.provinsi}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="go-top">
                                  <ul>
                                    <li className="ltn__blog-category">
                                      <Link className="bg-primary" to="#">
                                        {item.jenis_properti}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="product-info">
                              <div className="product-price">
                                <span>
                                  Rp. {currencyString(item.total_harga)}{" "}
                                  <label>
                                    {item.kategori === "Sewa" ? "/ Bulan" : ""}
                                  </label>
                                </span>
                              </div>
                              <h2 className="product-title go-top">
                                <Link to="/product-details">{item.judul}</Link>
                              </h2>
                              <ul className="ltn__list-item-2 ltn__list-item-2-before">
                                <li>
                                  <span>
                                    {item.kamar_tidur}{" "}
                                    <i className="fa fa-bed mx-auto" />
                                  </span>
                                  Kamar Tidur
                                </li>
                                <li>
                                  <span>
                                    {item.kamar_tidur}{" "}
                                    <i className="fa fa-bath mx-auto" />
                                  </span>
                                  Kamar Mandi
                                </li>
                                <li>
                                  <span>
                                    {item.luas_properti}{" "}
                                    <i className="flaticon-square-shape-design-interface-tool-symbol" />
                                  </span>
                                  Luas (m²)
                                </li>
                              </ul>
                            </div>
                            <div className="product-info-bottom">
                              {/* <div className="real-estate-agent go-top">
                    <div className="agent-img">
                      <Link to="/team-details">
                        <img
                          src={publicUrl + "assets/img/blog/author.jpg"}
                          alt="#"
                        />
                      </Link>
                    </div>
                    <div className="agent-brief">
                      <h6>
                        <Link to="/team-details">William Seklo</Link>
                      </h6>
                      <small>Estate Agents</small>
                    </div>
                  </div> */}
                              <span>
                                <i className="fa fa-clock me-2" />
                                <label> 10 Jam yang lalu</label>
                              </span>
                              <div className="product-hover-action">
                                <ul>
                                  <li>
                                    <a
                                      href="/#"
                                      title="Wishlist"
                                      data-bs-toggle="modal"
                                      data-bs-target="#liton_wishlist_modal"
                                    >
                                      <i className="flaticon-heart-1" />
                                    </a>
                                  </li>
                                  <li
                                    className="go-top"
                                    style={{
                                      rotate: "180deg",
                                      paddingTop: "-10px",
                                    }}
                                  >
                                    <Link to="/product-details" title="Bagikan">
                                      <i className="fa fa-share fa-rotate-180 fa-lg" />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/*  */}
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="liton_product_list">
                  <div className="ltn__product-tab-content-inner ltn__product-list-view">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* Search Widget */}
                        <div className="ltn__search-widget mb-30">
                          <form action="#">
                            <input
                              type="text"
                              name="search"
                              placeholder="Search your keyword..."
                            />
                            <button type="submit">
                              <i className="fas fa-search" />
                            </button>
                          </form>
                        </div>
                      </div>
                      {/* ltn__product-item */}
                      {properti.map((item, index) => (
                        <div key={index} className="col-lg-12">
                          <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5">
                            <div className="product-img">
                              <Link to="/product-details">
                                <img src={item.gambar} alt={"gambar" + index} />
                              </Link>
                            </div>
                            <div className="product-info">
                              <div className="product-badge-price">
                                <div className="product-badge">
                                  <ul>
                                    <li
                                      className={
                                        item.kategori === "Jual"
                                          ? "bg-green "
                                          : "bg-orange " | "sale-badge"
                                      }
                                      style={{ padding: "3px 5px 1px 5px" }}
                                    >
                                      {item.kategori}
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-price">
                                  <span>
                                    Rp. {currencyString(item.total_harga)}{" "}
                                    <label>
                                      {item.kategori === "Sewa"
                                        ? "/ Bulan"
                                        : ""}
                                    </label>
                                  </span>
                                </div>
                              </div>
                              <h2 className="product-title go-top">
                                <Link to="/product-details">{item.judul}</Link>
                              </h2>
                              <div className="product-img-location">
                                <ul>
                                  <li className="go-top">
                                    <Link to="/contact">
                                      <i className="flaticon-pin" /> {item.kota}
                                      , {item.provinsi}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <ul className="ltn__list-item-2 ltn__list-item-2-before">
                                <li>
                                  <span>
                                    {item.kamar_tidur}{" "}
                                    <i className="fa fa-bed mx-auto" />
                                  </span>
                                  Kamar Tidur
                                </li>
                                <li>
                                  <span>
                                    {item.kamar_tidur}{" "}
                                    <i className="fa fa-bath mx-auto" />
                                  </span>
                                  Kamar Mandi
                                </li>
                                <li>
                                  <span>
                                    {item.luas_properti}{" "}
                                    <i className="flaticon-square-shape-design-interface-tool-symbol" />
                                  </span>
                                  Luas (m²)
                                </li>
                              </ul>
                            </div>
                            <div className="product-info-bottom">
                              {/* <div className="real-estate-agent go-top">
                    <div className="agent-img">
                      <Link to="/team-details">
                        <img
                          src={publicUrl + "assets/img/blog/author.jpg"}
                          alt="#"
                        />
                      </Link>
                    </div>
                    <div className="agent-brief">
                      <h6>
                        <Link to="/team-details">William Seklo</Link>
                      </h6>
                      <small>Estate Agents</small>
                    </div>
                  </div> */}
                              <span>
                                <i className="fa fa-clock me-2" />
                                <label> 10 Jam yang lalu</label>
                              </span>
                              <div className="product-hover-action">
                                <ul>
                                  <li>
                                    <a
                                      href="/#"
                                      title="Wishlist"
                                      data-bs-toggle="modal"
                                      data-bs-target="#liton_wishlist_modal"
                                    >
                                      <i className="flaticon-heart-1" />
                                    </a>
                                  </li>
                                  <li
                                    className="go-top"
                                    style={{
                                      rotate: "180deg",
                                      paddingTop: "-10px",
                                    }}
                                  >
                                    <Link to="/product-details" title="Bagikan">
                                      <i className="fa fa-share fa-rotate-180 fa-lg" />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* ltn__product-item */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ltn__pagination-area text-center">
                <div className="ltn__pagination">
                  <ul>
                    <li>
                      <a href="/#">
                        <i className="fas fa-angle-double-left" />
                      </a>
                    </li>
                    <li>
                      <a href="/#">1</a>
                    </li>
                    <li className="active">
                      <a href="/#">2</a>
                    </li>
                    <li>
                      <a href="/#">3</a>
                    </li>
                    <li>
                      <a href="/#">...</a>
                    </li>
                    <li>
                      <a href="/#">10</a>
                    </li>
                    <li>
                      <a href="/#">
                        <i className="fas fa-angle-double-right" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ltn__modal-area ltn__add-to-cart-modal-area">
        <div className="modal fade" id="liton_wishlist_modal" tabIndex={-1}>
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="ltn__quick-view-modal-inner">
                  <div className="modal-product-item">
                    <div className="row">
                      <div className="col-12">
                        <div className="modal-product-img">
                          <img
                            src={publicUrl + "assets/img/product/7.png"}
                            alt="#"
                          />
                        </div>
                        <div className="modal-product-info go-top">
                          <h5>
                            <Link to="/product-details">
                              Brake Conversion Kit
                            </Link>
                          </h5>
                          <p className="added-cart">
                            <i className="fa fa-check-circle" /> Successfully
                            added to your Wishlist
                          </p>
                          <div className="btn-wrapper">
                            <Link
                              to="/wishlist"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              View Wishlist
                            </Link>
                          </div>
                        </div>
                        {/* additional-info */}
                        <div className="additional-info d-none">
                          <p>
                            We want to give you <b>10% discount</b> for your
                            first order, <br /> Use discount code at checkout
                          </p>
                          <div className="payment-method">
                            <img
                              src={publicUrl + "assets/img/icons/payment.png"}
                              alt="#"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ltn__modal-area ltn__quick-view-modal-area">
        <div className="modal fade" id="quick_view_modal" tabIndex={-1}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                  {/* <i class="fas fa-times"></i> */}
                </button>
              </div>
              <div className="modal-body">
                <div className="ltn__quick-view-modal-inner">
                  <div className="modal-product-item">
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="modal-product-img">
                          <img
                            src={publicUrl + "assets/img/product/4.png"}
                            alt="#"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="modal-product-info">
                          <div className="product-ratting">
                            <ul>
                              <li>
                                <a href="/#">
                                  <i className="fas fa-star" />
                                </a>
                              </li>
                              <li>
                                <a href="/#">
                                  <i className="fas fa-star" />
                                </a>
                              </li>
                              <li>
                                <a href="/#">
                                  <i className="fas fa-star" />
                                </a>
                              </li>
                              <li>
                                <a href="/#">
                                  <i className="fas fa-star-half-alt" />
                                </a>
                              </li>
                              <li>
                                <a href="/#">
                                  <i className="far fa-star" />
                                </a>
                              </li>
                              <li className="review-total">
                                {" "}
                                <a href="/#"> ( 95 Reviews )</a>
                              </li>
                            </ul>
                          </div>
                          <h3>Brake Conversion Kit</h3>
                          <div className="product-price">
                            <span>$149.00</span>
                            <del>$165.00</del>
                          </div>
                          <div className="modal-product-meta ltn__product-details-menu-1">
                            <ul>
                              <li>
                                <strong>Categories:</strong>
                                <span className="go-top">
                                  <Link to="/blog">Parts</Link>
                                  <Link to="/blog">Car</Link>
                                  <Link to="/blog">Seat</Link>
                                  <Link to="/blog">Cover</Link>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="ltn__product-details-menu-2">
                            <ul>
                              <li>
                                <div className="cart-plus-minus">
                                  <input
                                    type="text"
                                    defaultValue="02"
                                    name="qtybutton"
                                    className="cart-plus-minus-box"
                                  />
                                </div>
                              </li>
                              <li>
                                <a
                                  href="/#"
                                  className="theme-btn-1 btn btn-effect-1"
                                  title="Add to Cart"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add_to_cart_modal"
                                >
                                  <i className="fas fa-shopping-cart" />
                                  <span>ADD TO CART</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <hr />
                          <div className="ltn__social-media">
                            <ul>
                              <li>Share:</li>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ltn__modal-area ltn__add-to-cart-modal-area">
        <div className="modal fade" id="add_to_cart_modal" tabIndex={-1}>
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="ltn__quick-view-modal-inner">
                  <div className="modal-product-item">
                    <div className="row">
                      <div className="col-12">
                        <div className="modal-product-img">
                          <img
                            src={publicUrl + "assets/img/product/1.png"}
                            alt="#"
                          />
                        </div>
                        <div className="modal-product-info go-top">
                          <h5 className="go-top">
                            <Link to="/product-details">
                              Brake Conversion Kit
                            </Link>
                          </h5>
                          <p className="added-cart">
                            <i className="fa fa-check-circle" />
                            Successfully added to your Cart
                          </p>
                          <div className="btn-wrapper">
                            <Link
                              to="/cart"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              View Cart
                            </Link>
                            <Link
                              to="/checkout"
                              className="theme-btn-2 btn btn-effect-2"
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
                        {/* additional-info */}
                        <div className="additional-info d-none">
                          <p>
                            We want to give you <b>10% discount</b> for your
                            first order, <br /> Use discount code at checkout
                          </p>
                          <div className="payment-method">
                            <img
                              src={publicUrl + "assets/img/icons/payment.png"}
                              alt="#"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
