// src/components/lessons/VerySimpleVideoPlayer.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {X, Clock, Play} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {useGetLessonById} from "@/hooks/useLessons.js";
import toast from "react-hot-toast";
import Loader from "@/components/lessons/Loader.jsx";
import {formatDate} from "@/lib/utils/index.js";

const VideoPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: lesson, isLoading:lessonLoading, error } = useGetLessonById(id);

    if(error) toast(error);

    if(lessonLoading)return <Loader/>
    console.log('lesson', lesson);
    const extractYouTubeId = (url) => {
        if (!url) return '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : '';
    };

    if (!lesson) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <p className="text-white">Video not found</p>
                    <Button onClick={() => navigate('/lessons')}>
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const videoId = extractYouTubeId(lesson.data.video);

    return (
        <div className="relative h-screen md:p-10 p-2 group">

            {/* Back Button */}
            <div className="absolute top-0 left-0 z-10">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/lessons`)}
                    className="bg-primary/60 hover:bg-primary/30 text-white cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* YouTube Video */}
            {videoId ? (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={lesson.data.title}
                />
            ) : (
                <div className="bg-black w-full h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <Play className="w-16 h-16 text-white mx-auto" />
                        <p className="text-white animate-pulse">Video loading...</p>
                    </div>
                </div>
            )}

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                <div className="bg-primary/30 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                    <h2 className="text-white font-medium mb-2">{lesson.data.title}</h2>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-white/20 text-white">
                            {lesson.data.classLevel}
                        </Badge>
                        <span className="text-white/70 text-sm">
                            {formatDate(lesson.data.scheduledDate)}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default VideoPlayer;