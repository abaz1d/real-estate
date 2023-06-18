import React from "react";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <a className="slick-next slick-arrow" onClick={onClick}>
      <i className="fas fa-arrow-right" alt="Arrow Icon"></i>
    </a>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <a className="slick-prev slick-arrow" onClick={onClick}>
      <i className="fas fa-arrow-left" alt="Arrow Icon"></i>
    </a>
  );
}

export default function ProductSliderV1() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
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
  };
  return (
    <div className="ltn__img-slider-area mb-90">
      <div className="container-fluid">
        <Slider
          {...settings}
          className="row ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all"
        >
          <div className="col-lg-12">
            <div className="ltn__img-slide-item-4">
              <a
                href="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/31.jpg"
                data-rel="lightcase:myCollection"
              >
                <img
                  src="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/31.jpg"
                  alt="gambar"
                />
              </a>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="ltn__img-slide-item-4">
              <a
                href="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/32.jpg"
                data-rel="lightcase:myCollection"
              >
                <img
                  src="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/32.jpg"
                  alt="gambar"
                />
              </a>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="ltn__img-slide-item-4">
              <a
                href="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/33.jpg"
                data-rel="lightcase:myCollection"
              >
                <img
                  src="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/33.jpg"
                  alt="gambar"
                />
              </a>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="ltn__img-slide-item-4">
              <a
                href="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/34.jpg"
                data-rel="lightcase:myCollection"
              >
                <img
                  src="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/34.jpg"
                  alt="gambar"
                />
              </a>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="ltn__img-slide-item-4">
              <a
                href="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/35.jpg"
                data-rel="lightcase:myCollection"
              >
                <img
                  src="https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/img-slide/35.jpg"
                  alt="gambar"
                />
              </a>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
