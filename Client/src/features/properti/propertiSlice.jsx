import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swall from "sweetalert2"
import * as API from "./propertiAPI"
import {
  READ_PROPERTI,
  CREATE_PROPERTI,
  UPDATE_PROPERTI,
  REMOVE_PROPERTI,
  READ_DETAIL_PROPERTI,
} from "@/utils/constants"

const initialState = {
  propertis: [],
  status: "idle",
}

export const readProperti = createAsyncThunk(READ_PROPERTI, async (arg) => {
  try {
    let arrayKosong
    typeof arg === "string"
      ? (arrayKosong = [])
      : (arrayKosong = { rows: [], total_pages: 0 })
    const { data } = await API.read(arg)
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
      footer:
        "<span class='text-danger'>Kesalahan Membaca Data Properti</span>",
    })
    console.error(error)
    return arrayKosong
  }
})

export const readDetailProperti = createAsyncThunk(
  READ_DETAIL_PROPERTI,
  async (id) => {
    try {
      const { data } = await API.read_detail(id)
      if (data.success) {
        return data.data
      }
    } catch (error) {
      Swall.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        footer:
          "<span class='text-danger'>Kesalahan Membaca Data Detail Properti</span>",
      })
      console.error(error)
      return []
    }
  },
)

export const createPropertiAsync = createAsyncThunk(
  CREATE_PROPERTI,
  async (properti) => {
    // return properti
    try {
      const { data } = await API.create(properti)
      if (data.success) {
        let id = properti.id
        return { ...data.data, id }
      } else {
        throw new Error(JSON.stringify(data))
      }
    } catch (error) {
      Swall.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        footer:
          "<span class='text-danger'>Kesalahan Menambahkan Data Properti Baru</span>",
      })
      console.error(error, "gagal")
    }
  },
)

export const removeProperti = createAsyncThunk(
  REMOVE_PROPERTI,
  async (id_properti) => {
    try {
      const { data } = await API.remove(id_properti)
      if (data.success) {
        return id_properti
      } else {
        return properti
      }
    } catch (error) {
      Swall.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        footer:
          "<span class='text-danger'>Kesalahan Menghapus Data Properti</span>",
      })
      console.erorr(error, "gagal")
    }
  },
)

export const updateProperti = createAsyncThunk(
  UPDATE_PROPERTI,
  async (properti) => {
    try {
      //console.log("upd", properti)
      const { data } = await API.update(properti)
      if (data.success) {
        return data.data
      } else {
        return properti
      }
    } catch (error) {
      Swall.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        footer:
          "<span class='text-danger'>Kesalahan Memperbarui Data Properti</span>",
      })
      console.error(error, "gagal")
    }
  },
)

export const propertiSlice = createSlice({
  name: "properti",
  initialState,
  reducers: {
    create: (state, action) => {
      state.propertis = [...state.propertis, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readProperti.pending, (state) => {
        state.status = "loading"
      })
      .addCase(readProperti.fulfilled, (state, action) => {
        state.status = "idle"
        if (typeof action.meta.arg === "string") {
          state.propertis = action.payload
        } else {
          state.propertis = action.payload.rows
        }
      })
      .addCase(createPropertiAsync.fulfilled, (state, action) => {
        state.status = "idle"
        if (action.payload) {
          state.propertis = state.propertis.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload
            }
            return item
          })
        }
      })
      .addCase(readDetailProperti.pending, (state) => {
        state.status = "loading"
      })
      .addCase(readDetailProperti.fulfilled, (state, action) => {
        state.status = "idle"
        state.propertis = action.payload
      })
      .addCase(removeProperti.fulfilled, (state, action) => {
        state.status = "idle"
        state.propertis = state.propertis.filter(
          (item) => item.id_properti !== action.payload.id_properti,
        )
      })
      .addCase(updateProperti.fulfilled, (state, action) => {
        state.status = "idle"
        if (action.payload) {
          state.propertis = state.propertis.map((item) => {
            if (item.id_properti === action.payload.id_properti) {
              return action.payload
            }
            return item
          })
        }
      })
  },
})

const { create } = propertiSlice.actions

export const selectPropertis = (state) => state.properti.propertis

export const createProperti = (properti) => (dispatch, getState) => {
  const id = Date.now()
  dispatch(create({ ...properti, id }))
  dispatch(createPropertiAsync({ ...properti, id }))
}

export default propertiSlice.reducer
