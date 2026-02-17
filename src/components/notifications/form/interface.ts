import type { IArticle } from "@interfaces/article.interface";

export interface INotificationFormValues {
    articleId: string;
    recipients: string;
    subject: string;
}

export interface INotificationFormProps {
    onSubmit: (articleId: string, recipients: string[], subject: string) => void | Promise<void>;
    articles?: IArticle[];
    isLoading?: boolean;
}
