import { Home, PlaySquare, Youtube, Bot, User } from 'lucide-react';

const BottomNav = () => {
    return (
        <div className="md:hidden fixed bottom-6 left-4 right-4 h-16 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full flex justify-around items-center px-2 z-50 shadow-2xl">
            <button className="p-3 text-white hover:bg-white/10 rounded-full transition-colors"><Home className="w-5 h-5" /></button>
            <button className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"><PlaySquare className="w-5 h-5" /></button>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center -mt-8 border-4 border-black shadow-[0_0_20px_rgba(139,92,246,0.5)] transform hover:scale-110 transition-transform cursor-pointer">
                <Bot className="w-6 h-6 text-white" />
            </div>
            <button className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"><Youtube className="w-5 h-5" /></button>
            <button className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"><User className="w-5 h-5" /></button>
        </div>
    );
};
export default BottomNav;
