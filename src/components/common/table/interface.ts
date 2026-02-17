import type { ReactNode } from "react";
import type { TableProps, TableCellProps } from "@mui/material";

export interface ITableColumn {
    id: string;
    label: string;
    align?: "left" | "center" | "right" | "inherit" | "justify";
    width?: string | number;
    sortable?: boolean;
    render?: (value: unknown, row: ITableRow) => ReactNode;
    cellProps?: TableCellProps;
}

export interface ITableRow {
    id: string | number;
    [key: string]: unknown;
}

export interface ITableAction {
    id: string;
    label: string;
    icon?: ReactNode;
    onClick: (rowId: string | number) => void;
    color?: "inherit" | "action" | "disabled" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

export interface ICustomTableProps extends Omit<TableProps, "children"> {
    columns: ITableColumn[];
    rows: ITableRow[];
    actions?: ITableAction[];
    onSelectionChange?: (selectedIds: (string | number)[]) => void;
    isLoading?: boolean;
    emptyMessage?: string;
    selectable?: boolean;
    stickyHeader?: boolean;
}
