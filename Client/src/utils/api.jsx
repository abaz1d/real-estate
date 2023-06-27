import axios from "axios"
import { Fragment } from "react"
import { Navigate } from "react-router-dom"

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //timeout: 15000,
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user")).token
        : ""
    }`,
  },
})

request.interceptors.request.use(function (config) {
  const token = localStorage.getItem("user")
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token).token}`
  } else {
    config.headers.Authorization = ""
  }
  return config
})

export const LoggedIn = () => {
  const user = localStorage.getItem("user")
  const userid = JSON.parse(localStorage.getItem("user")).userid
  return (
    <Fragment>
      {!user ||
        (userid == undefined && <Navigate to="/login" replace={true} />)}
    </Fragment>
  )
}
