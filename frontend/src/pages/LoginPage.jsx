import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AwardIcon, Eye, EyeOff } from "lucide-react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { login } from "../store/slices/UserToken"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
const baseURL = import.meta.env.VITE_API_LOCAL_URL

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authState = useSelector(
    (state) => state.authentication_user.isAuthenticated
  )
  useEffect(() => {
    if (authState) {
      navigate("/")
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${baseURL}/login`, formData)
      if (res.status == 200) {
        const decodedToken = jwtDecode(res.data.user_access_token)
        dispatch(
          login({
            userid: decodedToken.user_id,
            useremail: formData.email,
            user_access_token: res.data.user_access_token,
            user_refresh_token: res.data.user_refresh_token,
            isAuthenticated: true,
          })
        )

        navigate("/")
        toast.success("Login successful!")
      }
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.detail || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-xl p-10">
        <h2 className="text-2xl font-semibold text-center text-slate-800 mb-8">
          Welcome Back to{" "}
          <Link to="/">
            <span className="text-indigo-600 font-bold">CRUD</span>
          </Link>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-md transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/RegisterPage"
              className="text-indigo-600 hover:underline font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
