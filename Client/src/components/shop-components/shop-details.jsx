import React, { useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { currencyString } from "@/utils/helper"
import ShareButton from "../global-components/share-button"
import moment from "moment"

export default function ShopDetails(props) {
  const propertis = props.properti
  const tinjauan_umum = useRef(null)
  const detail_properti = useRef(null)
  const dokumentasi_properti = useRef(null)
  const lokasi_properti = useRef(null)
  const hubungi_owner = useRef(null)
  const handleClick = (e, data) => {
    e.preventDefault()
    data.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    window.addEventListener("scroll", navHighlighter)
    function navHighlighter() {
      let scrollY = window.pageYOffset
      sections.forEach((current) => {
        current.addEventListener("click", (e) => {
          e.preventDefault()
          console.log(current)
        })
        var sectionId = current.getAttribute("id")
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop + 400

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector("#nav-menu a[href*=" + sectionId + "]")
            .classList.add("bg-orange")
        } else {
          document
            .querySelector("#nav-menu a[href*=" + sectionId + "]")
            .classList.remove("bg-orange")
        }
      })
    }
  })
  return (
    <div className="ltn__shop-details-area pb-10 -mt-5">
      <div className="container">
        <div
          className="row sticky-top sticky-md-top-2 border-1 border-bottom mb-md-2 bg-white"
          style={{
            zIndex: "9999",
          }}
        >
          <div className="col-lg-8 col-md-12 bg-white">
            <nav
              id="nav-menu"
              className="hui-nav-tabs-root navbar navbar-expand navbar-light d-flex justify-content-md-start d-flex justify-content-center"
            >
              <div className="spacer"></div>
              <a
                aria-label="nav"
                onClick={(e) => handleClick(e, tinjauan_umum)}
                href="#tinjauan_umum"
                className="nav-list-item nav-link text-dark rounded"
              >
                <span className="d-md-block d-none">Tinjauan Umum</span>
                <span className="d-md-none d-block">Umum</span>
              </a>
              <a
                aria-label="nav"
                onClick={(e) => handleClick(e, detail_properti)}
                href="#detail_properti"
                className="nav-list-item nav-link text-dark rounded"
              >
                <span className="d-md-block d-none">Detail Properti</span>
                <span className="d-md-none d-block">Detail</span>
              </a>
              <a
                aria-label="nav"
                onClick={(e) => handleClick(e, dokumentasi_properti)}
                href="#dokumentasi_properti"
                className="nav-list-item nav-link text-dark rounded"
              >
                Dokumentasi
              </a>
              <a
                aria-label="nav"
                onClick={(e) => handleClick(e, lokasi_properti)}
                href="#lokasi_properti"
                className="nav-list-item nav-link text-dark rounded"
              >
                Lokasi
              </a>
            </nav>
          </div>
          <div className="col-lg-4">
            <div className="contextual-action-strip-root d-flex flex-row">
              <div className="col">
                <nav className="actions-popover-root navbar navbar-expand-lg">
                  <div className="ltn__social-media mx-auto mt-md-2">
                    <ul>
                      <li>
                        <a
                          href="/#"
                          title="Tambahkan ke wishlist"
                          className="mx-1"
                        >
                          <i className="fa fa-heart me-1 mt-1" />
                          Wishlist
                        </a>
                      </li>
                      <li>
                        <a
                          href="/#"
                          title="Bagikan"
                          className="mx-1"
                          onClick={(e) => handleClick(e, hubungi_owner)}
                        >
                          <i
                            className="fa fa-phone me-1 mt-1"
                            style={{ transform: "rotate(90deg)" }}
                          ></i>{" "}
                          Hubungi
                        </a>
                      </li>
                      <li>
                        <ShareButton />
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {propertis.length == 1 &&
          propertis.map((item, index) => (
            <div key={index} className="row">
              <div className="col-lg-8 col-md-12">
                <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                  <section
                    className="section"
                    id="tinjauan_umum"
                    ref={tinjauan_umum}
                  >
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-category">
                          <Link to="#">{item.jenis_properti}</Link>
                        </li>
                        <li className="ltn__blog-category">
                          <Link className="bg-orange" to="#">
                            {item.kategori}
                          </Link>
                        </li>
                        <li className="ltn__blog-date">
                          <i className="far fa-calendar-alt" />
                          {moment(item.di_buat).format("DD MMMM YYYY")}
                        </li>
                      </ul>
                    </div>
                    <h1>{item.judul}</h1>

                    <h4 className="title-2">Tinjauan Umum</h4>
                    <div className="row section-bg-1 clearfix">
                      <div className="col-md-4 text-center pt-3">
                        <h3 className="my-1">
                          Rp {currencyString(item.total_harga)}{" "}
                          <label>
                            {item.kategori === "Sewa" ? "/ Bulan" : ""}
                          </label>
                        </h3>
                        <label>
                          <span className="ltn__secondary-color">
                            <i className="flaticon-pin" />
                          </span>{" "}
                          {item.kota}, {item.provinsi}
                        </label>
                      </div>
                      <div className=" p-2 col-md-8">
                        <ul className="w-100 d-flex justify-content-center ltn__list-item-2 ltn__list-item-2-before">
                          <li>
                            <span>
                              {item.kamar_tidur}{" "}
                              <i className="fa fa-bed fa-xl mx-2" />
                            </span>
                            Kamar Tidur
                          </li>
                          <li>
                            <span>
                              {item.kamar_mandi}{" "}
                              <i className="fa fa-bath fa-xl mx-2" />
                            </span>
                            Kamar Mandi
                          </li>
                          <li>
                            <span>
                              {item.luas_properti}{" "}
                              <i className="fa fa-maximize fa-xl mx-2" />
                            </span>
                            Luas (m²)
                          </li>
                          <li>
                            <span>
                              {currencyString(
                                (
                                  parseInt(item.total_harga) /
                                  parseInt(item.luas_properti)
                                )
                                  .toString()
                                  .split(".")[0],
                              )}{" "}
                              <i className="fa fa-object-group fa-xl mx-2" />
                            </span>
                            Harga / m²
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                  <section
                    className="section"
                    id="detail_properti"
                    ref={detail_properti}
                  >
                    <h4 className="title-2">Deskripsi</h4>
                    <p>{item.deskripsi}</p>
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
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Gym
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Microwave
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Swimming Pool
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  WiFi
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
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
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Recreation
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Microwave
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Basketball Cout
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Fireplace
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
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
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Window Coverings
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Washer
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  24x7 Security
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="checkbox-item">
                                  Indoor Game
                                  <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                  />
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
                                    src={"assets/img/others/10.png"}
                                    alt="#"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="apartments-plan-info ltn__secondary-bg--- text-color-white---">
                                  <h2>First Floor</h2>
                                  <p>
                                    Enimad minim veniam quis nostrud
                                    exercitation ullamco laboris. Lorem ipsum
                                    dolor sit amet cons aetetur adipisicing elit
                                    sedo eiusmod tempor.Incididunt labore et
                                    dolore magna aliqua. sed ayd minim veniam.
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
                                    src={"assets/img/others/10.png"}
                                    alt="#"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="apartments-plan-info ltn__secondary-bg--- text-color-white---">
                                  <h2>Second Floor</h2>
                                  <p>
                                    Enimad minim veniam quis nostrud
                                    exercitation ullamco laboris. Lorem ipsum
                                    dolor sit amet cons aetetur adipisicing elit
                                    sedo eiusmod tempor.Incididunt labore et
                                    dolore magna aliqua. sed ayd minim veniam.
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
                                    src={"assets/img/others/10.png"}
                                    alt="#"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="apartments-plan-info ltn__secondary-bg--- text-color-white---">
                                  <h2>Third Floor</h2>
                                  <p>
                                    Enimad minim veniam quis nostrud
                                    exercitation ullamco laboris. Lorem ipsum
                                    dolor sit amet cons aetetur adipisicing elit
                                    sedo eiusmod tempor.Incididunt labore et
                                    dolore magna aliqua. sed ayd minim veniam.
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
                                    src={"assets/img/others/10.png"}
                                    alt="#"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="apartments-plan-info ltn__secondary-bg--- text-color-white---">
                                  <h2>Top Garden</h2>
                                  <p>
                                    Enimad minim veniam quis nostrud
                                    exercitation ullamco laboris. Lorem ipsum
                                    dolor sit amet cons aetetur adipisicing elit
                                    sedo eiusmod tempor.Incididunt labore et
                                    dolore magna aliqua. sed ayd minim veniam.
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
                  </section>
                  <section
                    className="section"
                    id="dokumentasi_properti"
                    ref={dokumentasi_properti}
                  >
                    <h4 className="title-2">Galeri Properti</h4>
                    <div className="ltn__property-details-gallery mb-30">
                      <div className="row">
                        <div className="col-md-6">
                          <a
                            href={"assets/img/others/14.jpg"}
                            data-rel="lightcase:myCollection"
                          >
                            <img
                              className="mb-30"
                              src={"assets/img/others/14.jpg"}
                              alt="gambar"
                            />
                          </a>
                          <a
                            href={"assets/img/others/15.jpg"}
                            data-rel="lightcase:myCollection"
                          >
                            <img
                              className="mb-30"
                              src={"assets/img/others/15.jpg"}
                              alt="gambar"
                            />
                          </a>
                        </div>
                        <div className="col-md-6">
                          <a
                            href={"assets/img/others/16.jpg"}
                            data-rel="lightcase:myCollection"
                          >
                            <img
                              className="mb-30"
                              src={"assets/img/others/16.jpg"}
                              alt="gambar"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <h4 className="title-2">Video Properti</h4>
                    <div
                      className="ltn__video-bg-img ltn__video-popup-height-500 bg-overlay-black-50 bg-gambar mb-60"
                      data-bs-bg={"assets/img/others/5.jpg"}
                    >
                      <a
                        className="ltn__video-icon-2 ltn__video-icon-2-border---"
                        href="https://www.youtube.com/embed/eWUxqVFBq74?autoplay=1&showinfo=0"
                        data-rel="lightcase:myCollection"
                      >
                        <i className="fa fa-play" />
                      </a>
                    </div>
                  </section>
                  <section
                    className="section"
                    id="lokasi_properti"
                    ref={lokasi_properti}
                  >
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
                  </section>
                </div>
              </div>
              <div className="col-lg-4">
                <aside
                  className="sidebar ltn__shop-sidebar ltn__right-sidebar--- sticky-sm-top mb-10"
                  style={{ top: "23%" }}
                >
                  {/* Author Widget */}
                  <div
                    className="widget ltn__author-widget"
                    ref={hubungi_owner}
                  >
                    <div className="ltn__author-widget-inner text-center">
                      <img
                        src="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/team/4.jpg"
                        alt="gambar"
                      />
                      <h5 className="text-uppercase">{item.nama_lengkap}</h5>
                      <small>
                        Bergabung Sejak:{" "}
                        {moment(item.tgl_buat).format("DD MMMM YYYY")}
                      </small>
                      <a
                        href={`https://api.whatsapp.com/send/?phone=%2B62${parseInt(
                          item.wa_telephone[0],
                        )}&text=Saya+tertarik+dengan+properti+Anda+${
                          item.judul
                        }&type=phone_number&app_absent=0`}
                        target="_blank"
                        className="btn btn-outline-secondary rounded-3 w-100 mt-4"
                        role="button"
                      >
                        <i className="fab fa-whatsapp me-1 mt-1" /> WhatsApp
                      </a>
                      <a
                        href={`tel:${item.wa_telephone[0]}`}
                        target="_blank"
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
                        href={`mailto:${item.email_user}`}
                        target="_blank"
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
                            <ShareButton />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Banner Widget */}
                  <div className="widget ltn__banner-widget d-none go-top">
                    <Link to="/shop">
                      <img src={"assets/img/banner/2.jpg"} alt="#" />
                    </Link>
                  </div>
                </aside>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
