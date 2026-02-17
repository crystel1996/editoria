export type NotificationStatus = "ENVOYE" | "ECHOUE";

export interface INotificationHistoryItem {
    id: string | number;
    articleTitle: string;
    recipientsCount: number;
    date: string;
    status: string;
}

export interface INotificationHistoryProps {
    items?: INotificationHistoryItem[];
}
