import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    CheckCircle2,
    Download,
    Clock,
    AlertCircle,
} from 'lucide-react';
const PaymentSummary = ({lesson}) => {
    const totalAmount = lesson.price;
    const taxAmount = totalAmount * 0.05;
    const finalTotal = totalAmount + taxAmount;

    return (
        <div className="space-y-6">
            {/* Order Summary */}
            <Card className={`bg-surface-darker text-white border-background-dark`}>
                <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <img
                            src={lesson.thumbnail}
                            alt={lesson.title}
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="space-y-1 flex-1">
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-text-secondary line-clamp-2">
                                {lesson.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-text-secondary">
                                              <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                  {lesson.duration.hours}h {lesson.duration.mins}m
                                              </span>
                                <span className="flex items-center gap-1">
                                                    <Download className="w-3 h-3" />
                                    {lesson.downloads} files
                                                </span>
                            </div>
                        </div>
                        <div className="font-semibold">${lesson.price.toFixed(2)}</div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Tax (5%)</span>
                            <span>${taxAmount.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-lg">${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Features */}
            <Card className={`bg-surface-darker text-white border-background-dark`}>
                <CardHeader>
                    <CardTitle className="text-lg">What You'll Get</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-sm">Full lifetime access to the lesson</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-sm">Downloadable resources and materials</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-sm">Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-sm">Access on mobile and desktop</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-sm">30-day money-back guarantee</span>
                    </div>
                </CardContent>
            </Card>

            {/* Support */}
            <Alert variant="default" className="bg-surface-darker text-white border-surface-dark">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm text-white">
                    <strong>Need help?</strong> Contact our support team at support@example.com or call (800) 123-4567
                </AlertDescription>
            </Alert>
        </div>
    )
}
export default PaymentSummary
