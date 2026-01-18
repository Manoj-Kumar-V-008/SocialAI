import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { CreditCard, Download, Check, Trash2, Plus, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Billing = () => {
    const { user } = useAuth();
    const { showToast } = useNotifications();
    const [transactions, setTransactions] = useState([]);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        // Load transactions and subscription
        const txns = JSON.parse(localStorage.getItem('transactions') || '[]');
        setTransactions(txns);
        const sub = JSON.parse(localStorage.getItem('subscription') || '{}');
        setSubscription(sub);
    }, []);

    const getTierColor = (tier) => {
        if (tier === 'pro') return 'from-cyan-500 to-blue-600';
        if (tier === 'elite') return 'from-yellow-400 to-orange-500';
        return 'from-gray-600 to-gray-700';
    };

    const downloadReceipt = (txn) => {
        const receipt = {
            ...txn,
            downloadedAt: new Date().toISOString(),
            company: 'SocialAI Inc.',
            address: '1 AI Plaza, San Francisco, CA 94103'
        };

        const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt_${txn.id}.json`;
        a.click();

        showToast('Receipt downloaded successfully', 'success');
    };

    const cancelSubscription = () => {
        if (window.confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
            const sub = JSON.parse(localStorage.getItem('subscription') || '{}');
            sub.status = 'cancelled';
            localStorage.setItem('subscription', JSON.stringify(sub));
            setSubscription(sub);
            showToast('Subscription cancelled. Access until ' + new Date(sub.nextBilling).toLocaleDateString(), 'warning', 5000);
        }
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans">
            <Sidebar />

            <main className="flex-1 w-full md:max-w-4xl mx-auto p-4 md:p-8">
                <h1 className="text-3xl font-black mb-8">Billing & Subscription</h1>

                {/* Current Subscription */}
                <div className={`bg-gradient-to-r ${getTierColor(user?.subscriptionTier)} rounded-2xl p-6 mb-8`}>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                {user?.subscriptionTier === 'elite' && <Crown className="w-6 h-6" />}
                                <h2 className="text-2xl font-black capitalize">{user?.subscriptionTier || 'Free'} Plan</h2>
                            </div>
                            {subscription?.status && (
                                <p className="text-white/80 text-sm capitalize">Status: {subscription.status}</p>
                            )}
                        </div>
                        {subscription?.nextBilling && (
                            <div className="text-right">
                                <p className="text-white/80 text-xs">Next Billing</p>
                                <p className="font-bold">{new Date(subscription.nextBilling).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>

                    {user?.subscriptionTier !== 'free' && subscription?.status === 'active' && (
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={cancelSubscription}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium text-sm transition-colors"
                            >
                                Cancel Subscription
                            </button>
                        </div>
                    )}
                </div>

                {/* Usage Stats (Pro+ Only) */}
                {user?.subscriptionTier !== 'free' && (
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                            <p className="text-gray-500 text-xs mb-1">AI Generations</p>
                            <p className="text-2xl font-black text-cyan-400">Unlimited</p>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                            <p className="text-gray-500 text-xs mb-1">Storage Used</p>
                            <p className="text-2xl font-black">2.4 GB</p>
                            <p className="text-xs text-gray-600">of 100 GB</p>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                            <p className="text-gray-500 text-xs mb-1">API Calls</p>
                            <p className="text-2xl font-black">12.4K</p>
                            <p className="text-xs text-gray-600">this month</p>
                        </div>
                    </div>
                )}

                {/* Payment Methods */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Payment Methods</h3>
                        <button
                            onClick={() => showToast('Payment method setup coming soon!', 'info')}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-medium text-sm transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Method
                        </button>
                    </div>

                    <div className="space-y-3">
                        {transactions.length > 0 && transactions[0].last4 && (
                            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold">•••• {transactions[0].last4}</p>
                                    <p className="text-sm text-gray-500">Primary payment method</p>
                                </div>
                                <Check className="w-5 h-5 text-green-400" />
                            </div>
                        )}

                        {transactions.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <CreditCard className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                <p className="text-sm">No payment methods added</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Transaction History */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Transaction History</h3>

                    {transactions.length === 0 ? (
                        <div className="text-center py-12 bg-gray-900/30 rounded-xl">
                            <p className="text-gray-500">No transactions yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {transactions.map(txn => (
                                <div key={txn.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <p className="font-bold capitalize">{txn.plan} Plan</p>
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${txn.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
                                                    }`}>
                                                    {txn.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {new Date(txn.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1">{txn.id}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="text-xl font-black">${txn.amount}</p>
                                            <button
                                                onClick={() => downloadReceipt(txn)}
                                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                                            >
                                                <Download className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default Billing;
