import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

const ToastNotification = () => {
    const { toasts, dismissToast } = useNotifications();

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            case 'error':
                return <AlertCircle className="w-5 h-5" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5" />;
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getStyles = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-500/90 text-white border-green-400';
            case 'error':
                return 'bg-red-500/90 text-white border-red-400';
            case 'warning':
                return 'bg-yellow-500/90 text-black border-yellow-400';
            default:
                return 'bg-gray-800/95 text-white border-gray-700';
        }
    };

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
            {toasts.map((toast, index) => (
                <div
                    key={toast.id}
                    className={`
                        pointer-events-auto
                        flex items-center gap-3 min-w-[320px] max-w-md
                        p-4 rounded-xl border backdrop-blur-lg
                        shadow-2xl
                        animate-slide-in-right
                        ${getStyles(toast.type)}
                    `}
                    style={{
                        animationDelay: `${index * 100}ms`
                    }}
                >
                    <div className="flex-shrink-0">
                        {getIcon(toast.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight">
                            {toast.message}
                        </p>
                        {toast.action && (
                            <button
                                onClick={toast.action.onClick}
                                className="text-xs font-bold mt-1 underline hover:no-underline"
                            >
                                {toast.action.label}
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => dismissToast(toast.id)}
                        className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* Progress bar */}
                    <div
                        className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
                        style={{
                            width: '100%',
                            animation: `shrink ${toast.duration}ms linear`
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ToastNotification;
