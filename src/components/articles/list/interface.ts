import type { IArticle } from "@interfaces/article.interface";

export interface IArticleListProps extends IArticleActions {
    items: IArticle[];
}

export interface IArticleActions {
    onEdit: (articleId: string | number) => void;
    onFeature: (articleId: string | number) => void;
    onArchive: (articleId: string | number) => void;
    onDelete: (articleId: string | number) => void;
}