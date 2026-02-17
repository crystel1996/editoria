import CustomButton from "@components/common/button";
import Title from "@components/common/title";
import { Add } from "@mui/icons-material";
import { Box, CircularProgress, Alert } from "@mui/material";
import style from "./style";
import CategoryList from "@components/categories/list";
import { useState } from "react";
import DeleteConfirmation from "@components/categories/deleteConfirmation";
import CategoryForm from "@components/categories/form";
import type { ICategoryFormInput } from "@components/categories/form/interface";
import { useCategories } from "@context/CategoryContext";

const CategoriePage = () => {
    const { categories, loading, error, createCategory, updateCategory, deleteCategory, getCategoryById } = useCategories();

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [formLoading, setFormLoading] = useState<boolean>(false);

    const handleOpenForm = (id?: string | number) => {
        if (id) {
            setSelectedCategoryId(String(id));
        } else {
            setSelectedCategoryId(null);
        }
        setOpenForm(true);
    };

    const handleSaveForm = async (data: ICategoryFormInput) => {
        try {
            setFormLoading(true);
            if (selectedCategoryId) {
                // Update existing category
                await updateCategory(selectedCategoryId, {
                    name: data.name,
                    description: data.description,
                    color: data.color,
                });
            } else {
                // Create new category
                await createCategory({
                    name: data.name,
                    description: data.description,
                    color: data.color,
                });
            }
            setOpenForm(false);
            setSelectedCategoryId(null);
        } catch (error) {
            console.error('Error saving category:', error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleCancelForm = () => {
        setOpenForm(false);
        setSelectedCategoryId(null);
    };

    const handleOpenConfirmDelete = (id: string | number) => {
        setSelectedCategoryId(String(id));
        setOpenConfirmDelete(true);
    };

    const handleConfirmDelete = async (id: string | number) => {
        try {
            await deleteCategory(String(id));
            setOpenConfirmDelete(false);
            setSelectedCategoryId(null);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleCancelDelete = () => {
        setOpenConfirmDelete(false);
        setSelectedCategoryId(null);
    };

    const selectedCategory = selectedCategoryId ? getCategoryById(selectedCategoryId) : undefined;

    return <Box sx={style}>
        <Box className="header">
            <Title variant="h3">Catégories</Title>
            <CustomButton 
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenForm()}
            >
                Nouvelle catégorie
            </CustomButton>
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
                <CategoryList 
                    items={categories}
                    onEdit={(id: string | number) => handleOpenForm(id)}
                    onDelete={handleOpenConfirmDelete}
                />
            )}
        </Box>
        {openForm && (
            <CategoryForm 
                open={openForm}
                onSubmit={handleSaveForm}
                onCancel={handleCancelForm}
                loading={formLoading}
                category={selectedCategory}
            />
        )}
        {selectedCategoryId && openConfirmDelete && (
            <DeleteConfirmation 
                open={openConfirmDelete}
                categoryId={selectedCategoryId}
                categoryName={selectedCategory?.name || ""}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        )}
    </Box>
}

export default CategoriePage;