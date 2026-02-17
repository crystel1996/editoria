import type { ICategory } from "@interfaces/category.interface";

export interface ICategoryCardProps {
    item: ICategory;
	articlesCount?: number;
	onEdit?: (id: ICategory["id"]) => void;
	onDelete?: (id: ICategory["id"]) => void;
}