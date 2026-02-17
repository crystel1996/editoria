import { Box } from "@mui/material";
import style from './style';
import Title from "@components/common/title";
import NotificationForm from "@components/notifications/form";
import type { INotificationFormValues } from "@components/notifications/form/interface";
import NotificationHistory from "@components/notifications/history";

const NotificationPage = () => {

    const handleSendNotification = (data: INotificationFormValues) => {
        
    };

    return <Box sx={style}>
        <Box className="header">
            <Title variant="h3">Notifications</Title>
        </Box>
        <Box>
            <NotificationForm onSubmit={handleSendNotification} />
        </Box>
        <Box>
            <NotificationHistory />
        </Box>
    </Box>
}

export default NotificationPage;