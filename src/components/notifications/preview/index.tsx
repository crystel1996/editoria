import type { FC } from "react";
import { Box, Divider, Typography } from "@mui/material";
import type { INotificationPreviewProps } from "./interface";

const NotificationPreview: FC<INotificationPreviewProps> = ({
    fromEmail,
    subject,
    articleTitle,
    articleExcerpt,
    articleContent,
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Previsualisation email
            </Typography>
            <Box sx={{ border: "1px solid #E0E0E0", borderRadius: 1, p: 2, backgroundColor: "#FFFFFF", flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" color="text.secondary">
                    De: {fromEmail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Sujet: {subject}
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, overflowY: "auto", flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {articleTitle}
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                        {articleExcerpt}
                    </Typography>
                    <Typography variant="body2">
                        {articleContent}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default NotificationPreview;
