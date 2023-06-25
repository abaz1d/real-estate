// A mock function to mimic making an async request for data
import { request } from "@/utils/api"

export const read = (arg) => {
  if (typeof arg === "string") {
    return request.get("/properti/home")
  } else {
    return request.get(
      `/properti?kategori=${arg.kategori}&kota=${arg.kota}&provinsi=${arg.provinsi}&search_data=${arg.search_data}&jenis_properti=${arg.jenis_properti}&page_number=${arg.page_number}&total_row_displayed=${arg.total_row_displayed}`,
    )
  }
}

export const read_detail = (id) => request.get(`properti/details/${id}`)

export const create = (properti) => {
  const formData = new FormData()
  formData.append("judul", properti.judul)
  formData.append("deskripsi", properti.deskripsi)
  formData.append("jenis_properti", properti.jenis_properti)
  formData.append("kategori", properti.kategori)
  formData.append("status", properti.status)
  formData.append("total_harga", properti.total_harga)
  formData.append("harga_tanah", properti.harga_tanah)
  formData.append("harga_bangunan", properti.harga_bangunan)
  formData.append("pajak", properti.pajak)
  formData.append("alamat", properti.alamat)
  formData.append("kota", properti.kota)
  formData.append("provinsi", properti.provinsi)
  formData.append("kode_pos", properti.kode_pos)
  formData.append("luas_properti", properti.luas_properti)
  formData.append("jenis_sertifikat", properti.jenis_sertifikat)
  formData.append("tahun_pembangunan", properti.tahun_pembangunan)
  formData.append("daya_listrik", properti.daya_listrik)
  formData.append("jumlah_lantai", properti.jumlah_lantai)
  formData.append("jumlah_ruangan", properti.jumlah_ruangan)
  formData.append("kamar_tidur", properti.kamar_tidur)
  formData.append("kamar_mandi", properti.kamar_mandi)
  formData.append("id_user", properti.id_user)
  for (var i = 0; i < properti.foto_produk.length; i++) {
    formData.append(`fp_${properti.jenis_properti}`, properti.foto_produk[i])
  }

  const headers = { "Content-Type": "multipart/form-data" }
  return request.post("properti/add", formData, headers)
}

export const update = (properti) =>
  request.put(`properti/edit/${properti.id_properti}`, properti)

export const remove = (id_properti) =>
  request.delete(`properti/delete/${id_properti}`)
