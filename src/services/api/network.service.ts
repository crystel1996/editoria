import apiClient from './client';

export interface INetwork {
    id: string;
    name: string;
    description: string;
}

export interface CreateNetworkDTO {
    name: string;
    description: string;
}

export interface UpdateNetworkDTO {
    name?: string;
    description?: string;
}

export const networkService = {
    async getAll(): Promise<INetwork[]> {
        const response = await apiClient.get('/networks');
        return response.data;
    },

    async getById(id: string): Promise<INetwork> {
        const response = await apiClient.get(`/networks/${id}`);
        return response.data;
    },

    async create(data: CreateNetworkDTO): Promise<INetwork> {
        const response = await apiClient.post('/networks', data);
        return response.data;
    },

    async update(id: string, data: UpdateNetworkDTO): Promise<INetwork> {
        const response = await apiClient.put(`/networks/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/networks/${id}`);
    },
};

export default networkService;
