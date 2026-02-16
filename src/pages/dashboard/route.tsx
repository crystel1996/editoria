import DashboardPage from "@pages/dashboard";
import type { IRoute } from "@types/routes.interface";

const DASHBOARD_PATH = () => "/dashboard";
const HOME_PATH = () => "/";

const DashboardRoutes: IRoute[] = [
    {
        path: HOME_PATH(),
        element:<DashboardPage />
    },
    {
        path: DASHBOARD_PATH(),
        element:<DashboardPage />
        
    }
];

export default DashboardRoutes;