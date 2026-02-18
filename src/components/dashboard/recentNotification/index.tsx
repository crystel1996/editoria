import { useEffect } from "react";
import { Box, Chip, Typography, CircularProgress, Alert } from "@mui/material";
import CustomCard from "@components/common/card";
import { useNotifications } from "@context/index";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const RecentNotification = () => {
    const { notifications, loading, error, fetchNotifications } = useNotifications();

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Get the 3 most recent notifications
    const recentNotifications = notifications
        .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
        .slice(0, 3);

    const getStatusColor = (status: string): "success" | "error" | "warning" | "info" => {
        switch (status) {
            case 'sent':
                return 'success';
            case 'failed':
                return 'error';
            default:
                return 'info';
        }
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'sent':
                return 'Envoyé';
            case 'failed':
                return 'Échoué';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <CustomCard
                cardHeaderProps={{ title: "Dernières notifications" }}
                cardContent={{
                    attribute: {},
                    children: <CircularProgress />,
                }}
            />
        );
    }

    if (error) {
        return (
            <CustomCard
                cardHeaderProps={{ title: "Dernières notifications" }}
                cardContent={{
                    attribute: {},
                    children: <Alert severity="error">{error}</Alert>,
                }}
            />
        );
    }

    if (recentNotifications.length === 0) {
        return (
            <CustomCard
                cardHeaderProps={{ title: "Dernières notifications" }}
                cardContent={{
                    attribute: {},
                    children: (
                        <Typography variant="body2" color="text.secondary">
                            Aucune notification pour le moment
                        </Typography>
                    ),
                }}
            />
        );
    }

    return (
        <CustomCard
            cardHeaderProps={{ title: "Dernières notifications" }}
            cardContent={{
                attribute: {},
                children: (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {recentNotifications.map((notification) => (
                            <Box
                                key={notification.id}
                                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}
                            >
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {notification.subject}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {notification.recipients.length} destinataire(s)
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                                        {format(new Date(notification.sentAt), 'd MMM', { locale: fr })}
                                    </Typography>
                                    <Chip 
                                        label={getStatusLabel(notification.status)} 
                                        color={getStatusColor(notification.status)} 
                                        size="small" 
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ),
            }}
        />
    );
};

export default RecentNotification;
