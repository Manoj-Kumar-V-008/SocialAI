import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { MapPin, Link as LinkIcon, Calendar, ArrowLeft, MoreHorizontal, Mail, BadgeCheck, Camera } from 'lucide-react';
import { POSTS } from '../data/dummyData';
import PostCard from '../components/PostCard';
import SAIVerifiedBadge from '../components/SAIVerifiedBadge';

const Profile = () => {
    const { username } = useParams();
    const { user: currentUser, updateProfile } = useAuth();
    const { showToast } = useNotifications();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('posts');
    // Simulate fetching profile data
    useEffect(() => {
        if (currentUser && (username === currentUser.username || !username)) {
            setProfile(currentUser);
        } else {
            // Mock data for other users
            setProfile({
                name: username || 'Unknown User',
                username: username || 'unknown',
                avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
                coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
                bio: 'AI enthusiast | Cyberpunk aesthete | Building the future 🚀',
                joinedDate: 'September 2025',
                followers: 1250,
                following: 89,
                isVerified: true
            });
        }
    }, [username, currentUser]);

    const handlePhotoUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                if (type === 'avatar') {
                    updateProfile({ avatar: imageUrl });
                    setProfile(prev => ({ ...prev, avatar: imageUrl }));
                    showToast('Profile photo updated!', 'success');
                } else {
                    updateProfile({ coverImage: imageUrl });
                    setProfile(prev => ({ ...prev, coverImage: imageUrl }));
                    showToast('Cover photo updated!', 'success');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const getFilteredContent = () => {
        const userPosts = POSTS.map(post => ({ ...post, user: profile.name, avatar: profile.avatar, isAI: true }));

        switch (activeTab) {
            case 'replies':
                // Filter posts with comments
                return userPosts.filter(post => post.comments && post.comments.length > 0);
            case 'highlights':
                // Show posts with high engagement
                return userPosts.filter(post => post.likes > 100);
            case 'media':
                // Show only posts with images
                return userPosts.filter(post => post.image);
            default:
                return userPosts;
        }
    };

    if (!profile) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
            <Sidebar />

            <main className="flex-1 h-full overflow-y-auto w-full md:max-w-3xl border-x border-gray-800 relative no-scrollbar">

                {/* Header / Nav */}
                <div className="sticky top-0 bg-black/80 backdrop-blur-md z-30 px-4 py-3 flex items-center gap-6 border-b border-gray-800">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold leading-none flex items-center gap-1">
                            {profile.name}
                            {profile.isVerified && <span className="text-cyan-400">✓</span>}
                        </h2>
                        <span className="text-xs text-gray-500">1,240 posts</span>
                    </div>
                </div>

                {/* Cover Image */}
                <div className="h-48 md:h-64 w-full bg-gray-800 relative group overflow-hidden">
                    <img
                        src={profile.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {profile.username === currentUser?.username && (
                        <label className="absolute top-4 right-4 cursor-pointer bg-black/70 hover:bg-black/90 backdrop-blur-sm p-3 rounded-full border border-white/20 transition-all opacity-0 group-hover:opacity-100">
                            <Camera className="w-5 h-5" />
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, 'cover')} />
                        </label>
                    )}
                </div>

                {/* Profile Info Section */}
                <div className="px-4 pb-4 relative">
                    {/* Avatar */}
                    <div className="absolute -top-16 left-4 group">
                        <img
                            src={profile.avatar}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full border-4 border-black object-cover shadow-2xl"
                        />
                        {profile.username === currentUser?.username && (
                            <label className="absolute bottom-2 right-2 cursor-pointer bg-cyan-500 hover:bg-cyan-400 p-2 rounded-full border-2 border-black transition-all opacity-0 group-hover:opacity-100 active:scale-90">
                                <Camera className="w-4 h-4 text-black" />
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, 'avatar')} />
                            </label>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button className="p-2 border border-gray-600 rounded-full hover:bg-white/10 transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 border border-gray-600 rounded-full hover:bg-white/10 transition-colors">
                            <Mail className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                            Follow
                        </button>
                    </div>

                    {/* Bio & Details */}
                    <div className="mt-4 space-y-3">
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                {profile.name}
                                {profile.isVerified && (
                                    <SAIVerifiedBadge size="lg" />
                                )}
                            </h1>
                            <p className="text-gray-500">@{profile.username || profile.name.toLowerCase()}</p>
                        </div>

                        <p className="text-gray-200 leading-relaxed md:w-3/4">{profile.bio}</p>

                        <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>San Francisco, CA</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <LinkIcon className="w-4 h-4" />
                                <a href="#" className="text-cyan-400 hover:underline">socialai.io</a>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {profile.joinedDate}</span>
                            </div>
                        </div>

                        <div className="flex gap-6 pt-2 text-sm">
                            <div className="hover:underline cursor-pointer">
                                <span className="font-bold text-white">{profile.following || 0}</span> <span className="text-gray-500">Following</span>
                            </div>
                            <div className="hover:underline cursor-pointer">
                                <span className="font-bold text-white">{profile.followers || 0}</span> <span className="text-gray-500">Followers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-800 mt-4">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`flex-1 py-4 text-center hover:bg-white/5 font-bold ${activeTab === 'posts' ? 'border-b-4 border-cyan-400' : 'text-gray-500 border-b-4 border-transparent'} rounded-sm transition-colors`}
                    >
                        Posts
                    </button>
                    <button
                        onClick={() => setActiveTab('replies')}
                        className={`flex-1 py-4 text-center hover:bg-white/5 ${activeTab === 'replies' ? 'font-bold border-b-4 border-cyan-400' : 'text-gray-500 font-medium border-b-4 border-transparent'} rounded-sm transition-colors`}
                    >
                        Replies
                    </button>
                    <button
                        onClick={() => setActiveTab('highlights')}
                        className={`flex-1 py-4 text-center hover:bg-white/5 ${activeTab === 'highlights' ? 'font-bold border-b-4 border-cyan-400' : 'text-gray-500 font-medium border-b-4 border-transparent'} rounded-sm transition-colors`}
                    >
                        Highlights
                    </button>
                    <button
                        onClick={() => setActiveTab('media')}
                        className={`flex-1 py-4 text-center hover:bg-white/5 ${activeTab === 'media' ? 'font-bold border-b-4 border-cyan-400' : 'text-gray-500 font-medium border-b-4 border-transparent'} rounded-sm transition-colors`}
                    >
                        Media
                    </button>
                </div>

                {/* Content Grid */}
                <div className="p-4 space-y-4">
                    {/* Filtered content based on active tab */}
                    {getFilteredContent().length > 0 ? (
                        getFilteredContent().map(post => (
                            <PostCard key={post.id} post={post} />
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-gray-500 mb-2">No {activeTab} yet</p>
                            <p className="text-xs text-gray-600">Content will appear here once available</p>
                        </div>
                    )}

                    {getFilteredContent().length > 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <p>You've reached the end of <span className="font-bold text-gray-300">@{profile.username}'s</span> {activeTab}.</p>
                        </div>
                    )}
                </div>

            </main>

            <BottomNav />
        </div>
    );
};

export default Profile;
