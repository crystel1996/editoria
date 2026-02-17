export interface IDeleteConfirmationProps {
    open: boolean;
    articleId: number | string;
    articleTitle: string;
    onConfirm: (categoryId: number | string) => void;
    onCancel: () => void;
}