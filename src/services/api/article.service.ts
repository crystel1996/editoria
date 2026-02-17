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

function validateArticleData(data: CreateArticleDTO | UpdateArticleDTO, isUpdate: boolean = false): void {
    const errors: string[] = [];

    // Validate title
    if (data.title !== undefined) {
        if (!data.title || data.title.trim().length < 5) {
            errors.push('Le titre doit contenir au moins 5 caractères');
        }
    } else if (!isUpdate) {
        errors.push('Le titre est obligatoire');
    }

    // Validate content
    if (data.content !== undefined) {
        if (!data.content || data.content.trim().length < 50) {
            errors.push('Le contenu doit contenir au moins 50 caractères');
        }
    } else if (!isUpdate) {
        errors.push('Le contenu est obligatoire');
    }

    // Validate categories
    if ('categories' in data) {
        if (!data.categories || data.categories.length === 0) {
            errors.push('L\'article doit avoir au moins une catégorie');
        }
    } else if (!isUpdate) {
        errors.push('Au moins une catégorie est obligatoire');
    }

    // Validate network
    if ('network' in data) {
        if (!data.network || data.network.trim().length === 0) {
            errors.push('Le réseau est obligatoire');
        }
    } else if (!isUpdate) {
        errors.push('Le réseau est obligatoire');
    }

    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
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
        validateArticleData(data);
        const response = await apiClient.post('/articles', data);
        return response.data;
    },

    async update(id: string, data: UpdateArticleDTO): Promise<IArticle> {
        validateArticleData(data, true);
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
