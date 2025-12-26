import { Route, Routes ,Navigate  } from "react-router-dom"
import AuthPage from "../pages/AuthPage"
import StudentExamPage from "../pages/StudentExamPage"
import Super from "../components/auth-components/Super"
import Dashboard from "../components/dashboard-components/Dashboard"
import AdminLayout from "../layout/AdminLayout"
import Home from "../pages/Home"
import UserLayout from "../layout/UserLayout"
import AdminExams from "../components/dashboard-components/exams/AdminExams"
import AdminLessons from "../components/dashboard-components/lessons/AdminLessons"
import AdminQuestions from "../components/dashboard-components/questions/AdminQuestions"
import CourseLayout from "@/layout/CourseLayout.jsx";
import LessonsHome from "@/pages/LessonsHome.jsx";
import LessonDetails from "@/components/lessons/lessondetails/LessonDetails.jsx";
import PaymentPage from "@/pages/PaymentPage.jsx";
import VideoPlayer from "@/components/lessons/VideoPlay/VideoPlayer.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="exam" element={<StudentExamPage />} />
        <Route path="/lessons" element={<CourseLayout />}>
            <Route index element={<LessonsHome />} />
            <Route path="/lessons/:id" element={<LessonDetails />} />
            <Route path="/lessons/:id/payment" element={<PaymentPage />} />
            <Route path="/lessons/:id/play" element={<VideoPlayer />} />
        </Route>
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
