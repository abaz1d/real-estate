import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as API from "./authAPI"
import { LOG_IN, LOG_OUT } from "@/utils/constants"

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  returnUrl: null,
  status: "idle",
}

export const logoutAsync = createAsyncThunk(LOG_OUT, async () => {
  try {
    localStorage.removeItem("user")
    const { data } = await API.logout()
    if (data.success) {
      return "user"
    } else {
      throw new Error(JSON.stringify(data))
    }
  } catch (error) {
    console.error(error)
    return ""
  }
})

export const loginAsync = createAsyncThunk(LOG_IN, async (user) => {
  try {
    const { data } = await API.login(user)
    if (data.success) {
      return data.data
    } else {
      throw new Error(JSON.stringify(data))
    }
  } catch (error) {
    console.error(error)
    return {}
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle"
        //console.log("action", action)
        state.user = action.payload
        localStorage.setItem("user", JSON.stringify(state.user))
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = "idle"
        //console.log("action", action)
        //localStorage.removeItem(action.payload)
        state.user = null
      })
  },
})

const { create } = authSlice.actions

export const selectUsers = (state) => state.user.users

export const createUser = (user) => (dispatch, getState) => {
  const id = Date.now()
  dispatch(create({ ...user, id }))
  return dispatch(createUserAsync({ id, user }))
}

export default authSlice.reducer
