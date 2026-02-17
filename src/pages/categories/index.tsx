import CustomButton from "@components/common/button";
import Title from "@components/common/title";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";
import style from "./style";
import CategoryList from "@components/categories/list";
import { useState } from "react";
import DeleteConfirmation from "@components/categories/deleteConfirmation";
import CategoryForm from "@components/categories/form";
import type { ICategoryFormInput } from "@components/categories/form/interface";

const LIST = [
    {
        id: "1",
        name: "Catégorie 1",
        description: "Description de la catégorie 1",
        slug: "categorie-1",
        color: "#ff5722",
        articlesCount: 5
    },
    {
        id: "2",
        name: "Catégorie 2",
        description: "Description de la catégorie 2",
        slug: "categorie-2",
        color: "#4caf50",
        articlesCount: 3
    },
    {
        id: "2",
        name: "Catégorie 2",
        description: "Description de la catégorie 2",
        slug: "categorie-2",
        color: "#4caf50",
        articlesCount: 3
    },
    {
        id: "2",
        name: "Catégorie 2",
        description: "Description de la catégorie 2",
        slug: "categorie-2",
        color: "#4caf50",
        articlesCount: 3
    },
    {
        id: "2",
        name: "Catégorie 2",
        description: "Description de la catégorie 2",
        slug: "categorie-2",
        color: "#4caf50",
        articlesCount: 3
    },
    {
        id: "2",
        name: "Catégorie 2",
        description: "Description de la catégorie 2",
        slug: "categorie-2",
        color: "#4caf50",
        articlesCount: 3
    },
    {
        id: "2",
        name: "Catégorie 2",
        description: "Description de la catégorie 2",
        slug: "categorie-2",
        color: "#4caf50",
        articlesCount: 3
    }
];

const CategoriePage = () => {

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | number | null>(null);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

    const handleOpenForm = (id?: string | number) => {
        id && setSelectedCategoryId(id);
        !id && setSelectedCategoryId(null);
        setOpenForm(true);
    };

    const handleSaveForm = (data: ICategoryFormInput) => {
        // Handle form submission logic here
        setOpenForm(false);
    };

    const handleCancelForm = () => {
        setOpenForm(false);
    };

    const handleOpenConfirmDelete = (id: string | number) => {
        setSelectedCategoryId(id);
        setOpenConfirmDelete(true);
    };

    const handleConfirmDelete = (id: string | number) => {
        // Handle delete logic here
        setOpenConfirmDelete(false);
    };

    const handleCancelDelete = () => {
        setOpenConfirmDelete(false);
    };

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
            <CategoryList 
                items={LIST}
                onEdit={(id: string | number) => handleOpenForm(id)}
                onDelete={handleOpenConfirmDelete}
            />
        </Box>
        {openForm && (
            <CategoryForm 
                open={openForm}
                onSubmit={handleSaveForm}
                onCancel={handleCancelForm}
                loading={false}
                category={selectedCategoryId ? LIST.find(item => item.id === selectedCategoryId) : undefined}
            />
        )}
        {selectedCategoryId && openConfirmDelete && (
            <DeleteConfirmation 
                open={openConfirmDelete}
                categoryId={selectedCategoryId}
                categoryName={selectedCategoryId ? LIST.find(item => item.id === selectedCategoryId)?.name! : ""}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        )}
    </Box>
}

export default CategoriePage;