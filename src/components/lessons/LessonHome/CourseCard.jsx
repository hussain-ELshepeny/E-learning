import { CiClock1 } from "react-icons/ci"
import { MdBarChart } from "react-icons/md"
import { FaPlay } from "react-icons/fa";
import React from "react";
import { useNavigate } from 'react-router-dom';
import {
    PlayCircle,
    Calendar,
} from 'lucide-react';
import {formatDate} from "@/lib/utils/index.js";
import {usePayLesson} from "@/hooks/useLessons.js";
import ErrorCard from "@/components/lessons/ErrorCard.jsx";
import Loader from "@/components/lessons/Loader.jsx";
export default function CourseCard({
     id,
     video,
    title,
    desc,
    createdAt,
   classLevel,
   price,
   isPaid,
   scheduledDate,
   Purchasedlessons,
   notMyLessons
}) {
    const navigate = useNavigate();
    const { payLesson, isLoading ,error } = usePayLesson();
    const handleCardClick = () => {
        if (!isPaid || Purchasedlessons) {
            navigate(`/lessons/${id}`);
        } else {
            payLesson(id);
        }
    };

    const isPurchased = !notMyLessons?.some(lesson => lesson._id === id);

    if(error){
        return (
            <ErrorCard error={error}/>
        );
    }

    if(isLoading)return <Loader />;

    const handleEnrollClick = () => {
        if (isPaid) {
            payLesson(id);
        }
    };

    const handlePlayClick = () => {
        if (!isPaid || Purchasedlessons) {
            navigate(`/lessons/${id}/play`);
        } else {
            payLesson(id);
        }
    };

    const getYouTubeVideoId = (url) => {
        if (!url) return null;

        const regExp =
            /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    const getYouTubeThumbnail = (url) => {
        const videoId = getYouTubeVideoId(url);
        return videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : "";
    };

    return (
        <div className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-surface-dark border border-gray-100 dark:border-[#264532] hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group h-full">
            <div
                onClick={handleCardClick}
            >
                <div className="relative w-full overflow-hidden">
                    <div className="relative">
                        <img
                            src={getYouTubeThumbnail(video)}
                            alt="Lesson thumbnail"
                            className="w-full h-full object-cover rounded-t-lg"
                        />
                        <FaPlay className="absolute inset-0 m-auto w-12 h-12 text-background-dark" />
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
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
                          {formatDate(createdAt)}
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
                {isPaid && !Purchasedlessons && !isPurchased? (
                    <button
                        className="w-full px-4 py-3 bg-gradient-to-r from-primary to-emerald-400 text-white rounded-lg font-medium flex items-center justify-center hover:from-primary/90 hover:to-emerald-400/90 transition-all"
                        onClick={handleEnrollClick}
                    >
                        Enroll for {price} EGP
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

