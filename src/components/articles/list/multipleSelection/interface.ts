import type { ArticleStatusEnum } from "@interfaces/article.interface";

export interface IMultipleSelectionProps {
    selectedCount: number;
    onChangeStatus: (status: ArticleStatusEnum) => void;
    onClearSelection: () => void;
}