import type { ArticleFilters } from '@services/api/article.service';

export interface IArticleFilterProps {
    onFilterChange?: (filters: ArticleFilters) => void;
}

export interface IArticleFilterState {
    search: string;
    categories: string[];
    status: string;
    featured: boolean;
}