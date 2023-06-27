import React, { useState, useEffect, useRef } from "react"
import moment from "moment"
import { Link, useNavigate } from "react-router-dom"
import { getImgUrl } from "@/utils/helper"
import { useSelector, useDispatch } from "react-redux"
import {
  selectUsers,
  readDetailUser,
  deleteStateUser,
} from "@/features/user/userSlice"
import { logoutAsync } from "@/features/auth/authSlice"
import { updateUser } from "@/features/user/userSlice"
import { removeProperti } from "@/features/properti/propertiSlice"
import AddListing from "@/components/section-components/add-listing"
import payment3 from "@/assets/img/icons/payment-3.png"

export default function MyAccount() {
  const user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState(null)
  const [oldFiles, setOldFiles] = useState(null)
  const detail_users = useSelector(selectUsers)
  const inputFileRef = useRef(null)
  const cellRef = useRef([])
  const [akun, setAkun] = useState({
    nama_lengkap: "",
    username: "",
    wa_user: "",
    telephone_user: "",
    role_user: "",
    email_user: "",
    alamat_user: "",
  })
  let [totalPages, setTotalPages] = useState(0)
  let [idDelete, setIdDelete] = useState("-")
  let [isDelete, setIsDelete] = useState(false)
  let [cari, setCari] = useState({
    page_number: 1,
    total_row_displayed: "3",
  })
  const fetchData = async () => {
    document.querySelector(".quarter-overlay").style.display = "block"
    let data = await dispatch(readDetailUser({ ...cari, id: user.userid }))

    if (data.payload.rows.length >= 1) {
      let detail = data.payload.rows[0]
      setAkun({
        nama_lengkap: detail.nama_lengkap,
        username: detail.username,
        wa_user: detail.wa_telephone[0],
        telephone_user: detail.wa_telephone[1],
        role_user: detail.role,
        email_user: detail.email_user,
        alamat_user: detail.alamat !== null ? detail.alamat : "",
      })
      if (detail.foto_user !== null) {
        const old_foto = await getImgUrl(detail.foto_user)
        let file = await urlToFile(
          import.meta.env.VITE_APP_BASE_API + "gambar_user/" + old_foto,
          `user_${detail.id_user}`,
        )
        setProfileImage(file)
        setOldFiles(old_foto)
      }
    }
    setTotalPages(data.payload.total_pages)
    document.querySelector(".quarter-overlay").style.display = "none"
  }
  const logOut = async () => {
    document.querySelector(".quarter-overlay").style.display = "block"
    await dispatch(logoutAsync())
    if (!localStorage.getItem("user")) {
      navigate("/login")
    }
    document.querySelector(".quarter-overlay").style.display = "block"
  }

  const handleProfileImageChange = (event) => {
    const files = event.target.files
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    const maxSize = 2 * 1024 * 1024 // 2MB

    const file = files[0]
    const fileType = file.type
    const fileSize = file.size

    if (allowedTypes.includes(fileType) && fileSize <= maxSize) {
      //console.log(file)
      setProfileImage(file)
    }
  }

  const urlToFile = function (url, filename) {
    let contentType = url.split(/[#?]/)[0].split(".").pop().trim()
    return fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new File([blob], filename + "." + contentType, {
            type: `image/${contentType}`,
          }),
      ) // Mengganti "filename" dengan nama file yang diinginkan
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (JSON.parse(localStorage.getItem("user")).userid !== undefined) {
        fetchData()
      } else {
        navigate("/login")
      }
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
    document.querySelector(".quarter-overlay").style.display = "block"
    const data = await dispatch(removeProperti(idDelete))
    //console.log("delete data", data.payload === idDelete)
    if (data.payload === idDelete) {
      await dispatch(deleteStateUser(idDelete))
      setIsDelete(false)
    }
    document.querySelector(".quarter-overlay").style.display = "none"
    //setIdDelete(event)
  }
  const deleteGet = (event) => {
    setIsDelete(true)
    setIdDelete(event)
  }
  const getImg = function (buffer) {
    const gambars = getImgUrl(buffer)

    return import.meta.env.VITE_APP_BASE_API + "gambar_properti/" + gambars[0]
  }
  const changeForm = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    //console.log(event.target);
    setAkun({
      ...akun,
      [name]: value,
    })
  }
  const saveAkun = async (e) => {
    document.querySelector(".quarter-overlay").style.display = "block"
    e.preventDefault()
    if (profileImage !== null) {
      await dispatch(
        updateUser({
          ...akun,
          foto_user: profileImage,
          old_files: oldFiles,
          id_user: JSON.parse(localStorage.getItem("user")).userid,
        }),
      )
    }
    document.querySelector(".quarter-overlay").style.display = "none"
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
                              {detail_users.length >= 1
                                ? detail_users[0].nama_lengkap
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
                          <div className="ltn__comment-area mb-50 pt-5">
                            <div className="ltn-author-introducing clearfix row">
                              <div
                                className="text-center col-md-4 profilepic border p-0 bg-dark"
                                onClick={() => inputFileRef.current.click()}
                              >
                                {profileImage ? (
                                  <img
                                    src={URL.createObjectURL(profileImage)}
                                    alt="Profile"
                                  />
                                ) : (
                                  <img
                                    src={
                                      "https://www.tunatheme.com/tf/html/quarter-preview/quarter/img/blog/author.jpg"
                                    }
                                    alt="Author Gambar"
                                  />
                                )}

                                <div className="profilepic__content">
                                  <span className="profilepic__icon">
                                    <i className="fas fa-camera"></i>
                                  </span>
                                  <span className="profilepic__text">
                                    Edit Profile
                                  </span>
                                  {/* Add other content or styling */}
                                </div>
                                <input
                                  type="file"
                                  accept=".jpg, .jpeg, .png"
                                  className="d-none"
                                  ref={inputFileRef}
                                  onChange={(e) => handleProfileImageChange(e)}
                                />
                              </div>
                              <div className="author-info col-md-8 ">
                                <h6 className="text-uppercase">
                                  {detail_users.length >= 1
                                    ? detail_users[0].role
                                    : "Role"}
                                </h6>
                                <h2>
                                  {detail_users.length >= 1
                                    ? detail_users[0].nama_lengkap
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
                                          {detail_users.length >= 1
                                            ? detail_users[0].alamat
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
                                            {detail_users.length >= 1
                                              ? detail_users[0]
                                                  .wa_telephone[0] ===
                                                detail_users[0].wa_telephone[1]
                                                ? detail_users[0]
                                                    .wa_telephone[0]
                                                : `${
                                                    detail_users[0]
                                                      .wa_telephone[0] +
                                                    "/" +
                                                    detail_users[0]
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
                                            {detail_users.length >= 1
                                              ? detail_users[0].email_user
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
                              <form onSubmit={(e) => saveAkun(e)}>
                                <div className="row mb-50">
                                  <div className="col-md-6">
                                    <label>Nama Lengkap:</label>
                                    <input
                                      type="text"
                                      name="nama_lengkap"
                                      value={akun.nama_lengkap}
                                      onChange={(e) => changeForm(e)}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Username:</label>
                                    <input
                                      type="text"
                                      name="username"
                                      value={akun.username}
                                      onChange={(e) => changeForm(e)}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>WhatsApp:</label>
                                    <input
                                      type="text"
                                      name="wa_user"
                                      value={akun.wa_user}
                                      onChange={(e) => changeForm(e)}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Telephone:</label>
                                    <input
                                      type="text"
                                      name="telephone_user"
                                      value={akun.telephone_user}
                                      onChange={(e) => changeForm(e)}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Jabatan:</label>
                                    <input
                                      type="text"
                                      name="role_user"
                                      value={
                                        detail_users.length >= 1
                                          ? detail_users[0].role
                                          : "Jabatan/ Role"
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Email:</label>
                                    <input
                                      type="email"
                                      name="email_user"
                                      value={akun.email_user}
                                      onChange={(e) => changeForm(e)}
                                    />
                                  </div>
                                  <div className="col-md-12">
                                    <label>Alamat:</label>
                                    <textarea
                                      name="alamat_user"
                                      cols="30"
                                      rows="10"
                                      value={akun.alamat_user}
                                      onChange={(e) => changeForm(e)}
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
                                {detail_users.length >= 1 &&
                                  detail_users.map((item, index) => (
                                    <tr key={index}>
                                      <td className="ltn__my-properties-img go-top">
                                        <Link
                                          to={`/product-details/${item.id_properti}`}
                                          style={{ height: "250px" }}
                                        >
                                          <img
                                            height={"auto"}
                                            width={"100%"}
                                            src={
                                              item.foto_produk === null
                                                ? "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/1.jpg"
                                                : getImg(item.foto_produk[0])
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
                                          <i className="fa fa-edit" /> Edit
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
                                        <Link tp="#" className="text-danger">
                                          <i className="fa-solid fa-trash-can" />{" "}
                                          Delete
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                {detail_users.length < 1 && (
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
                                      PayPal <img src={payment3} alt="gambar" />
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
