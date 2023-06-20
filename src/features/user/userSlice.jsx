import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as API from "./userAPI"
import {
  READ_USER,
  CREATE_USER,
  UPDATE_USER,
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
    console.error(error)
    return arrayKosong
  }
})

export const readDetailUser = createAsyncThunk(READ_DETAIL_USER, async (id) => {
  try {
    const { data } = await API.read_detail(id)
    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.error(error)
    return []
  }
})

export const createUserAsync = createAsyncThunk(
  CREATE_USER,
  async ({ id, user }) => {
    try {
      const { data } = await API.create(user)
      if (data.success) {
        return { ...data.data[0], id }
      } else {
        throw new Error(JSON.stringify(data))
      }
    } catch (error) {
      console.error(error)
      return { ...user, id }
    }
  },
)

export const removeUser = createAsyncThunk(REMOVE_USER, async (_id) => {
  try {
    const { data } = await API.remove(_id)
    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.log(error, "gagal")
  }
})

export const updateUser = createAsyncThunk(
  UPDATE_USER,
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    create: (state, action) => {
      state.users = [...state.users, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(readUser.fulfilled, (state, action) => {
        state.status = "idle"
        //console.log("action", action)
        state.users = action.payload
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
        state.users = action.payload
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.status = "idle"
        state.users = state.users.filter(
          (item) => item._id !== action.payload._id,
        )
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "idle"
        state.users = state.users.map((item) => {
          if (item._id === action.payload._id) {
            return { ...action.payload, sent: true }
          }
          return item
        })
      })
  },
})

const { create } = userSlice.actions

export const selectUsers = (state) => state.user.users

export const createUser = (user) => (dispatch, getState) => {
  const id = Date.now()
  dispatch(create({ ...user, id }))
  return dispatch(createUserAsync({ id, user }))
}

export default userSlice.reducer
