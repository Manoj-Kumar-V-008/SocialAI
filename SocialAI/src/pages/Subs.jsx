import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { SUBS_DATA } from '../data/dummyData';
import { Search, Bell, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Subs = () => {
    const [filter, setFilter] = useState('All');

    return (
        <div className="flex bg-black min-h-screen text-white font-sans">
            <Sidebar />

            <main className="flex-1 w-full md:max-w-4xl mx-auto border-x border-gray-800 p-4 md:p-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">Subscriptions</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your channels and feeds</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search channels..."
                                className="w-full md:w-64 bg-gray-900 border border-gray-800 rounded-xl py-2 pl-10 pr-4 focus:border-red-500 focus:outline-none transition-colors text-sm"
                            />
                        </div>
                        <button className="p-2 bg-gray-900 border border-gray-800 rounded-xl hover:bg-white/10 transition-colors">
                            <Filter className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
                    {['All', 'Live', 'Art', 'Technology', 'Music', 'Coding'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === cat ? 'bg-white text-black' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {SUBS_DATA.filter(sub => filter === 'All' || sub.category === filter || (filter === 'Live' && sub.isLive)).map(sub => (
                        <Link to={`/profile/${sub.username}`} key={sub.id} className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex flex-col items-center hover:bg-gray-800 hover:border-gray-700 transition-all cursor-pointer">

                            {/* Avatar Wrapper */}
                            <div className="relative mb-4">
                                <img src={sub.avatar} alt={sub.name} className="w-20 h-20 rounded-full object-cover ring-2 ring-transparent group-hover:ring-red-500 transition-all" />
                                {sub.isLive && (
                                    <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm border-2 border-black animate-pulse">
                                        LIVE
                                    </span>
                                )}
                            </div>

                            <h3 className="font-bold text-lg text-center truncate w-full">{sub.name}</h3>
                            <p className="text-xs text-gray-500 mb-4">@{sub.username}</p>

                            <div className="flex gap-2 w-full mt-auto">
                                <button className="flex-1 py-1.5 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                    View
                                </button>
                                <button className="p-1.5 bg-gray-800 text-gray-400 rounded-lg hover:text-white hover:bg-gray-700 transition-colors">
                                    <Bell className="w-4 h-4" />
                                </button>
                            </div>
                        </Link>
                    ))}

                    {/* Add New Placeholder */}
                    <div className="border border-dashed border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center text-gray-600 hover:border-gray-600 hover:text-gray-400 transition-all cursor-pointer min-h-[200px]">
                        <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-3">
                            <span className="text-2xl">+</span>
                        </div>
                        <span className="text-sm font-medium">Discover More</span>
                    </div>
                </div>

            </main>

            <BottomNav />
        </div>
    );
};

export default Subs;
