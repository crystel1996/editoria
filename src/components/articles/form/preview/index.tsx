import type { FC } from "react";
import type { IArticleFormInput } from "@components/articles/form/interface";
import { getCategoryColor } from "@components/articles/articles.utils";
import { ArticleStatusEnum } from "@types/article.interface";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

interface ArticlePreviewProps {
    values: IArticleFormInput;
}

const statusLabels: Record<ArticleStatusEnum, string> = {
    [ArticleStatusEnum.DRAFT]: "Brouillon",
    [ArticleStatusEnum.PUBLISHED]: "Publie",
    [ArticleStatusEnum.ARCHIVED]: "Archive",
};

const ArticlePreview: FC<ArticlePreviewProps> = ({ values }) => {
    return (
        <Box sx={{ border: "1px solid #E0E0E0", borderRadius: 1, p: 2, backgroundColor: "#FAFAFA" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Previsualisation
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <Stack spacing={1.5}>
                <Box>
                    <Typography variant="h6">
                        {values.title || "Titre de l'article"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {values.author ? `Par ${values.author}` : "Auteur non defini"}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Resume
                    </Typography>
                    <Typography variant="body2">
                        {values.excerpt || "Aucun resume"}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Contenu
                    </Typography>
                    <Typography variant="body2">
                        {values.content || "Aucun contenu"}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Categories
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
                        {(values.categories || []).length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                                Aucune categorie
                            </Typography>
                        )}
                        {(values.categories || []).map((cat) => (
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
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Reseau
                    </Typography>
                    <Typography variant="body2">
                        {values.network || "Non defini"}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Statut
                    </Typography>
                    <Typography variant="body2">
                        {values.status ? statusLabels[values.status] : "Non defini"}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Mise en avant
                    </Typography>
                    <Typography variant="body2">
                        {values.featured ? "Oui" : "Non"}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};

export default ArticlePreview;
