import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIntro from '../components/LoginIntro';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo2.png';

const Login = () => {
    const [animationDone, setAnimationDone] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    // Using simple state to toggle password visibility (shares state for instance simplicity, 
    // effectively resets when switching modals or just toggles both if open together which they aren't)
    const [showPassword, setShowPassword] = useState(false);

    // We'll separate form data to handle the placeholder/validation logic cleanly
    const [loginData, setLoginData] = useState({ identifier: '', password: '' });
    const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });

    const [error, setError] = useState('');
    const [scrambleText, setScrambleText] = useState('');

    const { login, signup, user } = useAuth();
    const navigate = useNavigate();

    // Cinematic Intro Logic
    const [showIntro, setShowIntro] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setShowIntro(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Fiery Typewriter Effect
    useEffect(() => {
        const sentences = [
            "ENGINEERING THE FUTURE OF CONNECTION",
            "BREACHING THE DIGITAL HORIZON",
            "SYNCHRONIZING NEURAL NETWORKS",
            "DECRYPTING REALITY LAYERS",
            "INITIALIZING QUANTUM LINK",
            "UPLOADING CONSCIOUSNESS...",
            "REWRITING SOCIAL PROTOCOLS",
            "ESTABLISHING SECURE UPLINK",
            "FUSING HUMANITY AND CODE",
            "ENTERING THE NEXUS..."
        ];

        let currentSentenceIdx = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout;

        const type = () => {
            const currentSentence = sentences[currentSentenceIdx];

            if (isDeleting) {
                setScrambleText(currentSentence.substring(0, charIndex - 1));
                charIndex--;
            } else {
                setScrambleText(currentSentence.substring(0, charIndex + 1));
                charIndex++;
            }

            let typeSpeed = isDeleting ? 30 : 50;

            if (!isDeleting && charIndex === currentSentence.length) {
                // Finished typing, pause before deleting
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting, switch to next random sentence
                isDeleting = false;
                currentSentenceIdx = Math.floor(Math.random() * sentences.length);
                typeSpeed = 500;
            }

            typingTimeout = setTimeout(type, typeSpeed);
        };

        type();

        return () => clearTimeout(typingTimeout);
    }, []);

    useEffect(() => {
        if (user) navigate('/feed');
    }, [user, navigate]);

    const handleAnimationEnd = () => {
        setAnimationDone(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        const res = login(loginData.identifier, loginData.password);
        if (res.success) {
            navigate('/feed');
        } else {
            setError(res.message);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');
        const res = signup(signupData.username, signupData.email, signupData.password);
        if (res.success) {
            navigate('/feed');
        } else {
            setError(res.message);
        }
    };

    // Determine if we need the spotlight effect (dark overlay + blur)
    const isModalOpen = showLogin || showSignup;

    return (
        <div className="relative w-screen h-screen overflow-hidden font-sans text-white">

            {/* CINEMATIC INTRO OVERLAY */}
            <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out ${showIntro ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`relative flex flex-col items-center transform transition-transform duration-[2000ms] ease-out ${showIntro ? 'scale-150' : 'scale-[3]'}`}>
                    <img src={logo} alt="Cinematic Logo" className="w-72 h-72 md:w-96 md:h-96 rounded-[3rem] object-cover shadow-[0_0_120px_rgba(6,182,212,0.8)] animate-pulse" />
                </div>
            </div>

            {/* Layer 1: Canvas Animation (z-0) */}
            <LoginIntro onAnimationEnd={handleAnimationEnd} />

            {/* Layer 2: The Conditional Dark Overlay (z-10) */}
            {/* Premium Darkening: Active = Blurry/Dark, Initial = Crystal Clear (Original Video) */}
            <div className={`absolute inset-0 z-10 transition-all duration-1000 pointer-events-none 
                ${isModalOpen ? 'bg-slate-950/80 backdrop-blur-2xl' : 'bg-slate-950/10 backdrop-blur-none'}`}
            />

            {/* Layer 3: The Content (z-20) */}
            {/* Contains the Text, Buttons, and Modals */}
            <div className={`absolute inset-0 z-20 transition-all duration-1000 flex flex-col items-center justify-center
                ${animationDone && !showIntro ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

                {/* Main Landing View - Prism Holographic Card */}
                {!showLogin && !showSignup && (
                    <div className="relative z-20 max-w-4xl mx-4 animate-fade-in group text-center">

                        {/* Multi-Color Prism Glow Layer */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 rounded-[2.5rem] blur-xl opacity-70 animate-pulse"></div>

                        {/* Inner Card Content */}
                        <div className="relative bg-slate-900/80 backdrop-blur-2xl p-10 md:p-14 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center shadow-2xl">

                            {/* Prism Accent Bar */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1/3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-sm rounded-b-full opacity-90"></div>

                            <div className="mb-10 space-y-3 flex flex-col items-center">
                                <img src={logo} alt="Network Logo" className="w-32 h-32 rounded-3xl object-cover mb-6 bg-black/30 shadow-[0_0_40px_rgba(255,255,255,0.3)] border border-white/20 hover:scale-105 transition-transform duration-500" />
                                <h1 className="flex flex-col items-center leading-tight">
                                    <span className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg uppercase">
                                        CONNECT
                                    </span>
                                    <span className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] uppercase mt-2">
                                        BEYOND REALITY
                                    </span>
                                </h1>

                                {/* Fiery Scramble Text Effect */}
                                <div className="pt-6 h-16 flex items-center justify-center">
                                    <p className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-xs md:text-sm tracking-[0.2em] font-bold border-t border-orange-500/30 pt-6 inline-block opacity-100 uppercase drop-shadow-[0_0_15px_rgba(239,68,68,0.9)] animate-pulse">
                                        {scrambleText}
                                        <span className="text-orange-400 animate-pulse">_</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full">
                                {/* Primary CTA - Prism Gradient */}
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(139,92,246,0.6)] uppercase tracking-wider text-sm md:text-base relative overflow-hidden"
                                >
                                    Login
                                </button>

                                {/* Secondary CTA */}
                                <button
                                    onClick={() => setShowSignup(true)}
                                    className="px-10 py-5 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all uppercase tracking-wider text-sm md:text-base hover:border-purple-400/50"
                                >
                                    Join the Network
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Login Modal */}
                {showLogin && (
                    <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-2xl p-8 rounded-3xl border border-cyan-400/30 shadow-[0_0_40px_rgba(8,145,178,0.3)] animate-fade-in mx-4 z-30">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Identify</h2>
                            <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
                        </div>
                        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm flex items-center border border-red-500/20">{error}</div>}
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 w-5 h-5 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Username or Email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-gray-100 placeholder-gray-500"
                                    value={loginData.identifier}
                                    onChange={e => setLoginData({ ...loginData, identifier: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 w-5 h-5 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Access Code"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-gray-100 placeholder-gray-500"
                                    value={loginData.password}
                                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-gray-500 hover:text-cyan-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(192,38,211,0.5)] transition-all flex items-center justify-center group mt-4">
                                Enter System
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                )}

                {/* Signup Modal */}
                {showSignup && (
                    <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-2xl p-8 rounded-3xl border border-cyan-400/30 shadow-[0_0_40px_rgba(8,145,178,0.3)] animate-fade-in mx-4 z-30">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Initialize</h2>
                            <button onClick={() => setShowSignup(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
                        </div>
                        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm border border-red-500/20">{error}</div>}
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 w-5 h-5 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-gray-100 placeholder-gray-500"
                                    value={signupData.username}
                                    onChange={e => setSignupData({ ...signupData, username: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 w-5 h-5 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-gray-100 placeholder-gray-500"
                                    value={signupData.email}
                                    onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 w-5 h-5 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Access Code"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-gray-100 placeholder-gray-500"
                                    value={signupData.password}
                                    onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-gray-500 hover:text-cyan-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <button type="submit" className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center group mt-4 text-black">
                                Create Identity
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
