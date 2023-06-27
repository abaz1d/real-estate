import React, { useState, useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getImgUrl } from "@/utils/helper"
import {
  createProperti,
  updateProperti,
  selectPropertis,
  readDetailProperti,
} from "@/features/properti/propertiSlice"

export default function AddListing(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const propertis = useSelector(selectPropertis)
  const [searchParams] = useSearchParams()
  const deskripsi_sec = useRef(null)
  const media_sec = useRef(null)
  const lokasi_sec = useRef(null)
  const detail_sec = useRef(null)
  const lain_sec = useRef(null)
  const [properti, setProperti] = useState({
    judul: "",
    deskripsi: "",
    jenis_properti: "",
    kategori: "",
    status: "",
    total_harga: "",
    harga_tanah: "",
    harga_bangunan: "",
    pajak: "",
    //foto 6/10,
    // video berbentuk link,
    alamat: "",
    kota: "",
    provinsi: "",
    kode_pos: "",
    //latitude,
    //longitude,
    luas_properti: "",
    jenis_sertifikat: "",
    tahun_pembangunan: "",
    daya_listrik: "",
    jumlah_lantai: "",
    jumlah_ruangan: "",
    kamar_tidur: "",
    kamar_mandi: "",
    // lain
  })
  const [oldFiles, setOldFiles] = useState([])
  const [files, setFiles] = useState([])

  const resetForm = () => {
    setProperti({
      judul: "",
      deskripsi: "",
      jenis_properti: "",
      kategori: "",
      status: "",
      total_harga: "",
      harga_tanah: "",
      harga_bangunan: "",
      pajak: "",
      //foto 6/10,
      // video berbentuk link,
      alamat: "",
      kota: "",
      provinsi: "",
      kode_pos: "",
      //latitude,
      //longitude,
      luas_properti: "",
      jenis_sertifikat: "",
      tahun_pembangunan: "",
      daya_listrik: "",
      jumlah_lantai: "",
      jumlah_ruangan: "",
      kamar_tidur: "",
      kamar_mandi: "",
      // lain
    })
    setFiles([])
  }

  const handleFileUpload = (event) => {
    const files = event.target.files
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    const maxSize = 2 * 1024 * 1024 // 2MB

    let selectedImages = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileType = file.type
      const fileSize = file.size

      if (allowedTypes.includes(fileType) && fileSize <= maxSize) {
        //console.log(file)
        selectedImages.push(file)
      }
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedImages])
    //console.log(`Uploading`, files, event)
  }

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    //console.log(event.target);
    setProperti({
      ...properti,
      [name]: value,
    })
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
  const fetchData = async () => {
    document.querySelector(".quarter-overlay").style.display = "block"
    let data = await dispatch(
      readDetailProperti(searchParams.get("id_properti")),
    )
    if (data.payload.length > 0) {
      let detail = data.payload[0]
      setProperti({
        judul: detail.judul,
        deskripsi: detail.deskripsi,
        jenis_properti: detail.jenis_properti,
        kategori: detail.kategori,
        status: detail.status,
        total_harga: detail.total_harga,
        harga_tanah: detail.harga_tanah,
        harga_bangunan: detail.harga_bangunan,
        pajak: detail.pajak,
        //foto 6/10,
        // video berbentuk link,
        alamat: detail.alamat,
        kota: detail.kota,
        provinsi: detail.provinsi,
        kode_pos: detail.kode_pos,
        //latitude,
        //longitude,
        luas_properti: detail.luas_properti,
        jenis_sertifikat: detail.jenis_sertifikat,
        tahun_pembangunan: detail.tahun_pembangunan,
        daya_listrik: detail.daya_listrik,
        jumlah_lantai: detail.jumlah_lantai,
        jumlah_ruangan: detail.jumlah_ruangan,
        kamar_tidur: detail.kamar_tidur,
        kamar_mandi: detail.kamar_mandi,
        // lain
      })
      if (detail.foto_produk !== null) {
        const gambars = await getImgUrl(detail.foto_produk[0])
        const newUrl = await Promise.all(
          gambars.map(async (gambar, index) => {
            let files = await urlToFile(
              import.meta.env.VITE_APP_BASE_API + "gambar_properti/" + gambar,
              `gambar_${index}`,
            )
            //console.log("files", files)
            setOldFiles((prevOldFiles) => [...prevOldFiles, gambar])
            return files
          }),
        )
        setFiles(newUrl)
      }
    }
    document.querySelector(".quarter-overlay").style.display = "none"
  }
  useEffect(() => {
    if (searchParams.get("id_properti") !== null) {
      if (localStorage.getItem("user")) {
        if (JSON.parse(localStorage.getItem("user")).userid !== undefined) {
          fetchData()
        }
      }
    }
  }, [searchParams])
  const handleClick = (e, data) => {
    e.preventDefault()
    data.current?.scrollIntoView({ behavior: "smooth" })
  }
  const navHighlighter = function (event) {
    const sections = document.querySelectorAll("section[id]")
    let scrollY = window.pageYOffset
    console.log("event", event)
    sections.forEach((current) => {
      current.addEventListener("click", (e) => {
        e.preventDefault()
      })
      var sectionId = current.getAttribute("id")
      const sectionHeight = current.offsetHeight
      const sectionTop = current.offsetTop - 120
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector("#nav-listing a[href*=" + sectionId + "]")
          .classList.add("active", "show")
      } else {
        document
          .querySelector("#nav-listing a[href*=" + sectionId + "]")
          .classList.remove("active", "show")
      }
    })
  }
  useEffect(() => {
    //window.addEventListener("scroll", (e) => navHighlighter(e))
    return () => {
      window.removeEventListener("scroll", (e) => navHighlighter(e))
    }
  }, [])
  const saveProperti = async (e) => {
    document.querySelector(".quarter-overlay").style.display = "block"
    e.preventDefault()
    if (files.length > 0) {
      if (searchParams.get("id_properti") !== null) {
        await dispatch(
          updateProperti({
            ...properti,
            foto_produk: files,
            old_files: oldFiles,
            id_user: JSON.parse(localStorage.getItem("user")).userid,
            id_properti: searchParams.get("id_properti"),
          }),
        )
      } else {
        await dispatch(
          createProperti({
            ...properti,
            foto_produk: files,
            id_user: JSON.parse(localStorage.getItem("user")).userid,
          }),
        )
      }
      resetForm()
      navigate("/my-account")
    }
    document.querySelector(".quarter-overlay").style.display = "none"
  }

  return (
    <div className="ltn__appointment-area pb-120" id="add_listing">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className=" sticky-top sticky-lg-top-2 border-1 border-bottom mb-5 bg-white ltn__tab-menu ltn__tab-menu-3 ltn__tab-menu-top-right-- text-uppercase--- text-center"
              style={{
                zIndex: "9999",
              }}
            >
              <div className="nav px-0" id="nav-listing">
                <a
                  className="pt-3 nav-list-item mx-md-4 mx-1"
                  aria-label="nav"
                  href="#deskripsi_sec"
                  onClick={(e) => handleClick(e, deskripsi_sec)}
                >
                  1. Deskripsi
                </a>
                <a
                  aria-label="nav"
                  href="#media_sec"
                  className="pt-3 nav-list-item mx-md-4 mx-1"
                  onClick={(e) => handleClick(e, media_sec)}
                >
                  2. Media
                </a>
                <a
                  aria-label="nav"
                  href="#lokasi_sec"
                  className="pt-3 nav-list-item mx-md-4 mx-1"
                  onClick={(e) => handleClick(e, lokasi_sec)}
                >
                  3. Lokasi
                </a>
                <a
                  aria-label="nav"
                  href="#detail_sec"
                  className="pt-3 nav-list-item mx-md-4 mx-1"
                  onClick={(e) => handleClick(e, detail_sec)}
                >
                  4. Detail
                </a>
                <a
                  aria-label="nav"
                  href="#lain_sec"
                  className="pt-3 nav-list-item mx-md-4 mx-1"
                  onClick={(e) => handleClick(e, lain_sec)}
                >
                  5. Amenities
                </a>
              </div>
            </div>
            <div className="ltn__appointment-inner">
              {searchParams.get("id_properti") !== null && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        name="id_properti"
                        defaultValue={searchParams.get("id_properti")}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}
              <form onSubmit={saveProperti}>
                <section
                  className="section"
                  id="deskripsi_sec"
                  ref={deskripsi_sec}
                >
                  <h2>1. Deskripsi</h2>
                  <p>
                    <small>
                      Bidang-bidang ini wajib diisi: Judul, Deskripsi
                    </small>
                  </p>
                  <h6>Deskripsi Properti</h6>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="judul"
                          required
                          value={properti.judul}
                          onChange={handleChange}
                          placeholder="*Judul (wajib)"
                        />
                      </div>
                      <div className="input-item input-item-textarea ltn__custom-icon">
                        <textarea
                          name="deskripsi"
                          required
                          placeholder="Deskripsi"
                          value={properti.deskripsi}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <h6>Pilih Kategori</h6>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="input-item">
                        <select
                          name="jenis_properti"
                          required
                          value={properti.jenis_properti}
                          onChange={(e) => handleChange(e)}
                          className="nice-select"
                        >
                          <option value="">Jenis Properti</option>
                          <option value="Rumah">Rumah</option>
                          <option value="Apartemen">Apartemen</option>
                          <option value="Tanah">Tanah</option>
                          <option value="Gudang">Gudang</option>
                          <option value="Ruko">Ruko</option>
                          <option value="Gedung">Gedung</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="input-item">
                        <select
                          name="kategori"
                          required
                          value={properti.kategori}
                          onChange={handleChange}
                          className="nice-select"
                        >
                          <option value="" disabled>
                            Kategori (Jual/ Sewa)
                          </option>
                          <option value="Jual">Jual</option>
                          <option value="Sewa">Sewa</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="input-item">
                        <select
                          name="status"
                          onChange={handleChange}
                          required
                          value={properti.status}
                          className="nice-select"
                        >
                          <option value="" disabled>
                            Status
                          </option>
                          <option value="Aktif">Aktif</option>
                          <option value="Terjual">Terjual</option>
                          <option value="Nego">Nego</option>
                          <option value="Pas">Harga Pas</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <h6>Harga Properti</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          required
                          name="total_harga"
                          value={properti.total_harga}
                          onChange={handleChange}
                          placeholder="Harga Total/ Harga Bulanan"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          required
                          name="pajak"
                          value={properti.pajak}
                          onChange={handleChange}
                          placeholder="Pajak Tahunan/ Bulanan"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          required
                          type="text"
                          name="harga_tanah"
                          value={properti.harga_tanah}
                          onChange={handleChange}
                          placeholder="Harga Tanah"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          required
                          name="harga_bangunan"
                          value={properti.harga_bangunan}
                          onChange={handleChange}
                          placeholder="Harga Bangunan"
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="section" id="media_sec" ref={media_sec}>
                  <h2>2. Media</h2>
                  <h6>Listing Media</h6>
                  <p>
                    <small>
                      * At least 1 image is required for a valid
                      submission.Minimum size is 500/500px.
                    </small>
                    <br />
                    <small>* PDF files upload supported as well.</small>
                    <br />
                    <small>* Images might take longer to be processed.</small>
                  </p>
                  <div
                    className="mb-4 border border-2 p-1 position-relative"
                    id="picInput"
                  >
                    <input
                      type="file"
                      name="filename"
                      className="btn theme-btn-3 mb-10 w-100"
                      multiple
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handleFileUpload(e)}
                    />
                    {files.length >= 1 && (
                      <button
                        className="px-2 position-absolute rounded shadow bg-white border"
                        type="button"
                        onClick={() => setFiles([])}
                        style={{
                          right: "4%",
                          top: "2vh",
                          paddingTop: "3.5px",
                          zIndex: "99",
                        }}
                      >
                        <i className="fa fa-xmark fa-lg mb-0 text-danger" />{" "}
                        Hapus Semua
                      </button>
                    )}
                    <div className="row mx-auto justify-content-center">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="col-md-3 col-4 position-relative me-2 my-3"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                          />
                          <span>
                            Foto {index + 1}{" "}
                            {index === 0 ? "/ Gambar Utama" : ""}
                          </span>
                          <button
                            type="button"
                            className="px-2 position-absolute rounded-circle"
                            style={{
                              right: "10%",
                              top: "5%",
                              paddingTop: "3.5px",
                            }}
                            onClick={() => handleRemoveFile(index)}
                          >
                            <i className="fa fa-xmark fa-lg mb-0 text-danger" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h6>Video Option</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item">
                        <select className="nice-select">
                          <option value="">Video from</option>
                          <option value="">vimeo</option>
                          <option value="">youtube</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="ltn__name"
                          placeholder="Embed Video ID"
                        />
                      </div>
                    </div>
                  </div>
                  <h6>Virtual Tour</h6>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea
                      name="ltn__message"
                      placeholder="Virtual Tour:"
                      defaultValue={""}
                    />
                  </div>
                </section>
                <section className="section" id="lokasi_sec" ref={lokasi_sec}>
                  <h2>3. Lokasi</h2>
                  <h6>List Lokasi</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="alamat"
                          required
                          value={properti.alamat}
                          onChange={handleChange}
                          placeholder="*Alamat"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="kota"
                          required
                          value={properti.kota}
                          onChange={handleChange}
                          placeholder="Kota/ Kabupaten"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="provinsi"
                          required
                          value={properti.provinsi}
                          onChange={handleChange}
                          placeholder="Provinsi"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="kode_pos"
                          required
                          value={properti.kode_pos}
                          onChange={handleChange}
                          placeholder="Kode Pos"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="property-details-google-map mb-60">
                        <iframe
                          title="maps"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"
                          width="100%"
                          height="100%"
                          frameBorder={0}
                          allowFullScreen
                          aria-hidden="false"
                          tabIndex={0}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="ltn__name"
                          placeholder="Latitude (for Google Maps)"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="ltn__name"
                          placeholder="Longitude (for Google Maps)"
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="section" id="detail_sec" ref={detail_sec}>
                  <h2>4. Detail</h2>
                  <h6>List Detail</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          required
                          name="luas_properti"
                          value={properti.luas_properti}
                          onChange={handleChange}
                          placeholder="Luas Properti m²"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                        <select
                          required
                          name="jenis_sertifikat"
                          value={properti.jenis_sertifikat}
                          onChange={handleChange}
                          className="nice-select"
                        >
                          <option value="" disabled>
                            Jenis Sertifikat
                          </option>
                          <option value="shm">
                            Sertifikat Hak Milik (SHM)
                          </option>
                          <option value="shgu">
                            Sertifikat Hak Guna Usaha (SHGU)
                          </option>
                          <option value="shgb">
                            Sertifikat Hak Guna Bangunan (SHGB)
                          </option>
                          <option value="shp">
                            Sertifikat Hak Pakai (SHP)
                          </option>
                          <option value="shsrs">
                            Sertifikat Hak Satuan Rumah Susun (SHSRS)
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          required
                          type="text"
                          name="tahun_pembangunan"
                          value={properti.tahun_pembangunan}
                          onChange={handleChange}
                          placeholder="Tahun Pembangunan"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          required
                          type="text"
                          name="daya_listrik"
                          value={properti.daya_listrik}
                          onChange={handleChange}
                          placeholder="Daya Listrik"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                        <select
                          required
                          name="jumlah_lantai"
                          value={properti.jumlah_lantai}
                          onChange={handleChange}
                          className="nice-select"
                        >
                          <option value="" disabled>
                            Jumlah Lantai
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          required
                          type="text"
                          name="jumlah_ruangan"
                          value={properti.jumlah_ruangan}
                          onChange={handleChange}
                          placeholder="Jumlahh Ruangan"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          required
                          name="kamar_tidur"
                          value={properti.kamar_tidur}
                          onChange={handleChange}
                          placeholder="Jumlah Kamar Tidur"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="kamar_mandi"
                          required
                          value={properti.kamar_mandi}
                          onChange={handleChange}
                          placeholder="Jumlah Kamar Mandi"
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="section" id="lain_sec" ref={lain_sec}>
                  <h2>5. Amenities</h2>
                  <h6>Amenities and Features</h6>
                  <h6>Interior Details</h6>
                  <div className="row" id="lain_checkbox">
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Equipped Kitchen
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Gym
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Laundry
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Media Room
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                  <h6 className="mt-20">Outdoor Details</h6>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Back yard
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Basketball court
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Front yard
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Garage Attached
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Hot Bath
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Pool
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                  <h6 className="mt-20">Utilities</h6>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Central Air
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Electricity
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Heating
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Natural Gas
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Ventilation
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Water
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                  <h6 className="mt-20">Other Features</h6>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Chair Accessible
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Elevator
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Fireplace
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Smoke detectors
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        Washer and dryer
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label className="checkbox-item">
                        WiFi
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </section>
                <div className="alert alert-warning d-none" role="alert">
                  Please note that the date and time you requested may not be
                  available. We will contact you to confirm your actual
                  appointment details.
                </div>
                <div className="btn-wrapper text-center mt-30">
                  <button
                    aria-label="submit-button"
                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                    type="submit"
                  >
                    Submit Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
