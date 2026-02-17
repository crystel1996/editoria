import ArticleRoutes from "@pages/articles/route";
import CategorieRoutes from "@pages/categories/route";
import DashboardRoutes from "@pages/dashboard/route";
import type { IRoute } from "@interfaces/routes.interface";

const ListRoutes: IRoute[] = [
    ...ArticleRoutes,
    ...DashboardRoutes,
    ...CategorieRoutes
];

export default ListRoutes;