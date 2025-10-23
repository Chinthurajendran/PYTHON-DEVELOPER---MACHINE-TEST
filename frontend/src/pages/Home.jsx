import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import AdminEmployeePage from "../components/AdminEmployeePage"

function Home() {
  const navigate = useNavigate()
  const authState = useSelector(
    (state) => state.authentication_user.isAuthenticated
  )
  useEffect(() => {
    if (!authState) {
      navigate("/LoginPage")
    }
  })
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <AdminEmployeePage />
      <Footer />
    </div>
  )
}

export default Home
