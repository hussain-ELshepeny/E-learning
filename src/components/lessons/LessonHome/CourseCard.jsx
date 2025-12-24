import { CiClock1 } from "react-icons/ci"
import { FaStar } from "react-icons/fa6"
import { MdBarChart } from "react-icons/md"
import React from "react";
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
export default function CourseCard({
     id,
    category,
    rate,
    title,
    desc,
   duration,
   classLevel,
   price,
   IsEnroll,
   scheduledDate
}) {
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const handleCardClick = () => {
        navigate(`/lessons/${id}`);
    };

    const handleEnrollClick = (e) => {
        // e.stopPropagation();
        if (!IsEnroll) {
            navigate(`/lessons/${id}/payment`);
        }
    };

    const handlePlayClick = (e) => {
        // e.stopPropagation();
        if (IsEnroll) {
            navigate(`/lessons/${id}/play`);
        } else {
            navigate(`/lessons/${id}/payment`);
        }
    };

    return (
        <div className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-surface-dark border border-gray-100 dark:border-[#264532] hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group h-full">
            <div
                onClick={handleCardClick}
            >
                <div className="relative aspect-video w-full overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-[10px] bg-background-dark p-2 rounded-md font-bold text-white uppercase tracking-wider">
                    {category}
                  </span>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-yellow-400 text-lg">
                    <FaStar />
                  </span>
                        <span className="text-sm font-bold dark:text-white">{rate}</span>
                        <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{formatDate(scheduledDate)}</span>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 dark:text-white group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-text-secondary line-clamp-2 mb-4 flex-1">
                        {desc}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5 mt-auto">
                        <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          <CiClock1 />
                        </span>
                            <span className="text-xs font-medium text-slate-500 dark:text-text-secondary">
                          {`${duration?.hours}h ${duration?.mins}m`}
                        </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-400 text-lg">
                              <MdBarChart />
                            </span>
                            <span className="text-xs font-medium text-slate-500 dark:text-text-secondary">
                          {classLevel}
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 pt-0">
                {!IsEnroll? (
                    <button
                        className="w-full px-4 py-3 bg-gradient-to-r from-primary to-emerald-400 text-white rounded-lg font-medium flex items-center justify-center hover:from-primary/90 hover:to-emerald-400/90 transition-all"
                        onClick={handleEnrollClick}
                    >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Enroll for ${price}
                    </button>
                ) : (
                    <button
                        className="w-full px-4 py-3 bg-gradient-to-r from-primary to-emerald-400 text-white rounded-lg font-medium flex items-center justify-center hover:from-primary/90 hover:to-emerald-400/90 transition-all"
                        onClick={handlePlayClick}
                    >
                        Continue Learning
                        <PlayCircle className="w-4 h-4 ml-2" />
                    </button>
                )}
            </div>
        </div>
    )
}

