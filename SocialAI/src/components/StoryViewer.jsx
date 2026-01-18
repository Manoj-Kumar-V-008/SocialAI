import { useState, useEffect } from 'react';
import { X, Heart, Send } from 'lucide-react';
import { STORIES } from '../data/dummyData';

const StoryViewer = ({ initialStoryId, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(STORIES.findIndex(s => s.id === initialStoryId));
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentIndex === -1) onClose();

        let interval;
        if (progress < 100) {
            interval = setInterval(() => {
                setProgress(prev => prev + 1);
            }, 30); // 3 seconds total
        } else {
            // Next story
            if (currentIndex < STORIES.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setProgress(0);
            } else {
                onClose();
            }
        }
        return () => clearInterval(interval);
    }, [progress, currentIndex, onClose]);

    const story = STORIES[currentIndex];

    if (!story) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            {/* Viewer Container */}
            <div className="relative w-full md:w-[400px] h-full md:h-[90vh] bg-gray-900 md:rounded-2xl overflow-hidden flex flex-col">

                {/* Image */}
                <div className="absolute inset-0 z-0">
                    {/* In real app, story.image would be different from story.img (avatar). Using avatar or random placeholder for now if no story image in data */}
                    {/* I'll use a random high-res image seeded by story ID */}
                    <img
                        src={`https://picsum.photos/seed/${story.id + 'story'}/800/1200`}
                        className="w-full h-full object-cover"
                        alt="Story"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                </div>

                {/* Progress Bar */}
                <div className="absolute top-4 left-4 right-4 z-20 flex gap-1 h-1">
                    {STORIES.map((s, idx) => (
                        <div key={s.id} className="flex-1 bg-white/30 rounded-full overflow-hidden h-full">
                            <div
                                className={`h-full bg-white transition-all duration-100 ease-linear`}
                                style={{
                                    width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                                }}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-8 left-4 right-4 z-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src={story.img} className="w-8 h-8 rounded-full border border-white/50" />
                        <span className="text-white font-bold text-sm">{story.user}</span>
                        <span className="text-gray-300 text-xs">2h</span>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Footer Input */}
                <div className="mt-auto p-4 z-20 flex gap-4 items-center mb-4 md:mb-0">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Send message..."
                            className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-full py-3 px-4 text-white placeholder-white/70 focus:outline-none focus:border-white/50"
                        />
                    </div>
                    <button>
                        <Heart className="w-8 h-8 text-white hover:text-red-500 transition-colors" />
                    </button>
                    <button>
                        <Send className="w-8 h-8 text-white -rotate-45" />
                    </button>
                </div>

                {/* Tap Navigation Areas */}
                <div className="absolute inset-0 z-10 flex">
                    <div className="w-1/3 h-full" onClick={() => {
                        if (currentIndex > 0) { setCurrentIndex(c => c - 1); setProgress(0); }
                    }}></div>
                    <div className="w-2/3 h-full" onClick={() => {
                        if (currentIndex < STORIES.length - 1) { setCurrentIndex(c => c + 1); setProgress(0); } else onClose();
                    }}></div>
                </div>

            </div>
        </div>
    );
};

export default StoryViewer;
