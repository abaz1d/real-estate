import React, { useState, useEffect } from "react"
import Slider from "react-slick"

function SampleNextArrow(props) {
  const { onClick } = props
  return (
    <a className="slick-next slick-arrow" onClick={onClick}>
      <i className="fas fa-arrow-right" alt="Arrow Icon"></i>
    </a>
  )
}

function SamplePrevArrow(props) {
  const { onClick } = props
  return (
    <a className="slick-prev slick-arrow" onClick={onClick}>
      <i className="fas fa-arrow-left" alt="Arrow Icon"></i>
    </a>
  )
}

export default function ProductSliderV1({ images }) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    lazyLoad: true,
    slidesToShow: 3,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <>
      <div className="ltn__img-slider-area mb-25 mt-50">
        <div className="container-fluid">
          <Slider
            {...settings}
            className="row ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all"
          >
            {images.map((item, index) => (
              <div key={index} className="col-lg-12">
                <div className="ltn__img-slide-item-4">
                  <a
                    className="d-flex justify-content-center"
                    href={
                      import.meta.env.VITE_APP_BASE_API +
                      "gambar_properti/" +
                      item
                    }
                    data-rel="lightcase:myCollection"
                  >
                    <img
                      height={"250px"}
                      width={"auto"}
                      src={
                        import.meta.env.VITE_APP_BASE_API +
                        "gambar_properti/" +
                        item
                      }
                      alt={"gambar" + index}
                    />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}
