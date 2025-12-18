import { Route, Routes } from "react-router-dom"
import AuthPage from "../pages/AuthPage"
import StudentExamPage from "../pages/StudentExamPage"
import Super from "../components/auth-components/Super"
import Dashboard from "../components/dashboard-components/Dashboard"
import AdminLayout from "../layout/AdminLayout"
import Home from "../pages/Home"
import UserLayout from "../layout/UserLayout"
import AdminExams from "../components/dashboard-components/AdminExams"
import AdminLessons from "../components/dashboard-components/AdminLessons"
import AdminQuestions from "../components/dashboard-components/AdminQuestions"
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="exam" element={<StudentExamPage />} />
      </Route>
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="exams" element={<AdminExams />} />
        <Route path="questions" element={<AdminQuestions />} />
        <Route path="lessons" element={<AdminLessons />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/super" element={<Super />} />
    </Routes>
  )
}
