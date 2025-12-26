import React from 'react'
import {Button} from "@/components/ui/button.jsx";
import {ChevronLeft, Lock} from "lucide-react";
import {Badge} from "@/components/ui/badge.jsx";
import {useNavigate} from "react-router-dom";

const PaymentHeader = ({id,lesson})=> {
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 text-white border-b border-gray-200 ">
            <div className="px-4 py-4">
                <div className="flex md:flex-row flex-col gap-3 md:items-center items-start justify-between">
                    <button
                        onClick={() => navigate(`/lessons/${id}`)}
                        className="px-4 py-2 text-text-secondary hover:text-primary border border-dark-surfaceDarker rounded-lg flex items-center gap-2 text-sm transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    <div className="flex items-center gap-2 text-2xl">
                        <Lock className="w-5 h-5 text-primary" />
                        <h1 className="font-semibold">Enroll in Lesson</h1>
                    </div>

                    <Badge variant="outline" className="text-primary border-primary/50 shadow-xl text-xl">
                        $ {lesson.price}
                    </Badge>
                </div>
            </div>
        </header>
    )
}
export default PaymentHeader
