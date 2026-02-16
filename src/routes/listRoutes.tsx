import ArticleRoutes from "@pages/articles/route";
import DashboardRoutes from "@pages/dashboard/route";
import type { IRoute } from "@types/routes.interface";

const ListRoutes: IRoute[] = [
    ...ArticleRoutes,
    ...DashboardRoutes
];

export default ListRoutes;