import type { ArticleStatusEnum } from "@types/article.interface";

export interface IMultipleSelectionProps {
    selectedCount: number;
    onChangeStatus: (status: ArticleStatusEnum) => void;
    onClearSelection: () => void;
}