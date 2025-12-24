// src/pages/LessonDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsData } from '../data.js';
import {
    PlayCircle,
    DollarSign,
    Calendar,
    Clock,
    Users,
    Star,
    BookOpen,
    ChevronLeft,
    Download,
    Share2,
    Bookmark,
    CheckCircle2,
    FileText,
    MessageSquare,
    Bell,
    User,
    Lock,
    ChevronRight
} from 'lucide-react';
import LessonDetailsHeader from "@/components/lessons/lessondetails/LessonDetailsHeader.jsx";
import LessonDetailsSidebar from "@/components/lessons/lessondetails/LessonDetailsSidebar.jsx";
import LessonDetailsMain from "@/components/lessons/lessondetails/LessonDetailsMain.jsx";

const LessonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        const foundLesson = lessonsData.find(l => l.id === id);
        if (foundLesson) {
            setLesson(foundLesson);
        } else {
            navigate('/lessons');
        }
    }, [id, navigate]);

    if (!lesson) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-dark-background to-dark-surfaceDarker flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="text-gray-400">Loading lesson...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-dark-background to-dark-surfaceDarker">
            {/* Header */}

            <LessonDetailsHeader/>
            <section className="lg:px-4 px-0 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <LessonDetailsMain lesson={lesson} id={id}/>

                    <LessonDetailsSidebar lesson={lesson} id={id}/>
                </div>
            </section>
        </main>
    );
};

export default LessonDetails;