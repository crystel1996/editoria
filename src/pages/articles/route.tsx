import ArticlePage from "@pages/articles";
import type { IRoute } from "@types/routes.interface";

const ARTICLE_PATH = () => "/articles";

const ArticleRoutes: IRoute[] = [
    {
        path: ARTICLE_PATH(),
        element:<ArticlePage />
        
    }
];

export default ArticleRoutes;