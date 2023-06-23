import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import icon21 from "@/assets/img/icons/icon-img/21.png"
import icon22 from "@/assets/img/icons/icon-img/22.png"
import icon23 from "@/assets/img/icons/icon-img/23.png"

export default function FeaturesV1(props) {
  let customClass = props.customClass ? props.customClass : ""
  useEffect(() => {
    var ltn__active_item = document.querySelectorAll(
      ".ltn__feature-item-6, .ltn__our-journey-wrap ul li, .ltn__pricing-plan-item",
    )

    ltn__active_item.forEach(function (item) {
      item.addEventListener("mouseover", function () {
        ltn__active_item.forEach(function (item) {
          item.classList.remove("active")
        })
        this.classList.add("active")
      })
    })
  })

  return (
    <div className={customClass}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2--- text-center">
              <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                Layanan Kami
              </h6>
              <h1 className="section-title">Fokus Utama Kami</h1>
            </div>
          </div>
        </div>
        <div className="row ltn__custom-gutter--- justify-content-center go-top">
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
              <div className="ltn__feature-icon">
                <img src={icon21} alt="#" />
              </div>
              <div className="ltn__feature-info">
                <h3>
                  <Link to="/service-details">Membeli Properti</Link>
                </h3>
                <p>
                  "Platform kami mempermudah pembelian properti dengan layanan
                  yang cepat, aman, dan efisien. Temukan properti impian Anda
                  dengan mudah, lengkap dan dapatkan pengalaman belanja properti
                  yang terbaik."
                </p>
                <Link className="ltn__service-btn" to="/service-details">
                  Temukan Properti <i className="flaticon-right-arrow" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1 active">
              <div className="ltn__feature-icon">
                <img src={icon22} alt="#" />
              </div>
              <div className="ltn__feature-info">
                <h3>
                  <Link to="/service-details">Menyewakan Properti</Link>
                </h3>
                <p>
                  "Platform layanan kami mempermudah menyewa properti dengan
                  proses yang mudah, cepat, dan aman. Temukan properti yang
                  sesuai kebutuhan Anda dengan beragam pilihan dan fasilitas
                  lengkap."
                </p>
                <Link className="ltn__service-btn" to="/service-details">
                  Temukan Properti <i className="flaticon-right-arrow" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
              <div className="ltn__feature-icon">
                <img src={icon23} alt="#" />
              </div>
              <div className="ltn__feature-info">
                <h3>
                  <Link to="/service-details">Menjual Properti</Link>
                </h3>
                <p>
                  "Platform kami mempermudah penjualan properti dengan solusi
                  yang efisien dan cepat. Tingkatkan penjualan Anda dengan fitur
                  lengkap, pemasaran luas, dan dukungan pelanggan yang handal."
                </p>
                <Link className="ltn__service-btn" to="/service-details">
                  Temukan Properti <i className="flaticon-right-arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
