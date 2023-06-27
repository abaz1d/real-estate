import React, { useRef, useState } from "react"
import { updateUser } from "@/features/user/userSlice"
import { useDispatch } from "react-redux"

const ProfileUser = ({
  detail_users,
  fetchData,
  oldFiles,
  profileImage,
  setProfileImage,
  akun,
  setAkun,
}) => {
  const dispatch = useDispatch()
  const inputFileRef = useRef(null)

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
  const saveChangeAkun = async (e) => {
    try {
      document.querySelector(".quarter-overlay").style.display = "block"
      e.preventDefault()
      if (profileImage !== null) {
        const response = await dispatch(
          updateUser({
            ...akun,
            foto_user: profileImage,
            old_files: oldFiles,
            id_user: JSON.parse(localStorage.getItem("user")).userid,
          }),
        )

        if (response.payload.success) {
          fetchData()
        } else {
          if (
            response.payload.data.message === "username has been registered"
          ) {
            setAkun({
              ...akun,
              username: "",
            })
          }
        }
      }
      document.querySelector(".quarter-overlay").style.display = "none"
    } catch (error) {
      document.querySelector(".quarter-overlay").style.display = "none"
      console.error("saveChangeAkun", error)
    }
  }
  const changeForm = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setAkun({
      ...akun,
      [name]: value,
    })
  }
  return (
    <div className="ltn__myaccount-tab-content-inner">
      {/* comment-area */}
      <div className="ltn__comment-area mb-50 pt-5">
        <div className="ltn-author-introducing clearfix row">
          <div
            className="text-center col-md-4 profilepic border p-0 bg-dark"
            onClick={() => inputFileRef.current.click()}
          >
            {profileImage ? (
              <img src={URL.createObjectURL(profileImage)} alt="Profile" />
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
              <span className="profilepic__text">Edit Profile</span>
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
              {detail_users && detail_users.length >= 1
                ? detail_users[0].role
                : "Role"}
            </h6>
            <h2>
              {detail_users && detail_users.length >= 1
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
                      {detail_users && detail_users.length >= 1
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
                      <a
                        href={`tel:${
                          detail_users && detail_users.length >= 1
                            ? detail_users[0].wa_telephone[0]
                            : ""
                        }`}
                      >
                        {detail_users && detail_users.length >= 1
                          ? detail_users[0].wa_telephone[0] ===
                            detail_users[0].wa_telephone[1]
                            ? detail_users[0].wa_telephone[0]
                            : `${
                                detail_users[0].wa_telephone[0] +
                                " / " +
                                detail_users[0].wa_telephone[1]
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
                      <a
                        href={`mailto:${
                          detail_users && detail_users.length >= 1
                            ? detail_users[0].email_user
                            : "Email"
                        }`}
                      >
                        {detail_users && detail_users.length >= 1
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
          <form onSubmit={(e) => saveChangeAkun(e)}>
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
                    detail_users && detail_users.length >= 1
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
  )
}

export default ProfileUser
