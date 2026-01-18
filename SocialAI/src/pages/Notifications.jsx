import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { Bell, Check, Heart, UserPlus, Sparkles, Trash2, Settings } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useState } from 'react';

const Notifications = () => {
    const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();
    const [filter, setFilter] = useState('all'); // all, mentions, likes, follows, system

    const getIcon = (type) => {
        switch (type) {
            case 'like':
                return <Heart className="w-5 h-5 text-red-400" />;
            case 'follow':
                return <UserPlus className="w-5 h-5 text-blue-400" />;
            case 'mention':
                return <Bell className="w-5 h-5 text-yellow-400" />;
            case 'achievement':
                return <Sparkles className="w-5 h-5 text-purple-400" />;
            default:
                return <Bell className="w-5 h-5 text-cyan-400" />;
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'all') return true;
        return n.type === filter;
    });

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div className="flex bg-black min-h-screen text-white font-sans">
            <Sidebar />

            <main className="flex-1 w-full md:max-w-3xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black">Notifications</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={clearAll}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            title="Clear all"
                        >
                            <Trash2 className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <Settings className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
                    {['all', 'mentions', 'likes', 'follows', 'system'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${filter === f
                                    ? 'bg-cyan-500 text-white'
                                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {filteredNotifications.length === 0 ? (
                        <div className="text-center py-16">
                            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-700" />
                            <p className="text-gray-500">No notifications yet</p>
                        </div>
                    ) : (
                        filteredNotifications.map(notif => (
                            <div
                                key={notif.id}
                                onClick={() => !notif.read && markAsRead(notif.id)}
                                className={`
                                    p-4 rounded-xl border transition-all cursor-pointer hover-lift
                                    ${notif.read
                                        ? 'bg-gray-900/30 border-gray-800'
                                        : 'bg-cyan-500/5 border-cyan-500/20'
                                    }
                                `}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1">
                                        {getIcon(notif.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm mb-1">{notif.title}</p>
                                        <p className="text-sm text-gray-400">{notif.message}</p>
                                        <p className="text-xs text-gray-600 mt-2">
                                            {formatTime(notif.timestamp)}
                                        </p>
                                    </div>
                                    {!notif.read && (
                                        <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-2"></div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default Notifications;
