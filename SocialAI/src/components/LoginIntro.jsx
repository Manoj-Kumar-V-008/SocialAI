import { useRef, useEffect } from 'react';
import { useCanvasAnimation } from '../hooks/useCanvasAnimation';

const LoginIntro = ({ onAnimationEnd }) => {
    const canvasRef = useRef(null);
    const { loading, progress, play } = useCanvasAnimation(canvasRef, onAnimationEnd);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!loading) {
            play();
        }
    }, [loading]);

    return (
        <div className="fixed inset-0 z-0 bg-black overflow-hidden">
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan-400 z-50">
                    <div className="font-mono text-2xl tracking-widest animate-pulse">SYSTEM BOOT</div>
                    <div className="mt-4 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-500 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 font-mono text-sm opacity-70">LOADING ASSETS... {progress}%</div>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
        </div>
    );
};

export default LoginIntro;
