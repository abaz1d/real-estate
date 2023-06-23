import React, { Component } from "react"
import { Link } from "react-router-dom"
import background from "@/assets/img/bg/14.jpg"

class Page_header extends Component {
  render() {
    let HeaderTitle = this.props.headertitle
    let Subheader = this.props.subheader ? this.props.subheader : HeaderTitle
    let CustomClass = this.props.customclass ? this.props.customclass : ""

    return (
      <div
        className={
          "ltn__breadcrumb-area text-left bg-overlay-white-30 bg-image " +
          CustomClass
        }
        data-bs-bg={background}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__breadcrumb-inner">
                <h1 className="page-title">{HeaderTitle}</h1>
                <div className="ltn__breadcrumb-list">
                  <ul>
                    <li>
                      <Link to="/">
                        <span className="ltn__secondary-color">
                          <i className="fas fa-home" />
                        </span>{" "}
                        Home
                      </Link>
                    </li>
                    <li>{Subheader}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Page_header
