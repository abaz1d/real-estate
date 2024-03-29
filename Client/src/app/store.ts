import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import propertiReducer from "../features/properti/propertiSlice"
import userReducer from "../features/user/userSlice"
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    properti: propertiReducer,
    user: userReducer,
    auth: authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
