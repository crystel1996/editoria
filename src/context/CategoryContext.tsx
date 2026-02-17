import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { categoryService } from '@services/api';
import type { ICategory } from '@interfaces/category.interface';
import type { CreateCategoryDTO, UpdateCategoryDTO } from '@services/api/category.service';

interface CategoryContextType {
    categories: ICategory[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    getCategoryById: (id: string) => ICategory | undefined;
    createCategory: (data: CreateCategoryDTO) => Promise<ICategory>;
    updateCategory: (id: string, data: UpdateCategoryDTO) => Promise<ICategory>;
    deleteCategory: (id: string) => Promise<void>;
    refreshCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
    children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Erreur lors du chargement des catégories');
            console.error('Error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryById = (id: string): ICategory | undefined => {
        return categories.find((cat) => cat.id === id);
    };

    const createCategory = async (data: CreateCategoryDTO): Promise<ICategory> => {
        try {
            setError(null);
            const newCategory = await categoryService.create(data);
            setCategories((prev) => [...prev, newCategory]);
            return newCategory;
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de la création de la catégorie';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const updateCategory = async (id: string, data: UpdateCategoryDTO): Promise<ICategory> => {
        try {
            setError(null);
            const updatedCategory = await categoryService.update(id, data);
            setCategories((prev) =>
                prev.map((cat) => (cat.id === id ? updatedCategory : cat))
            );
            return updatedCategory;
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de la modification de la catégorie';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const deleteCategory = async (id: string): Promise<void> => {
        try {
            setError(null);
            await categoryService.delete(id);
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de la suppression de la catégorie';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const refreshCategories = async () => {
        await fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const value: CategoryContextType = {
        categories,
        loading,
        error,
        fetchCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
        refreshCategories,
    };

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = (): CategoryContextType => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoryProvider');
    }
    return context;
};

export default CategoryContext;
