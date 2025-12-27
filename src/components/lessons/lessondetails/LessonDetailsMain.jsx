import React from 'react'
import {
    BookOpen,
    Calendar,
    Clock,
    Download,
    FileText,
    MessageSquare,
    PlayCircle,
    User
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import ActionButton from "@/components/lessons/lessondetails/ActionButton.jsx";
import {formatDate} from "@/lib/utils/index.js";
const LessonDetailsMain = ({lesson,id,isPurchased}) => {
    const navigate = useNavigate();
    const handlePlay = () => {
        if (lesson.isPaid ||isPurchased) {
            navigate(`/lessons/${id}/play`);
        }
        else{
            navigate(`/lessons`);
        }
    };


    const extractYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const youtubeId = extractYouTubeId(lesson.video);

    return (
        <section className="lg:col-span-2 col-span-1 space-y-8">
            {/* Video Preview */}
            <div className="bg-surface-dark border border-surface-darker rounded-xl overflow-hidden">
                <div className="p-6 border-b border-surface-darker">
                    <div className="flex md:flex-row flex-col gap-3 items-start justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">{lesson.title}</h1>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                                    {lesson.classLevel}
                                </span>
                                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm flex items-center gap-1">
                                    {lesson.price} EGP
                                </span>
                                <span className="px-3 py-1 text-text-secondary border-2 border-surface-darker rounded-full text-sm">
                                    {formatDate(lesson.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-300">{lesson.description}</p>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video bg-black">
                    {youtubeId? (
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={lesson.title}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                                    <PlayCircle className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-white">Video preview</p>
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                            <button
                                className="px-6 py-3 bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
                                onClick={handlePlay}
                            >
                                {!lesson.isPaid ||isPurchased ? (
                                    <>
                                        <PlayCircle className="w-5 h-5" />
                                        Continue Learning
                                    </>
                                ) : (
                                    <>
                                        Enroll for {lesson.price} EGP
                                    </>
                                )}
                            </button>

                            <div className="flex items-center gap-2">
                                <button className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                                    <Download className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                                    <MessageSquare className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <ActionButton lesson={lesson} id={id} isPurchased={isPurchased}/>
            </div>

            {/* Lesson Information */}
            <div className="bg-surface-dark border border-surface-darker rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Lesson Details
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                        <p className="text-gray-300 leading-relaxed">
                            {lesson.description}
                        </p>
                    </div>

                    <div className="h-px bg-surface-darker" />

                    {/* Lesson Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/20 rounded-lg">
                                    <Calendar className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-text-secondary">Scheduled Date</p>
                                    <p className="text-white font-medium">{formatDate(lesson.scheduledDate)}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/20 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-text-secondary">Class Level</p>
                                    <p className="text-white font-medium">{lesson.classLevel}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/20 rounded-lg">
                                    <Clock className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-text-secondary">created At</p>
                                    <p className={`text-white`}>{formatDate(lesson.createdAt)}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/20 rounded-lg">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-text-secondary">Instructor</p>
                                    <p className="text-white font-medium">{lesson.createdBy}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}
export default LessonDetailsMain;
