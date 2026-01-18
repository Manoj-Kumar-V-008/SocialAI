import { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { User, Bell, Lock, Eye, Monitor, Globe, HelpCircle, LogOut, ChevronRight, Upload, X, Save, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { user, updateProfile, changePassword, logout, apiKey, saveApiKey } = useAuth();
    const [notifications, setNotifications] = useState(true);
    const [privateAccount, setPrivateAccount] = useState(false);

    // Edit States
    const [activeModal, setActiveModal] = useState(null);
    const [editForm, setEditForm] = useState({
        name: user?.name || '',
        username: user?.username || '',
        bio: user?.bio || '',
        currentPassword: '',
        newPassword: '',
        apiKeyInput: apiKey || ''
    });

    const fileInputRef = useRef(null);

    const handleUpdateProfile = () => {
        updateProfile({
            name: editForm.name,
            username: editForm.username,
            bio: editForm.bio
        });
        setActiveModal(null);
    };

    const handlePasswordChange = () => {
        const result = changePassword(editForm.currentPassword, editForm.newPassword);
        if (result.success) {
            alert('Password updated successfully!');
            setActiveModal(null);
            setEditForm(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
        } else {
            alert(result.message);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a fake local URL for the uploaded file
            const imageUrl = URL.createObjectURL(file);
            updateProfile({ avatar: imageUrl }); // Or coverImage based on context
        }
    };

    const handleCoverUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            updateProfile({ coverImage: imageUrl });
        }
    };

    const handleUpdateApiKey = () => {
        saveApiKey(editForm.apiKeyInput);
        setActiveModal(null);
        alert('API Key saved successfully!');
    };

    const sections = [
        {
            title: 'Developer',
            items: [
                {
                    icon: Key,
                    label: 'API Configuration',
                    sub: 'Connect external AI models',
                    onClick: () => setActiveModal('api')
                }
            ]
        },
        {
            title: 'Account',
            items: [
                {
                    icon: User,
                    label: 'Personal Information',
                    sub: 'Update your profile details',
                    onClick: () => setActiveModal('personal')
                },
                {
                    icon: Lock,
                    label: 'Password & Security',
                    sub: 'Manage your access keys',
                    onClick: () => setActiveModal('security')
                },
                { icon: Globe, label: 'Language', sub: 'English (US)' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                {
                    icon: Bell,
                    label: 'Notifications',
                    sub: 'Push notifications are on',
                    action: <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifications ? 'bg-cyan-500' : 'bg-gray-700'}`} onClick={() => setNotifications(!notifications)}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifications ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                },
                { icon: Eye, label: 'Content Visibility', sub: 'Manage what you see' },
                {
                    icon: Lock,
                    label: 'Private Account',
                    sub: 'Only followers can see posts',
                    action: <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${privateAccount ? 'bg-cyan-500' : 'bg-gray-700'}`} onClick={() => setPrivateAccount(!privateAccount)}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${privateAccount ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: HelpCircle, label: 'Help Center', sub: 'Get assistance' },
                { icon: Monitor, label: 'About SocialAI', sub: 'Version 1.0.0' },
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
            <Sidebar />

            <main className="flex-1 h-full overflow-y-auto w-full md:max-w-3xl mx-auto p-4 md:p-8 no-scrollbar relative">
                <h1 className="text-3xl font-bold mb-8">Settings</h1>

                <div className="space-y-8">
                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">{section.title}</h2>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
                                {section.items.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={item.onClick}
                                        className={`p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors cursor-pointer ${i !== section.items.length - 1 ? 'border-b border-gray-800' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-200">{item.label}</p>
                                                <p className="text-xs text-gray-500">{item.sub}</p>
                                            </div>
                                        </div>
                                        {item.action ? item.action : <ChevronRight className="w-5 h-5 text-gray-600" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={logout}
                        className="w-full p-4 flex items-center justify-center gap-2 text-red-500 font-bold bg-red-500/10 hover:bg-red-500/20 rounded-2xl transition-colors mt-8"
                    >
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </button>
                </div>

                {/* Modals */}
                {activeModal && (
                    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                            <div className="flex justify-between items-center p-4 border-b border-gray-800">
                                <h3 className="text-lg font-bold text-white">
                                    {activeModal === 'personal' ? 'Edit Profile' : 'Security'}
                                </h3>
                                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-white/10 rounded-full">
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                {activeModal === 'personal' && (
                                    <>
                                        <div className="flex justify-center mb-6 relative">
                                            <div className="relative group cursor-pointer">
                                                <img src={user.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-gray-800 group-hover:opacity-50 transition-opacity" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <Upload className="w-8 h-8 text-white" />
                                                </div>
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} accept="image/*" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Display Name</label>
                                            <input
                                                type="text"
                                                value={editForm.name}
                                                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Username</label>
                                            <input
                                                type="text"
                                                value={editForm.username}
                                                onChange={e => setEditForm({ ...editForm, username: e.target.value })}
                                                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Bio</label>
                                            <textarea
                                                value={editForm.bio}
                                                onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                                                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none h-24 resize-none"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Cover Image</label>
                                            <div className="relative h-24 bg-gray-800 rounded-lg overflow-hidden group cursor-pointer border border-gray-700 hover:border-cyan-500 transition-colors">
                                                <img src={user.coverImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-40" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="flex items-center gap-2 text-sm font-bold text-gray-300 group-hover:text-white">
                                                        <Upload className="w-4 h-4" /> Change Cover
                                                    </span>
                                                </div>
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleCoverUpload} accept="image/*" />
                                            </div>
                                        </div>

                                        <button onClick={handleUpdateProfile} className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg mt-4 transition-colors">
                                            Save Changes
                                        </button>
                                    </>
                                )}

                                {activeModal === 'security' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
                                            <input
                                                type="password"
                                                value={editForm.currentPassword}
                                                onChange={e => setEditForm({ ...editForm, currentPassword: e.target.value })}
                                                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                                            <input
                                                type="password"
                                                value={editForm.newPassword}
                                                onChange={e => setEditForm({ ...editForm, newPassword: e.target.value })}
                                                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                                            />
                                        </div>
                                        <button onClick={handlePasswordChange} className="w-full py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg mt-4 transition-colors">
                                            Update Password
                                        </button>
                                    </>
                                )}

                                {activeModal === 'api' && (
                                    <>
                                        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mb-4">
                                            <p className="text-xs text-blue-200">
                                                Enter your Gemini or OpenAI API Key to unlock advanced "Real AI" features like chat and text generation.
                                                The key is stored locally on your device.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">API Key</label>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    placeholder="sk-..."
                                                    value={editForm.apiKeyInput}
                                                    onChange={e => setEditForm({ ...editForm, apiKeyInput: e.target.value })}
                                                    className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none pr-10"
                                                />
                                                <Key className="absolute right-3 top-3 w-5 h-5 text-gray-500" />
                                            </div>
                                        </div>
                                        <button onClick={handleUpdateApiKey} className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg mt-4 transition-colors">
                                            Save API Key
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </main>

            <BottomNav />
        </div>
    );
};

export default Settings;
