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

export const create = (properti) => request.post("properti/add", properti)

export const update = (properti) =>
  request.put(`properti/edit/${properti.id_properti}`, properti)

export const remove = (id_properti) =>
  request.delete(`properti/delete/${id_properti}`)
