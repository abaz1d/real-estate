import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as API from "./userAPI"
import Swall from "sweetalert2"
import {
  READ_USER,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_PASS,
  REMOVE_USER,
  READ_DETAIL_USER,
} from "@/utils/constants"

const initialState = {
  users: [],
  status: "idle",
}

export const readUser = createAsyncThunk(READ_USER, async (arg) => {
  try {
    let arrayKosong
    typeof arg === "string"
      ? (arrayKosong = [])
      : (arrayKosong = { rows: [], total_pages: 0 })
    const { data } = await API.read(arg)
    //console.log(data)
    if (data.success) {
      return data.data
    } else {
      return arrayKosong
    }
  } catch (error) {
    Swall.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
      confirmButtonColor: "#ff5a3c",
      footer: "<span class='text-danger'>Kesalahan Membaca Data User</span>",
    })
    console.error(error)
    return arrayKosong
  }
})

export const readDetailUser = createAsyncThunk(
  READ_DETAIL_USER,
  async (user) => {
    try {
      const { data } = await API.read_detail(user)
      if (data.success) {
        return data.data
      }
    } catch (error) {
      Swall.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        confirmButtonColor: "#ff5a3c",
        footer:
          "<span class='text-danger'>Kesalahan Membaca Data Detail User</span>",
      })
      console.error(error)
      return []
    }
  },
)

export const createUserAsync = createAsyncThunk(
  CREATE_USER,
  async ({ id, user }) => {
    try {
      var { data } = await API.create(user)
      if (data.success) {
        return { ...data.data[0], id, success: data.success }
      } else {
        throw new Error(JSON.stringify(data))
      }
    } catch (error) {
      Swall.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        confirmButtonColor: "#ff5a3c",
        footer:
          "<span class='text-danger'>Kesalahan Menambahkan Data User Baru</span>",
      })
      console.error(error)
      return { ...user, id, success: data.success }
    }
  },
)

export const removeUser = createAsyncThunk(REMOVE_USER, async (id_user) => {
  try {
    const { data } = await API.remove(id_user)
    if (data.success) {
      console.log("scss delete", data)
      return id_user
    }
  } catch (error) {
    Swall.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
      confirmButtonColor: "#ff5a3c",
      footer: "<span class='text-danger'>Kesalahan Menghapus Data User</span>",
    })
    console.log(error, "gagal")
  }
})

export const updateUser = createAsyncThunk(UPDATE_USER, async (users) => {
  try {
    var { data } = await API.update(users)
    if (data.success) {
      return data
    } else {
      throw new Error(JSON.stringify(data))
    }
  } catch (error) {
    Swall.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
      confirmButtonColor: "#ff5a3c",
      footer:
        "<span class='text-danger'>Kesalahan Memperbarui Data User</span>",
    })
    console.error("Kesalahan Memperbarui Data User", error)
    return data
  }
})

export const updatePass = createAsyncThunk(UPDATE_PASS, async (users) => {
  try {
    var { data } = await API.update_pass(users)
    if (data.success) {
      return data
    } else {
      throw new Error(JSON.stringify(data))
    }
  } catch (error) {
    Swall.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
      confirmButtonColor: "#ff5a3c",
      footer:
        "<span class='text-danger'>Kesalahan Memperbarui Password User</span>",
    })
    console.error(">Kesalahan Memperbarui Password User", error)
    return data
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    create: (state, action) => {
      state.users = [...state.users, action.payload]
    },
    remove: (state, action) => {
      state.users = state.users.filter(
        (item) => item.id_properti !== action.payload,
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(readUser.fulfilled, (state, action) => {
        state.status = "idle"
        state.users = action.payload
        //console.log("action", action)
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.users = state.users.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        })
      })
      .addCase(readDetailUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(readDetailUser.fulfilled, (state, action) => {
        state.status = "idle"
        state.users = action.payload.rows
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.status = "idle"
        state.users = state.users.filter(
          (item) => item.id_user !== action.payload.id_user,
        )
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        //state.status = "idle"
        // state.users = state.users.map((item) => {
        //   if (item.id_user === action.payload.id_user) {
        //     return { ...action.payload, sent: true }
        //   }
        //   return item
        // })
      })
  },
})

const { create, remove } = userSlice.actions

export const selectUsers = (state) => state.user.users

export const deleteStateUser = (id_properti) => (dispatch, getState) => {
  dispatch(remove(id_properti))
}
export const createUser = (user) => (dispatch, getState) => {
  const id = Date.now()
  dispatch(create({ ...user, id }))
  return dispatch(createUserAsync({ id, user }))
}

export default userSlice.reducer
