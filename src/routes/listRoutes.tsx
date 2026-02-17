import ArticleRoutes from "@pages/articles/route";
import CategorieRoutes from "@pages/categories/route";
import DashboardRoutes from "@pages/dashboard/route";
import type { IRoute } from "@interfaces/routes.interface";
import NotificationRoutes from "@pages/notifications/route";

const ListRoutes: IRoute[] = [
    ...ArticleRoutes,
    ...DashboardRoutes,
    ...CategorieRoutes,
    ...NotificationRoutes
];

export default ListRoutes;