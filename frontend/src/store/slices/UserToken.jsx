// tokenSlice.js
import { createSlice } from "@reduxjs/toolkit"

// Slice for token management
export const tokenSlice = createSlice({
  name: "authentication_user",
  initialState: {
    userid: null,
    useremail: null,
    isAuthenticated: false,
    user_access_token: null,
    user_refresh_token: null,
  },
  reducers: {
    login: (state, action) => {
      state.userid = action.payload.userid
      state.useremail = action.payload.useremail
      state.isAuthenticated = action.payload.isAuthenticated
      state.user_access_token = action.payload.user_access_token
      state.user_refresh_token = action.payload.user_refresh_token
    },
    logout: (state) => {
      ;(state.userid = null),
        (state.useremail = null),
        (state.isAuthenticated = false),
        (state.user_access_token = null),
        (state.user_refresh_token = null)
    },
  },
})

export const { login, logout } = tokenSlice.actions

export default tokenSlice.reducer
