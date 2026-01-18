import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Sparkles, Send, BadgeCheck, Bookmark, Flag, UserMinus, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SAIVerifiedBadge from './SAIVerifiedBadge';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`https://socialai.app/post/${post.id}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePostComment = () => {
        if (!commentText.trim()) return;
        // Add comment logic here
        console.log('Comment posted:', commentText);
        setCommentText('');
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden mb-8 shadow-2xl">
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.user}`} className="flex items-center gap-3 group">
                        <div className="relative">
                            <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-cyan-500 transition-all" />
                            {post.isAI && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-black"></div>}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-sm text-gray-100 group-hover:text-cyan-400 cursor-pointer transition-colors">{post.user}</h3>
                                <div className="scale-90 origin-left">
                                    <SAIVerifiedBadge />
                                </div>
                                {post.isAI && (
                                    <span className="ml-1 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" /> AI
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">{post.time}</p>
                        </div>
                    </Link>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
                    >
                        <MoreHorizontal className="w-5 h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="absolute right-0 top-12 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-48 overflow-hidden z-50 animate-bounce-in">
                            <button
                                onClick={() => { setSaved(!saved); setShowMenu(false); }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center gap-3 text-sm"
                            >
                                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current text-cyan-400' : ''}`} />
                                {saved ? 'Unsave Post' : 'Save Post'}
                            </button>
                            <button
                                onClick={() => { handleCopyLink(); setShowMenu(false); }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center gap-3 text-sm"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Link Copied!' : 'Copy Link'}
                            </button>
                            <button
                                onClick={() => { alert('Post reported'); setShowMenu(false); }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center gap-3 text-sm text-yellow-400"
                            >
                                <Flag className="w-4 h-4" />
                                Report Post
                            </button>
                            <button
                                onClick={() => { alert('User blocked'); setShowMenu(false); }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center gap-3 text-sm text-red-400"
                            >
                                <UserMinus className="w-4 h-4" />
                                Block {post.user}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-5 pb-3">
                <p className="text-sm text-gray-300 leading-relaxed font-light">{post.content}</p>
            </div>

            {post.image && (
                <div className="relative group cursor-pointer">
                    <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-auto object-cover max-h-[600px] bg-gray-900"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/800x600/111/444?text=Image+Unavailable`;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-6">
                        <button className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-bold border border-white/30 hover:bg-white/30 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                            View Details
                        </button>
                    </div>
                </div>
            )}

            <div className="p-4 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 transition-transform active:scale-90 ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                    >
                        <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
                        <span className="font-medium text-sm">{likes}</span>
                    </button>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={`flex items-center gap-2 transition-colors ${showComments ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'}`}
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span className="font-medium text-sm">{post.commentsCount || 0}</span>
                    </button>

                    <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                        <Share2 className="w-6 h-6" />
                        <span className="font-medium text-sm">{post.shares}</span>
                    </button>
                </div>

                <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <Send className="w-5 h-5" />
                </button>
            </div>

            {/* Comment Section */}
            {showComments && (
                <div className="px-4 pb-4 border-t border-white/5 bg-black/20">
                    <div className="py-3 space-y-3">
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment, idx) => (
                                <div key={idx} className="flex gap-2 items-start animate-fade-in">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xs font-bold text-gray-200">{comment.user}</span>
                                            <span className="text-[10px] text-gray-500">{comment.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-400">{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-500 text-center py-2">No comments yet.</p>
                        )}
                    </div>

                    {/* Input Field */}
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handlePostComment()}
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                        <button
                            onClick={handlePostComment}
                            disabled={!commentText.trim()}
                            className="text-cyan-400 hover:text-cyan-300 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed active:scale-90 transition-all"
                        >
                            Post
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default PostCard;
