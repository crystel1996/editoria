import { Box, Typography } from "@mui/material";
import CustomCard from "@components/common/card";

interface Article {
    id: number;
    title: string;
    author: string;
    date: string;
}

const LATEST_ARTICLES: Article[] = [
    { id: 1, title: "La Ligue des Champions : analyse des quarts de finale", author: "Thomas Bernard", date: "15 fevr." },
    { id: 2, title: "Le festival de Cannes 2025 : les films a ne pas manquer", author: "Pierre Moreau", date: "13 fevr." },
    { id: 3, title: "Les marches financiers en pleine mutation", author: "Jean Martin", date: "12 fevr." },
    { id: 4, title: "L'intelligence artificielle revolutionne le secteur medical", author: "Marie Dupont", date: "10 fevr." },
];

const RecentArticle = () => {
    return (
        <CustomCard
            cardHeaderProps={{ title: "Derniers articles publies" }}
            cardContent={{
                attribute: {},
                children: (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {LATEST_ARTICLES.map((article) => (
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
                                <Typography variant="caption" color="text.secondary">
                                    {article.date}
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
