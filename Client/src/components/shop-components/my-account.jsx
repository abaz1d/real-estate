import React, { useState, useEffect, useRef } from "react"
import moment from "moment"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  selectUsers,
  readDetailUser,
  deleteStateUser,
} from "@/features/user/userSlice"
import { logoutAsync } from "@/features/auth/authSlice"
import { removeProperti } from "@/features/properti/propertiSlice"
import AddListing from "@/components/section-components/add-listing"

export default function MyAccount() {
  const user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const detail_user = useSelector(selectUsers)
  const cellRef = useRef([])
  let [totalPages, setTotalPages] = useState(0)
  let [idDelete, setIdDelete] = useState("-")
  let [isDelete, setIsDelete] = useState(false)
  let [cari, setCari] = useState({
    page_number: 1,
    total_row_displayed: "3",
  })
  const fetchData = async () => {
    let data = await dispatch(readDetailUser({ ...cari, id: user.userid }))

    setTotalPages(data.payload.total_pages)
  }
  const logOut = async () => {
    await dispatch(logoutAsync())
    if (!localStorage.getItem("user")) {
      navigate("/login")
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      fetchData()
    }
  }, [dispatch, cari])
  const handleChange = (event) => {
    if (event === "increment") {
      setCari({
        ...cari,
        page_number: cari.page_number + 1,
      })
    } else if (event === "decrement") {
      setCari({
        ...cari,
        page_number: cari.page_number - 1,
      })
    } else {
      const target = event.target
      const value = target.value
      const name = target.name
      setCari({
        ...cari,
        [name]: value,
      })
    }
  }
  const deletePost = async () => {
    const data = await dispatch(removeProperti(idDelete))
    //console.log("delete data", data.payload === idDelete)
    if (data.payload === idDelete) {
      await dispatch(deleteStateUser(idDelete))
      setIsDelete(false)
    }
    //setIdDelete(event)
  }
  const deleteGet = (event) => {
    setIsDelete(true)
    setIdDelete(event)
  }
  return (
    <div className="liton__wishlist-area pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* PRODUCT TAB AREA START */}
            <div className="ltn__product-tab-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div
                      className="ltn__tab-menu-list sticky-sm-top mb-50"
                      style={{ top: "15%" }}
                    >
                      <div className="nav">
                        <a
                          className="active show"
                          data-bs-toggle="tab"
                          href="#ltn_tab_1_1"
                        >
                          Dashboard <i className="fas fa-home" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_2">
                          Profiles <i className="fas fa-user" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_3">
                          My Properties <i className="fa-solid fa-list" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_4">
                          Add Property{" "}
                          <i className="fa-solid fa-map-location-dot" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_5">
                          Payments{" "}
                          <i className="fa-solid fa-money-check-dollar" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_6">
                          Change Password <i className="fa-solid fa-lock" />
                        </a>
                        <a
                          href="/#"
                          title="Log Out ?"
                          data-bs-toggle="modal"
                          data-bs-target="#log_out_modal"
                        >
                          Logout <i className="fas fa-sign-out-alt" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="ltn_tab_1_1"
                      >
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            Hello{" "}
                            <strong>
                              {detail_user.length >= 1
                                ? detail_user[0].nama_lengkap
                                : "Nama Lengkap"}
                            </strong>
                            , Selamat Datang Kembali{" "}
                          </p>
                          <p>
                            From your account dashboard you can view your{" "}
                            <span>recent orders</span>, manage your{" "}
                            <span>shipping and billing addresses</span>, and{" "}
                            <span>edit your password and account details</span>.
                          </p>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_2">
                        <div className="ltn__myaccount-tab-content-inner">
                          {/* comment-area */}
                          <div className="ltn__comment-area mb-50">
                            <div className="ltn-author-introducing clearfix">
                              <div className="author-img">
                                <img
                                  src={
                                    "https://www.tunatheme.com/tf/html/quarter-preview/quarter/img/blog/author.jpg"
                                  }
                                  alt="Author Gambar"
                                />
                              </div>
                              <div className="author-info">
                                <h6 className="text-uppercase">
                                  {detail_user.length >= 1
                                    ? detail_user[0].role
                                    : "Role"}
                                </h6>
                                <h2>
                                  {detail_user.length >= 1
                                    ? detail_user[0].nama_lengkap
                                    : "Nama Lengkap"}
                                </h2>
                                <div className="footer-address">
                                  <ul>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-placeholder" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>
                                          {detail_user.length >= 1
                                            ? detail_user[0].alamat
                                            : "Alamat"}
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-call" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>
                                          <a href="tel:+0123-456789">
                                            {detail_user.length >= 1
                                              ? detail_user[0]
                                                  .wa_telephone[0] ===
                                                detail_user[0].wa_telephone[1]
                                                ? detail_user[0].wa_telephone[0]
                                                : `${
                                                    detail_user[0]
                                                      .wa_telephone[0] +
                                                    "/" +
                                                    detail_user[0]
                                                      .wa_telephone[1]
                                                  }`
                                              : "Kontak"}
                                          </a>
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-mail" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>
                                          <a href="mailto:example@example.com">
                                            {detail_user.length >= 1
                                              ? detail_user[0].email_user
                                              : "Email"}
                                          </a>
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="ltn__form-box">
                              <form action="#">
                                <div className="row mb-50">
                                  <div className="col-md-6">
                                    <label>First name:</label>
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      value={
                                        detail_user.length >= 1
                                          ? detail_user[0].nama_lengkap.split(
                                              " ",
                                            )[0]
                                          : "First Name"
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Last name:</label>
                                    <input
                                      type="text"
                                      name="ltn__lastname"
                                      value={
                                        detail_user.length >= 1
                                          ? detail_user[0].nama_lengkap.split(
                                              " ",
                                            )[1]
                                          : "Last Name"
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>WhatsApp:</label>
                                    <input
                                      type="text"
                                      name="ltn__lastname"
                                      value={
                                        detail_user.length >= 1
                                          ? detail_user[0].wa_telephone[0]
                                          : "Username"
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Telephone:</label>
                                    <input
                                      type="email"
                                      name="ltn__lastname"
                                      value={
                                        detail_user.length >= 1
                                          ? detail_user[0].wa_telephone[1]
                                          : "Email"
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Username:</label>
                                    <input
                                      type="text"
                                      name="ltn__lastname"
                                      value={
                                        detail_user.length >= 1
                                          ? detail_user[0].username
                                          : "Username"
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Display Email:</label>
                                    <input
                                      type="email"
                                      name="ltn__lastname"
                                      value={
                                        detail_user.length >= 1
                                          ? detail_user[0].email_user
                                          : "Email"
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-12">
                                    <label>Alamat:</label>
                                    <textarea
                                      name="alamat"
                                      cols="30"
                                      rows="10"
                                      value={
                                        detail_user.length >= 1
                                          ? detail_user[0].alamat === null
                                            ? ""
                                            : detail_user[0].alamat
                                          : "Alamat"
                                      }
                                      readOnly
                                    ></textarea>
                                  </div>
                                  <div className="btn-wrapper">
                                    <button
                                      type="submit"
                                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                      aria-label="submit-button"
                                    >
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_3">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="ltn__my-properties-table table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">My Properties</th>
                                  <th scope="col" />
                                  <th scope="col">Date Added</th>
                                  <th scope="col">Actions</th>
                                  <th scope="col">Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {detail_user.length >= 1 &&
                                  detail_user.map((item, index) => (
                                    <tr key={index}>
                                      <td className="ltn__my-properties-img go-top">
                                        <Link
                                          to={`/product-details/${item.id_properti}`}
                                        >
                                          <img
                                            src={
                                              "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/1.jpg"
                                            }
                                            alt={"gambar" + index}
                                          />
                                          <span
                                            style={{ marginTop: "-3px" }}
                                            className="mb-0 py-0 d-flex justify-content-center align-items-center input-group-text border"
                                          >
                                            {item.id_properti}
                                          </span>
                                        </Link>
                                      </td>
                                      <td>
                                        <div className="ltn__my-properties-info">
                                          <h6 className="mb-10 go-top">
                                            <Link
                                              to={`/product-details/${item.id_properti}`}
                                            >
                                              {item.judul}
                                            </Link>
                                          </h6>
                                          <small>
                                            <i className="icon-placeholder" />{" "}
                                            {item.kota}, {item.provinsi}
                                          </small>
                                          <div className="product-ratting">
                                            <ul>
                                              <li
                                                className={
                                                  (item.kategori === "Jual"
                                                    ? "bg-green "
                                                    : "bg-orange ") +
                                                  "py-1 px-2 border border-primary fs-6"
                                                }
                                              >
                                                {item.kategori}
                                              </li>
                                              <li className="ltn__blog-category">
                                                <Link
                                                  className="bg-primary"
                                                  to="#"
                                                >
                                                  {item.jenis_properti}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        {moment(item.di_buat).format(
                                          "DD MMMM YYYY",
                                        )}
                                      </td>
                                      <td>
                                        <Link
                                          to={`/add-listing?id_properti=${item.id_properti}`}
                                        >
                                          Edit
                                        </Link>
                                      </td>
                                      <td
                                        ref={(ele) =>
                                          (cellRef.current[index] = ele)
                                        }
                                        onClick={() =>
                                          deleteGet(item.id_properti)
                                        }
                                      >
                                        <Link tp="#">
                                          <i className="fa-solid fa-trash-can" />
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                {detail_user.length < 1 && (
                                  <tr className="text-center text-secondary fs-2 w-100">
                                    <td colSpan={5}>
                                      Tidal Ada Data Di Temukan
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="ltn__pagination-area text-center">
                            <div className="ltn__pagination">
                              <ul>
                                <li>
                                  <a
                                    onClick={() => handleChange("decrement")}
                                    className={
                                      cari.page_number === 1 ? "d-none" : ""
                                    }
                                  >
                                    <i className="fas fa-angle-double-left" />
                                  </a>
                                </li>
                                <li className="active">
                                  <a>{cari.page_number}</a>
                                </li>
                                <li>dari</li>
                                <li>
                                  <a>{totalPages}</a>
                                </li>
                                <li>
                                  <a
                                    onClick={() => handleChange("increment")}
                                    className={
                                      cari.page_number >= parseInt(totalPages)
                                        ? "d-none"
                                        : ""
                                    }
                                  >
                                    <i className="fas fa-angle-double-right" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_4">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="ltn__checkout-single-content ltn__returning-customer-wrap">
                            <h5>
                              Untuk tampilan form yang lebih besar,{" "}
                              <Link className="btn-link" to={`/add-listing`}>
                                Klik disini
                              </Link>
                            </h5>
                          </div>
                          <AddListing />
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_5">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="ltn__checkout-inner">
                                <div className="ltn__checkout-single-content ltn__returning-customer-wrap">
                                  <h5>
                                    Returning customer?{" "}
                                    <a
                                      className="ltn__secondary-color"
                                      href="#ltn__returning-customer-login"
                                      data-toggle="collapse"
                                    >
                                      Click here to login
                                    </a>
                                  </h5>
                                  <div
                                    id="ltn__returning-customer-login"
                                    className="collapse ltn__checkout-single-content-info"
                                  >
                                    <div className="ltn_coupon-code-form ltn__form-box">
                                      <p>Please login your accont.</p>
                                      <form action="#">
                                        <div className="row">
                                          <div className="col-md-6">
                                            <div className="input-item input-item-name ltn__custom-icon">
                                              <input
                                                type="text"
                                                name="ltn__name"
                                                placeholder="Enter your name"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="input-item input-item-email ltn__custom-icon">
                                              <input
                                                type="email"
                                                name="ltn__email"
                                                placeholder="Enter email address"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <button
                                          className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                          aria-label="login-button"
                                        >
                                          Login
                                        </button>
                                        <label className="input-info-save mb-0">
                                          <input type="checkbox" name="agree" />{" "}
                                          Remember me
                                        </label>
                                        <p className="mt-30">
                                          <a href="register.html">
                                            Lost your password?
                                          </a>
                                        </p>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <div className="ltn__checkout-single-content ltn__coupon-code-wrap">
                                  <h5>
                                    Have a coupon?{" "}
                                    <a
                                      className="ltn__secondary-color"
                                      href="#ltn__coupon-code"
                                      data-toggle="collapse"
                                    >
                                      Click here to enter your code
                                    </a>
                                  </h5>
                                  <div
                                    id="ltn__coupon-code"
                                    className="collapse ltn__checkout-single-content-info"
                                  >
                                    <div className="ltn__coupon-code-form">
                                      <p>
                                        If you have a coupon code, please apply
                                        it below.
                                      </p>
                                      <form action="#">
                                        <input
                                          type="text"
                                          name="coupon-code"
                                          placeholder="Coupon code"
                                        />
                                        <button
                                          aria-label="apply-button"
                                          className="btn theme-btn-2 btn-effect-2 text-uppercase"
                                        >
                                          Apply Coupon
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <div className="ltn__checkout-single-content mt-50">
                                  <h4 className="title-2">Billing Details</h4>
                                  <div className="ltn__checkout-single-content-info">
                                    <form action="#">
                                      <h6>Personal Information</h6>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="input-item input-item-name ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__name"
                                              placeholder="First name"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-name ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__lastname"
                                              placeholder="Last name"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-email ltn__custom-icon">
                                            <input
                                              type="email"
                                              name="ltn__email"
                                              placeholder="email address"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-phone ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__phone"
                                              placeholder="phone number"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-website ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__company"
                                              placeholder="Company name (optional)"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-website ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__phone"
                                              placeholder="Company address (optional)"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-4 col-md-6">
                                          <h6>Country</h6>
                                          <div className="input-item">
                                            <select className="nice-select">
                                              <option>Select Country</option>
                                              <option>Australia</option>
                                              <option>Canada</option>
                                              <option>China</option>
                                              <option>Morocco</option>
                                              <option>Saudi Arabia</option>
                                              <option>
                                                United Kingdom (UK)
                                              </option>
                                              <option>
                                                United States (US)
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                          <h6>Address</h6>
                                          <div className="row">
                                            <div className="col-md-6">
                                              <div className="input-item">
                                                <input
                                                  type="text"
                                                  placeholder="House number and street name"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-md-6">
                                              <div className="input-item">
                                                <input
                                                  type="text"
                                                  placeholder="Apartment, suite, unit etc. (optional)"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                          <h6>Town / City</h6>
                                          <div className="input-item">
                                            <input
                                              type="text"
                                              placeholder="City"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                          <h6>State </h6>
                                          <div className="input-item">
                                            <input
                                              type="text"
                                              placeholder="State"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                          <h6>Zip</h6>
                                          <div className="input-item">
                                            <input
                                              type="text"
                                              placeholder="Zip"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <p>
                                        <label className="input-info-save mb-0">
                                          <input type="checkbox" name="agree" />{" "}
                                          Create an account?
                                        </label>
                                      </p>
                                      <h6>Order Notes (optional)</h6>
                                      <div className="input-item input-item-textarea ltn__custom-icon">
                                        <textarea
                                          name="ltn__message"
                                          placeholder="Notes about your order, e.g. special notes for delivery."
                                          defaultValue={""}
                                        />
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="ltn__checkout-payment-method mt-50">
                                <h4 className="title-2">Payment Method</h4>
                                <div id="checkout_accordion_1">
                                  {/* card */}
                                  <div className="card">
                                    <h5
                                      className="collapsed ltn__card-title"
                                      data-toggle="collapse"
                                      data-target="#faq-item-2-1"
                                    >
                                      Check payments
                                    </h5>
                                    <div
                                      id="faq-item-2-1"
                                      className="collapse"
                                      data-parent="#checkout_accordion_1"
                                    >
                                      <div className="card-body">
                                        <p>
                                          Please send a check to Store Name,
                                          Store Street, Store Town, Store State
                                          / County, Store Postcode.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* card */}
                                  <div className="card">
                                    <h5
                                      className="ltn__card-title"
                                      data-toggle="collapse"
                                      data-target="#faq-item-2-2"
                                    >
                                      Cash on delivery
                                    </h5>
                                    <div
                                      id="faq-item-2-2"
                                      className="collapse show"
                                      data-parent="#checkout_accordion_1"
                                    >
                                      <div className="card-body">
                                        <p>Pay with cash upon delivery.</p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* card */}
                                  <div className="card">
                                    <h5
                                      className="collapsed ltn__card-title"
                                      data-toggle="collapse"
                                      data-target="#faq-item-2-3"
                                    >
                                      PayPal{" "}
                                      <img
                                        src={"assets/img/icons/payment-3.png"}
                                        alt="gambar"
                                      />
                                    </h5>
                                    <div
                                      id="faq-item-2-3"
                                      className="collapse"
                                      data-parent="#checkout_accordion_1"
                                    >
                                      <div className="card-body">
                                        <p>
                                          Pay via PayPal; you can pay with your
                                          credit card if you don’t have a PayPal
                                          account.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="ltn__payment-note mt-30 mb-30">
                                  <p>
                                    Your personal data will be used to process
                                    your order, support your experience
                                    throughout this website, and for other
                                    purposes described in our privacy policy.
                                  </p>
                                </div>
                                <button
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                  type="submit"
                                  aria-label="submit-button"
                                >
                                  Place order
                                </button>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="shoping-cart-total mt-50">
                                <h4 className="title-2">Cart Totals</h4>
                                <table className="table">
                                  <tbody>
                                    <tr>
                                      <td>
                                        3 Rooms Manhattan <strong>× 2</strong>
                                      </td>
                                      <td>$298.00</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        OE Replica Wheels <strong>× 2</strong>
                                      </td>
                                      <td>$170.00</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Wheel Bearing Retainer{" "}
                                        <strong>× 2</strong>
                                      </td>
                                      <td>$150.00</td>
                                    </tr>
                                    <tr>
                                      <td>Shipping and Handing</td>
                                      <td>$15.00</td>
                                    </tr>
                                    <tr>
                                      <td>Vat</td>
                                      <td>$00.00</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong>Order Total</strong>
                                      </td>
                                      <td>
                                        <strong>$633.00</strong>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_6">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="account-login-inner">
                            <form
                              action="#"
                              className="ltn__form-box contact-form-box"
                            >
                              <h5 className="mb-30">Change Password</h5>
                              <input
                                type="password"
                                name="password"
                                placeholder="Current Password*"
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="New Password*"
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Confirm New Password*"
                              />
                              <div className="btn-wrapper mt-0">
                                <button
                                  className="theme-btn-1 btn btn-block"
                                  type="submit"
                                  aria-label="save-button"
                                >
                                  Save Changes
                                </button>
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
            {/* PRODUCT TAB AREA END */}
            <div className="modal fade" id="log_out_modal" tabIndex={-1}>
              <div className="modal-dialog modal-md" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close bg-danger text-white"
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
                            <div className="modal-product-info text-center pt-5">
                              <hr />
                              <h4>Apakah Anda Yakin Ingin Keluar ?</h4>
                              <hr />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="bg-white py-2 px-3 border border-secondary"
                      data-bs-dismiss="modal"
                      aria-label="modal-button"
                    >
                      Cancel
                    </button>
                    <button
                      data-bs-dismiss="modal"
                      onClick={() => logOut()}
                      type="button"
                      className="py-2 px-3 btn-danger"
                      aria-label="modal-button"
                    >
                      Ya, Keluar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {isDelete && (
              <div className="fixed-top" id={idDelete} tabIndex={-1}>
                <div className="modal-dialog modal-md" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close bg-danger text-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setIsDelete(false)}
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="ltn__quick-view-modal-inner">
                        <div className="modal-product-item">
                          <div className="row">
                            <div className="col-12">
                              <div className="modal-product-info text-center pt-5">
                                <hr />
                                <h4>Apakah Anda Yakin ?</h4>
                                <p>
                                  Menghapus Data <b>{idDelete}</b> ?
                                </p>
                                <hr />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="bg-white py-2 px-3 border border-secondary"
                        data-bs-dismiss="modal"
                        aria-label="close-button"
                        onClick={() => setIsDelete(false)}
                      >
                        Cancel
                      </button>
                      <button
                        data-bs-dismiss="modal"
                        aria-label="close-button"
                        onClick={() => deletePost()}
                        type="button"
                        className="py-2 px-3 btn-danger"
                      >
                        Ya, Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
