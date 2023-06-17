import React, { Component } from "react";
import { Link } from "react-router-dom";
// import parse from "html-react-parser";

class BannerV6 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div className="ltn__slider-area ltn__slider-4 position-relative  ltn__primary-bg">
        <div className="ltn__slide-one-active----- slick-slide-arrow-1----- slick-slide-dots-1----- arrow-white----- ltn__slide-animation-active">
          <video autoPlay muted loop id="myVideo">
            <source src={publicUrl + "assets/media/3.mp4"} type="video/mp4" />
          </video>

          <div
            className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-7 bg-image--- bg-overlay-theme-black-30"
            data-bs-bg={publicUrl + "assets/img/slider/41.jpg"}
          >
            <div className="ltn__slide-item-inner text-center">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 align-self-center">
                    <div className="slide-item-car-dealer-form">
                      <div className="slide-item-info-inner ltn__slide-animation">
                        <h6 className="slide-sub-title white-color animated">
                          <span>
                            <i className="fas fa-home" />
                          </span>{" "}
                          Real Estate Agency
                        </h6>
                        <h1 className="slide-title text-uppercase white-color animated ">
                          Temukan{" "}
                          <span className="ltn__secondary-color-3">
                            Properti
                          </span>
                          <br /> Impian Anda
                        </h1>
                      </div>
                      <div className="ltn__car-dealer-form-tab">
                        <div className="ltn__tab-menu  text-uppercase text-center">
                          <div className="nav">
                            <a
                              className="active show"
                              data-bs-toggle="tab"
                              href="#ltn__form_tab_1_1"
                            >
                              <i className="fas fa-home" />
                              Di Jual
                            </a>
                            <a
                              data-bs-toggle="tab"
                              href="#ltn__form_tab_1_2"
                              className=""
                            >
                              <i className="fas fa-home" />
                              Di Sewakan
                            </a>
                          </div>
                        </div>
                        <div className="tab-content pb-10">
                          <div
                            className="tab-pane fade active show"
                            id="ltn__form_tab_1_1"
                          >
                            <div className="car-dealer-form-inner">
                              <form
                                action="#"
                                className="ltn__car-dealer-form-box row"
                              >
                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-3 col-md-6">
                                  <select className="nice-select">
                                    <option>Jenis Properti</option>
                                    <option>Rumah</option>
                                    <option>Apartemen</option>
                                    <option>Tanah</option>
                                    <option>Gudang</option>
                                    <option>Ruko</option>
                                    <option>Gedung</option>
                                  </select>
                                </div>
                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-3 col-md-6">
                                  <select className="nice-select">
                                    <option>Provinsi</option>
                                    <option>Jawa Tengah</option>
                                  </select>
                                </div>
                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                  <select className="nice-select">
                                    <option>Kota/ Kabupaten</option>
                                    <option>Kota Semarang</option>
                                  </select>
                                </div>
                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                  <div className="btn-wrapper text-center mt-0 go-top">
                                    {/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
                                    <Link
                                      to="/shop-grid"
                                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                    >
                                      <i className="icon-search" /> Cari
                                    </Link>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="ltn__form_tab_1_2">
                            <div className="car-dealer-form-inner">
                              <form
                                action="#"
                                className="ltn__car-dealer-form-box row"
                              >
                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-3 col-md-6">
                                  <select className="nice-select">
                                    <option>Jenis Properti</option>
                                    <option>Rumah</option>
                                    <option>Apartemen</option>
                                    <option>Tanah</option>
                                    <option>Gudang</option>
                                    <option>Ruko</option>
                                    <option>Gedung</option>
                                  </select>
                                </div>
                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-3 col-md-6">
                                  <select className="nice-select">
                                    <option>Provinsi</option>
                                    <option>Jawa Tengah</option>
                                  </select>
                                </div>
                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                  <select className="nice-select">
                                    <option>Kota/ Kabupaten</option>
                                    <option>Kota Semarang</option>
                                  </select>
                                </div>
                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                  <div className="btn-wrapper text-center mt-0 go-top">
                                    {/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
                                    <Link
                                      to="/shop-grid"
                                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                    >
                                      <i className="icon-search" /> Cari
                                    </Link>
                                  </div>
                                </div>
                              </form>
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
}

export default BannerV6;
