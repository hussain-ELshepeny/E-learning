import React from 'react'
import {useNavigate} from "react-router-dom";
import {
    PlayCircle,

    Users,
    Star,
    Download,
    Share2,
    CheckCircle2,
    MessageSquare,
} from 'lucide-react';
import ActionButton from "@/components/lessons/lessondetails/ActionButton.jsx";

const LessonDetailsSidebar = ({lesson , id}) => {


    return (
        <section className="space-y-6">
            {/* Enrollment Status */}
            <div className="bg-surface-darker border border-surface-darker rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Enrollment Status</h3>

                <div className="space-y-4">
                    <div className="p-4 bg-dark-surfaceDarker rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-200">Access</span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                lesson.isEnrolled
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {lesson.isEnrolled ? 'Enrolled' : 'Not Enrolled'}
                            </span>
                        </div>

                        {lesson.price > 0 && (
                            <div className="pt-4 border-t border-dark-surfaceDarker">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-200">Price</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-white">${lesson.price}</div>
                                        <div className="text-sm text-text-secondary">One-time payment</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                   <ActionButton lesson={lesson} id={id}/>
                </div>
            </div>

            {/* Class Information */}
            <div className="bg-surface-darker border border-dark-surface-darker rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Class Information</h3>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-sm text-gray-300">Students Enrolled</p>
                            <p className="text-white font-medium">{lesson.studentsEnrolled.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Star className="w-5 h-5 text-amber-400" />
                        <div>
                            <p className="text-sm text-gray-300">Average Rating</p>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-medium">{lesson.rating}</span>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className="w-4 h-4 text-amber-400 fill-current"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-dark-surfaceDarker rounded-lg">
                        <p className="text-sm text-gray-200 text-center">
                            Part of  <span className="text-primary font-medium">{lesson.classLevel} Curriculum</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Share Card */}
            <div className="bg-surface-darker border border-dark-surface-darker rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Share This Lesson</h3>

                <div className="grid grid-cols-3 gap-3">
                    <button className="p-3 border border-dark-surfaceDarker rounded-lg text-text-secondary hover:text-white hover:border-primary/30 transition-colors">
                        <Share2 className="w-5 h-5 mx-auto" />
                    </button>
                    <button className="p-3 border border-dark-surfaceDarker rounded-lg text-text-secondary hover:text-white hover:border-primary/30 transition-colors">
                        <MessageSquare className="w-5 h-5 mx-auto" />
                    </button>
                    <button className="p-3 border border-dark-surfaceDarker rounded-lg text-text-secondary hover:text-white hover:border-primary/30 transition-colors">
                        <Download className="w-5 h-5 mx-auto" />
                    </button>
                </div>
            </div>
        </section>
    )
}
export default LessonDetailsSidebar
