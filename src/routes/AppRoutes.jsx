import { lazy } from "react"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import AuthPage from "../pages/AuthPage"
import StudentExamPage from "../pages/StudentExamPage"

const Home = lazy(() => import("../pages/Home"))
const Layout = lazy(() => import("../layout/User"))
const Admin = lazy(() => import("../layout/Admin"))

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="exam" element={<StudentExamPage />} />
        </Route>
        <Route element={<Admin />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}
