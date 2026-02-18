import { useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import CustomCard from "@components/common/card";
import { useArticles } from "@context/index";
import { ArticleStatusEnum } from "@interfaces/article.interface";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const RecentArticle = () => {
    const { articles, loading, error, fetchArticles } = useArticles();

    useEffect(() => {
        fetchArticles({ status: 'published', limit: 10 });
    }, []);

    // Get the 4 most recent articles
    const recentArticles = articles
        .filter(a => a.status.toLowerCase() === ArticleStatusEnum.PUBLISHED.toLowerCase())
        .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
        .slice(0, 4);

    if (loading) {
        return (
            <CustomCard
                cardHeaderProps={{ title: "Derniers articles publiés" }}
                cardContent={{
                    attribute: {},
                    children: <CircularProgress />,
                }}
            />
        );
    }

    if (error) {
        return (
            <CustomCard
                cardHeaderProps={{ title: "Derniers articles publiés" }}
                cardContent={{
                    attribute: {},
                    children: <Alert severity="error">{error}</Alert>,
                }}
            />
        );
    }

    if (recentArticles.length === 0) {
        return (
            <CustomCard
                cardHeaderProps={{ title: "Derniers articles publiés" }}
                cardContent={{
                    attribute: {},
                    children: (
                        <Typography variant="body2" color="text.secondary">
                            Aucun article publié pour le moment
                        </Typography>
                    ),
                }}
            />
        );
    }

    return (
        <CustomCard
            cardHeaderProps={{ title: "Derniers articles publiés" }}
            cardContent={{
                attribute: {},
                children: (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {recentArticles.map((article) => (
                            <Box
                                key={article.id}
                                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}
                            >
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {article.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {article.author}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                                    {format(new Date(article.publishedAt || article.createdAt), 'd MMM', { locale: fr })}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                ),
            }}
        />
    );
};

export default RecentArticle;
