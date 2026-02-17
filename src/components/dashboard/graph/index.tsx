import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import CustomCard from "@components/common/card";

const NETWORK_DATA = [
    { network: "Réseau Principal", value: 4 },
    { network: "Réseau Partenaires", value: 2 },
    { network: "Réseau Interne", value: 1 },
];

const CATEGORY_DATA = [
    { id: 0, value: 2, label: "Business", color: "#FF9800" },
    { id: 1, value: 2, label: "Technologie", color: "#2196F3" },
    { id: 2, value: 2, label: "Science", color: "#009688" },
    { id: 3, value: 1, label: "Culture", color: "#9C27B0" },
    { id: 4, value: 1, label: "Politique", color: "#F44336" },
    { id: 5, value: 1, label: "Sport", color: "#00BCD4" },
];

const Graph = () => {
    return (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" } }}>
            <CustomCard
                cardHeaderProps={{ title: "Répartition par réseau" }}
                cardContent={{
                    attribute: {},
                    children: (
                        <Box sx={{ width: "100%", height: 300 }}>
                            <BarChart
                                xAxis={[
                                    {
                                        scaleType: "band",
                                        data: NETWORK_DATA.map((item) => item.network),
                                    },
                                ]}
                                series={[
                                    {
                                        data: NETWORK_DATA.map((item) => item.value),
                                        color: "#1E293B",
                                    },
                                ]}
                                height={300}
                            />
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
                            <PieChart
                                series={[
                                    {
                                        data: CATEGORY_DATA,
                                        highlightScope: { fade: "global", highlight: "item" },
                                        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                                        arcLabel: (item) => `(${item.value})`,
                                    },
                                ]}
                                height={300}
                            />
                        </Box>
                    ),
                }}
            />
        </Box>
    );
};

export default Graph;
