import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import PaymentModal from '../components/PaymentModal';
import { Check, Zap, Crown, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Upgrade = () => {
    const { user } = useAuth();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = {
        free: {
            name: 'Starter',
            price: 0,
            color: 'gray',
            features: [
                'Basic AI Generation (5/day)',
                'Standard Feed Access',
                'Community Support'
            ]
        },
        pro: {
            name: 'Pro',
            price: 9.99,
            color: 'cyan',
            icon: Zap,
            popular: true,
            features: [
                'Verified Badge',
                'Unlimited AI Generations',
                '4K Shorts Uploads',
                'Priority Support',
                'Advanced Analytics',
                'Custom Themes'
            ]
        },
        elite: {
            name: 'Elite',
            price: 24.99,
            color: 'yellow',
            icon: Crown,
            features: [
                'Gold Verified Badge',
                'Access to GPT-5 & DALL-E 4',
                'Early Access to Features',
                'Dedicated Account Manager',
                'Crypto Wallet Integration',
                'NFT Gallery Access',
                'Custom AI Training'
            ]
        }
    };

    const handleUpgrade = (tier) => {
        if (tier === user?.subscriptionTier) return;
        if (tier === 'free') return;

        setSelectedPlan(tier);
        setShowPaymentModal(true);
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans">
            <Sidebar />

            <main className="flex-1 w-full md:max-w-5xl mx-auto p-4 md:p-8 flex flex-col items-center">

                <div className="text-center mb-12 animate-fade-in relative z-10">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full -z-10"></div>
                    <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest border border-yellow-400/30 mb-4">
                        Unlock the Future
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-4">
                        Upgrade to <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">SocialAI+</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">Supercharge your experience. Get verified, access advanced AI tools, and stand out from the crowd.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {/* Free Tier */}
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-gray-700 transition-all">
                        {user?.subscriptionTier === 'free' && (
                            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">CURRENT</div>
                        )}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-400">Starter</h3>
                            <div className="flex items-baseline gap-1 mt-2">
                                <span className="text-4xl font-black text-white">$0</span>
                                <span className="text-gray-500">/mo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {plans.free.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                    <Check className="w-5 h-5 text-gray-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            className="w-full py-3 rounded-xl border border-gray-700 font-bold hover:bg-gray-800 transition-colors"
                            disabled={user?.subscriptionTier === 'free'}
                        >
                            {user?.subscriptionTier === 'free' ? 'Current Plan' : 'Downgrade'}
                        </button>
                    </div>

                    {/* Pro Tier (Highlighted) */}
                    <div className="bg-gray-900 border border-cyan-500 rounded-3xl p-8 flex flex-col relative overflow-hidden transform md:-translate-y-4 shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-pulse-glow">
                        <div className="absolute top-0 right-0 bg-gradient-to-bl from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">POPULAR</div>
                        {user?.subscriptionTier === 'pro' && (
                            <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">CURRENT</div>
                        )}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                                <Zap className="w-5 h-5 fill-current" /> Pro
                            </h3>
                            <div className="flex items-baseline gap-1 mt-2">
                                <span className="text-5xl font-black text-white">$9.99</span>
                                <span className="text-gray-500">/mo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {plans.pro.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                    <Check className={`w-5 h-5 ${i === 0 ? 'text-cyan-400' : 'text-cyan-400'}`} />
                                    {i === 0 ? (
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">{feature}</span>
                                    ) : (
                                        feature
                                    )}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleUpgrade('pro')}
                            disabled={user?.subscriptionTier === 'pro'}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {user?.subscriptionTier === 'pro' ? 'Current Plan' : 'Get Started'}
                        </button>
                    </div>

                    {/* Elite Tier */}
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-yellow-500/50 transition-all">
                        {user?.subscriptionTier === 'elite' && (
                            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">CURRENT</div>
                        )}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                                <Crown className="w-5 h-5 fill-current" /> Elite
                            </h3>
                            <div className="flex items-baseline gap-1 mt-2">
                                <span className="text-4xl font-black text-white">$24.99</span>
                                <span className="text-gray-500">/mo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {plans.elite.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                    <Check className="w-5 h-5 text-yellow-400" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleUpgrade('elite')}
                            disabled={user?.subscriptionTier === 'elite'}
                            className="w-full py-3 rounded-xl border border-gray-700 font-bold hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {user?.subscriptionTier === 'elite' ? 'Current Plan' : 'Contact Sales'}
                        </button>
                    </div>
                </div>

                {/* Features Comparison */}
                <div className="mt-16 w-full max-w-4xl">
                    <h2 className="text-2xl font-bold text-center mb-8">Why Upgrade?</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all">
                            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                                <Star className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="font-bold mb-2">Stand Out</h3>
                            <p className="text-sm text-gray-400">Get verified badges and premium profile features to increase visibility</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="font-bold mb-2">Unlimited Creation</h3>
                            <p className="text-sm text-gray-400">Generate unlimited AI content and access exclusive models</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all">
                            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-yellow-400" />
                            </div>
                            <h3 className="font-bold mb-2">Priority Everything</h3>
                            <p className="text-sm text-gray-400">Get priority support, faster processing, and early feature access</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 text-sm">Cancel anytime. Secure payment processing. 30-day money-back guarantee.</p>
                </div>

            </main>

            <BottomNav />

            {/* Payment Modal */}
            {showPaymentModal && (
                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={() => {
                        setShowPaymentModal(false);
                        setSelectedPlan(null);
                    }}
                    selectedPlan={selectedPlan}
                    planDetails={plans[selectedPlan]}
                />
            )}
        </div>
    );
};

export default Upgrade;

