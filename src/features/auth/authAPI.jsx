// A mock function to mimic making an async request for data
import { request } from "@/utils/api"

export const login = (user) => request.post("auth", user)

export const logout = () => request.get("logout")
