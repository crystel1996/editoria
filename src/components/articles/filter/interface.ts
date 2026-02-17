export interface IArticleFilterProps {}

export interface IArticleFilterState {
    search: string;
    categories: string[];
    status: string;
    featured: boolean;
}