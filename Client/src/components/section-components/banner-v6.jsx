import React, { useState, Fragment } from "react"
import { useNavigate } from "react-router-dom"
// import parse from "html-react-parser";

export default function BannerV6() {
  const navigate = useNavigate()
  let [cari, setCari] = useState({
    jenis_properti: "",
    kategori: "Beli",
    kota: "",
    provinsi: "",
  })

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    // console.log(value)
    setCari({
      ...cari,
      [name]: value,
    })
  }
  const startSearch = (e) => {
    e.preventDefault()
    console.log(cari)
    navigate(
      `/shop-grid/?jenis_properti=${cari.jenis_properti}&kategori=${cari.kategori}&kota=${cari.kota}&provinsi=${cari.provinsi}`,
    )
  }

  return (
    <div className="ltn__slider-area ltn__slider-4 position-relative  ltn__primary-bg">
      <div className="ltn__slide-animation-active">
        <video autoPlay muted loop id="myVideo">
          <source src={"assets/media/3.mp4"} type="video/mp4" />
        </video>

        <div
          className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-7 bg-image--- bg-overlay-theme-black-30"
          data-bs-bg={"assets/img/slider/41.jpg"}
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
                        <span className="ltn__secondary-color-3">Properti</span>
                        <br /> Impian Anda
                      </h1>
                    </div>
                    <div className="ltn__car-dealer-form-tab">
                      <div className="ltn__tab-menu  text-uppercase text-center">
                        <div className="nav">
                          <a
                            onClick={(e) => {
                              e.preventDefault()
                              setCari({
                                ...cari,
                                kategori: "Beli",
                              })
                            }}
                            className="active show"
                            data-bs-toggle="tab"
                            href="#ltn__form_tab_1_1"
                          >
                            <i className="fas fa-home" />
                            Di Jual
                          </a>
                          <a
                            onClick={(e) => {
                              e.preventDefault()
                              setCari({
                                ...cari,
                                kategori: "Sewa",
                              })
                            }}
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
                            <form className="ltn__car-dealer-form-box row">
                              <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-3 col-md-6">
                                <select
                                  className="nice-select"
                                  value={cari.jenis_properti}
                                  onChange={(e) => handleChange(e)}
                                  name="jenis_properti"
                                >
                                  <option value="">Jenis Properti</option>
                                  <option value="Rumah">Rumah</option>
                                  <option value="Apartemen">Apartemen</option>
                                  <option value="Tanah">Tanah</option>
                                  <option value="Gudang">Gudang</option>
                                  <option value="Ruko">Ruko</option>
                                  <option value="Gedung">Gedung</option>
                                </select>
                              </div>
                              <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                <select
                                  className="nice-select"
                                  value={cari.kota}
                                  onChange={(e) => handleChange(e)}
                                  name="kota"
                                >
                                  <option value="">Kota/ Kabupaten</option>
                                  <option value="Kota Semarang">
                                    Kota Semarang
                                  </option>
                                  <option value="Kabupaten Semarang">
                                    Kab. Semarang
                                  </option>
                                </select>
                              </div>
                              <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-3 col-md-6">
                                <select
                                  className="nice-select"
                                  value={cari.provinsi}
                                  onChange={(e) => handleChange(e)}
                                  name="provinsi"
                                >
                                  <option value="">Provinsi</option>
                                  <option value="Jawa Tengah">
                                    Jawa Tengah
                                  </option>
                                </select>
                              </div>
                              <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                <div className="btn-wrapper text-center mt-0 go-top">
                                  {/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
                                  <button
                                    onClick={(e) => startSearch(e)}
                                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                  >
                                    <i className="icon-search" /> Cari
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="ltn__form_tab_1_2">
                          <div className="car-dealer-form-inner">
                            <form className="ltn__car-dealer-form-box row">
                              <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car col-lg-3 col-md-6">
                                <select
                                  className="nice-select"
                                  value={cari.jenis_properti}
                                  onChange={(e) => handleChange(e)}
                                  name="jenis_properti"
                                >
                                  <option value="">Jenis Properti</option>
                                  <option value="Rumah">Rumah</option>
                                  <option value="Apartemen">Apartemen</option>
                                  <option value="Tanah">Tanah</option>
                                  <option value="Gudang">Gudang</option>
                                  <option value="Ruko">Ruko</option>
                                  <option value="Gedung">Gedung</option>
                                </select>
                              </div>
                              <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                <select
                                  className="nice-select"
                                  value={cari.kota}
                                  onChange={(e) => handleChange(e)}
                                  name="kota"
                                >
                                  <option value="">Kota/ Kabupaten</option>
                                  <option value="Kota Semarang">
                                    Kota Semarang
                                  </option>
                                  <option value="Kabupaten Semarang">
                                    Kab. Semarang
                                  </option>
                                </select>
                              </div>
                              <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter col-lg-3 col-md-6">
                                <select
                                  className="nice-select"
                                  value={cari.provinsi}
                                  onChange={(e) => handleChange(e)}
                                  name="provinsi"
                                >
                                  <option value="">Provinsi</option>
                                  <option value="Jawa Tengah">
                                    Jawa Tengah
                                  </option>
                                </select>
                              </div>
                              <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                <div className="btn-wrapper text-center mt-0 go-top">
                                  {/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
                                  <button
                                    onClick={(e) => startSearch(e)}
                                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                  >
                                    <i className="icon-search" /> Cari
                                  </button>
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
  )
}
