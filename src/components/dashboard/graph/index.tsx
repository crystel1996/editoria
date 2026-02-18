import { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import CustomCard from "@components/common/card";
import { useArticles } from "@context/index";
import { useCategories } from "@context/index";

interface NetworkData {
    network: string;
    value: number;
}

interface CategoryData {
    id: number;
    value: number;
    label: string;
    color: string;
}

const Graph = () => {
    const { articles, loading: articlesLoading, error: articlesError } = useArticles();
    const { categories } = useCategories();
    
    const [networkData, setNetworkData] = useState<NetworkData[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

    useEffect(() => {
        // Calculate network data
        const networkMap = new Map<string, number>();
        articles.forEach(article => {
            const networkName = article.networkName || `Network ${article.network}`;
            networkMap.set(networkName, (networkMap.get(networkName) || 0) + 1);
        });

        const networks = Array.from(networkMap.entries())
            .map(([network, value]) => ({ network, value }))
            .sort((a, b) => b.value - a.value);
        setNetworkData(networks);
    }, [articles]);

    useEffect(() => {
        // Calculate category data
        const categoryMap = new Map<string, { count: number; color: string }>();
        articles.forEach(article => {
            article.categories.forEach(categoryId => {
                const category = categories.find(c => c.id === categoryId);
                if (category) {
                    const existing = categoryMap.get(String(category.id)) || { count: 0, color: category.color };
                    categoryMap.set(String(category.id), {
                        count: existing.count + 1,
                        color: category.color,
                    });
                }
            });
        });

        const catData = Array.from(categoryMap.entries())
            .map(([categoryId, { count, color }], index) => {
                const category = categories.find(c => c.id === categoryId);
                return {
                    id: index,
                    value: count,
                    label: category?.name || `Category ${categoryId}`,
                    color: color || '#3B82F6', // Default color fallback
                };
            })
            .sort((a, b) => b.value - a.value);
        setCategoryData(catData);
    }, [articles, categories]);

    if (articlesError) {
        return (
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" } }}>
                <Alert severity="error">{articlesError}</Alert>
            </Box>
        );
    }

    if (articlesLoading) {
        return (
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" } }}>
                <CustomCard
                    cardHeaderProps={{ title: "Répartition par réseau" }}
                    cardContent={{
                        attribute: {},
                        children: <CircularProgress />,
                    }}
                />
                <CustomCard
                    cardHeaderProps={{ title: "Répartition par catégorie" }}
                    cardContent={{
                        attribute: {},
                        children: <CircularProgress />,
                    }}
                />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" } }}>
            <CustomCard
                cardHeaderProps={{ title: "Répartition par réseau" }}
                cardContent={{
                    attribute: {},
                    children: (
                        <Box sx={{ width: "100%", height: 300 }}>
                            {networkData.length > 0 ? (
                                <BarChart
                                    xAxis={[
                                        {
                                            scaleType: "band",
                                            data: networkData.map((item) => item.network),
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: networkData.map((item) => item.value),
                                            color: "#1E293B",
                                        },
                                    ]}
                                    height={300}
                                    margin={{ bottom: 50 }}
                                />
                            ) : (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                                    Aucune donnée disponible
                                </Box>
                            )}
                        </Box>
                    ),
                }}
            />

            <CustomCard
                cardHeaderProps={{ title: "Répartition par catégorie" }}
                cardContent={{
                    attribute: {},
                    children: (
                        <Box sx={{ width: "100%", height: 300 }}>
                            {categoryData.length > 0 ? (
                                <PieChart
                                    series={[
                                        {
                                            data: categoryData,
                                            highlightScope: { fade: "global", highlight: "item" },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                                            arcLabel: (item) => `(${item.value})`,
                                        },
                                    ]}
                                    height={300}
                                />
                            ) : (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                                    Aucune donnée disponible
                                </Box>
                            )}
                        </Box>
                    ),
                }}
            />
        </Box>
    );
};

export default Graph;
