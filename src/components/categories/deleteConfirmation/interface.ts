export interface IDeleteConfirmationProps {
    open: boolean;
    categoryId: number | string;
    categoryName: string;
    onConfirm: (categoryId: number | string) => void;
    onCancel: () => void;
}