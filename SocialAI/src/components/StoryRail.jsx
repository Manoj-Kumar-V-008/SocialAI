import { STORIES } from '../data/dummyData';
import { Plus } from 'lucide-react';

const StoryRail = ({ onStoryClick }) => {
    return (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-6 px-4 md:px-0">
            {/* My Story */}
            <div className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center relative group-hover:border-cyan-400 transition-colors bg-white/5">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-cyan-400" />
                </div>
                <span className="text-xs mt-2 text-gray-400 font-medium">Add Story</span>
            </div>

            {STORIES.map(story => (
                <div
                    key={story.id}
                    className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
                    onClick={() => onStoryClick && onStoryClick(story.id)}
                >
                    <div className={`p-[3px] rounded-full transition-all transform group-hover:scale-105 ${story.active ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-[0_0_10px_rgba(236,72,153,0.4)]' : 'bg-gray-700'}`}>
                        <div className="p-[2px] bg-black rounded-full">
                            <img src={story.img} alt={story.user} className="w-14 h-14 rounded-full object-cover transition-opacity group-hover:opacity-90" />
                        </div>
                    </div>
                    <span className="text-xs mt-2 text-gray-300 font-medium group-hover:text-white transition-colors">{story.user}</span>
                </div>
            ))}
        </div>
    );
};
export default StoryRail;
