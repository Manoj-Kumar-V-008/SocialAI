import { Home, PlaySquare, Youtube, Bot, Settings, LogOut, Bell, CreditCard, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo2.png';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const { unreadCount } = useNotifications();

    const items = [
        { icon: Home, label: 'Feed', path: '/feed' },
        { icon: Bell, label: 'Notifications', path: '/notifications', badge: unreadCount },
        { icon: PlaySquare, label: 'Shorts', path: '/shorts' },
        { icon: Youtube, label: 'Subs', path: '/subs' },
        { icon: Bot, label: 'AI Studio', path: '/ai-studio', color: 'text-cyan-400' },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 h-screen bg-black border-r border-gray-800 sticky top-0 p-4">
            <div className="flex items-center gap-3 mb-8 px-4">
                <img src={logo} alt="SocialAI" className="w-12 h-12 rounded-xl object-cover bg-black shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-white/10" />
                <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">SocialAI</h1>
            </div>

            {user && (
                <Link to="/profile" className="px-4 mb-6 block group">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800 group-hover:bg-gray-800 transition-colors cursor-pointer">
                        <img src={user.avatar} className="w-8 h-8 rounded-full bg-gray-700 object-cover" />
                        <div className="overflow-hidden flex-1">
                            <p className="text-sm font-bold truncate group-hover:text-cyan-400 transition-colors">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">@{user.username || user.email.split('@')[0]}</p>
                        </div>
                        {user.subscriptionTier !== 'free' && (
                            <div className="flex-shrink-0">
                                <Zap className="w-4 h-4 text-cyan-400 fill-current" />
                            </div>
                        )}
                    </div>
                </Link>
            )}

            <nav className="space-y-2 flex-1">
                {items.map((item, idx) => (
                    <NavLink
                        key={idx}
                        to={item.path}
                        className={({ isActive }) => `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative ${isActive ? 'bg-white/10 text-white shadow-lg shadow-purple-500/10' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <item.icon className={`w-5 h-5 group-hover:scale-110 transition-transform ${item.color || ''}`} />
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.badge > 0 && (
                            <span className="absolute right-3 top-3 px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] text-center">
                                {item.badge > 99 ? '99+' : item.badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="px-4 border-t border-gray-800 pt-4 space-y-2">
                <Link to="/billing" className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-sm font-medium">Billing</span>
                </Link>
                <Link to="/settings" className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-medium">Settings</span>
                </Link>
                <button onClick={logout} className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Log Out</span>
                </button>
            </div>
        </div>
    );
};
export default Sidebar;
