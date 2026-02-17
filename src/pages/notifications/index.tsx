import { Box, CircularProgress, Alert } from "@mui/material";
import style from './style';
import Title from "@components/common/title";
import NotificationForm from "@components/notifications/form";
import NotificationHistory from "@components/notifications/history";
import { useNotifications } from "@context/NotificationContext";
import { useArticles } from "@context/ArticleContext";
import { useEffect, useState } from "react";

const NotificationPage = () => {
    const { notifications, loading, error, fetchNotifications, sendNotification } = useNotifications();
    const { articles } = useArticles();
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleSendNotification = async (articleId: string, recipients: string[], subject: string) => {
        try {
            setIsSending(true);
            await sendNotification(articleId, recipients, subject);
            // Refresh notifications list
            await fetchNotifications();
        } catch (err) {
            console.error('Error sending notification:', err);
        } finally {
            setIsSending(false);
        }
    };

    // Transform notifications for the history component
    const historyItems = notifications.map((notif) => {
        const article = articles.find(a => a.id === notif.articleId);
        return {
            id: notif.id,
            articleTitle: article?.title || 'Article inconnu',
            recipientsCount: notif.recipients.length,
            date: new Date(notif.sentAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
            status: notif.status === 'sent' ? 'ENVOYE' : 'ECHOUE',
        };
    });

    return <Box sx={style}>
        <Box className="header">
            <Title variant="h3">Notifications</Title>
        </Box>
        {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        )}
        <Box>
            <NotificationForm 
                onSubmit={handleSendNotification as any}
                articles={articles}
                isLoading={isSending}
            />
        </Box>
        <Box>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <NotificationHistory items={historyItems} />
            )}
        </Box>
    </Box>
}

export default NotificationPage;