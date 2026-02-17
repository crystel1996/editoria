import apiClient from './client';
import type { CreateArticleDTO } from './article.service';

export interface ImportResult {
    success: number;
    errors: Array<{
        index: number;
        title: string;
        error: string;
    }>;
}

export const importService = {
    async importArticles(articles: CreateArticleDTO[]): Promise<ImportResult> {
        const response = await apiClient.post('/import/articles', articles);
        return response.data;
    },
};

export default importService;
