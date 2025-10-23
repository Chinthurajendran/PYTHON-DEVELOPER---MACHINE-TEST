import React from "react"
import { LogOut, StickyNote } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { logout } from "../store/slices/UserToken"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/LoginPage")
    toast.success("Logout successful. See you next time!")
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <StickyNote size={26} className="text-gray-700" />
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            CRUD
          </h1>
        </div>

        {/* Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md text-sm transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
