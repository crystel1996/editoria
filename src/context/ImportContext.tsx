import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { importService } from '@services/api';
import type { ImportArticleData, ImportResult } from '@services/api/import.service';

interface ImportContextType {
    loading: boolean;
    error: string | null;
    success: boolean;
    result: ImportResult | null;
    importArticles: (articles: ImportArticleData[]) => Promise<void>;
    resetStatus: () => void;
}

const ImportContext = createContext<ImportContextType | undefined>(undefined);

interface ImportProviderProps {
    children: ReactNode;
}

export const ImportProvider = ({ children }: ImportProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [result, setResult] = useState<ImportResult | null>(null);

    const importArticles = async (articles: ImportArticleData[]) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            setResult(null);

            if (!Array.isArray(articles) || articles.length === 0) {
                throw new Error('Le fichier doit contenir un tableau d\'articles non vide');
            }

            const importResult = await importService.importArticles(articles);
            setResult(importResult);
            setSuccess(importResult.errors.length === 0);
            
            if (importResult.errors.length > 0) {
                const errorCount = importResult.errors.length;
                setError(`Import complété avec ${errorCount} erreur(s). ${importResult.success} article(s) importé(s) avec succès.`);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Erreur lors de l\'import des articles');
            setSuccess(false);
            console.error('Error importing articles:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetStatus = () => {
        setError(null);
        setSuccess(false);
        setResult(null);
    };

    return (
        <ImportContext.Provider value={{ loading, error, success, result, importArticles, resetStatus }}>
            {children}
        </ImportContext.Provider>
    );
};

export const useImport = () => {
    const context = useContext(ImportContext);
    if (context === undefined) {
        throw new Error('useImport doit être utilisé dans un ImportProvider');
    }
    return context;
};

export default ImportContext;
