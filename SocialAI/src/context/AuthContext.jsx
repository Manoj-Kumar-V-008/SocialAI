import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                // Load subscription tier
                const subscription = JSON.parse(localStorage.getItem('subscription') || '{"tier":"free","status":"active"}');
                parsedUser.subscriptionTier = subscription.tier;
                parsedUser.subscriptionStatus = subscription.status;
                setUser(parsedUser);
            }
        } catch (e) {
            console.error("Failed to parse user from local storage", e);
        }
        setLoading(false);
    }, []);

    const login = (identifier, password) => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find(u => (u.email === identifier || u.name === identifier) && u.password === password);

            if (foundUser) {
                // Strip password before setting to state/session
                const { password, ...safeUser } = foundUser;
                // Add subscription info
                const subscription = JSON.parse(localStorage.getItem('subscription') || '{"tier":"free","status":"active"}');
                safeUser.subscriptionTier = subscription.tier;
                safeUser.subscriptionStatus = subscription.status;

                setUser(safeUser);
                localStorage.setItem('currentUser', JSON.stringify(safeUser));
                return { success: true };
            }
            return { success: false, message: 'Invalid credentials' };
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    };

    const signup = (name, email, password) => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === email)) {
                return { success: false, message: 'Email already exists' };
            }
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password,
                avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
                username: name.toLowerCase().replace(/\s+/g, ''),
                bio: 'Digital nomad exploring the AI frontier.',
                joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                isVerified: false,
                followers: 0,
                following: 0,
                coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
                subscriptionTier: 'free',
                subscriptionStatus: 'active'
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            const { password: _, ...safeUser } = newUser;
            setUser(safeUser);
            localStorage.setItem('currentUser', JSON.stringify(safeUser));

            // Initialize subscription
            localStorage.setItem('subscription', JSON.stringify({
                tier: 'free',
                status: 'active',
                startDate: new Date().toISOString()
            }));

            return { success: true };
        } catch (error) {
            return { success: false, message: 'Signup failed' };
        }
    };

    const [apiKey, setApiKey] = useState(localStorage.getItem('socialai_api_key') || '');

    const saveApiKey = (key) => {
        setApiKey(key);
        localStorage.setItem('socialai_api_key', key);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        // Optional: clear key on logout? Usually keys are personal preferences, but maybe better to keep if same device.
        // Let's keep it for now.
    };

    const updateProfile = (updates) => {
        if (!user) return;
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            localStorage.setItem('users', JSON.stringify(users));
        }
    };

    const changePassword = (currentPassword, newPassword) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1 && users[index].password === currentPassword) {
            users[index].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            return { success: true };
        }
        return { success: false, message: 'Incorrect current password' };
    };

    const upgradeSubscription = (tier) => {
        if (!user) return;
        const updatedUser = { ...user, subscriptionTier: tier, subscriptionStatus: 'active' };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index].subscriptionTier = tier;
            localStorage.setItem('users', JSON.stringify(users));
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            signup,
            logout,
            updateProfile,
            changePassword,
            apiKey,
            saveApiKey,
            upgradeSubscription
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
