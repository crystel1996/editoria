import { Box } from "@mui/material";
import Title from "@components/common/title";
import Stats from "@components/dashboard/stats";
import Graph from "@components/dashboard/graph";
import RecentArticle from "@components/dashboard/recentArticle";
import RecentNotification from "@components/dashboard/recentNotification";
import style from "./style";

const DashboardPage = () => {
    return (
        <Box sx={style}>
            <Box className="header">
                <Title variant="h3">Dashboard</Title>
            </Box>

            <Stats />

            <Graph />

            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" } }}>
                <RecentArticle />
                <RecentNotification />
            </Box>
        </Box>
    );
};

export default DashboardPage;