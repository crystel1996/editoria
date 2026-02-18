import type { FC, ChangeEvent } from "react";
import { useState, useRef } from "react";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import CustomCard from "@components/common/card";
import CustomButton from "@components/common/button";
import { UploadFile, CheckCircle, Error as ErrorIcon } from "@mui/icons-material";
import { useImport } from "@context/index";
import type { ImportArticleData } from "@services/api/import.service";

const JSON_SAMPLE = `[
  {
    "title": "Article importé",
    "content": "Contenu de l'article...",
    "excerpt": "Résumé court",
    "author": "Nom de l'auteur",
    "category": "nom-categorie",
    "network": "nom-reseau",
    "status": "draft",
    "featured": false
  },
  {
    "title": "Deuxième article",
    "content": "Autre contenu...",
    "excerpt": "Autre résumé",
    "author": "Autre auteur",
    "categories": ["cat1", "cat2"],
    "network": "autre-reseau",
    "status": "published"
  }
]`;

const ImportData: FC = () => {
    const { loading, error, success, result, importArticles, resetStatus } = useImport();
    const [fileName, setFileName] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        resetStatus();
        setFileName(file.name);

        try {
            const text = await file.text();
            const articles: ImportArticleData[] = JSON.parse(text);
            await importArticles(articles);
        } catch (err: any) {
            resetStatus();
            if (err instanceof SyntaxError) {
                console.error("Erreur JSON:", err);
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                                <CustomButton 
                                    variant="outlined" 
                                    onClick={handleUploadClick}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <CircularProgress size={20} sx={{ mr: 1 }} />
                                            Import en cours...
                                        </>
                                    ) : (
                                        "Choisir un fichier"
                                    )}
                                </CustomButton>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/json"
                                    hidden
                                    onChange={handleFileChange}
                                    disabled={loading}
                                />
                                {fileName && (
                                    <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                        Fichier sélectionné: {fileName}
                                    </Typography>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "#F5F6F8",
                                    borderRadius: 2,
                                    p: 2,
                                }}
                            >
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    Format attendu:
                                </Typography>
                                <Typography variant="caption" sx={{ display: "block", mb: 1, color: "#6B7280" }}>
                                    • Les champs requis: title, content, excerpt, author, network
                                </Typography>
                                <Typography variant="caption" sx={{ display: "block", mb: 1, color: "#6B7280" }}>
                                    • Categories: utilisez 'category' (singular) ou 'categories' (array)
                                </Typography>
                                <Typography variant="caption" sx={{ display: "block", mb: 1, color: "#6B7280" }}>
                                    • Status: 'draft', 'published', ou 'archived' (optionnel, défaut: 'draft')
                                </Typography>
                                <Typography variant="caption" sx={{ display: "block", mb: 1, color: "#6B7280" }}>
                                    • Featured: booléen (optionnel, défaut: false)
                                </Typography>
                                <Typography variant="caption" sx={{ display: "block", mb: 1, color: "#6B7280" }}>
                                    • Les catégories et réseaux seront créés automatiquement s'ils n'existent pas
                                </Typography>
                                <Box
                                    component="pre"
                                    sx={{
                                        m: 0,
                                        p: 2,
                                        backgroundColor: "#FFFFFF",
                                        borderRadius: 1,
                                        border: "1px solid #E5E7EB",
                                        fontSize: "0.75rem",
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

            {success && result && (
                <Alert 
                    severity="success"
                    icon={<CheckCircle />}
                    sx={{ borderRadius: 2 }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Import réussi! ✓
                    </Typography>
                    <Typography variant="body2">
                        {result.success} article(s) importé(s) avec succès
                    </Typography>
                </Alert>
            )}

            {error && (
                <Alert 
                    severity="error"
                    icon={<ErrorIcon />}
                    sx={{ borderRadius: 2 }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: result?.errors?.length ? 1 : 0 }}>
                        {error}
                    </Typography>
                    {result?.errors && result.errors.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
                                Détails des erreurs:
                            </Typography>
                            {result.errors.map((err, index) => (
                                <Typography 
                                    key={index}
                                    variant="caption" 
                                    sx={{ display: "block", ml: 1, mb: 0.5 }}
                                >
                                    • [{err.index}] {err.title}: {err.error}
                                </Typography>
                            ))}
                        </Box>
                    )}
                </Alert>
            )}
        </Box>
    );
};

export default ImportData;
