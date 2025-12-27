import React, {useState} from 'react'
import {Bell, Bookmark, ChevronLeft, Share2} from "lucide-react";
import {useNavigate} from "react-router-dom";

const LessonDetailsHeader = () => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);
    return (
        <header className="sticky top-0 bg-dark-surface/95 backdrop-blur-xl border-b border-dark-surfaceDarker">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-2">
                    <button
                        onClick={() => navigate('/lessons')}
                        className="px-4 py-2 text-text-secondary hover:text-primary border border-dark-surfaceDarker rounded-lg flex items-center gap-2 text-sm transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Lessons
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className={`p-2 border border-dark-surfaceDarker rounded-lg transition-colors ${
                                isBookmarked
                                    ? 'text-primary border-primary/30 bg-primary/30 '
                                    : 'text-text-secondary hover:text-primary'
                            }`}
                        >
                            <Bookmark className="w-5 h-5" />
                        </button>
                        <button className="p-2 border border-dark-surfaceDarker rounded-lg text-gray-400 hover:text-primary transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 border border-dark-surfaceDarker rounded-lg text-gray-400 hover:text-primary transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default LessonDetailsHeader
