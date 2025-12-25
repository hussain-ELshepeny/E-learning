// src/components/lessons/VerySimpleVideoPlayer.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsData } from '@/components/lessons/data.js';
import { X, Clock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const VideoPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundLesson = lessonsData.find(l => l.id === id);
        if (foundLesson) {
            setLesson(foundLesson);
        }
        setLoading(false);
    }, [id]);

    const extractYouTubeId = (url) => {
        if (!url) return '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : '';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

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

    const videoId = extractYouTubeId(lesson.videoUrl);

    return (
        <div className="min-h-screen relative">
            {/* Simple Back Button */}
            <div className="absolute top-0 left-0 z-10">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        navigate(`/lessons`);
                    }}
                    className="bg-primary/60 text-background-dark hover:bg-primary/30 text-white cursor-pointer  "
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* YouTube Video - Full Screen */}
            <div className="h-screen md:p-10 p-2">
                {videoId ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={lesson.title}
                    />
                ) : (
                    <div className="bg-black w-full h-full flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <Play className="w-16 h-16 text-white mx-auto" />
                            <p className="text-white animate-pulse ">Video loading...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Simple Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="bg-primary/30 backdrop-blur-sm rounded-lg p-4 max-w-md">
                    <h2 className="text-white font-medium mb-2">{lesson.title}</h2>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-white/20 text-white">
                            <Clock className="w-3 h-3 mr-1" />
                            {lesson.duration.hours}h {lesson.duration.mins}m
                        </Badge>
                        <span className="text-white/70 text-sm">{lesson.instructor}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;