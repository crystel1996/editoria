import type { FC } from "react";
import { Chip } from "@mui/material";
import CustomCard from "@components/common/card";
import CustomTable from "@components/common/table";
import type { ITableColumn } from "@components/common/table/interface";
import type { INotificationHistoryItem, INotificationHistoryProps, NotificationStatus } from "./interface";

const STATUS_LABELS: Record<NotificationStatus, string> = {
    ENVOYE: "Envoye",
    ECHOUE: "Echoue",
};

const STATUS_COLORS: Record<NotificationStatus, "success" | "error"> = {
    ENVOYE: "success",
    ECHOUE: "error",
};

const DEFAULT_ITEMS: INotificationHistoryItem[] = [
    {
        id: 1,
        articleTitle: "L'intelligence artificielle revolutionne le secteur medical",
        recipientsCount: 3,
        date: "10/02/2025 14:30",
        status: "ENVOYE",
    },
    {
        id: 2,
        articleTitle: "Le festival de Cannes 2025 : les films a ne pas manquer",
        recipientsCount: 2,
        date: "13/02/2025 10:00",
        status: "ENVOYE",
    },
    {
        id: 3,
        articleTitle: "Les marches financiers en pleine mutation",
        recipientsCount: 1,
        date: "12/02/2025 16:45",
        status: "ECHOUE",
    },
];

const columns: ITableColumn[] = [
    {
        id: "articleTitle",
        label: "Article",
        width: "45%",
    },
    {
        id: "recipientsCount",
        label: "Destinataires",
        width: "20%",
        render: (value) => `${value} destinataire(s)`,
    },
    {
        id: "date",
        label: "Date",
        width: "20%",
    },
    {
        id: "status",
        label: "Statut",
        width: "15%",
        render: (value) => {
            const status = value as NotificationStatus;
            return (
                <Chip
                    label={STATUS_LABELS[status]}
                    color={STATUS_COLORS[status]}
                    size="small"
                />
            );
        },
    },
];

const NotificationHistory: FC<INotificationHistoryProps> = ({ items }) => {
    return (
        <CustomCard
            cardHeaderProps={{ title: "Historique des notifications" }}
            cardContent={{
                attribute: {},
                children: (
                    <CustomTable
                        columns={columns}
                        rows={items ?? DEFAULT_ITEMS as any}
                        selectable={false}
                        emptyMessage="Aucune notification trouvee"
                    />
                ),
            }}
        />
    );
};

export default NotificationHistory;
