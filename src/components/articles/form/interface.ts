import type { ArticleStatusEnum } from "@interfaces/article.interface";

export interface IArticleFormProps {
    open: boolean;
    loading: boolean;
    article?: IArticleFormInput;
    onSubmit: (input: IArticleFormInput) => void;
    onCancel: () => void;
}

export interface IArticleFormInput {
    id?: string | number;
    title: string;
    excerpt: string;
    author: string;
    content: string;
    categories: string[];
    network: string;
    status: ArticleStatusEnum;
    featured: boolean;
}