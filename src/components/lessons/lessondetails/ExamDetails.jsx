import React from 'react';
import {
    BookOpen,
    FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExamCard from "@/components/lessons/lessondetails/ExamCard.jsx";

const ExamDetails = ({exams,classlevel}) => {

    let StudentExams ;
    if(classlevel == '') {
        StudentExams = exams;
    }
    else {
        StudentExams = exams.data?.filter(
            (exam) => exam.classLevel === classlevel
        );
    }

    if (!StudentExams || StudentExams.length === 0) {
        return (
            <Card className="bg-surface-dark border-surface-darker">
                <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-surface-darker rounded-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No Exams Available</h3>
                    <p className="text-text-secondary">
                        No exams found for {classlevel}. Check back later or contact your instructor.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-4 bg-surface-dark border border-surface-darker rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white">
                Exams for {classlevel}
                <span className="text-text-secondary text-lg ml-2">
                    ({StudentExams.length} exams)
                </span>
            </h2>
            <div className={`grid grid-cols-1 gap-4 md:grid-cols-2  `}>
                {StudentExams.data?
                    StudentExams?.data?.map((exam) => (
                        <ExamCard key={exam._id} exam={exam} />
                    )):StudentExams?.map((exam) => (
                        <ExamCard key={exam._id} exam={exam} />
                    ))
                }
            </div>

        </div>
    )
}
export default ExamDetails;
