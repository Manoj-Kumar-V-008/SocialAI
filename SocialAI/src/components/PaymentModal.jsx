import { useState } from 'react';
import { X, CreditCard, Wallet, Bitcoin, Check, Sparkles, ArrowLeft } from 'lucide-react';
import { processPayment, updateSubscription } from '../services/backendSimulator';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const PaymentModal = ({ isOpen, onClose, selectedPlan, planDetails }) => {
    const { upgradeSubscription } = useAuth();
    const { showToast } = useNotifications();
    const [step, setStep] = useState(1); // 1: Payment Method, 2: Details, 3: Processing, 4: Success
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    if (!isOpen) return null;

    const price = planDetails?.price || 0;
    const finalPrice = price - discount;

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

    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.slice(0, 2) + '/' + v.slice(2, 4);
        }
        return v;
    };

    const applyPromoCode = () => {
        const codes = {
            'SAVE20': 0.20,
            'FIRST10': 0.10,
            'WELCOME50': 0.50
        };

        if (codes[promoCode.toUpperCase()]) {
            const discountAmount = price * codes[promoCode.toUpperCase()];
            setDiscount(discountAmount);
            showToast(`Promo code applied! You saved $${discountAmount.toFixed(2)}`, 'success');
        } else {
            showToast('Invalid promo code', 'error');
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        setStep(3);

        try {
            const paymentData = {
                amount: finalPrice,
                plan: selectedPlan,
                method: paymentMethod,
                cardNumber: cardDetails.number
            };

            const result = await processPayment(paymentData);

            if (result.success) {
                // Update subscription
                await updateSubscription(selectedPlan);
                upgradeSubscription(selectedPlan);

                setTransactionId(result.transactionId);
                setStep(4);

                setTimeout(() => {
                    showToast(`Welcome to ${selectedPlan} tier! 🎉`, 'success', 5000);
                }, 1000);
            }
        } catch (error) {
            showToast(error.message || 'Payment failed. Please try again.', 'error');
            setStep(2);
        } finally {
            setIsProcessing(false);
        }
    };

    const resetAndClose = () => {
        setStep(1);
        setPaymentMethod('card');
        setCardDetails({ number: '', name: '', expiry: '', cvv: '' });
        setPromoCode('');
        setDiscount(0);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-900 rounded-3xl w-full max-w-lg overflow-hidden border border-gray-800 shadow-2xl animate-bounce-in">

                {/* Header */}
                <div className="relative p-6 border-b border-gray-800 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <button
                        onClick={resetAndClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {step > 1 && step < 4 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}

                    <div className="text-center pt-8">
                        <h2 className="text-2xl font-black mb-2">
                            {step === 4 ? 'Payment Successful! 🎉' : `Upgrade to ${selectedPlan}`}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {step === 1 && 'Choose your payment method'}
                            {step === 2 && 'Enter your payment details'}
                            {step === 3 && 'Processing your payment...'}
                            {step === 4 && 'Welcome to premium features!'}
                        </p>
                    </div>

                    {/* Progress Indicator */}
                    {step < 4 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {[1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    className={`h-1 w-12 rounded-full transition-all ${i <= step ? 'bg-cyan-500' : 'bg-gray-700'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">

                    {/* Step 1: Payment Method Selection */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div
                                onClick={() => setPaymentMethod('card')}
                                className={`
                                    p-4 rounded-xl border-2 cursor-pointer transition-all
                                    ${paymentMethod === 'card'
                                        ? 'border-cyan-500 bg-cyan-500/10'
                                        : 'border-gray-800 hover:border-gray-700'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-6 h-6 text-cyan-400" />
                                    <div className="flex-1">
                                        <p className="font-bold">Credit / Debit Card</p>
                                        <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
                                    </div>
                                    {paymentMethod === 'card' && <Check className="w-5 h-5 text-cyan-400" />}
                                </div>
                            </div>

                            <div
                                onClick={() => setPaymentMethod('paypal')}
                                className={`
                                    p-4 rounded-xl border-2 cursor-pointer transition-all
                                    ${paymentMethod === 'paypal'
                                        ? 'border-cyan-500 bg-cyan-500/10'
                                        : 'border-gray-800 hover:border-gray-700'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Wallet className="w-6 h-6 text-blue-400" />
                                    <div className="flex-1">
                                        <p className="font-bold">PayPal</p>
                                        <p className="text-xs text-gray-500">Fast & secure</p>
                                    </div>
                                    {paymentMethod === 'paypal' && <Check className="w-5 h-5 text-cyan-400" />}
                                </div>
                            </div>

                            <div
                                onClick={() => setPaymentMethod('crypto')}
                                className={`
                                    p-4 rounded-xl border-2 cursor-pointer transition-all
                                    ${paymentMethod === 'crypto'
                                        ? 'border-cyan-500 bg-cyan-500/10'
                                        : 'border-gray-800 hover:border-gray-700'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Bitcoin className="w-6 h-6 text-orange-400" />
                                    <div className="flex-1">
                                        <p className="font-bold">Cryptocurrency</p>
                                        <p className="text-xs text-gray-500">BTC, ETH, USDT</p>
                                    </div>
                                    {paymentMethod === 'crypto' && <Check className="w-5 h-5 text-cyan-400" />}
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {/* Step 2: Payment Details */}
                    {step === 2 && (
                        <div className="space-y-4">
                            {paymentMethod === 'card' && (
                                <>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="4242 4242 4242 4242"
                                            value={cardDetails.number}
                                            onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                                            maxLength={19}
                                            className="w-full bg-black border border-gray-700 rounded-lg p-3 mt-1 focus:border-cyan-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase">Cardholder Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={cardDetails.name}
                                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                            className="w-full bg-black border border-gray-700 rounded-lg p-3 mt-1 focus:border-cyan-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase">Expiry</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={cardDetails.expiry}
                                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                                                maxLength={5}
                                                className="w-full bg-black border border-gray-700 rounded-lg p-3 mt-1 focus:border-cyan-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase">CVV</label>
                                            <input
                                                type="password"
                                                placeholder="123"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                                                maxLength={4}
                                                className="w-full bg-black border border-gray-700 rounded-lg p-3 mt-1 focus:border-cyan-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {paymentMethod === 'paypal' && (
                                <div className="text-center py-8">
                                    <Wallet className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                                    <p className="text-gray-400">You'll be redirected to PayPal to complete your payment</p>
                                </div>
                            )}

                            {paymentMethod === 'crypto' && (
                                <div className="text-center py-8">
                                    <Bitcoin className="w-16 h-16 mx-auto mb-4 text-orange-400 animate-pulse" />
                                    <p className="text-gray-400">Cryptocurrency payment will be processed on the next step</p>
                                </div>
                            )}

                            {/* Promo Code */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Promo Code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                        className="flex-1 bg-black border border-gray-700 rounded-lg p-2 text-sm focus:border-cyan-500 focus:outline-none"
                                    />
                                    <button
                                        onClick={applyPromoCode}
                                        disabled={!promoCode}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Try: SAVE20, FIRST10, or WELCOME50</p>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">{selectedPlan} Plan</span>
                                    <span className="font-bold">${price}/mo</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between mb-2 text-green-400">
                                        <span>Discount</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="border-t border-cyan-500/20 pt-2 mt-2 flex justify-between">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold text-xl text-cyan-400">${finalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)}
                                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-5 h-5" />
                                Pay ${finalPrice.toFixed(2)}
                            </button>
                        </div>
                    )}

                    {/* Step 3: Processing */}
                    {step === 3 && (
                        <div className="text-center py-12">
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping"></div>
                                <div className="relative w-full h-full bg-gray-800 rounded-full flex items-center justify-center border-2 border-cyan-500">
                                    <Sparkles className="w-12 h-12 text-cyan-400 animate-pulse" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Processing Payment...</h3>
                            <p className="text-gray-400">Please wait while we verify your transaction</p>
                        </div>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div className="text-center py-8">
                            <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in">
                                <Check className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">You're all set!</h3>
                            <p className="text-gray-400 mb-6">Your {selectedPlan} subscription is now active</p>

                            <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-left">
                                <div className="text-xs text-gray-500 mb-1">Transaction ID</div>
                                <div className="font-mono text-sm text-cyan-400">{transactionId}</div>
                            </div>

                            <button
                                onClick={resetAndClose}
                                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95"
                            >
                                Start Exploring
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
