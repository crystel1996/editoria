import { Box, Typography } from "@mui/material";
import { Article, CheckCircle, Drafts, Inventory } from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import CustomCard from "@components/common/card";

interface StatCard {
    label: string;
    value: number;
    icon: SvgIconComponent;
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

const STAT_CARDS: StatCard[] = [
    { label: "Total articles", value: 10, icon: Article, color: 'primary' },
    { label: "Publiés", value: 4, icon: CheckCircle, color: 'success' },
    { label: "Brouillons", value: 5, icon: Drafts, color: 'warning' },
    { label: "Archives", value: 1, icon: Inventory },
];

const Stats = () => {
    return (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" } }}>
            {STAT_CARDS.map((stat) => (
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
