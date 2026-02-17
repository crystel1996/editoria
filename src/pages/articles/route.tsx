import ArticlePage from "@pages/articles";
import { ARTICLE_PATH } from "@services/path/article";
import type { IRoute } from "@interfaces/routes.interface";

const ArticleRoutes: IRoute[] = [
    {
        path: ARTICLE_PATH(),
        element:<ArticlePage />
        
    }
];

export default ArticleRoutes;