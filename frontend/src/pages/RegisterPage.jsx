import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"
const baseURL = import.meta.env.VITE_API_LOCAL_URL

const RegisterPage = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  })

  /* ----------------------------- handlers ----------------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!")
      return
    }

    try {
      const res = await axios.post(`${baseURL}/register`, formData)
      if (res.status == 201) {
        navigate("/LoginPage")
      }
      console.log(res)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.detail || "Registration failed")
    }
  }

  /* ------------------------------ view ------------------------------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-xl p-10">
        <h2 className="text-2xl font-semibold text-center text-slate-800 mb-8">
          Create an account on{" "}
          <Link to="/">
            <span className="text-indigo-600 font-bold">CRUD</span>
          </Link>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* username */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
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

          {/* password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* confirm password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfPassword ? "text" : "password"}
                name="confirm_password"
                placeholder="Re‑enter your password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
                onClick={() => setShowConfPassword((p) => !p)}
              >
                {showConfPassword ? (
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
            Register
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
