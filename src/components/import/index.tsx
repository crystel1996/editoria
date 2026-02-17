import type { FC } from "react";
import { Box, Typography } from "@mui/material";
import CustomCard from "@components/common/card";
import CustomButton from "@components/common/button";
import { UploadFile } from "@mui/icons-material";

const JSON_SAMPLE = `[
  {
    "title": "Article importe",
    "content": "Contenu de l'article...",
    "excerpt": "Resume",
    "author": "Auteur",
    "category": "nom-categorie",
    "network": "nom-reseau"
  }
]`;

const ImportData: FC = () => {
    return (
        <CustomCard
            cardHeaderProps={{
                title: (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <UploadFile fontSize="small" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Importer un fichier JSON
                        </Typography>
                    </Box>
                ),
            }}
            cardContent={{
                attribute: {},
                children: (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <Box
                            sx={{
                                border: "1px dashed #D6D6D6",
                                borderRadius: 2,
                                p: 4,
                                textAlign: "center",
                                backgroundColor: "#FAFAFA",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <UploadFile sx={{ color: "#6B7280" }} />
                            <Typography variant="body2" color="text.secondary">
                                Selectionnez un fichier JSON contenant un tableau d'articles
                            </Typography>
                            <CustomButton variant="outlined" component="label">
                                Choisir un fichier
                                <input type="file" accept="application/json" hidden />
                            </CustomButton>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#F5F6F8",
                                borderRadius: 2,
                                p: 2,
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Format attendu :
                            </Typography>
                            <Box
                                component="pre"
                                sx={{
                                    m: 0,
                                    p: 2,
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: 1,
                                    border: "1px solid #E5E7EB",
                                    fontSize: "0.85rem",
                                    overflowX: "auto",
                                }}
                            >
                                {JSON_SAMPLE}
                            </Box>
                        </Box>
                    </Box>
                ),
            }}
        />
    );
};

export default ImportData;
