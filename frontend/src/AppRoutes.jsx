import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
