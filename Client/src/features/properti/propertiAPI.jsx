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

export const create = (title) => request.post("properti", { title })

export const update = (_id, title, complete) =>
  request.put(`properti/${_id}`, { title, complete })

export const remove = (_id) => request.delete(`properti/${_id}`)
