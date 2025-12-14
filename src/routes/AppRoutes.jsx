import { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import AuthPage from "../pages/AuthPage"

const Home = lazy(() => import("../pages/Home"))
const Layout = lazy(() => import("../layout/User"))

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<Admin />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}
