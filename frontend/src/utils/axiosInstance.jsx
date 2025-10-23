import axios from "axios"
import { toast } from "react-toastify"
import store from "../store/store"
import { logout } from "../store/slices/UserToken"

const baseURL = import.meta.env.VITE_API_LOCAL_URL

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send cookies if needed
})

// ────────────────────────────────────────────────────────────
// Request Interceptor
// Attach access token to Authorization header
// ────────────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().authentication_user.user_access_token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ────────────────────────────────────────────────────────────
// Response Interceptor
// Handle token expiration and retry logic
// ────────────────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response, // success: pass the response
  async (error) => {
    const originalRequest = error.config
    const Authenticated = store.getState().authentication_user.isAuthenticated

    // Handle no server response (network issues)
    if (!error.response) {
      console.error("⚠️ Network Error or No Response from Server")
      toast.error("Network Error. Please check your connection.")
      return Promise.reject(error)
    }

    // ─── 401 Unauthorized → Try refresh token ───────────────
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken =
          store.getState().authentication_user.user_refresh_token
        if (!refreshToken) {
          throw new Error("No refresh token available")
        }

        const { data } = await axios.post(
          `${baseURL}user_refresh_token/`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true,
          }
        )

        // Save new access token in store
        store.dispatch(
          logout({
            user_access_token: data.access_token,
            user_refresh_token: refreshToken,
          })
        )

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${data.access_token}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error("❌ Refresh Token Expired or Invalid")
        store.dispatch(logout())
        window.location.assign("/LoginPage")
        return Promise.reject(refreshError)
      }
    }

    // ─── 403 Forbidden ──────────────────────────────────────
    if (error.response.status === 403) {
      toast.error("Permission Denied!")
      console.warn("🚫 403 Forbidden")
    }

    // ─── 404 Not Found ──────────────────────────────────────
    else if (error.response.status === 400) {
      const errorData = error.response.data

      if (typeof errorData === "object") {
        Object.entries(errorData).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(`${field}: ${msg}`))
          } else {
            toast.error(`${field}: ${messages}`)
          }
        })
      } else {
        toast.error("Bad Request. Please check your input.")
      }

      console.warn("⚠️ 400 Bad Request", errorData)
    }

    // ─── 5xx Server Errors ──────────────────────────────────
    else if (error.response.status >= 500) {
      console.error("💥 Server Error")
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
