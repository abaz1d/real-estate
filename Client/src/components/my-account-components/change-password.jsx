import React, { useState } from "react"
import Swall from "sweetalert2"
import { useDispatch } from "react-redux"
import { updatePass } from "@/features/user/userSlice"

const ChangePass = (props) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
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
  const savePassword = async (e) => {
    try {
      document.querySelector(".quarter-overlay").style.display = "block"
      e.preventDefault()
      if (user.new_password === user.confirm_password) {
        const response = await dispatch(
          updatePass({
            ...user,
            id_user: JSON.parse(localStorage.getItem("user")).userid,
          }),
        )
        if (response.payload.success) {
          setUser({
            current_password: "",
            new_password: "",
            confirm_password: "",
          })
          Swall.fire({
            icon: "success",
            confirmButtonColor: "#ff5a3c",
            text: `Password Anda Berhasil di Perbarui`,
          })
        } else {
          if (response.payload.data.message === "password lama salah") {
            setUser({
              ...user,
              current_password: "",
            })
          } else if (
            response.payload.data.message ===
            "password baru tidak boleh sama dengan password lama"
          ) {
            setUser({
              ...user,
              new_password: "",
              confirm_password: "",
            })
          }
        }
      } else {
        Swall.fire({
          icon: "error",
          title: "Oops...",
          confirmButtonColor: "#ff5a3c",
          text: `Password Baru dan Konfirmasi Password Baru Harus Sama !`,
          footer:
            "<span class='text-danger'>Kesalahan Memperbarui Password User</span>",
        })
      }
      document.querySelector(".quarter-overlay").style.display = "none"
    } catch (error) {
      document.querySelector(".quarter-overlay").style.display = "none"
      console.error("savePassword", error)
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
  const showPassword = (e) => {
    const password = document.querySelector(`.js-password-${e}`),
      passwordButton = document.querySelector(`.js-password-label-${e}`)

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
    <div className="ltn__myaccount-tab-content-inner">
      <div className="account-login-inner">
        <form
          onSubmit={(e) => savePassword(e)}
          className="ltn__form-box contact-form-box"
        >
          <h5 className="mb-30">Change Password</h5>

          <input
            required
            value={user.current_password}
            onChange={(e) => handleChange(e)}
            type="password"
            name="current_password"
            placeholder="Current Password*"
            className="js-password-current"
          />
          <button
            onClick={() => showPassword("current")}
            style={style}
            type="button"
            aria-label="open-button"
          >
            <i
              className="fa fa-eye my-0 js-password-label-current"
              aria-hidden="true"
            />
          </button>
          <input
            required
            value={user.new_password}
            onChange={(e) => handleChange(e)}
            type="password"
            name="new_password"
            placeholder="New Password*"
            className="js-password-new"
          />
          <button
            onClick={() => showPassword("new")}
            style={style}
            type="button"
            aria-label="open-button"
          >
            <i
              className="fa fa-eye my-0 js-password-label-new"
              aria-hidden="true"
            />
          </button>
          <input
            required
            value={user.confirm_password}
            onChange={(e) => handleChange(e)}
            type="password"
            name="confirm_password"
            placeholder="Confirm New Password*"
            className="js-password-confirm"
          />
          <button
            onClick={() => showPassword("confirm")}
            style={style}
            type="button"
            aria-label="open-button"
          >
            <i
              className="fa fa-eye my-0 js-password-label-confirm"
              aria-hidden="true"
            />
          </button>
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
  )
}

export default ChangePass
