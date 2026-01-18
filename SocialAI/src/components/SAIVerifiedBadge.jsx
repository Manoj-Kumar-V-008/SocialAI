import { BadgeCheck, Sparkles } from 'lucide-react';

const SAIVerifiedBadge = ({ size = "md" }) => {
    const isLarge = size === "lg";

    return (
        <div className={`inline-flex items-center gap-1.5 ${isLarge ? 'gap-2' : ''} group select-none`}>
            <div className="relative">
                <BadgeCheck
                    className={`
                        ${isLarge ? 'w-6 h-6' : 'w-4 h-4'} 
                        text-cyan-400 fill-cyan-400/10 
                        drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]
                    `}
                />
                <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full"></div>
            </div>
            <span className={`
                font-black tracking-wider uppercase
                bg-gradient-to-r from-cyan-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent
                animate-shimmer bg-[length:200%_auto]
                ${isLarge ? 'text-sm' : 'text-[10px]'}
                drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]
            `}>
                SAI Verified
            </span>
        </div>
    );
};

export default SAIVerifiedBadge;
