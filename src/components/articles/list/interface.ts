import type { IArticle } from "@interfaces/article.interface";
import type { ICategory } from "@interfaces/category.interface";

export interface IArticleListProps extends IArticleActions {
    items: IArticle[];
    categories?: ICategory[];
}

export interface IArticleActions {
    onEdit: (articleId: string | number) => void;
    onFeature: (articleId: string | number) => void;
    onArchive: (articleId: string | number) => void;
    onDelete: (articleId: string | number) => void;
}