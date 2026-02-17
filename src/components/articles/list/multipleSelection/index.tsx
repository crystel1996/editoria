import type { IMultipleSelectionProps } from "@components/articles/list/multipleSelection/interface";
import CustomButton from "@components/common/button";
import { ArticleStatusEnum } from "@types/article.interface";
import { Archive, Close, Edit, Publish } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import type { FC } from "react";

const MultipleSelection: FC<IMultipleSelectionProps> = ({ selectedCount, onChangeStatus, onClearSelection }) => {
    if (selectedCount === 0) return <></>;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                mb: 2,
                backgroundColor: "#F5F5F5",
                borderRadius: 1,
                border: "1px solid #E0E0E0",
            }}
        >
            <Chip
                label={`${selectedCount} sélectionné(s)`}
                onDelete={onClearSelection}
                deleteIcon={<Close />}
                color="primary"
                variant="filled"
            />
            <Typography variant="body2" sx={{ color: "#666", mr: 1 }}>
                Actions:
            </Typography>
            <CustomButton
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<Publish />}
                onClick={() => onChangeStatus(ArticleStatusEnum.PUBLISHED)}
            >
                Publier
            </CustomButton>
            <CustomButton
                variant="outlined"
                size="small"
                color="warning"
                startIcon={<Edit />}
                onClick={() => onChangeStatus(ArticleStatusEnum.DRAFT)}
            >
                Brouillon
            </CustomButton>
            <CustomButton
                variant="outlined"
                size="small"
                color="secondary"
                startIcon={<Archive />}
                onClick={() => onChangeStatus(ArticleStatusEnum.ARCHIVED)}
            >
                Archiver
            </CustomButton>
        </Box>
    );
};

export default MultipleSelection;