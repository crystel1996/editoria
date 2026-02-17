import { getCategoryColor, getStatusColor } from "@components/articles/articles.utils";
import type { ITableColumn } from "@components/common/table/interface";
import { Star, StarBorder } from "@mui/icons-material";
import { Box, Chip, IconButton } from "@mui/material";
import type { IArticle } from "@interfaces/article.interface";
import type { ICategory } from "@interfaces/category.interface";

const columns = (toggleFeatured: (rowId: string | number) => void, categories?: ICategory[]): ITableColumn[] => {
    // Create a map for quick category lookup
    const categoryMap = new Map(categories?.map(cat => [cat.id, cat]) || []);

    return [
        {
            id: "title",
            label: "Titre",
            sortable: true,
            width: "25%",
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
            sortable: true,
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
            width: "15%",
            sortable: true,
            render: (value, row: any) => (
                <span>{String((row as IArticle).networkName || value)}</span>
            ),
        },
        {
            id: "categories",
            label: "Catégories",
            width: "25%",
            render: (value) => (
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {Array.isArray(value) && value.map((catId) => {
                        const category = categoryMap.get(catId);
                        const categoryName = category?.name || catId;
                        const categoryColor = category?.color || getCategoryColor(catId);
                        
                        return (
                            <Chip
                                key={catId}
                                label={categoryName}
                                size="small"
                                variant="outlined"
                                sx={{
                                    borderColor: categoryColor,
                                    color: categoryColor,
                                }}
                            />
                        );
                    })}
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
    ];
};

export default columns;