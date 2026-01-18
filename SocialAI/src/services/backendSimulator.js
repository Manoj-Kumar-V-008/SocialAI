// Backend Simulator - Provides realistic API simulation
// Simulates delays, errors, and state management for a production-like experience

const SIMULATION_DELAY = { min: 300, max: 800 };
const ERROR_RATE = 0.03; // 3% failure rate for realism

// Helper: Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomDelay = () => {
    const ms = Math.random() * (SIMULATION_DELAY.max - SIMULATION_DELAY.min) + SIMULATION_DELAY.min;
    return delay(ms);
};

// Helper: Simulate random failures
const shouldFail = () => Math.random() < ERROR_RATE;

// ========== Payment Processing ==========
export const processPayment = async (paymentData) => {
    await randomDelay();

    if (shouldFail()) {
        throw new Error('Payment declined. Please try another card.');
    }

    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const transaction = {
        id: transactionId,
        amount: paymentData.amount,
        plan: paymentData.plan,
        method: paymentData.method,
        status: 'completed',
        date: new Date().toISOString(),
        last4: paymentData.cardNumber?.slice(-4) || '****',
        receipt: `receipt_${transactionId}.pdf`
    };

    // Save to transaction history
    const history = JSON.parse(localStorage.getItem('transactions') || '[]');
    history.unshift(transaction);
    localStorage.setItem('transactions', JSON.stringify(history));

    return {
        success: true,
        transactionId,
        transaction
    };
};

// ========== Subscription Management ==========
export const updateSubscription = async (tier) => {
    await randomDelay();

    const subscription = {
        tier,
        status: 'active',
        startDate: new Date().toISOString(),
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: true
    };

    localStorage.setItem('subscription', JSON.stringify(subscription));

    return { success: true, subscription };
};

export const cancelSubscription = async () => {
    await randomDelay();

    const subscription = JSON.parse(localStorage.getItem('subscription') || '{}');
    subscription.status = 'cancelled';
    subscription.autoRenew = false;
    subscription.expiryDate = subscription.nextBilling;

    localStorage.setItem('subscription', JSON.stringify(subscription));

    return { success: true, message: 'Subscription cancelled successfully' };
};

// ========== Notification System ==========
export const sendNotification = (notification) => {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const newNotification = {
        id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...notification,
        timestamp: new Date().toISOString(),
        read: false
    };

    notifications.unshift(newNotification);

    // Keep only last 50 notifications
    if (notifications.length > 50) {
        notifications.splice(50);
    }

    localStorage.setItem('notifications', JSON.stringify(notifications));

    return newNotification;
};

export const getNotifications = () => {
    return JSON.parse(localStorage.getItem('notifications') || '[]');
};

export const markNotificationRead = (notificationId) => {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }
};

export const clearAllNotifications = () => {
    localStorage.setItem('notifications', JSON.stringify([]));
};

// ========== Analytics ==========
export const getAnalytics = async () => {
    await randomDelay();

    const cached = localStorage.getItem('analytics');
    if (cached) {
        const data = JSON.parse(cached);
        // Refresh if older than 1 hour
        if (Date.now() - data.timestamp < 3600000) {
            return data.analytics;
        }
    }

    // Generate realistic analytics data
    const days = 30;
    const viewsData = Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: Math.floor(Math.random() * 500) + 200
    }));

    const engagementData = {
        likes: Math.floor(Math.random() * 5000) + 1000,
        comments: Math.floor(Math.random() * 800) + 200,
        shares: Math.floor(Math.random() * 300) + 50
    };

    const followerGrowth = Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        followers: Math.floor(1000 + i * (Math.random() * 50 + 10))
    }));

    const analytics = {
        profileViews: viewsData,
        engagement: engagementData,
        followerGrowth,
        totalFollowers: followerGrowth[followerGrowth.length - 1].followers,
        avgEngagementRate: (Math.random() * 5 + 2).toFixed(2),
        topPosts: [
            { id: 1, likes: 1240, engagement: '8.2%' },
            { id: 3, likes: 3400, engagement: '12.5%' },
            { id: 5, likes: 2100, engagement: '9.8%' }
        ]
    };

    localStorage.setItem('analytics', JSON.stringify({
        analytics,
        timestamp: Date.now()
    }));

    return analytics;
};

// ========== Achievements ==========
const ACHIEVEMENT_DEFINITIONS = [
    { id: 'first_post', name: 'First Step', description: 'Create your first post', icon: '✨', points: 10 },
    { id: 'popular_creator', name: 'Popular Creator', description: 'Get 100 likes', icon: '🔥', points: 50 },
    { id: 'social_butterfly', name: 'Social Butterfly', description: 'Follow 50 users', icon: '🦋', points: 30 },
    { id: 'night_owl', name: 'Night Owl', description: 'Post at 3 AM', icon: '🦉', points: 20 },
    { id: 'speedster', name: 'Speedster', description: 'Like 100 posts in a day', icon: '⚡', points: 40 },
    { id: 'influencer', name: 'Influencer', description: 'Reach 1000 followers', icon: '👑', points: 100 },
    { id: 'ai_artist', name: 'AI Artist', description: 'Generate 50 AI images', icon: '🎨', points: 60 },
    { id: 'loyal_user', name: 'Loyal User', description: 'Login 30 days in a row', icon: '💎', points: 150 }
];

