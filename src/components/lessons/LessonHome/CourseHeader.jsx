import React from 'react'
import {
    BookOpen,
    MoveLeft,
} from "lucide-react";
import {QuickStats} from "./QuickStats.jsx";
import {useNavigate} from 'react-router-dom';

const CourseHeader = ({classLevel,lessons,Purchasedlessons}) => {
    const navigate = useNavigate();

    const stats = {
        totalLessons: lessons.data.length,
        enrolledLessons: Purchasedlessons.data.length,
        completedLessons: lessons.data.filter(l => l.isEnrolled && l.progress === 100).length,
        totalSpent: lessons.data.filter(l => l.isEnrolled && l.price > 0)
            .reduce((sum, lesson) => sum + lesson.price, 0),
        averageScore: 85,
        streakDays: 7,
        totalXP: 1245,
    };
    return (
        <header className={`p-2`}>
            <div className="mb-7">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-background-light mb-2">
                        Welcome back 👋
                    </h1>
                    <p className="text-text-secondary">
                        {classLevel?
                            `Continue your learning journey in ${classLevel}`:
                        'Continue your learning journey'}
                    </p>
                </div>
                <QuickStats stats={stats} />
            </div>

            <div className="flex md:flex-row flex-col gap-4 items-center justify-between mt-7">
                <div className="flex md:flex-row flex-col items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-xl border border-primary/30">
                            <BookOpen className="w-6 h-6 text-background-light" />
                        </div>
                        <h1 className="text-2xl font-bold bg-background-light bg-clip-text text-transparent">
                            Student Lessons
                        </h1>
                    </div>

                    {classLevel?<div className="px-3 py-1 bg-surface-dark text-text-secondary rounded-full text-sm font-medium border border-primary/30">
                        {classLevel}
                    </div>:''}
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="flex justify-between items-center gap-1 px-4 py-2 text-text-secondary hover:text-primary border border-dark-surfaceDarker rounded-lg text-sm transition-all duration-75"
                >
                    <MoveLeft /> Back to Home
                </button>
            </div>
        </header>
    )
}
export default CourseHeader
