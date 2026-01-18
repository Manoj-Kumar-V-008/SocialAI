import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { Wand2, Image as ImageIcon, Sparkles, Send, Download } from 'lucide-react';

const AIStudio = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);

    const handleGenerate = (e) => {
        e.preventDefault();
        if (!prompt) return;

        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            setGeneratedImage(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`);
            setIsGenerating(false);
        }, 3000);
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans">
            <Sidebar />

            <main className="flex-1 w-full md:max-w-5xl mx-auto p-4 md:p-8 flex flex-col items-center">

                <div className="text-center mb-10 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest border border-cyan-500/20 mb-4">
                        <Sparkles className="w-3 h-3" />
                        Creative Matrix V1.0
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            IMAGINE ANYTHING
                        </span>
                    </h1>
                    <p className="text-gray-400 max-w-lg mx-auto">Transform your text into reality. Our neural engines are ready to visualize your wildest concepts.</p>
                </div>

                {/* Generator Interface */}
                <div className="w-full max-w-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>

                    <div className="relative bg-black/80 rounded-2xl p-4 md:p-6 border border-white/5">
                        {/* Input Area */}
                        <form onSubmit={handleGenerate} className="flex gap-3 mb-6">
                            <input
                                type="text"
                                placeholder="A cyberpunk street in Tokyo, neon lights, rain, 8k..."
                                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-gray-800 transition-all"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={isGenerating || !prompt}
                                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isGenerating ? 'bg-gray-700 cursor-wait' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95'}`}
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5" />
                                        <span>Generate</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Result Display */}
                        <div className="w-full aspect-square md:aspect-video bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-center relative overflow-hidden group/image">
                            {isGenerating ? (
                                <div className="text-center space-y-4">
                                    <div className="relative w-20 h-20 mx-auto">
                                        <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping"></div>
                                        <div className="relative w-full h-full bg-gray-800 rounded-full flex items-center justify-center border border-cyan-500/50">
                                            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                                        </div>
                                    </div>
                                    <p className="text-cyan-400 font-mono text-sm blink">PROCESSING NEURAL DATA...</p>
                                </div>
                            ) : generatedImage ? (
                                <>
                                    <img src={generatedImage} alt="Generated" className="w-full h-full object-cover animate-fade-in" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                            <Download className="w-6 h-6" />
                                        </button>
                                        <button className="p-3 bg-cyan-500 text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                                            <Send className="w-6 h-6" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-gray-600">
                                    <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-20" />
                                    <p className="text-sm">Enter a prompt to start dreaming</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Generations Mockup */}
                <div className="mt-12 w-full max-w-5xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Community Creations
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-900 border border-gray-800 group relative cursor-pointer">
                                <img
                                    src={`https://images.unsplash.com/photo-${1600000000000 + i * 1000}?auto=format&fit=crop&w=400&q=80`}
                                    alt="Community Art"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                                    <p className="text-xs text-white font-bold line-clamp-1">Abstract Neural Network {i}</p>
                                    <p className="text-[10px] text-gray-400">by @user{i}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            <BottomNav />
        </div>
    );
};

export default AIStudio;
