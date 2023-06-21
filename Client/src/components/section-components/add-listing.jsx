import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
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
  const fetchData = async () => {
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
    }
  }
  useEffect(() => {
    if (searchParams.get("id_properti") !== null) {
      fetchData()
    }
  }, [searchParams])
  const saveProperti = async (e) => {
    e.preventDefault()
    if (searchParams.get("id_properti") !== null) {
      await dispatch(
        updateProperti({
          ...properti,
          id_user: JSON.parse(localStorage.getItem("user")).userid,
          id_properti: searchParams.get("id_properti"),
        }),
      )
    } else {
      await dispatch(
        createProperti({
          ...properti,
          id_user: JSON.parse(localStorage.getItem("user")).userid,
        }),
      )
    }
    resetForm()
    navigate("/my-account")
  }

  return (
    <div className="ltn__appointment-area pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__appointment-inner">
              {searchParams.get("id_properti") !== null && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        name="id_properti"
                        value={searchParams.get("id_properti")}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}
              <form onSubmit={saveProperti}>
                <h2>1. Deskripsi</h2>
                <p>
                  <small>Bidang-bidang ini wajib diisi: Judul, Deskripsi</small>
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
                <h2>2. Media</h2>
                <h6>Listing Media</h6>
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  className="btn theme-btn-3 mb-10"
                />
                <br />
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
                        <option value="shm">Sertifikat Hak Milik (SHM)</option>
                        <option value="shgu">
                          Sertifikat Hak Guna Usaha (SHGU)
                        </option>
                        <option value="shgb">
                          Sertifikat Hak Guna Bangunan (SHGB)
                        </option>
                        <option value="shp">Sertifikat Hak Pakai (SHP)</option>
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
                <h2>5. Amenities</h2>
                <h6>Amenities and Features</h6>
                <h6>Interior Details</h6>
                <div className="row">
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
