import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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
    //console.log(data)
    if (data.success) {
      return data.data
    } else {
      return arrayKosong
    }
  } catch (error) {
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
      console.error(error)
      return []
    }
  },
)

export const createPropertiAsync = createAsyncThunk(
  CREATE_PROPERTI,
  async ({ _id, title }) => {
    try {
      const { data } = await API.create(title)
      if (data.success) {
        return { _id, properti: data.data }
      }
    } catch (error) {
      return { _id, properti: false }
    }
  },
)

export const removeProperti = createAsyncThunk(REMOVE_PROPERTI, async (_id) => {
  try {
    const { data } = await API.remove(_id)
    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.log(error, "gagal")
  }
})

export const updateProperti = createAsyncThunk(
  UPDATE_PROPERTI,
  async ({ _id, title, complete }) => {
    try {
      const { data } = await API.update(_id, title, complete)
      if (data.success) {
        return data.data
      }
    } catch (error) {
      console.log(error, "gagal")
    }
  },
)

export const propertiSlice = createSlice({
  name: "properti",
  initialState,
  reducers: {
    create: (state, action) => {
      state.propertis = [
        ...state.propertis,
        { _id: action.payload._id, title: action.payload.title, sent: true },
      ]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readProperti.pending, (state) => {
        state.status = "loading"
      })
      .addCase(readProperti.fulfilled, (state, action) => {
        state.status = "idle"
        //console.log("action", action)
        if (typeof action.meta.arg === "string") {
          state.propertis = action.payload
        } else {
          state.propertis = action.payload.rows
        }
      })
      .addCase(createPropertiAsync.fulfilled, (state, action) => {
        state.status = "idle"
        if (action.payload.properti) {
          state.propertis = state.propertis.map((item) => {
            if (item._id === action.payload._id) {
              return { ...action.payload.properti, sent: true }
            }
            return item
          })
        } else {
          state.propertis = state.propertis.map((item) => {
            if (item._id === action.payload._id) {
              item.sent = false
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
          (item) => item._id !== action.payload._id,
        )
      })
      .addCase(updateProperti.fulfilled, (state, action) => {
        state.status = "idle"
        state.propertis = state.propertis.map((item) => {
          if (item._id === action.payload._id) {
            return { ...action.payload, sent: true }
          }
          return item
        })
      })
  },
})

const { create } = propertiSlice.actions

export const selectPropertis = (state) => state.properti.propertis

export const createProperti = (title) => (dispatch, getState) => {
  const _id = Date.now()
  dispatch(create({ _id, title }))
  console.log("dikerjain", _id)
  dispatch(createPropertiAsync({ _id, title }))
}

export default propertiSlice.reducer
