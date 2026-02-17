import { Box, CircularProgress, Alert } from "@mui/material";
import { Add } from "@mui/icons-material";
import style from "./style";
import Title from "@components/common/title";
import CustomButton from "@components/common/button";
import { useState, useCallback } from "react";
import ArticleFilter from "@components/articles/filter";
import ArticleList from "@components/articles/list";
import ArticleForm from "@components/articles/form";
import type { IArticleFormInput } from "@components/articles/form/interface";
import DeleteConfirmation from "@components/articles/deleteConfirmation";
import { useArticles } from "@context/ArticleContext";
import { useCategories } from "@context/CategoryContext";
import type { ArticleFilters } from "@services/api/article.service";

const ArticlePage = () =>{
    const { articles, loading, error, createArticle, updateArticle, deleteArticle, updateArticleStatus, getArticleById, fetchArticles } = useArticles();
    const { categories } = useCategories();

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | number | null>(null);
    const [formLoading, setFormLoading] = useState<boolean>(false);

    const handleFilterChange = useCallback(async (filters: ArticleFilters) => {
        try {
            await fetchArticles(filters);
        } catch (error) {
            console.error('Error fetching articles with filters:', error);
        }
    }, [fetchArticles]);

    const handleOpenForm = (id?: string | number) => {
        if (id) {
            setSelectedId(String(id));
        } else {
            setSelectedId(null);
        }
        setOpenForm(true);
    };

    const handleCancelForm = () => {
        setSelectedId(null);
        setOpenForm(false);
    };

    const handleSubmitForm = async (data: IArticleFormInput) => {
        try {
            setFormLoading(true);
            // Convert status enum to lowercase for API
            const statusValue = data.status.toLowerCase() as 'draft' | 'published' | 'archived';
            
            if (selectedId) {
                // Update existing article
                await updateArticle(String(selectedId), {
                    title: data.title,
                    content: data.content,
                    excerpt: data.excerpt,
                    author: data.author,
                    categories: data.categories,
                    network: data.network,
                    status: statusValue,
                    featured: data.featured,
                });
            } else {
                // Create new article
                await createArticle({
                    title: data.title,
                    content: data.content,
                    excerpt: data.excerpt,
                    author: data.author,
                    categories: data.categories,
                    network: data.network,
                    status: statusValue,
                    featured: data.featured,
                });
            }
            setOpenForm(false);
            setSelectedId(null);
        } catch (error) {
            console.error('Error saving article:', error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleOpenConfirmDelete = (id: string | number) => {
        setSelectedId(String(id));
        setOpenConfirmDelete(true);
    };

    const handleConfirmDelete = async (id: string | number) => {
        try {
            await deleteArticle(String(id));
            setOpenConfirmDelete(false);
            setSelectedId(null);
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const handleCancelDelete = () => {
        setSelectedId(null);
        setOpenConfirmDelete(false);
    };

    const handleToggleFeature = async (id: string | number) => {
        try {
            const article = getArticleById(String(id));
            if (article) {
                await updateArticle(String(id), { featured: !article.featured });
            }
        } catch (error) {
            console.error('Error toggling feature:', error);
        }
    };

    const handleArchive = async (id: string | number) => {
        try {
            await updateArticleStatus(String(id), 'archived');
        } catch (error) {
            console.error('Error archiving article:', error);
        }
    };

    const selectedArticle = selectedId ? getArticleById(String(selectedId)) : undefined;

    return <Box sx={style}>
        <Box className="header">
            <Title variant="h3">Articles</Title>
            <CustomButton 
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenForm()}
            >
                Nouveau article
            </CustomButton>
        </Box>        
        <Box>
            <ArticleFilter onFilterChange={handleFilterChange} />
        </Box>
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {!loading && !error && (
                <ArticleList 
                    items={articles}
                    categories={categories}
                    onArchive={handleArchive}
                    onDelete={handleOpenConfirmDelete}
                    onEdit={handleOpenForm}
                    onFeature={handleToggleFeature}
                />
            )}
        </Box>
        {openForm && (
            <ArticleForm 
                open={openForm}
                loading={formLoading}
                onSubmit={handleSubmitForm}
                onCancel={handleCancelForm}
                article={selectedArticle}
            />
        )}
        {selectedId && openConfirmDelete && (
            <DeleteConfirmation 
                open={openConfirmDelete}
                articleId={String(selectedId)}
                articleTitle={selectedArticle?.title || ""}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        )}
    </Box>
}

export default ArticlePage;