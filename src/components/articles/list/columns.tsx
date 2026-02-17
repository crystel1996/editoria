import { getCategoryColor, getStatusColor } from "@components/articles/articles.utils";
import type { ITableColumn } from "@components/common/table/interface";
import { Star, StarBorder } from "@mui/icons-material";
import { Box, Chip, IconButton } from "@mui/material";
import type { IArticle } from "@types/article.interface";

const columns = (toggleFeatured: (rowId: string | number) => void): ITableColumn[] => ([
        {
            id: "title",
            label: "Titre",
            sortable: true,
            width: "35%",
            render: (value, row: any) => (
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton
                            size="small"
                            onClick={() => toggleFeatured(row.id)}
                            sx={{ p: 0 }}
                        >
                            {(row as IArticle).featured ? (
                                <Star sx={{ color: "#FFB800", fontSize: "1.2rem" }} />
                            ) : (
                                <StarBorder sx={{ fontSize: "1.2rem" }} />
                            )}
                        </IconButton>
                        <div>
                            <div style={{ fontWeight: 500, color: "#333" }}>
                                {String(value)}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    color: "#999",
                                    marginTop: "4px",
                                }}
                            >
                                {(row as IArticle).author}
                            </div>
                        </div>
                    </Box>
                </Box>
            ),
        },
        {
            id: "status",
            label: "Statut",
            render: (value) => (
                <Chip
                    label={String(value)}
                    color={getStatusColor(String(value))}
                    size="small"
                />
            ),
        },
        {
            id: "network",
            label: "Réseau",
        },
        {
            id: "categories",
            label: "Catégories",
            render: (value) => (
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {Array.isArray(value) && value.map((cat) => (
                        <Chip
                            key={cat}
                            label={cat}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: getCategoryColor(cat),
                                color: getCategoryColor(cat),
                            }}
                        />
                    ))}
                </Box>
            ),
        },
        {
            id: "createdAt",
            label: "Date",
            sortable: true,
            align: "right",
            render: (value: any) => {
                const date = new Date(value);
                return date.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
            }
        },
]);

export default columns;