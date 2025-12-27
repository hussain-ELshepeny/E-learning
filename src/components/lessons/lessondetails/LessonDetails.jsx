import React from 'react';
import { useParams } from 'react-router-dom';
import LessonDetailsHeader from "@/components/lessons/lessondetails/LessonDetailsHeader.jsx";
import LessonDetailsSidebar from "@/components/lessons/lessondetails/LessonDetailsSidebar.jsx";
import LessonDetailsMain from "@/components/lessons/lessondetails/LessonDetailsMain.jsx";
import {useGetLessonById, useGetMyPurchasedLessons} from "@/hooks/useLessons.js";
import ErrorCard from "@/components/lessons/ErrorCard.jsx";
import Loader from "@/components/lessons/Loader.jsx";

const LessonDetails = () => {
    const { id } = useParams();
    const { data: lesson, isLoading:lessonLoading, error } = useGetLessonById(id);
    const { data: Purchasedlessons, isLoading:PurchasedlessonLoading, error:Purchasederror } = useGetMyPurchasedLessons();

    if(error){
        return (
            <ErrorCard error={error}/>
        );
    }
    if(Purchasederror){
        return (
            <ErrorCard error={Purchasederror}/>
        );
    }

    if (!lesson || lessonLoading ||PurchasedlessonLoading) return <Loader/>;
    if(!lesson){
        return <div className={`min-h-screen`}>
            <p className={`text-4xl text-white text-bold`}>We don't found the lessons</p>
        </div>
    }
    const isPurchased = Purchasedlessons?.data?.some(
        (purchasedLesson) => purchasedLesson._id === lesson.data._id
    );

    console.log(isPurchased);
    return (
        <section className="min-h-screen bg-gradient-to-b from-dark-background to-dark-surfaceDarker">

            {/* Header */}
            <LessonDetailsHeader/>
            <div className="lg:px-4 px-0 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <LessonDetailsMain lesson={lesson.data} id={id} isPurchased={isPurchased}/>

                    <LessonDetailsSidebar lesson={lesson.data} id={id} isPurchased={isPurchased}/>
                </div>
            </div>
        </section>
    );
};

export default LessonDetails;