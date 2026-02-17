import { Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import style from "./style";
import Title from "@components/common/title";
import CustomButton from "@components/common/button";
import { useState } from "react";
import ArticleFilter from "@components/articles/filter";
import ArticleList from "@components/articles/list";
import ArticleForm from "@components/articles/form";
import type { IArticle } from "@interfaces/article.interface";
import { ArticleStatusEnum } from "@interfaces/article.interface";
import type { IArticleFormInput } from "@components/articles/form/interface";
import DeleteConfirmation from "@components/articles/deleteConfirmation";

const LIST: IArticle[] = [
        {
            id: "1",
            title: "Découverte d'une nouvelle exoplanète...",
            content: "Découverte d'une nouvelle exoplanète qui pourrait abriter la vie. Les astronomes partagent leurs observations et premières analyses.",
            excerpt: "Une nouvelle exoplanète détectée dans une zone habitable.",
            author: "Sophie Laurent",
            status: ArticleStatusEnum.DRAFT,
            network: "Réseau Partenaires",
            categories: ["Science"],
            featured: false,
            publishedAt: null,
            createdAt: new Date("2025-02-14T10:00:00Z"),
            updatedAt: new Date("2025-02-14T10:00:00Z"),
        },
        {
            id: "2",
            title: "La Ligue des Champions : analyse des...",
            content: "Analyse des matchs de la Ligue des Champions et des performances des equipes favorites.",
            excerpt: "Retour sur les grands matchs de la semaine.",
            author: "Thomas Bernard",
            status: ArticleStatusEnum.PUBLISHED,
            network: "Réseau Partenaires",
            categories: ["Sport"],
            featured: false,
            publishedAt: new Date("2025-02-14T09:00:00Z"),
            createdAt: new Date("2025-02-14T08:30:00Z"),
            updatedAt: new Date("2025-02-14T09:00:00Z"),
        },
        {
            id: "3",
            title: "Le festival de Cannes 2025 : les films ...",
            content: "Selection officielle, tendances et surprises du festival de Cannes 2025.",
            excerpt: "Zoom sur les films en competition cette annee.",
            author: "Pierre Moreau",
            status: ArticleStatusEnum.PUBLISHED,
            network: "Réseau Principal",
            categories: ["Culture"],
            featured: true,
            publishedAt: new Date("2025-02-12T12:00:00Z"),
            createdAt: new Date("2025-02-12T11:00:00Z"),
            updatedAt: new Date("2025-02-12T12:00:00Z"),
        },
        {
            id: "4",
            title: "Les marchés financiers en pleine mut...",
            content: "Les marches financiers evoluent rapidement sous l'effet des annonces macroeconomiques.",
            excerpt: "Volatilite accrue et attentes des investisseurs.",
            author: "Jean Martin",
            status: ArticleStatusEnum.PUBLISHED,
            network: "Réseau Principal",
            categories: ["Business"],
            featured: false,
            publishedAt: new Date("2025-02-11T15:00:00Z"),
            createdAt: new Date("2025-02-11T14:00:00Z"),
            updatedAt: new Date("2025-02-11T15:00:00Z"),
        },
        {
            id: "5",
            title: "L'intelligence artificielle révolutionne ...",
            content: "Applications concretes de l'IA dans l'industrie, la sante et l'education.",
            excerpt: "Tour d'horizon des usages de l'IA en 2025.",
            author: "Marie Dupont",
            status: ArticleStatusEnum.PUBLISHED,
            network: "Réseau Principal",
            categories: ["Technologie", "Science"],
            featured: true,
            publishedAt: new Date("2025-02-08T10:00:00Z"),
            createdAt: new Date("2025-02-08T09:00:00Z"),
            updatedAt: new Date("2025-02-08T10:00:00Z"),
        },
        {
            id: "6",
            title: "Réforme éducative : ce qui change en...",
            content: "Les nouvelles mesures de la reforme educative et leur impact attendu sur les eleves.",
            excerpt: "Les principaux changements a retenir.",
            author: "Claire Dubois",
            status: ArticleStatusEnum.ARCHIVED,
            network: "Réseau Interne",
            categories: ["Politique"],
            featured: false,
            publishedAt: new Date("2025-01-18T09:30:00Z"),
            createdAt: new Date("2025-01-18T08:30:00Z"),
            updatedAt: new Date("2025-01-18T09:30:00Z"),
        },
    ]

const ArticlePage = () =>{

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | number | null>(null);

    const handleOpenForm = (id?: string | number) => {
        id && setSelectedId(id);
        !id && setSelectedId(null);
        setOpenForm(true);
    };

    const handleCancelForm = () => {
        setSelectedId(null);
        setOpenForm(false);
    };

    const handleSubmitForm = (data: IArticleFormInput) => {
        setOpenForm(false);
    };

    const handleOpenConfirmDelete = (id: string | number) => {
        setSelectedId(id);
        setOpenConfirmDelete(true);
    };

    const handleConfirmDelete = (id: string | number) => {
        setOpenConfirmDelete(false);
    };

    const handleCancelDelete = () => {
        setSelectedId(null);
        setOpenConfirmDelete(false);
    };

    const handleToggleFeature = (id: string | number) => {};

    const handleArchive = (id: string | number) => {};

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
            <ArticleFilter />
        </Box>
        <Box>
            <ArticleList 
                items={LIST} 
                onArchive={handleArchive}
                onDelete={handleOpenConfirmDelete}
                onEdit={handleOpenForm}
                onFeature={handleToggleFeature}
            />
        </Box>
        {openForm && (
            <ArticleForm 
                open={openForm}
                loading={false}
                onSubmit={handleSubmitForm}
                onCancel={handleCancelForm}
                article={selectedId ? LIST.find((a) => a.id === selectedId) : undefined}
            />
        )}
        {selectedId && openConfirmDelete && (
            <DeleteConfirmation 
                open={openConfirmDelete}
                articleId={selectedId}
                articleTitle={selectedId ? LIST.find((a) => a.id === selectedId)?.title! : ""}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        )}
    </Box>
}

export default ArticlePage;