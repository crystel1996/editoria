import type { FC, ReactNode } from "react";
import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    IconButton,
    Menu,
    MenuItem,
    TableSortLabel,
    Box,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { ICustomTableProps } from "./interface";
import style from "./style";

const CustomTable: FC<ICustomTableProps> = ({
    columns,
    rows,
    actions,
    onSelectionChange,
    isLoading = false,
    emptyMessage = "No data available",
    selectable = true,
    stickyHeader = true,
    ...props
}) => {
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
        new Set()
    );
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeRowId, setActiveRowId] = useState<string | number | null>(null);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: "asc" | "desc";
    } | null>(null);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allIds = new Set(rows.map((row) => row.id));
            setSelectedRows(allIds);
            onSelectionChange?.(Array.from(allIds));
        } else {
            setSelectedRows(new Set());
            onSelectionChange?.([]);
        }
    };

    const handleSelectRow = (
        rowId: string | number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newSelectedRows = new Set(selectedRows);
        if (event.target.checked) {
            newSelectedRows.add(rowId);
        } else {
            newSelectedRows.delete(rowId);
        }
        setSelectedRows(newSelectedRows);
        onSelectionChange?.(Array.from(newSelectedRows));
    };

    const handleMenuOpen = (
        event: React.MouseEvent<HTMLElement>,
        rowId: string | number
    ) => {
        setAnchorEl(event.currentTarget);
        setActiveRowId(rowId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveRowId(null);
    };

    const handleActionClick = (actionId: string) => {
        const action = actions?.find((a) => a.id === actionId);
        if (action && activeRowId !== null) {
            action.onClick(activeRowId);
        }
        handleMenuClose();
    };

    const handleSort = (columnId: string) => {
        let direction: "asc" | "desc" = "asc";
        if (
            sortConfig?.key === columnId &&
            sortConfig?.direction === "asc"
        ) {
            direction = "desc";
        }
        setSortConfig({ key: columnId, direction });
    };

    const sortedRows = useMemo(() => {
        if (!sortConfig) return rows;

        const sorted = [...rows].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue === undefined || bValue === undefined) return 0;

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortConfig.direction === "asc"
                    ? aValue - bValue
                    : bValue - aValue;
            }

            return 0;
        });

        return sorted;
    }, [rows, sortConfig]);

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (sortedRows.length === 0) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <Typography color="textSecondary">{emptyMessage}</Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={style} stickyHeader={stickyHeader} {...props}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        {selectable && (
                            <TableCell padding="checkbox" sx={{ width: "50px" }}>
                                <Checkbox
                                    checked={
                                        selectedRows.size > 0 &&
                                        selectedRows.size === sortedRows.length
                                    }
                                    indeterminate={
                                        selectedRows.size > 0 &&
                                        selectedRows.size < sortedRows.length
                                    }
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                        )}
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align || "left"}
                                sx={{ width: column.width }}
                                {...column.cellProps}
                            >
                                {column.sortable ? (
                                    <TableSortLabel
                                        active={sortConfig?.key === column.id}
                                        direction={
                                            sortConfig?.key === column.id
                                                ? sortConfig.direction
                                                : "asc"
                                        }
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                ) : (
                                    column.label
                                )}
                            </TableCell>
                        ))}
                        {actions && actions.length > 0 && (
                            <TableCell align="center" sx={{ width: "50px" }}>
                                Actions
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row) => (
                        <TableRow
                            key={row.id}
                            selected={selectedRows.has(row.id)}
                            hover
                        >
                            {selectable && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedRows.has(row.id)}
                                        onChange={(e) =>
                                            handleSelectRow(row.id, e)
                                        }
                                    />
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell
                                    key={`${row.id}-${column.id}`}
                                    align={column.align || "left"}
                                    {...column.cellProps}
                                >
                                    {column.render
                                        ? column.render(row[column.id], row)
                                        : (row[column.id] as ReactNode)}
                                </TableCell>
                            ))}
                            {actions && actions.length > 0 && (
                                <TableCell align="center">
                                    <IconButton
                                        size="small"
                                        onClick={(e) =>
                                            handleMenuOpen(e, row.id)
                                        }
                                    >
                                        <MoreVertIcon fontSize="small" />
                                    </IconButton>
                                    <Menu
                                        anchorEl={
                                            activeRowId === row.id
                                                ? anchorEl
                                                : null
                                        }
                                        open={
                                            activeRowId === row.id &&
                                            Boolean(anchorEl)
                                        }
                                        onClose={handleMenuClose}
                                    >
                                        {actions.map((action) => (
                                            <MenuItem
                                                key={action.id}
                                                onClick={() =>
                                                    handleActionClick(
                                                        action.id
                                                    )
                                                }
                                            >
                                                {action.icon && (
                                                    <span
                                                        style={{
                                                            marginRight: "8px",
                                                            display: "flex",
                                                        }}
                                                    >
                                                        {action.icon}
                                                    </span>
                                                )}
                                                {action.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
