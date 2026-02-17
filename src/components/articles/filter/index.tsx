import type { IArticleFilterProps, IArticleFilterState } from "./interface";
import type { FC } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import CustomCard from "@components/common/card";
import CustomTextField from "@components/common/input/textField";
import CustomSelect from "@components/common/input/select";
import CustomCheckBox from "@components/common/input/checkbox";
import { useCategories } from "@context/CategoryContext";
import type { ArticleFilters } from '@services/api/article.service';

const INITIAL_FILTERS: IArticleFilterState = {
    search: "",
    categories: [],
    status: "",
    featured: false,
};

const ArticleFilter: FC<IArticleFilterProps> = (props) => {
    const [filters, setFilters] = useState<IArticleFilterState>(INITIAL_FILTERS);
    const { categories } = useCategories();

    const statusOptions = [
        { label: "Tous les status", value: "" },
        { label: "Publié", value: "published" },
        { label: "Brouillon", value: "draft" },
        { label: "Archivé", value: "archived" },
    ];

    const categoryOptions = [
        { label: "Toutes les catégories", value: "" },
        ...categories.map(cat => ({ 
            label: cat.name, 
            value: String(cat.id) 
        })),
    ];

    const handleFilterChange = (field: string, value: unknown) => {
        const newFilters = {...filters, [field]: value };
        setFilters(newFilters);
        const apiFilters: ArticleFilters = {
            search: newFilters.search || undefined,
            categories: newFilters.categories.length > 0 ? newFilters.categories : undefined,
            status: (newFilters.status as 'draft' | 'published' | 'archived' | undefined) || undefined,
            featured: newFilters.featured || undefined,
        };

        // Remove undefined values
        Object.keys(apiFilters).forEach(
            (key) => (apiFilters as any)[key] === undefined && delete (apiFilters as any)[key]
        );

        props.onFilterChange?.(apiFilters);
    };

    return (
        <CustomCard
            cardProps={{ sx: { mb: 3 } }}
            cardHeaderProps={{
                title: "Filtres",
                titleTypographyProps: { variant: "h6" },
            }}
            cardContent={{
                children: (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <CustomTextField
                                label="Chercher"
                                placeholder="Chercher des articles..."
                                value={filters.search}
                                onChange={(e) =>
                                    handleFilterChange("search", e.target.value)
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <CustomSelect
                                id="category-filter"
                                label="Catégorie"
                                options={categoryOptions}
                                selectProps={{
                                    multiple: true,
                                    value: filters.categories,
                                    onChange: (e) =>
                                        handleFilterChange("categories", e.target.value),
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <CustomSelect
                                id="status-filter"
                                label="Statut"
                                options={statusOptions}
                                selectProps={{
                                    value: filters.status,
                                    onChange: (e) =>
                                        handleFilterChange("status", e.target.value),
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: "flex", alignItems: "flex-end" }}>
                            <CustomCheckBox
                                label="Mise en avant"
                                checked={filters.featured}
                                onChange={(e) =>
                                    handleFilterChange("featured", e.target.checked)
                                }
                            />
                        </Grid>
                    </Grid>
                ),
            }}
        />
    );
};

export default ArticleFilter;