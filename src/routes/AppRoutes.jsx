import { Route, Routes } from "react-router-dom"
import AuthPage from "../pages/AuthPage"
import Super from "../components/auth-components/Super"
import Dashboard from "../components/dashboard-components/Dashboard"
import AdminLayout from "../layout/AdminLayout"
import Home from "../pages/Home"
import UserLayout from "../layout/UserLayout"
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/super" element={<Super />} />
    </Routes>
  )
}
