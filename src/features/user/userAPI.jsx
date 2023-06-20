// A mock function to mimic making an async request for data
import { request } from "@/utils/api"

export const read = (arg) => {
  request.get("/users")
}

export const read_detail = (user) =>
  request.get(
    `users/details/${user.id}?page_number=${user.page_number}&total_row_displayed=${user.total_row_displayed}`,
  )

export const create = (user) => request.post("users/add", user)

export const update = (_id, title, complete) =>
  request.put(`users/${_id}`, { title, complete })

export const remove = (_id) => request.delete(`users/${_id}`)
