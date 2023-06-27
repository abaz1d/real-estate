import React, { useState, useEffect } from "react"
import Swall from "sweetalert2"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { createUser } from "@/features/user/userSlice"

export default function RegisterForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [waTelp, setWaTelp] = useState(false)
  const [user, setUser] = useState({
    nama_lengkap: "",
    username: "",
    email_user: "",
    no_wa: "",
    no_telephone: "",
    password: "",
    role: "seller",
  })

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    //console.log(event.target);
    if (name === "no_wa" && waTelp) {
      setUser({
        ...user,
        [name]: value,
        no_telephone: value,
      })
    } else if (name === "no_telephone" && waTelp) {
      setUser({
        ...user,
        [name]: value,
        no_wa: value,
      })
    } else {
      setUser({
        ...user,
        [name]: value,
      })
    }
  }

  const registerUser = async (e) => {
    try {
      document.querySelector(".quarter-overlay").style.display = "block"
      e.preventDefault()
      let response = await dispatch(createUser(user))
      if (
        response.payload.username === user.username &&
        response.payload.success
      ) {
        Swall.fire({
          icon: "success",
          confirmButtonColor: "#ff5a3c",
          text: `Akun Anda Berhasil di Buat, Silahkan Login`,
        })
        setUser({
          nama_lengkap: "",
          username: "",
          email_user: "",
          no_wa: "",
          no_telephone: "",
          password: "",
          role: "seller",
        })
        navigate("/login")
      } else {
        if (response.payload.message === "username has been registered") {
          setUser({
            ...user,
            username: "",
          })
        }
      }
      document.querySelector(".quarter-overlay").style.display = "none"
    } catch (error) {
      document.querySelector(".quarter-overlay").style.display = "none"
      console.error("registerUser", error)
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
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Daftarkan <br />
                Akun Anda
              </h1>
              <p>
                Untuk memosting/ menambahkan Properti, <br />
                Anda harus Terdaftar dan Login terlebih dahulu.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <form
                onSubmit={(e) => registerUser(e)}
                className="ltn__form-box contact-form-box"
              >
                <input
                  required
                  value={user.nama_lengkap}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="nama_lengkap"
                  placeholder="Nama Lengkap*"
                />
                <input
                  required
                  value={user.username}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="username"
                  placeholder="Username*"
                />
                <input
                  required
                  value={user.email_user}
                  onChange={(e) => handleChange(e)}
                  type="email"
                  name="email_user"
                  placeholder="Email*"
                />
                <label className="checkbox-inline mt-0">
                  <input
                    value={waTelp}
                    onChange={() => {
                      setWaTelp(!waTelp)
                      if (user.no_wa === "") {
                        setUser({
                          ...user,
                          no_wa: user.no_telephone,
                        })
                      } else if (user.no_telephone === "") {
                        setUser({
                          ...user,
                          no_telephone: user.no_wa,
                        })
                      }
                    }}
                    type="checkbox"
                  />{" "}
                  &nbsp; Klik, jika nomor Telephone dan WhatsApp sama.
                </label>
                <input
                  required
                  value={user.no_wa}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="no_wa"
                  placeholder="No WhatsApp*"
                />
                <input
                  required
                  value={user.no_telephone}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="no_telephone"
                  placeholder="No Telepon*"
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
                <button
                  onClick={showPassword}
                  style={style}
                  type="button"
                  aria-label="open-button"
                >
                  <i
                    className="fa fa-eye my-0 js-password-label"
                    aria-hidden="true"
                  />
                </button>
                <label className="checkbox-inline">
                  <input required type="checkbox" />
                  &nbsp; I consent to Herboil processing my personal data in
                  order to send personalized marketing material in accordance
                  with the consent form and the privacy policy.
                </label>
                <label className="checkbox-inline">
                  <input required type="checkbox" /> &nbsp; By clicking "create
                  account", I consent to the privacy policy.
                </label>
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                    aria-label="submit-button"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </form>
              <div className="by-agree text-center">
                <p>By creating an account, you agree to our:</p>
                <p>
                  <a href="/#">
                    TERMS OF CONDITIONS &nbsp; &nbsp; | &nbsp; &nbsp; PRIVACY
                    POLICY
                  </a>
                </p>
                <div className="go-to-btn mt-50 go-top">
                  <Link to="/login">ALREADY HAVE AN ACCOUNT ?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
