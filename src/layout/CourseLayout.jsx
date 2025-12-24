import React from 'react'
import { Outlet } from "react-router-dom"
import CourseHeader from "@/components/lessons/LessonHome/CourseHeader.jsx";
const CourseLayout = () => {

    return (
        <main className="container MarginUp p-4 flex flex-col min-h-screen w-full overflow-hidden">
            <Outlet />
        </main>
    )
}
export default CourseLayout;
