import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginAsync } from "@/features/auth/authSlice"

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    input_user: "",
    password: "",
  })
  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    //console.log(event.target);
    setUser({
      ...user,
      [name]: value,
    })
  }
  const saveUser = async (e) => {
    e.preventDefault()
    await dispatch(loginAsync(user))
    if (localStorage.getItem("user")) {
      navigate("/my-account")
    }
  }
  const style = {
    position: "absolute",
    right: "10%",
    marginTop: "5px",
    height: "55px",
    padding: "10px 15px",
    borderRadius: "10px",
    backgroundColor: "var(--ltn__secondary-color)",
    color: "var(--white)",
    border: "1px solid",
  }
  const showPassword = () => {
    const password = document.querySelector(".js-password"),
      passwordButton = document.querySelector(".js-password-label")

    if (password.type === "password") {
      password.type = "text"
      passwordButton.classList.replace("fa-eye", "fa-eye-slash")
    } else {
      password.type = "password"
      passwordButton.classList.replace("fa-eye-slash", "fa-eye")
    }
    password.focus()
  }
  return (
    <div>
      <div className="ltn__login-area pb-65">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area text-center">
                <h1 className="section-title">
                  Masuk <br />
                  Kedalam Akun Anda
                </h1>
                <p>
                  Untuk memosting/ menambahkan Properti, Anda harus Login
                  terlebih dahulu
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="account-login-inner">
                <form
                  onSubmit={(e) => saveUser(e)}
                  className="ltn__form-box contact-form-box"
                >
                  <input
                    required
                    onChange={(e) => handleChange(e)}
                    value={user.input_user}
                    name="input_user"
                    type="text"
                    placeholder="Email/ Username*"
                  />
                  <input
                    required
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                    placeholder="Password*"
                    className="js-password"
                  />
                  <button onClick={showPassword} style={style} type="button">
                    <i
                      className="fa fa-eye my-0 js-password-label"
                      aria-hidden="true"
                    />
                  </button>

                  <div className="btn-wrapper mt-0">
                    <button className="theme-btn-1 btn btn-block" type="submit">
                      SIGN IN
                    </button>
                  </div>
                  <div className="go-to-btn mt-20">
                    <a
                      href="/#"
                      title="Forgot Password?"
                      data-bs-toggle="modal"
                      data-bs-target="#ltn_forget_password_modal"
                    >
                      <small>LUPA KATA SANDI ?</small>
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="account-create text-center pt-50">
                <h4>BELUM MEMILIKI AKUN ?</h4>
                <p>
                  Tambahkan item ke daftar properti Anda dapatkan rekomendasi
                  yang dipersonalisasi <br /> lihat lebih cepat daftar properti
                  Anda
                </p>
                <div className="btn-wrapper go-top">
                  <Link to="/register" className="theme-btn-1 btn black-btn">
                    BUAT AKUN
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__modal-area ltn__add-to-cart-modal-area----">
        <div
          className="modal fade"
          id="ltn_forget_password_modal"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
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
                        <div className="modal-product-info text-center">
                          <h4>FORGET PASSWORD?</h4>
                          <p className="added-cart">
                            {" "}
                            Enter you register email.
                          </p>
                          <form action="#" className="ltn__form-box">
                            <input
                              type="text"
                              name="email"
                              placeholder="Type your register email*"
                            />
                            <div className="btn-wrapper mt-0">
                              <button
                                className="theme-btn-1 btn btn-full-width-2"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                        {/* additional-info */}
                        <div className="additional-info d-none">
                          <p>
                            We want to give you <b>10% discount</b> for your
                            first order, <br /> Use discount code at checkout
                          </p>
                          <div className="payment-method">
                            <img src={"assets/img/icons/payment.png"} alt="#" />
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