export const getAchievements = () => {
    const achieved = JSON.parse(localStorage.getItem('achievements') || '[]');
    return ACHIEVEMENT_DEFINITIONS.map(def => ({
        ...def,
        unlocked: achieved.includes(def.id),
        unlockedAt: achieved.find(a => a.id === def.id)?.timestamp
    }));
};

export const unlockAchievement = async (achievementId) => {
    await delay(500);

    const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    if (achievements.find(a => a.id === achievementId)) {
        return { alreadyUnlocked: true };
    }

    const achievement = ACHIEVEMENT_DEFINITIONS.find(a => a.id === achievementId);
    if (!achievement) return { error: 'Achievement not found' };

    achievements.push({
        id: achievementId,
        timestamp: new Date().toISOString()
    });

    localStorage.setItem('achievements', JSON.stringify(achievements));

    // Send notification
    sendNotification({
        type: 'achievement',
        title: `Achievement Unlocked: ${achievement.name}!`,
        message: achievement.description,
        icon: achievement.icon,
        points: achievement.points
    });

    return { success: true, achievement };
};

// ========== Daily Challenges ==========
export const getDailyChallenge = () => {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem('dailyChallenge') || '{}');

    if (saved.date === today) {
        return saved.challenge;
    }

    // Generate new daily challenge
    const challenges = [
        { id: 'post_3', task: 'Create 3 posts today', reward: 50, progress: 0, target: 3 },
        { id: 'like_20', task: 'Like 20 posts', reward: 30, progress: 0, target: 20 },
        { id: 'comment_5', task: 'Comment on 5 posts', reward: 40, progress: 0, target: 5 },
        { id: 'ai_gen_2', task: 'Generate 2 AI images', reward: 60, progress: 0, target: 2 }
    ];

    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    challenge.expiresIn = new Date(new Date().setHours(23, 59, 59, 999)).getTime() - Date.now();

    localStorage.setItem('dailyChallenge', JSON.stringify({
        date: today,
        challenge
    }));

    return challenge;
};

export const updateChallengeProgress = (challengeId, increment = 1) => {
    const saved = JSON.parse(localStorage.getItem('dailyChallenge') || '{}');
    if (saved.challenge && saved.challenge.id === challengeId) {
        saved.challenge.progress = Math.min(saved.challenge.progress + increment, saved.challenge.target);

        if (saved.challenge.progress >= saved.challenge.target) {
            // Challenge completed!
            sendNotification({
                type: 'challenge_complete',
                title: 'Daily Challenge Complete! 🎉',
                message: `You earned ${saved.challenge.reward} points!`
            });
        }

        localStorage.setItem('dailyChallenge', JSON.stringify(saved));
        return saved.challenge;
    }
};

// ========== Activity Logging ==========
export const logActivity = (action, data = {}) => {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');

    activities.unshift({
        id: `activity_${Date.now()}`,
        action,
        data,
        timestamp: new Date().toISOString()
    });

    // Keep only last 100 activities
    if (activities.length > 100) {
        activities.splice(100);
    }

    localStorage.setItem('activities', JSON.stringify(activities));
};

// ========== Mood Analysis ==========
export const analyzeMood = async () => {
    await randomDelay();

    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const recentPosts = activities.filter(a => a.action === 'create_post').slice(0, 5);

    // Simulate mood detection based on activity patterns
    const moods = [
        { mood: 'Energetic', emoji: '⚡', color: 'from-yellow-400 to-orange-500', confidence: 0.85 },
        { mood: 'Creative', emoji: '🎨', color: 'from-purple-400 to-pink-500', confidence: 0.78 },
        { mood: 'Focused', emoji: '🎯', color: 'from-blue-400 to-cyan-500', confidence: 0.92 },
        { mood: 'Relaxed', emoji: '😌', color: 'from-green-400 to-teal-500', confidence: 0.71 },
        { mood: 'Excited', emoji: '🤩', color: 'from-red-400 to-pink-500', confidence: 0.88 }
    ];

    const detected = moods[Math.floor(Math.random() * moods.length)];

    return {
        ...detected,
        recommendations: [
            'Try the AI Studio for creative expression',
            'Join trending conversations',
            'Complete your daily challenge'
        ],
        timestamp: new Date().toISOString()
    };
};

export default {
    processPayment,
    updateSubscription,
    cancelSubscription,
    sendNotification,
    getNotifications,
    markNotificationRead,
    clearAllNotifications,
    getAnalytics,
    getAchievements,
    unlockAchievement,
    getDailyChallenge,
    updateChallengeProgress,
    logActivity,
    analyzeMood
};
