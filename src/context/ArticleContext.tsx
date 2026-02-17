import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { articleService } from '@services/api';
import type { IArticle } from '@interfaces/article.interface';
import { ArticleStatusEnum } from '@interfaces/article.interface';
import type { CreateArticleDTO, UpdateArticleDTO, ArticleFilters } from '@services/api/article.service';

interface ArticleContextType {
    articles: IArticle[];
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    fetchArticles: (filters?: ArticleFilters) => Promise<void>;
    getArticleById: (id: string) => IArticle | undefined;
    createArticle: (data: CreateArticleDTO) => Promise<IArticle>;
    updateArticle: (id: string, data: UpdateArticleDTO) => Promise<IArticle>;
    deleteArticle: (id: string) => Promise<void>;
    updateArticleStatus: (id: string, status: 'draft' | 'published' | 'archived') => Promise<IArticle>;
    updateMultipleArticlesStatus: (ids: (string | number)[], status: 'draft' | 'published' | 'archived') => Promise<void>;
    refreshArticles: (filters?: ArticleFilters) => Promise<void>;
    setPage: (page: number) => void;
    currentFilters: ArticleFilters | null;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

interface ArticleProviderProps {
    children: ReactNode;
}

export const ArticleProvider = ({ children }: ArticleProviderProps) => {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });
    const [currentFilters, setCurrentFilters] = useState<ArticleFilters | null>(null);

    const fetchArticles = async (filters?: ArticleFilters) => {
        try {
            setLoading(true);
            setError(null);
            // Add limit to filters if not specified
            const filtersWithLimit = {
                ...filters,
                limit: filters?.limit || 20,
                page: filters?.page || 1,
            };
            setCurrentFilters(filters || null);
            const response = await articleService.getAll(filtersWithLimit);
            setArticles(response.data);
            setPagination(response.pagination);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Erreur lors du chargement des articles');
            console.error('Error fetching articles:', err);
        } finally {
            setLoading(false);
        }
    };

    const setPage = async (page: number) => {
        const filtersWithPage = {
            ...currentFilters,
            page,
            limit: 20,
        };
        await fetchArticles(filtersWithPage);
    };

    const getArticleById = (id: string): IArticle | undefined => {
        return articles.find((article) => article.id === id);
    };

    const createArticle = async (data: CreateArticleDTO): Promise<IArticle> => {
        try {
            setError(null);
            const newArticle = await articleService.create(data);
            setArticles((prev) => [...prev, newArticle]);
            return newArticle;
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de la création de l\'article';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const updateArticle = async (id: string, data: UpdateArticleDTO): Promise<IArticle> => {
        try {
            setError(null);
            const updatedArticle = await articleService.update(id, data);
            setArticles((prev) =>
                prev.map((article) => (article.id === id ? updatedArticle : article))
            );
            return updatedArticle;
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de la modification de l\'article';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const deleteArticle = async (id: string): Promise<void> => {
        try {
            setError(null);
            await articleService.delete(id);
            setArticles((prev) => prev.filter((article) => article.id !== id));
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de la suppression de l\'article';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const updateArticleStatus = async (id: string, status: 'draft' | 'published' | 'archived'): Promise<IArticle> => {
        try {
            setError(null);
            const updatedArticle = await articleService.updateStatus(id, status);
            setArticles((prev) =>
                prev.map((article) => (article.id === id ? updatedArticle : article))
            );
            return updatedArticle;
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de la mise à jour du statut';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const updateMultipleArticlesStatus = async (ids: (string | number)[], status: 'draft' | 'published' | 'archived'): Promise<void> => {
        try {
            setError(null);
            await articleService.updateStatusMultiple(ids, status);
            
            // Map lowercase status to ArticleStatusEnum
            const statusMap: { [key: string]: ArticleStatusEnum } = {
                'draft': ArticleStatusEnum.DRAFT,
                'published': ArticleStatusEnum.PUBLISHED,
                'archived': ArticleStatusEnum.ARCHIVED,
            };
            
            const enumStatus = statusMap[status];
            
            // Update the articles in local state
            setArticles((prev) =>
                prev.map((article) => 
                    ids.includes(article.id) ? { ...article, status: enumStatus } : article
                )
            );
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de la mise à jour du statut';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const refreshArticles = async (filters?: ArticleFilters) => {
        await fetchArticles(filters);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const value: ArticleContextType = {
        articles,
        loading,
        error,
        pagination,
        fetchArticles,
        getArticleById,
        createArticle,
        updateArticle,
        deleteArticle,
        updateArticleStatus,
        updateMultipleArticlesStatus,
        refreshArticles,
        setPage,
        currentFilters,
    };

    return (
        <ArticleContext.Provider value={value}>
            {children}
        </ArticleContext.Provider>
    );
};

export const useArticles = (): ArticleContextType => {
    const context = useContext(ArticleContext);
    if (context === undefined) {
        throw new Error('useArticles must be used within an ArticleProvider');
    }
    return context;
};

export default ArticleContext;
