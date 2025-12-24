// src/pages/PaymentPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsData } from '@/components/lessons/data.js';
import {
    CheckCircle2,
    Download,
    Clock,
    AlertCircle,
} from 'lucide-react';


import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PaymentHeader from "@/components/lessons/payment/PaymentHeader.jsx";
import PaymentForm from "@/components/lessons/payment/PaymentForm.jsx";
import PaymentSummary from "@/components/lessons/payment/PaymentSummary.jsx";

const PaymentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const lesson = lessonsData.find(l => l.id === id);


    if (!lesson) {
        navigate('/lessons');
        return null;
    }


    return (
        <section className="min-h-screen">
            {/* Simple Header */}
            <PaymentHeader lesson={lesson} id={id} />

            <section className=" md:px-4 px-0 py-8">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                    {/* Left Column: Form */}
                    <div>
                        <PaymentForm lesson={lesson} id={id} />
                    </div>

                    {/* Right Column: Summary */}
                    <PaymentSummary lesson={lesson}/>
                </div>
            </section>
        </section>
    );
};

export default PaymentPage;