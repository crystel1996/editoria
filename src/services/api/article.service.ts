import apiClient from './client';
import type { IArticle } from '@interfaces/article.interface';

export interface ArticleFilters {
    status?: 'draft' | 'published' | 'archived';
    network?: string;
    category?: string;
    featured?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface CreateArticleDTO {
    title: string;
    content: string;
    excerpt: string;
    author: string;
    categories: string[];
    network: string;
    status?: 'draft' | 'published' | 'archived';
    featured?: boolean;
}

export interface UpdateArticleDTO {
    title?: string;
    content?: string;
    excerpt?: string;
    author?: string;
    categories?: string[];
    network?: string;
    status?: 'draft' | 'published' | 'archived';
    featured?: boolean;
}

export const articleService = {
    async getAll(filters?: ArticleFilters): Promise<PaginatedResponse<IArticle>> {
        const response = await apiClient.get('/articles', { params: filters });
        return response.data;
    },

    async getById(id: string): Promise<IArticle> {
        const response = await apiClient.get(`/articles/${id}`);
        return response.data;
    },

    async create(data: CreateArticleDTO): Promise<IArticle> {
        const response = await apiClient.post('/articles', data);
        return response.data;
    },

    async update(id: string, data: UpdateArticleDTO): Promise<IArticle> {
        const response = await apiClient.put(`/articles/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/articles/${id}`);
    },

    async updateStatus(id: string, status: 'draft' | 'published' | 'archived'): Promise<IArticle> {
        const response = await apiClient.patch(`/articles/${id}/status`, { status });
        return response.data;
    },

    async sendNotification(id: string, recipients: string[]): Promise<any> {
        const response = await apiClient.post(`/articles/${id}/notify`, { recipients });
        return response.data;
    },
};

export default articleService;
