import React from 'react'
import {CheckCircle2, Lock, PlayCircle} from "lucide-react";
import {useNavigate} from "react-router-dom";

const ActionButton = ({lesson,id,isPurchased}) => {

    const navigate = useNavigate();

    const handlePlay = () => {
        if (!lesson.isPaid ||isPurchased) {
            navigate(`/lessons/${id}/play`);
        } else {
            handleEnroll();
        }
    };

    const handleEnroll = () => {
        navigate(`/lessons`);
    };
    return (
        <div className="px-6 my-4">
            {!lesson.isPaid || isPurchased ? (
                <div className="space-y-4">
                    {lesson.progress === 100 ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-emerald-400">
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                <span className="font-semibold">Lesson Completed</span>
                            </div>
                            <button
                                onClick={handlePlay}
                                className="px-4 py-2 text-primary border border-primary/30 rounded-lg hover:bg-primary/30"
                            >
                                Review Again
                            </button>
                        </div>
                    ) : lesson.progress && lesson.progress > 0 ? (
                        <div className="space-y-3">
                            <div className="flex gap-4">
                                <button
                                    onClick={handleEnroll}
                                    className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 flex items-center justify-center gap-2"
                                >
                                    <PlayCircle className="w-4 h-4" />
                                    Continue Learning
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handlePlay}
                            className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90"
                        >
                            <PlayCircle className="w-5 h-5 inline mr-2" />
                            Start Learning
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    <button
                        onClick={handlePlay}
                        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-emerald-400 text-white rounded-lg font-medium hover:from-primary/90 hover:to-emerald-400/90"
                    >
                        Enroll for {lesson.price} EGP
                    </button>

                    {lesson.price > 0 && (
                        <button className="w-full px-6 py-3 text-gray-400 border border-dark-surfaceDarker rounded-lg hover:border-primary/30 hover:text-white flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" />
                            Preview Lesson Content
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
export default ActionButton
