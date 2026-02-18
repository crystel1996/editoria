import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Article, CheckCircle, Drafts, Inventory } from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import CustomCard from "@components/common/card";
import { useArticles } from "@context/index";
import { ArticleStatusEnum } from "@interfaces/article.interface";

interface StatCard {
    label: string;
    value: number;
    icon: SvgIconComponent;
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

const Stats = () => {
    const { articles, loading } = useArticles();
    const [stats, setStats] = useState<StatCard[]>([]);

    useEffect(() => {
        if (articles.length > 0) {
            const totalArticles = articles.length;
            const published = articles.filter(a => a.status.toLowerCase() === ArticleStatusEnum.PUBLISHED.toLowerCase()).length;
            const draft = articles.filter(a => a.status.toLowerCase() === ArticleStatusEnum.DRAFT.toLowerCase()).length;
            const archived = articles.filter(a => a.status.toLowerCase() === ArticleStatusEnum.ARCHIVED.toLowerCase()).length;

            setStats([
                { label: "Total articles", value: totalArticles, icon: Article, color: 'primary' },
                { label: "Publiés", value: published, icon: CheckCircle, color: 'success' },
                { label: "Brouillons", value: draft, icon: Drafts, color: 'warning' },
                { label: "Archives", value: archived, icon: Inventory },
            ]);
        }
    }, [articles]);

    if (loading) {
        return (
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" } }}>
                {[1, 2, 3, 4].map((i) => (
                    <CustomCard
                        key={i}
                        cardContent={{
                            attribute: {},
                            children: <CircularProgress size={40} />,
                        }}
                    />
                ))}
            </Box>
        );
    }

    return (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" } }}>
            {stats.map((stat) => (
                <CustomCard
                    key={stat.label}
                    cardContent={{
                        attribute: {},
                        children: (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        backgroundColor: "#F3F4F6",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <stat.icon fontSize="small" color={stat.color as any} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                    }}
                />
            ))}
        </Box>
    );
};

export default Stats;
