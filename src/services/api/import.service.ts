import apiClient from './client';

export interface ImportArticleData {
    title: string;
    content: string;
    excerpt: string;
    author: string;
    categories?: string[]; // Peut être des noms de catégories
    category?: string; // Support du singular
    network: string; // Nom du réseau
    status?: 'draft' | 'published' | 'archived';
    featured?: boolean;
}

export interface ImportResult {
    success: number;
    errors: Array<{
        index: number;
        title: string;
        error: string;
    }>;
}

export const importService = {
    async importArticles(articles: ImportArticleData[]): Promise<ImportResult> {
        const response = await apiClient.post('/import/articles', articles);
        return response.data;
    },
};

export default importService;
