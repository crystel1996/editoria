import apiClient from './client';

export interface INotification {
    id: string;
    articleId: string;
    recipients: string[];
    subject: string;
    sentAt: Date;
    status: 'sent' | 'failed';
}

export const notificationService = {
    async getAll(): Promise<INotification[]> {
        const response = await apiClient.get('/notifications');
        return response.data;
    },

    async getById(id: string): Promise<INotification> {
        const response = await apiClient.get(`/notifications/${id}`);
        return response.data;
    },

    async send(articleId: string, recipients: string[], subject: string): Promise<INotification> {
        const response = await apiClient.post(`/articles/${articleId}/notify`, {
            recipients,
            subject,
        });
        return response.data;
    },
};

export default notificationService;
