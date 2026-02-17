import type { ICategoryCardProps } from "@components/categories/card/interface";
import type { ICategory } from "@interfaces/category.interface";

export interface ICategoryListProps extends Omit<ICategoryCardProps, "item"> {
    items: ICategory[];
}