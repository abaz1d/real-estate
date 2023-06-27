// A mock function to mimic making an async request for data
import { request } from "@/utils/api"

export const read = (arg) => {
  request.get("/users")
}

export const read_detail = (user) =>
  request.get(
    `users/details/${user.id}?page_number=${user.page_number}&total_row_displayed=${user.total_row_displayed}&search_data=${user.searchData}`,
  )

export const create = (user) => request.post("users/add", user)

export const update = (users) => {
  const formData = new FormData()
  formData.append("alamat_user", users.alamat_user)
  formData.append("email_user", users.email_user)
  formData.append("foto_user", users.foto_user)
  formData.append("nama_lengkap", users.nama_lengkap)
  formData.append("role_user", users.role_user)
  formData.append("telephone_user", users.telephone_user)
  formData.append("username", users.username)
  formData.append("wa_user", users.wa_user)
  formData.append(`old_files`, users.old_files)

  const headers = { "Content-Type": "multipart/form-data" }
  return request.put(
    `users/edit/${users.id_user}?username=${users.username}`,
    formData,
    headers,
  )
}

export const update_pass = (users) =>
  request.put(`users/pass/${users.id_user}`, users)

export const remove = (_id) => request.delete(`users/${_id}`)
