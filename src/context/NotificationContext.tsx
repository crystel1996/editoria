import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { notificationService } from '@services/api';
import type { INotification } from '@services/api/notification.service';

interface NotificationContextType {
    notifications: INotification[];
    loading: boolean;
    error: string | null;
    fetchNotifications: () => Promise<void>;
    getNotificationById: (id: string) => INotification | undefined;
    sendNotification: (articleId: string, recipients: string[], subject: string) => Promise<INotification>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await notificationService.getAll();
            setNotifications(data);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Erreur lors du chargement des notifications');
            console.error('Error fetching notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    const getNotificationById = (id: string): INotification | undefined => {
        return notifications.find((notification) => notification.id === id);
    };

    const sendNotification = async (articleId: string, recipients: string[], subject: string): Promise<INotification> => {
        try {
            setError(null);
            const newNotification = await notificationService.send(articleId, recipients, subject);
            setNotifications((prev) => [...prev, newNotification]);
            return newNotification;
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de l\'envoi de la notification';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const value: NotificationContextType = {
        notifications,
        loading,
        error,
        fetchNotifications,
        getNotificationById,
        sendNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
