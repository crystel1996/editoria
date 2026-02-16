import DashboardPage from "@pages/dashboard";
import { DASHBOARD_PATH, HOME_PATH } from "@services/path/dashboard";
import type { IRoute } from "@types/routes.interface";

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