import { useState } from 'react';
import { X, Image as ImageIcon, Sparkles, Send, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // URL or File object
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [showAIGen, setShowAIGen] = useState(false);

    if (!isOpen) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setShowAIGen(false);
        }
    };

    const handleGenerateAI = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        try {
            // Using Pollinations.AI for free image generation
            const seed = Math.floor(Math.random() * 1000);
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&seed=${seed}&nologo=true`;

            // Pre-load to ensure it works
            const img = new Image();
            img.onload = () => {
                setImage(imageUrl);
                setIsGenerating(false);
            };
            img.src = imageUrl;
        } catch (error) {
            console.error("Gen failed", error);
            setIsGenerating(false);
        }
    };

    const handleSubmit = () => {
        if (!content && !image) return;

        const newPost = {
            id: Date.now(),
            user: user.name,
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`,
            time: 'Just now',
            isAI: showAIGen || !!image?.includes('pollinations'), // rough guess
            content: content,
            image: image,
            likes: 0,
            commentsCount: 0,
            shares: 0,
            comments: []
        };

        // Get existing posts
        // We will pass the new post up to Feed to add to state
        // And also prepend to 'posts' in localStorage for persistence across reloads
        // (Note: Feed currently pulls from dummyData POSTS + state. 
        // To make this fully persistent, Feed should initialize from localStorage + dummyData fallback)

        onPostCreated(newPost);
        onClose();
        setContent('');
        setImage(null);
        setPrompt('');
        setShowAIGen(false);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">

                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-800">
                    <h3 className="text-lg font-bold text-white">Create Post</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                    <textarea
                        className="w-full bg-transparent text-lg text-white placeholder-gray-500 focus:outline-none resize-none min-h-[100px]"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>

                    {/* Image Preview */}
                    {image && (
                        <div className="relative rounded-xl overflow-hidden group">
                            <img src={image} className="w-full h-auto max-h-[300px] object-cover" alt="Preview" />
                            <button
                                onClick={() => setImage(null)}
                                className="absolute top-2 right-2 bg-black/60 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* AI Generator Area */}
                    {showAIGen && !image && (
                        <div className="bg-gray-800/50 p-4 rounded-xl border border-cyan-500/30">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Describe image to generate..."
                                    className="flex-1 bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                <button
                                    onClick={handleGenerateAI}
                                    disabled={isGenerating || !prompt}
                                    className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-cyan-400 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                    Generate
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Tools */}
                <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="relative">
                            <button className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-colors">
                                <ImageIcon className="w-6 h-6" />
                            </button>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} accept="image/*" />
                        </div>
                        <button
                            onClick={() => { setShowAIGen(!showAIGen); setImage(null); }}
                            className={`p-2 rounded-full transition-colors ${showAIGen ? 'text-purple-400 bg-purple-400/10' : 'text-purple-400 hover:bg-purple-400/10'}`}
                        >
                            <Sparkles className="w-6 h-6" />
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!content && !image}
                        className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        Post <Send className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CreatePostModal;
