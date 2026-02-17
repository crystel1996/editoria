import apiClient from './client';
import type { ICategory } from '@interfaces/category.interface';

export interface CreateCategoryDTO {
    name: string;
    description: string;
    color: string;
}

export interface UpdateCategoryDTO {
    name?: string;
    description?: string;
    color?: string;
}

export const categoryService = {
    async getAll(): Promise<ICategory[]> {
        const response = await apiClient.get('/categories');
        return response.data;
    },

    async getById(id: string): Promise<ICategory> {
        const response = await apiClient.get(`/categories/${id}`);
        return response.data;
    },

    async create(data: CreateCategoryDTO): Promise<ICategory> {
        const response = await apiClient.post('/categories', data);
        return response.data;
    },

    async update(id: string, data: UpdateCategoryDTO): Promise<ICategory> {
        const response = await apiClient.put(`/categories/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/categories/${id}`);
    },
};

export default categoryService;
