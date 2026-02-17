import type { ICategoryCardProps } from "@components/categories/card/interface";
import type { ICategory } from "@types/category.interface";

export interface ICategoryListProps extends Omit<ICategoryCardProps, "item"> {
    items: ICategory[];
}