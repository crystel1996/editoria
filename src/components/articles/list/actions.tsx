import type { IArticleActions } from "@components/articles/list/interface";
import type { ITableAction } from "@components/common/table/interface";
import { Archive, Delete, Edit, Star } from "@mui/icons-material";

const actions = (params: IArticleActions): ITableAction[] => ([
        {
            id: "edit",
            label: "Modifier",
            icon: <Edit fontSize="small" />,
            onClick: (rowId) => params.onEdit(rowId),
        },
        {
            id: "highlight",
            label: "Mettre en avant",
            icon: <Star fontSize="small" />,
            onClick: (rowId) => params.onFeature(rowId),
        },
        {
            id: "archive",
            label: "Archiver",
            icon: <Archive fontSize="small" />,
            onClick: (rowId) => params.onArchive(rowId),
        },
        {
            id: "delete",
            label: "Supprimer",
            icon: <Delete fontSize="small" color="error" />,
            onClick: (rowId) => params.onDelete(rowId),
        },
]);

export default actions;