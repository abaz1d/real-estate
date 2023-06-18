import React, { Component } from "react";
import Slider from "react-slick";

class ProductSliderV1 extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
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
}

export default ProductSliderV1;
