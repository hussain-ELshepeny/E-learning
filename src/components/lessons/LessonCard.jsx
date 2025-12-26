// src/components/LessonCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PlayCircle,
    DollarSign,
    Calendar,
    Clock,
    Users,
    Star,
    CheckCircle2,
    ChevronRight,
} from 'lucide-react';

const LessonCard = ({ lesson }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const handleCardClick = () => {
        navigate(`/lessons/${lesson.id}`);
    };

    const handleEnrollClick = (e) => {
        e.stopPropagation();
        if (!lesson.isEnrolled) {
            navigate(`/lessons/${lesson.id}/payment`);
        }
    };

    const handlePlayClick = (e) => {
        e.stopPropagation();
        if (lesson.isEnrolled) {
            navigate(`/lessons/${lesson.id}/play`);
        } else {
            navigate(`/lessons/${lesson.id}/payment`);
        }
    };

    return (
        <div
            className="group bg-dark-surface border border-dark-surfaceDarker hover:border-primary/30 rounded-xl overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300 hover:scale-[1.02]"
            onClick={handleCardClick}
        >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-emerald-400/20">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                        {lesson.category}
                    </div>
                    {lesson.price > 0 && (
                        <div className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            ${lesson.price}
                        </div>
                    )}
                </div>

                {/* View Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate mb-1">
                            {lesson.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{formatDate(lesson.scheduledDate)}</span>
                        </div>
                    </div>
                    <div className="flex items-center text-amber-400 flex-shrink-0">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm">{lesson.rating}</span>
                    </div>
                </div>

                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {lesson.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
            <span className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
                {lesson.duration}m
            </span>
                        <span className="flex items-center text-gray-500">
              <Users className="w-4 h-4 mr-1" />
                            {lesson.studentsEnrolled.toLocaleString()}
            </span>
                    </div>
                    <div className="px-2 py-1 text-xs text-gray-400 border border-dark-surfaceDarker rounded">
                        {lesson.type}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0">
                {lesson.isEnrolled ? (
                    <button
                        className="w-full px-4 py-3 bg-gradient-to-r from-primary to-emerald-400 text-white rounded-lg font-medium flex items-center justify-center hover:from-primary/90 hover:to-emerald-400/90 transition-all"
                        onClick={handlePlayClick}
                    >
                        {lesson.progress === 100 ? 'Review Lesson' : 'Continue Learning'}
                        <PlayCircle className="w-4 h-4 ml-2" />
                    </button>
                ) : (
                    <button
                        className="w-full px-4 py-3 bg-gradient-to-r from-primary to-emerald-400 text-white rounded-lg font-medium flex items-center justify-center hover:from-primary/90 hover:to-emerald-400/90 transition-all"
                        onClick={handleEnrollClick}
                    >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Enroll for ${lesson.price}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LessonCard;