import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getImgUrl } from "@/utils/helper"
import { useSelector, useDispatch } from "react-redux"
import {
  selectUsers,
  readDetailUser,
  deleteStateUser,
} from "@/features/user/userSlice"
import { logoutAsync } from "@/features/auth/authSlice"
import { removeProperti } from "@/features/properti/propertiSlice"
import AddListing from "@/components/section-components/add-listing"
import DashboardAccount from "./dashboard-account"
import ChangePass from "./change-password"
import ProfileUser from "./profile-user"
import MyProperties from "./my-properties"

export default function MyAccount() {
  const user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState(null)
  const [oldFiles, setOldFiles] = useState(null)
  const detail_users = useSelector(selectUsers)
  const cellRef = useRef([])
  const deleteRef = useRef(null)
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
  let [cari, setCari] = useState({
    searchData: "",
    page_number: 1,
    total_row_displayed: "3",
  })
  const fetchData = async () => {
    try {
      document.querySelector(".quarter-overlay").style.display = "block"
      let data = await dispatch(readDetailUser({ ...cari, id: user.userid }))
      if (data.payload.rows.length >= 1) {
        let detail = data.payload.rows[0]
        setAkun({
          nama_lengkap: detail.nama_lengkap,
          username: detail.username,
          wa_user:
            detail.wa_telephone?.length ?? false ? detail.wa_telephone[0] : "",
          telephone_user:
            detail.wa_telephone?.length ?? false ? detail.wa_telephone[1] : "",
          role_user: detail.role,
          email_user: detail.email_user,
          // alamat_user: detail.alamat !== null ? detail.alamat : "",
          alamat_user: detail.alamat ?? "",
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
    } catch (error) {
      document.querySelector(".quarter-overlay").style.display = "none"
      console.error("fetchData my-account", error)
      navigate("/")
    }
  }
  const logOut = async () => {
    try {
      document.querySelector(".quarter-overlay").style.display = "block"
      await dispatch(logoutAsync())
      if (!localStorage.getItem("user")) {
        navigate("/login")
      }
      document.querySelector(".quarter-overlay").style.display = "none"
    } catch (error) {
      document.querySelector(".quarter-overlay").style.display = "none"
      console.error("logOut", error)
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
    try {
      document.querySelector(".quarter-overlay").style.display = "block"
      const data = await dispatch(removeProperti(idDelete))
      //console.log("delete data", data.payload === idDelete)
      if (data.payload === idDelete) {
        await dispatch(deleteStateUser(idDelete))
      }
      document.querySelector(".quarter-overlay").style.display = "none"
    } catch (error) {
      document.querySelector(".quarter-overlay").style.display = "none"
      console.error("deletePost", error)
    }
  }
  const deleteGet = (event) => {
    setIdDelete(event)
    deleteRef.current.click()
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
                        <DashboardAccount detail_users={detail_users} />
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_2">
                        <ProfileUser
                          detail_users={detail_users}
                          fetchData={fetchData}
                          oldFiles={oldFiles}
                          profileImage={profileImage}
                          setProfileImage={setProfileImage}
                          akun={akun}
                          setAkun={setAkun}
                        />
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_3">
                        <MyProperties
                          detail_users={detail_users}
                          cellRef={cellRef}
                          deleteGet={deleteGet}
                          handleChange={handleChange}
                          totalPages={totalPages}
                          cari={cari}
                          setCari={setCari}
                        />
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
                        <ChangePass />
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
            <a
              className="d-none"
              href="/#"
              title="Delete Data"
              data-bs-toggle="modal"
              data-bs-target="#delete_modal"
              ref={deleteRef}
            >
              Delete {idDelete}
            </a>
            <div className="modal fade" id="delete_modal" tabIndex={-1}>
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
          </div>
        </div>
      </div>
    </div>
  )
}
