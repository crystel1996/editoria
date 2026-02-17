import type { ICategoryCardProps } from "@components/categories/card/interface";
import CustomCard from "@components/common/card";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import type { FC } from "react";
import style from "./style";

const CategoryCard: FC<ICategoryCardProps> = (props) => {
    const handleEdit = () => {
        props.onEdit?.(props.item.id);
    };

    const handleDelete = () => {
        props.onDelete?.(props.item.id);
    };

    return (
        <CustomCard
            cardProps={{
                sx: style.card,
            }}
            cardContent={{
                attribute: { sx: style.content },
                children: (
                    <Box sx={style.layout}>
                        <Box sx={style.headerRow}>
                            <Box sx={style.titleGroup}>
                                <Box sx={style.colorDot(props.item.color)} />
                                <Typography variant="h6" sx={style.title}>
                                    {props.item.name}
                                </Typography>
                            </Box>
                            <Box sx={style.actions}>
                                <IconButton size="small" onClick={handleEdit} aria-label="Modifier">
                                    <EditOutlined fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={handleDelete}
                                    aria-label="Supprimer"
                                    color="error"
                                >
                                    <DeleteOutline fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                        {props.item.description && (
                            <Typography variant="body2" color="text.secondary">
                                {props.item.description}
                            </Typography>
                        )}
                        <Box>
                            <Chip
                                label={`${props.articlesCount ?? 0} article(s)`}
                                size="small"
                                variant="outlined"
                                sx={style.badge}
                            />
                        </Box>
                    </Box>
                ),
            }}
        />
    );
};

export default CategoryCard;