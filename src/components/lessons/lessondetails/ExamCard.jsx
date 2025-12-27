import React from "react";
import { useNavigate } from "react-router-dom";
import {formatDate} from "@/lib/utils/index.js";
import {
    Clock,
    Calendar,
    Target,
    BookOpen,
    AlertCircle,
    CheckCircle,
    PlayCircle,
    ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ExamCard = ({exam}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (exam._id) {
            navigate(`/exam/${exam._id}`);
        }
    };

    const now = new Date();
    const startDate = new Date(exam.startDate);
    const endDate = new Date(exam.endDate);
    const hasQuestions = exam.questions && exam.questions.length > 0;

    const getExamStatus = () => {
        if (!exam.isPublished) {
            return {
                color: "bg-gray-500/20 text-gray-400",
                text: "Draft",
                icon: <AlertCircle className="w-3 h-3" />
            };
        }

        if (now < startDate) {
            return {
                color: "bg-blue-500/20 text-blue-400",
                text: "Upcoming",
                icon: <Calendar className="w-3 h-3" />
            };
        }

        if (now > endDate) {
            return {
                color: "bg-red-500/20 text-red-400",
                text: "Expired",
                icon: <AlertCircle className="w-3 h-3" />
            };
        }

        return {
            color: "bg-green-500/20 text-green-400",
            text: "Active",
            icon: <CheckCircle className="w-3 h-3" />
        };
    };
    const status = getExamStatus();
    const isActive = exam.isPublished && now >= startDate && now <= endDate;

    return (
        <Card
            className="bg-surface-dark border-surface-darker hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={handleCardClick}
        >
            <CardContent className="p-5">
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-blue-500/20 text-blue-400">
                                    <Target className="w-3 h-3 mr-1" />
                                    {exam.classLevel}
                                </Badge>
                                <Badge className={status.color}>
                                    {status.icon}
                                    {status.text}
                                </Badge>
                            </div>

                            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors truncate">
                                {exam.title}
                            </h3>

                            <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                                {exam.description || "No description available"}
                            </p>
                        </div>

                        <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
                    </div>

                    {/* Exam Details */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-text-secondary" />
                            <div>
                                <p className="text-xs text-text-secondary">Duration</p>
                                <p className="text-sm text-white">{exam.duration} min</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-text-secondary" />
                            <div>
                                <p className="text-xs text-text-secondary">Questions</p>
                                <p className={`text-sm ${hasQuestions ? 'text-white' : 'text-yellow-400'}`}>
                                    {exam.questions?.length || 0}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-text-secondary" />
                            <div>
                                <p className="text-xs text-text-secondary">Start Date</p>
                                <p className="text-sm text-white">{formatDate(startDate)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-text-secondary" />
                            <div>
                                <p className="text-xs text-text-secondary">End Date</p>
                                <p className="text-sm text-white">{formatDate(endDate)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-surface-darker">
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <BookOpen className="w-4 h-4" />
                            <span>ID: {exam._id?.slice(-6)}</span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleCardClick}
                                // disabled={isActive}
                                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                                    !isActive 
                                        ? 'bg-primary text-white hover:bg-primary/90 cursor-pointer'
                                        : 'bg-surface-darker text-text-secondary cursor-not-allowed'
                                }`}
                            >
                                <PlayCircle className="w-4 h-4" />
                                Take Exam
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default ExamCard
