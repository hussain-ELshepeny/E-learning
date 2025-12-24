import React, {useState} from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {AlertCircle, CreditCard, Loader2, Lock, Mail, Phone, Shield, User ,ExternalLink} from "lucide-react";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Alert, AlertDescription} from "@/components/ui/alert.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const PaymentForm = ({lesson,id}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [fawryPhone, setFawryPhone] = useState('');
    const [fawryTermsAccepted, setFawryTermsAccepted] = useState(false);
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [fawryVoucherCode, setFawryVoucherCode] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger
    } = useForm({
        defaultValues: {
            cardholderName: '',
            cardNumber: '',
            expiry: '',
            cvc: '',
            email: '',
            phone: '',
            saveCard: false,
            agreedToTerms: false
        },
        mode: 'onChange'
    });


    // Format card number input
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        return parts.length ? parts.join(' ') : value;
    };

    // Format expiry date input
    const formatExpiry = (value) => {
        const v = value.replace(/\D/g, '');
        if (v.length >= 2) {
            return v.slice(0, 2) + '/' + v.slice(2, 4);
        }
        return v;
    };

    // Handle input changes with formatting
    const handleInputChange = async (field, value, maxLength = null) => {
        let formattedValue = value;

        if (field === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (field === 'expiry') {
            formattedValue = formatExpiry(value);
        } else if (field === 'cvc') {
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
        } else if (field === 'phone') {
            formattedValue = value.replace(/\D/g, '').slice(0, 15);
        }

        // Apply max length if specified
        if (maxLength && formattedValue.length > maxLength) {
            formattedValue = formattedValue.slice(0, maxLength);
        }

        setValue(field, formattedValue);
        await trigger(field);
    };

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In a real app, you would process payment here
            console.log('Payment data:', data);

            // Simulate success
            setTimeout(() => {
                navigate(`/lessons/${id}/play`);
            }, 500);

        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
            setLoading(false);
        }
    };

    const generateFawryVoucher = async () => {
        setLoading(true);
        try {
            // Simulate API call to generate Fawry voucher
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate voucher code
            const voucherCode = `FAWRY-${Date.now().toString(36).toUpperCase()}`;

            // Show voucher modal
            setShowVoucherModal(true);
            setFawryVoucherCode(voucherCode);

            console.log('Fawry voucher generated:', {
                phone: fawryPhone,
                amount: finalTotal,
                voucherCode: voucherCode,
                lessonId: id
            });

        } catch (error) {
            console.error('Failed to generate Fawry voucher:', error);
            alert('Failed to generate voucher. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    const totalAmount = lesson.price;
    const taxAmount = totalAmount * 0.05;
    const finalTotal = totalAmount + taxAmount;

    // Watch form values
    const formValues = watch();
    const isFormValid =
        formValues.cardholderName.trim() &&
        formValues.cardNumber.replace(/\s/g, '').length >= 16 &&
        formValues.expiry && formValues.expiry.includes('/') && formValues.expiry.length === 5 &&
        formValues.cvc && formValues.cvc.length >= 3 &&
        formValues.email && /\S+@\S+\.\S+/.test(formValues.email) &&
        formValues.phone && formValues.phone.replace(/\D/g, '').length >= 10 &&
        formValues.agreedToTerms;

    return (
        <Card className={`bg-surface-dark border border-surface-darker rounded-xl overflow-hidden text-white`}>
            <CardHeader>
                <CardTitle className="text-xl">Complete Enrollment</CardTitle>
                <CardDescription className="text-text-secondary">
                    Enter your payment details to enroll in "{lesson.title}"
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-text-secondary" />
                            <h3 className="font-medium">Contact Information</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className={`ps-9 input ${errors.email ? 'border-destructive' : ''}`}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: 'Please enter a valid email address'
                                            }
                                        })}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="phone">Phone Number *</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(123) 456-7890"
                                        className={`ps-9 input ${errors.phone ? 'border-destructive' : ''}`}
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            validate: (value) =>
                                                value.replace(/\D/g, '').length >= 10 || 'Please enter a valid phone number'
                                        })}
                                        onChange={(e) => handleInputChange('phone', e.target.value, 15)}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-text-secondary" />
                            <h3 className="font-medium">Payment Method</h3>
                        </div>

                        <Tabs defaultValue="card" className="w-full" onValueChange={setPaymentMethod}>
                            <TabsList className="grid w-full grid-cols-2 bg-surface-darker selection:bg-background-dark">
                                <TabsTrigger value="card" className={`dark:data-[state=active]:bg-primary border-none`}>Credit Card</TabsTrigger>
                                <TabsTrigger value="fawry" className={`dark:data-[state=active]:bg-primary border-none`}>Fawry</TabsTrigger>
                            </TabsList>

                            <TabsContent value="card" className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="cardholderName">Cardholder Name *</Label>
                                        <Input
                                            id="cardholderName"
                                            placeholder="John Doe"
                                            className={errors.cardholderName ? 'border-destructive input' : 'input'}
                                            {...register('cardholderName', {
                                                required: 'Cardholder name is required'
                                            })}
                                            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                                        />
                                        {errors.cardholderName && (
                                            <p className="text-sm text-destructive mt-1">{errors.cardholderName.message}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="cardNumber">Card Number *</Label>
                                        <Input
                                            id="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            className={errors.cardNumber ? 'border-destructive input' : 'input'}
                                            {...register('cardNumber', {
                                                required: 'Card number is required',
                                                validate: (value) =>
                                                    value.replace(/\s/g, '').length >= 16 || 'Please enter a valid card number'
                                            })}
                                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                        />
                                        {errors.cardNumber && (
                                            <p className="text-sm text-destructive mt-1">{errors.cardNumber.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="expiry">Expiry Date *</Label>
                                            <Input
                                                id="expiry"
                                                placeholder="MM/YY"
                                                className={errors.expiry ? 'border-destructive input' : 'input'}
                                                {...register('expiry', {
                                                    required: 'Expiry date is required',
                                                    pattern: {
                                                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                                        message: 'Please enter a valid expiry date (MM/YY)'
                                                    }
                                                })}
                                                onChange={(e) => handleInputChange('expiry', e.target.value)}
                                            />
                                            {errors.expiry && (
                                                <p className="text-sm text-destructive mt-1">{errors.expiry.message}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="cvc">CVC *</Label>
                                            <Input
                                                id="cvc"
                                                placeholder="123"
                                                type="password"
                                                className={errors.cvc ? 'border-destructive input' : 'input'}
                                                {...register('cvc', {
                                                    required: 'CVC is required',
                                                    minLength: {
                                                        value: 3,
                                                        message: 'CVC must be at least 3 digits'
                                                    },
                                                    maxLength: {
                                                        value: 4,
                                                        message: 'CVC must be at most 4 digits'
                                                    }
                                                })}
                                                onChange={(e) => handleInputChange('cvc', e.target.value, 4)}
                                            />
                                            {errors.cvc && (
                                                <p className="text-sm text-destructive mt-1">{errors.cvc.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="saveCard"
                                            className={`input`}
                                            checked={formValues.saveCard}
                                            onCheckedChange={(checked) => setValue('saveCard', checked)}
                                        />
                                        <Label htmlFor="saveCard" className="text-sm font-normal">
                                            Save card for future purchases
                                        </Label>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="fawry">
                                <div className="text-center space-y-3 py-5">
                                    <div className="inline-flex p-3 bg-gradient-to-r from-primary to-teal-900 rounded-lg">
                                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7zm0 4h7v2H7z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">Pay with Fawry</h3>
                                        <p className="text-text-secondary">Pay through 180,000+ locations across Egypt</p>
                                    </div>
                                </div>

                                {/* Payment Amount */}
                                <Card className="bg-surface-darker border-surface-darker my-4">
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-text-secondary">Amount to Pay</span>
                                                <span className="text-2xl font-bold text-white">EGP {(finalTotal * 30).toFixed(2)}</span>
                                            </div>
                                            <div className="text-xs text-text-secondary text-center">
                                                ≈ ${finalTotal.toFixed(2)} USD (1 USD = 30 EGP)
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Egyptian Phone Number */}
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <h4 className="font-medium text-white mb-2">Enter your Egyptian mobile number</h4>
                                        <p className="text-sm text-text-secondary">
                                            We'll send the Fawry payment voucher to this number
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-3 top-3 flex items-center gap-2">
                                            <span className="text-white font-medium">+20</span>
                                            <Separator orientation="vertical" className="h-4 mx-2" />
                                        </div>
                                        <Input
                                            type="tel"
                                            placeholder="1X XXX XXXX"
                                            className="input h-12 text-center text-lg"
                                            value={fawryPhone}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                                                setFawryPhone(value);
                                            }}
                                            maxLength={11}
                                        />
                                    </div>
                                </div>

                                {/* Important Information Box */}
                                <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 mt-4">
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="text-center">
                                                <AlertCircle className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                                                <h4 className="font-medium text-white">Important Information</h4>
                                            </div>

                                            <div className="space-y-3 text-sm">
                                                <p className="text-text-secondary leading-relaxed">
                                                    In order to complete your transaction, we will transfer you over to dLocal's secure servers.
                                                </p>

                                                <p className="text-text-secondary leading-relaxed">
                                                    Upon generating your Fawry payment voucher, please make the payment within the next 7 days before it expires. You can save your voucher or access it from the Purchase History page later on.
                                                </p>

                                                <p className="text-text-secondary leading-relaxed">
                                                    Once we confirm your payment is complete, it may take up to 48 hours to give access to your course.
                                                </p>

                                                <p className="text-text-secondary leading-relaxed">
                                                    Fawry is used solely for payment collection. Please contact us for refund-related issues, and note that purchases made with Fawry can only be refunded as platform credits.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Button
                                    className="w-full my-3 h-12 bg-gradient-to-r from-primary to-teal-900 hover:from-teal-900 hover:to-primary"
                                    onClick={generateFawryVoucher}
                                    disabled={!fawryPhone || fawryPhone.length !== 11|| loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating Voucher...
                                        </>
                                    ) : (
                                        <>
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Generate Fawry Voucher
                                        </>
                                    )}
                                </Button>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <Separator />

                    {/* Terms and Conditions */}
                    <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="agreedToTerms"
                                checked={formValues.agreedToTerms}
                                onCheckedChange={(checked) => setValue('agreedToTerms', checked)}
                                className={`mt-1 input ${errors.agreedToTerms ? 'border-destructive' : ''}`}
                            />
                            <div className="space-y-1">
                                <Label htmlFor="agreedToTerms" className="text-sm font-normal">
                                    I agree to the Terms of Service and Privacy Policy *
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    By enrolling, you agree to our terms and acknowledge that you will receive access to the lesson materials.
                                </p>
                                {errors.agreedToTerms && (
                                    <p className="text-sm text-destructive mt-1">You must agree to the terms and conditions</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <Alert variant="default" className="bg-muted border-primary/20 my-6">
                        <Shield className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                            <strong>Secure payment:</strong> Your information is encrypted and secure. We never store your full card details.
                        </AlertDescription>
                    </Alert>

                    {showVoucherModal && (
                        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 ">
                            <Card className="bg-surface-dark border-primary/30 max-w-md lg:max-h-[700px] max-h-[500px] overflow-auto">
                                <CardHeader className="border-b border-surface-darker">
                                    <CardTitle className="text-white text-center flex items-center justify-center gap-2">
                                        <div className="p-2 bg-gradient-to-r from-primary to-teal-900 rounded-lg">
                                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7zm0 4h7v2H7z"/>
                                            </svg>
                                        </div>
                                        <span>Fawry Payment Voucher</span>
                                    </CardTitle>
                                    <CardDescription className="text-center text-text-secondary">
                                        Voucher sent to +20 {fawryPhone}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-6 space-y-6">
                                    {/* Voucher Code */}
                                    <div className="text-center">
                                        <div className="text-sm text-text-secondary mb-2">VOUCHER CODE</div>
                                        <div className="text-3xl font-bold text-primary font-mono tracking-wider p-4 bg-gradient-to-r from-surface-dark to-surface-darker rounded-lg border border-background-dark">
                                            {fawryVoucherCode}
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="text-center">
                                        <div className="text-sm text-text-secondary mb-1">AMOUNT TO PAY</div>
                                        <div className="text-2xl font-bold text-white">EGP {(finalTotal * 30).toFixed(2)}</div>
                                        <div className="text-sm text-text-secondary mt-1">≈ ${finalTotal.toFixed(2)} USD</div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm">1</div>
                                            <span className="text-sm text-white">Go to any Fawry payment point</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm">2</div>
                                            <span className="text-sm text-white">Provide the voucher code above</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm">3</div>
                                            <span className="text-sm text-white">Pay the amount shown</span>
                                        </div>
                                    </div>

                                    {/* Important Note */}
                                    <Alert className="border-background-dark bg-surface-darker">
                                        <AlertCircle className="h-4 w-4 text-primary" />
                                        <AlertDescription className="text-white text-sm">
                                            <strong className={` text-primary`}>Valid for 7 days.</strong> Course access within 48 hours of payment confirmation.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>

                                <CardFooter className="border-t border-surface-darker p-6">
                                    <div className="w-full space-y-3">
                                        <Button
                                            className="w-full bg-gradient-to-r from-primary to-teal-900 text-background-dark"
                                            onClick={() => {
                                                navigator.clipboard.writeText(fawryVoucherCode);
                                                alert('Voucher code copied to clipboard!');
                                            }}
                                        >
                                            Copy Voucher Code
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full dark:bg-transparent text-primary hover:dark:bg-primary"
                                            onClick={() => setShowVoucherModal(false)}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={!isFormValid || loading || paymentMethod === 'paypal'}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="me-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Lock className="me-2 h-4 w-4" />
                                Enroll Now - ${finalTotal.toFixed(2)}
                            </>
                        )}
                    </Button>

                    {paymentMethod === 'paypal' && (
                        <Alert variant="default" className="bg-blue-50 border-blue-200">
                            <AlertCircle className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-blue-600 text-sm">
                                PayPal option requires additional setup. Please use credit card for now.
                            </AlertDescription>
                        </Alert>
                    )}

                    <p className="text-xs text-center text-muted-foreground">
                        You'll be charged ${finalTotal.toFixed(2)} immediately. 30-day money-back guarantee.
                    </p>




                </CardFooter>

            </form>
        </Card>
    )
}
export default PaymentForm
