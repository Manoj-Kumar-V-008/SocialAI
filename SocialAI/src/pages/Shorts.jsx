import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { SHORTS_DATA } from '../data/dummyData';
import { Heart, MessageCircle, Share2, MoreVertical, Play, BadgeCheck } from 'lucide-react';

const Shorts = () => {
    return (
        <div className="flex bg-black min-h-screen text-white">
            <Sidebar />

            <main className="flex-1 h-screen overflow-y-scroll snap-y snap-mandatory relative scrollbar-hide">
                {SHORTS_DATA.map((short) => (
                    <div
                        key={short.id}
                        className="w-full h-screen snap-start relative flex items-center justify-center bg-gray-900 border-b border-gray-800"
                    >
                        {/* Video Background (simulated with video tag) */}
                        <div className="relative w-full h-full md:w-[450px] md:h-full bg-black overflow-hidden shadow-2xl">
                            <video
                                src={short.video}
                                className="w-full h-full object-cover"
                                loop
                                autoPlay
                                muted
                                playsInline
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>

                            {/* Right Side Interaction Bar */}
                            <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
                                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-colors">
                                        <Heart className="w-8 h-8 text-white fill-white/20 group-hover:text-red-500 group-hover:fill-red-500 transition-colors" />
                                    </div>
                                    <span className="text-xs font-bold shadow-black drop-shadow-md">{short.likes}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-colors">
                                        <MessageCircle className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                    <span className="text-xs font-bold shadow-black drop-shadow-md">{short.comments}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-colors">
                                        <Share2 className="w-8 h-8 text-white group-hover:text-green-400 transition-colors" />
                                    </div>
                                    <span className="text-xs font-bold shadow-black drop-shadow-md">Share</span>
                                </div>
                                <button className="mt-4 pb-4">
                                    <MoreVertical className="w-6 h-6 text-white drop-shadow-lg" />
                                </button>
                                {/* Spinning Record/Audio Disc */}
                                <div className="w-10 h-10 rounded-full border-[3px] border-gray-800 bg-black overflow-hidden animate-spin-slow">
                                    <img src={`https://ui-avatars.com/api/?name=${short.user}&background=random`} className="w-full h-full object-cover opacity-80" />
                                </div>
                            </div>

                            {/* Bottom Info Section */}
                            <div className="absolute left-4 bottom-8 z-20 max-w-[75%]">
                                <h3 className="text-lg font-bold flex items-center gap-1 mb-2">
                                    @{short.user}
                                    <BadgeCheck className="w-4 h-4 text-cyan-400 fill-cyan-400/10" />
                                    <button className="ml-2 text-xs bg-white text-black px-3 py-1 rounded-full font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors">Follow</button>
                                </h3>
                                <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">
                                    {short.description}
                                </p>
                                <div className="flex items-center gap-2 mt-3 text-xs font-medium text-gray-300 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                                    <Play className="w-3 h-3 fill-current" />
                                    Original Audio - {short.user}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            <BottomNav />
        </div>
    );
};

export default Shorts;
