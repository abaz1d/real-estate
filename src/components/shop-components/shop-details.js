import React, { Component } from "react";
import { Link } from "react-router-dom";
// import parse from "html-react-parser";

class ShopDetails extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div className="ltn__shop-details-area pb-10 -mt-5">
        <div className="container">
          <div
            className="row sticky-top border-1 border-bottom mb-2"
            style={{
              top: "12%",
              backgroundColor: "white",
              zIndex: "9999",
            }}
          >
            <div className="col-lg-8 col-md-12">
              <nav className="hui-nav-tabs-root navbar navbar-expand navbar-light">
                <div className="spacer"></div>
                <a
                  href="#/product-details/#tinjauanumum"
                  className="nav-list-item nav-link"
                >
                  Tinjauan Umum
                </a>
                <a
                  href="#detail_properti"
                  className="nav-list-item active nav-link"
                >
                  Detail Properti
                </a>
                <a
                  href="#dokumentasi_properti"
                  className="nav-list-item nav-link"
                >
                  Dokumentasi
                </a>
                <a href="#lokasi_properti" className="nav-list-item nav-link">
                  Lokasi
                </a>
              </nav>
            </div>
            <div className="col-lg-4">
              <div className="contextual-action-strip-root d-flex flex-row">
                <div className="col">
                  <nav className="actions-popover-root navbar navbar-expand-lg">
                    <div className="ltn__social-media mx-auto mt-2">
                      <ul>
                        <li>
                          <a
                            href="/#"
                            title="Tambahkan ke wishlist"
                            className="mx-3"
                          >
                            <i className="fa fa-heart me-1 mt-1" />
                            Wishlist
                          </a>
                        </li>
                        <li>
                          <a href="/#" title="Bagikan" className="mx-3">
                            <i className="fa fa-share me-1 mt-1" /> Bagikan
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                <div className="ltn__blog-meta">
                  <ul>
                    <li className="ltn__blog-category">
                      <Link to="#">Rumah</Link>
                    </li>
                    <li className="ltn__blog-category">
                      <Link className="bg-orange" to="#">
                        Dijual
                      </Link>
                    </li>
                    <li className="ltn__blog-date">
                      <i className="far fa-calendar-alt" />
                      May 19, 2021
                    </li>
                  </ul>
                </div>
                <h1>Diamond Manor Apartment</h1>

                <section id="tinjauanumum">
                  <h4 className="title-2">Tinjauan Umum</h4>
                  <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                    <ul>
                      <li>
                        <h3 className="-mt-10">Rp 23 jt / m²</h3>
                      </li>
                      <li>
                        <label>
                          <span className="ltn__secondary-color">
                            <i className="flaticon-pin" />
                          </span>{" "}
                          Belmont Gardens, Chicago
                        </label>
                      </li>
                    </ul>
                    <div className="row m-auto pt-60">
                      <div className="w-25 text-center">
                        <i className="fa fa-bed fa-2xl mx-auto" />
                        <p className="my-2">2 Tidur</p>
                      </div>
                      <div className="w-25 text-center">
                        <i className="fa fa-bath fa-2xl mx-auto" />
                        <p className="my-2">2 Mandi</p>
                      </div>
                      <div className="w-25 text-center">
                        <i className="fa fa-maximize fa-2xl mx-auto" />
                        <p className="my-2">29 m²</p>
                      </div>
                      <div className="w-25 text-center">
                        <i className="fa fa-object-group fa-2xl mx-auto" />
                        <p className="my-2">Rp 23 jt / m²</p>
                      </div>
                    </div>
                  </div>
                </section>

                <h4 className="title-2">Deskripsi</h4>
                <p>
                  Massa tempor nec feugiat nisl pretium. Egestas fringilla
                  phasellus faucibus scelerisque eleifend donec Porta nibh
                  venenatis cras sed felis eget velit aliquet. Neque volutpat ac
                  tincidunt vitae semper quis lectus. Turpis in eu mi bibendum
                  neque egestas congue quisque. Sed elementum tempus egestas sed
                  sed risus pretium quam. Dignissim sodales ut eu sem. Nibh
                  mauris cursus mattis molestee iaculis at erat pellentesque. Id
                  interdum velit laoreet id donec ultrices tincidunt.
                </p>
                <p>
                  To the left is the modern kitchen with central island, leading
                  through to the unique breakfast family room which feature
                  glass walls and doors out onto the garden and access to the
                  separate utility room.
                </p>
                <h4 className="title-2">Facts and Features</h4>
                <div className="property-detail-feature-list clearfix mb-45">
                  <ul>
                    <li>
                      <div className="property-detail-feature-list-item">
                        <i className="flaticon-double-bed" />
                        <div>
                          <h6>Living Room</h6>
                          <small>20 x 16 sq feet</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="property-detail-feature-list-item">
                        <i className="flaticon-double-bed" />
                        <div>
                          <h6>Garage</h6>
                          <small>20 x 16 sq feet</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="property-detail-feature-list-item">
                        <i className="flaticon-double-bed" />
                        <div>
                          <h6>Dining Area</h6>
                          <small>20 x 16 sq feet</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="property-detail-feature-list-item">
                        <i className="flaticon-double-bed" />
                        <div>
                          <h6>Bedroom</h6>
                          <small>20 x 16 sq feet</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="property-detail-feature-list-item">
                        <i className="flaticon-double-bed" />
                        <div>
                          <h6>Bathroom</h6>
                          <small>20 x 16 sq feet</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="property-detail-feature-list-item">
                        <i className="flaticon-double-bed" />
                        <div>
                          <h6>Gym Area</h6>
                          <small>20 x 16 sq feet</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="property-detail-feature-list-item">
                        <i className="flaticon-double-bed" />
                        <div>
                          <h6>Garden</h6>
                          <small>20 x 16 sq feet</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="property-detail-feature-list-item">
                        <i className="flaticon-double-bed" />
                        <div>
                          <h6>Parking</h6>
                          <small>20 x 16 sq feet</small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <h4 className="title-2 mb-10">Amenities</h4>
                <div className="property-details-amenities mb-60">
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="ltn__menu-widget">
                        <ul>
                          <li>
                            <label className="checkbox-item">
                              Air Conditioning
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Gym
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Microwave
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Swimming Pool
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              WiFi
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="ltn__menu-widget">
                        <ul>
                          <li>
                            <label className="checkbox-item">
                              Barbeque
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Recreation
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Microwave
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Basketball Cout
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Fireplace
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="ltn__menu-widget">
                        <ul>
                          <li>
                            <label className="checkbox-item">
                              Refrigerator
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Window Coverings
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Washer
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              24x7 Security
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="checkbox-item">
                              Indoor Game
                              <input type="checkbox" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="title-2">Denah</h4>
                {/* APARTMENTS PLAN AREA START */}
                <div className="ltn__apartments-plan-area product-details-apartments-plan mb-60">
                  <div className="ltn__tab-menu ltn__tab-menu-3 ltn__tab-menu-top-right-- text-uppercase--- text-center---">
                    <div className="nav">
                      <a data-bs-toggle="tab" href="#liton_tab_3_1">
                        First Floor
                      </a>
                      <a
                        className="active show"
                        data-bs-toggle="tab"
                        href="#liton_tab_3_2"
                      >
                        Second Floor
                      </a>
                      <a data-bs-toggle="tab" href="#liton_tab_3_3">
                        Third Floor
                      </a>
                      <a data-bs-toggle="tab" href="#liton_tab_3_4">
                        Top Garden
                      </a>
                    </div>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade" id="liton_tab_3_1">
                      <div className="ltn__apartments-tab-content-inner">
                        <div className="row">
                          <div className="col-lg-7">
                            <div className="apartments-plan-img">
                              <img
                                src={publicUrl + "assets/img/others/10.png"}
                                alt="#"
                              />
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="apartments-plan-info ltn__secondary-bg--- text-color-white---">
                              <h2>First Floor</h2>
                              <p>
                                Enimad minim veniam quis nostrud exercitation
                                ullamco laboris. Lorem ipsum dolor sit amet cons
                                aetetur adipisicing elit sedo eiusmod
                                tempor.Incididunt labore et dolore magna aliqua.
                                sed ayd minim veniam.
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="product-details-apartments-info-list  section-bg-1">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="apartments-info-list apartments-info-list-color mt-40---">
                                    <ul>
                                      <li>
                                        <label>Total Area</label>{" "}
                                        <span>2800 Sq. Ft</span>
                                      </li>
                                      <li>
                                        <label>Bedroom</label>{" "}
                                        <span>150 Sq. Ft</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="apartments-info-list apartments-info-list-color mt-40---">
                                    <ul>
                                      <li>
                                        <label>Belcony/Pets</label>{" "}
                                        <span>Allowed</span>
                                      </li>
                                      <li>
                                        <label>Lounge</label>{" "}
                                        <span>650 Sq. Ft</span>
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
                    <div
                      className="tab-pane fade active show"
                      id="liton_tab_3_2"
                    >
                      <div className="ltn__product-tab-content-inner">
                        <div className="row">
                          <div className="col-lg-7">
                            <div className="apartments-plan-img">
                              <img
                                src={publicUrl + "assets/img/others/10.png"}
                                alt="#"
                              />
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="apartments-plan-info ltn__secondary-bg--- text-color-white---">
                              <h2>Second Floor</h2>
                              <p>
                                Enimad minim veniam quis nostrud exercitation
                                ullamco laboris. Lorem ipsum dolor sit amet cons
                                aetetur adipisicing elit sedo eiusmod
                                tempor.Incididunt labore et dolore magna aliqua.
                                sed ayd minim veniam.
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="product-details-apartments-info-list  section-bg-1">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="apartments-info-list apartments-info-list-color mt-40---">
                                    <ul>
                                      <li>
                                        <label>Total Area</label>{" "}
                                        <span>2800 Sq. Ft</span>
                                      </li>
                                      <li>
                                        <label>Bedroom</label>{" "}
                                        <span>150 Sq. Ft</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="apartments-info-list apartments-info-list-color mt-40---">
                                    <ul>
                                      <li>
                                        <label>Belcony/Pets</label>{" "}
                                        <span>Allowed</span>
                                      </li>
                                      <li>
                                        <label>Lounge</label>{" "}
                                        <span>650 Sq. Ft</span>
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
                    <div className="tab-pane fade" id="liton_tab_3_3">
                      <div className="ltn__product-tab-content-inner">
                        <div className="row">
                          <div className="col-lg-7">
                            <div className="apartments-plan-img">
                              <img
                                src={publicUrl + "assets/img/others/10.png"}
                                alt="#"
                              />
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="apartments-plan-info ltn__secondary-bg--- text-color-white---">
                              <h2>Third Floor</h2>
                              <p>
                                Enimad minim veniam quis nostrud exercitation
                                ullamco laboris. Lorem ipsum dolor sit amet cons
                                aetetur adipisicing elit sedo eiusmod
                                tempor.Incididunt labore et dolore magna aliqua.
                                sed ayd minim veniam.
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="product-details-apartments-info-list  section-bg-1">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="apartments-info-list apartments-info-list-color mt-40---">
                                    <ul>
                                      <li>
                                        <label>Total Area</label>{" "}
                                        <span>2800 Sq. Ft</span>
                                      </li>
                                      <li>
                                        <label>Bedroom</label>{" "}
                                        <span>150 Sq. Ft</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="apartments-info-list apartments-info-list-color mt-40---">
                                    <ul>
                                      <li>
                                        <label>Belcony/Pets</label>{" "}
                                        <span>Allowed</span>
                                      </li>
                                      <li>
                                        <label>Lounge</label>{" "}
                                        <span>650 Sq. Ft</span>
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
                    <div className="tab-pane fade" id="liton_tab_3_4">
                      <div className="ltn__product-tab-content-inner">
                        <div className="row">
                          <div className="col-lg-7">
                            <div className="apartments-plan-img">
                              <img
                                src={publicUrl + "assets/img/others/10.png"}
                                alt="#"
                              />
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="apartments-plan-info ltn__secondary-bg--- text-color-white---">
                              <h2>Top Garden</h2>
                              <p>
                                Enimad minim veniam quis nostrud exercitation
                                ullamco laboris. Lorem ipsum dolor sit amet cons
                                aetetur adipisicing elit sedo eiusmod
                                tempor.Incididunt labore et dolore magna aliqua.
                                sed ayd minim veniam.
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="product-details-apartments-info-list  section-bg-1">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="apartments-info-list apartments-info-list-color mt-40---">
                                    <ul>
                                      <li>
                                        <label>Total Area</label>{" "}
                                        <span>2800 Sq. Ft</span>
                                      </li>
                                      <li>
                                        <label>Bedroom</label>{" "}
                                        <span>150 Sq. Ft</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="apartments-info-list apartments-info-list-color mt-40---">
                                    <ul>
                                      <li>
                                        <label>Belcony/Pets</label>{" "}
                                        <span>Allowed</span>
                                      </li>
                                      <li>
                                        <label>Lounge</label>{" "}
                                        <span>650 Sq. Ft</span>
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
                {/* APARTMENTS PLAN AREA END */}

                <h4 className="title-2">Galeri Properti</h4>
                <div className="ltn__property-details-gallery mb-30">
                  <div className="row">
                    <div className="col-md-6">
                      <a
                        href={publicUrl + "assets/img/others/14.jpg"}
                        data-rel="lightcase:myCollection"
                      >
                        <img
                          className="mb-30"
                          src={publicUrl + "assets/img/others/14.jpg"}
                          alt="gambar"
                        />
                      </a>
                      <a
                        href={publicUrl + "assets/img/others/15.jpg"}
                        data-rel="lightcase:myCollection"
                      >
                        <img
                          className="mb-30"
                          src={publicUrl + "assets/img/others/15.jpg"}
                          alt="gambar"
                        />
                      </a>
                    </div>
                    <div className="col-md-6">
                      <a
                        href={publicUrl + "assets/img/others/16.jpg"}
                        data-rel="lightcase:myCollection"
                      >
                        <img
                          className="mb-30"
                          src={publicUrl + "assets/img/others/16.jpg"}
                          alt="gambar"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <h4 className="title-2">Video Properti</h4>
                <div
                  className="ltn__video-bg-img ltn__video-popup-height-500 bg-overlay-black-50 bg-gambar mb-60"
                  data-bs-bg={publicUrl + "assets/img/others/5.jpg"}
                >
                  <a
                    className="ltn__video-icon-2 ltn__video-icon-2-border---"
                    href="https://www.youtube.com/embed/eWUxqVFBq74?autoplay=1&showinfo=0"
                    data-rel="lightcase:myCollection"
                  >
                    <i className="fa fa-play" />
                  </a>
                </div>

                <h4 className="title-2">Lokasi</h4>
                <div className="property-details-google-map mb-60">
                  <iframe
                    title="maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    frameBorder={0}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <aside
                className="sidebar ltn__shop-sidebar ltn__right-sidebar--- sticky-sm-top mb-10"
                style={{ top: "23%" }}
              >
                {/* Author Widget */}
                <div className="widget ltn__author-widget">
                  <div className="ltn__author-widget-inner text-center">
                    <img
                      src="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/team/4.jpg"
                      alt="gambar"
                    />
                    <h5>Rosalina D. Willaimson</h5>
                    <small>Traveller/Photographer</small>
                    <a
                      href="/#"
                      className="btn btn-outline-secondary rounded-3 w-100 mt-4"
                      role="button"
                    >
                      <i className="fab fa-whatsapp me-1 mt-1" /> WhatsApp
                    </a>
                    <a
                      href="/#"
                      className="btn btn-outline-secondary rounded-3 w-100 mt-2"
                      role="button"
                    >
                      <i
                        className="fa fa-phone me-1 mt-1"
                        style={{ transform: "rotate(90deg)" }}
                      ></i>
                      No Telephone
                    </a>
                    <a
                      href="/#"
                      className="btn btn-outline-secondary rounded-3 w-100 mt-2"
                      role="button"
                    >
                      <i className="fa fa-envelope me-1 mt-1" /> Email
                    </a>
                    <div className="ltn__social-media mt-3 sticky-top">
                      <ul>
                        <li>
                          <a
                            href="/#"
                            title="Tambahkan ke wishlist"
                            className="mx-3"
                          >
                            <i className="fa fa-heart me-1 mt-1" />
                            Wishlist
                          </a>
                        </li>
                        <li>
                          <a href="/#" title="Bagikan" className="mx-3">
                            <i className="fa fa-share me-1 mt-1" /> Bagikan
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Banner Widget */}
                <div className="widget ltn__banner-widget d-none go-top">
                  <Link to="/shop">
                    <img src={publicUrl + "assets/img/banner/2.jpg"} alt="#" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopDetails;
