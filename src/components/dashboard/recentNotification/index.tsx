import { Box, Chip, Typography } from "@mui/material";
import CustomCard from "@components/common/card";

interface Notification {
    id: number;
    title: string;
    recipients: string;
    status: string;
    color: "success" | "error" | "warning" | "info";
}

const LATEST_NOTIFICATIONS: Notification[] = [
    {
        id: 1,
        title: "Nouvel article : L'intelligence artificielle revolutionne le secteur medical",
        recipients: "3 destinataire(s)",
        status: "Envoye",
        color: "success",
    },
    {
        id: 2,
        title: "Nouvel article : Le festival de Cannes 2025",
        recipients: "2 destinataire(s)",
        status: "Envoye",
        color: "success",
    },
    {
        id: 3,
        title: "Les marches financiers en pleine mutation",
        recipients: "1 destinataire(s)",
        status: "Echoue",
        color: "error",
    },
];

const RecentNotification = () => {
    return (
        <CustomCard
            cardHeaderProps={{ title: "Dernieres notifications" }}
            cardContent={{
                attribute: {},
                children: (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {LATEST_NOTIFICATIONS.map((notification) => (
                            <Box
                                key={notification.id}
                                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}
                            >
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {notification.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {notification.recipients}
                                    </Typography>
                                </Box>
                                <Chip label={notification.status} color={notification.color} size="small" />
                            </Box>
                        ))}
                    </Box>
                ),
            }}
        />
    );
};

export default RecentNotification;
