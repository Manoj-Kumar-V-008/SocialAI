import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { sendNotification as sendNotificationToBackend, getNotifications, markNotificationRead } from '../services/backendSimulator';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Load notifications on mount
    useEffect(() => {
        const loadNotifications = () => {
            const notifs = getNotifications();
            setNotifications(notifs);
            setUnreadCount(notifs.filter(n => !n.read).length);
        };

        loadNotifications();

        // Refresh notifications every 30 seconds
        const interval = setInterval(loadNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    // Toast notification system
    const showToast = useCallback((message, type = 'info', duration = 3000, action = null) => {
        const id = `toast_${Date.now()}_${Math.random()}`;
        const toast = {
            id,
            message,
            type, // success, error, warning, info
            duration,
            action
        };

        setToasts(prev => [...prev, toast]);

        // Auto-dismiss
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);

        return id;
    }, []);

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Send persistent notification
    const sendNotification = useCallback((notification) => {
        const newNotif = sendNotificationToBackend(notification);
        setNotifications(prev => [newNotif, ...prev]);
        setUnreadCount(prev => prev + 1);

        // Also show as toast
        showToast(notification.message, 'info', 4000);

        return newNotif;
    }, [showToast]);

    // Mark notification as read
    const markAsRead = useCallback((notificationId) => {
        markNotificationRead(notificationId);
        setNotifications(prev =>
            prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    }, []);

    // Clear all notifications
    const clearAll = useCallback(() => {
        setNotifications([]);
        setUnreadCount(0);
        localStorage.setItem('notifications', JSON.stringify([]));
    }, []);

    const value = {
        // Toast system
        showToast,
        dismissToast,
        toasts,

        // Persistent notifications
        notifications,
        unreadCount,
        sendNotification,
        markAsRead,
        clearAll
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};
