import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import StoryRail from '../components/StoryRail';
import PostCard from '../components/PostCard';
import StoryViewer from '../components/StoryViewer';
import CreatePostModal from '../components/CreatePostModal';
import PaymentModal from '../components/PaymentModal';
import { POSTS } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useState } from 'react';
import { Search, Bell, Plus, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const { user } = useAuth();
    const { showToast } = useNotifications();
    const navigate = useNavigate();
    const [feedPosts, setFeedPosts] = useState(POSTS);
    const [viewingStoryId, setViewingStoryId] = useState(null);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleUpgrade = (tier = 'pro') => {
        if (user?.subscriptionTier === tier) {
            showToast('You already have this plan!', 'info');
            return;
        }
        setSelectedPlan(tier);
        setShowPaymentModal(true);
    };

    const handleTagClick = (tag) => {
        showToast(`Searching for ${tag}...`, 'info');
        // Navigate to search page in future
    };

    // Infinite scroll sim
    const handleScroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop - clientHeight < 100) {
            if (feedPosts.length < 50) {
                const newPosts = POSTS.map(p => ({ ...p, id: Math.random() }));
                setFeedPosts(prev => [...prev, ...newPosts]);
            }
        }
    };

    const handlePostCreated = (newPost) => {
        setFeedPosts(prev => [newPost, ...prev]);
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans overflow-hidden">
            <Sidebar />

            <main
                className="flex-1 h-screen overflow-y-auto w-full relative scrollbar-hide"
                onScroll={handleScroll}
            >
                {/* Mobile Header */}
                <header className="md:hidden sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800 p-4 flex justify-between items-center bg-opacity-80">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">SocialAI</h1>
                    <div className="flex gap-4">
                        <button onClick={() => setIsPostModalOpen(true)}>
                            <Plus className="w-6 h-6 text-white" />
                        </button>
                        <Bell className="w-6 h-6 text-gray-400" />
                    </div>
                </header>

                {/* Feed Content */}
                <div className="max-w-2xl mx-auto pb-24 md:pt-4 w-full">

                    {/* Desktop Header Spacer/Search */}
                    <div className="hidden md:flex justify-between items-center mb-6 px-4 md:px-0">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input type="text" placeholder="Search the grid..." className="w-full bg-gray-900 border border-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-cyan-500 transition-colors" />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsPostModalOpen(true)}
                                className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Create
                            </button>
                            <div className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 cursor-pointer">
                                <Bell className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <StoryRail onStoryClick={setViewingStoryId} />

                    {/* Quick Post Input (Desktop) */}
                    <div className="hidden md:block px-4 md:px-0 mt-6 mb-6">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex gap-4 items-center cursor-pointer hover:border-gray-700 transition-colors" onClick={() => setIsPostModalOpen(true)}>
                            <img src={user?.avatar} className="w-10 h-10 rounded-full bg-gray-800 object-cover" />
                            <div className="flex-1 bg-black/50 rounded-full px-4 py-2 text-gray-500 text-sm">
                                Start a neural thread...
                            </div>
                            <ImageIcon className="w-5 h-5 text-gray-500" />
                            <Sparkles className="w-5 h-5 text-cyan-500" />
                        </div>
                    </div>

                    <div className="px-4 md:px-0 mt-6 min-h-screen">
                        {feedPosts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    <div className="text-center py-8 text-gray-600 animate-pulse text-xs tracking-widest">
                        LOADING MORE REALITY...
                    </div>
                </div>
            </main>

            {/* Right Sidebar (Desktop) */}
            <div className="hidden lg:block w-80 p-6 border-l border-gray-800 bg-black h-screen sticky top-0">
                <div className="bg-gray-900/30 rounded-2xl p-5 mb-6 border border-gray-800/50">
                    <h3 className="font-bold mb-4 text-gray-200">Trending Now</h3>
                    <div className="space-y-4">
                        {[
                            { tag: '#AIRevolution', posts: '24k' },
                            { tag: '#MarsColony', posts: '18k' },
                            { tag: '#NeuralLinkV2', posts: '32k' },
                            { tag: '#CyberPunk2077', posts: '45k' }
                        ].map(({ tag, posts }) => (
                            <div
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className="flex justify-between items-center cursor-pointer group hover-lift p-2 -mx-2 rounded-lg hover:bg-white/5 transition-all"
                            >
                                <span className="text-sm font-medium text-gray-400 group-hover:text-cyan-400 transition-colors">{tag}</span>
                                <span className="text-xs text-gray-600">{posts} posts</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl p-5 border border-cyan-500/10 animate-pulse-glow">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
                        <h3 className="font-bold text-cyan-300">SocialAI Premium</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">Unlock advanced AI generation tools and exclusive neural filters.</p>
                    <button
                        onClick={() => handleUpgrade('pro')}
                        className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95"
                    >
                        Upgrade Now
                    </button>
                </div>
            </div>

            <BottomNav />

            {/* Story Modal */}
            {viewingStoryId && (
                <StoryViewer
                    initialStoryId={viewingStoryId}
                    onClose={() => setViewingStoryId(null)}
                />
            )}

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
                onPostCreated={handlePostCreated}
            />

            {/* Payment Modal */}
            {showPaymentModal && (
                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={() => {
                        setShowPaymentModal(false);
                        setSelectedPlan(null);
                    }}
                    selectedPlan={selectedPlan}
                    planDetails={{
                        name: selectedPlan === 'pro' ? 'Pro' : 'Elite',
                        price: selectedPlan === 'pro' ? 9.99 : 24.99
                    }}
                />
            )}
        </div>
    );
};
export default Feed;
