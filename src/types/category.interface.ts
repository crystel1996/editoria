export interface ICategory {
    id: string | number;
    name: string;
    slug: string;
    description: string;
    color: string;
    articlesCount?: number;
}