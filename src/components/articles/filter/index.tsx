import type { IArticleFilterProps, IArticleFilterState } from "./interface";
import type { FC } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import CustomCard from "@components/common/card";
import CustomTextField from "@components/common/input/textField";
import CustomSelect from "@components/common/input/select";
import CustomCheckBox from "@components/common/input/checkbox";

const INITIAL_FILTERS: IArticleFilterState = {
    search: "",
    categories: [],
    status: "",
    featured: false,
};

const ArticleFilter: FC<IArticleFilterProps> = () => {
    const [filters, setFilters] = useState<IArticleFilterState>(INITIAL_FILTERS);

    const statusOptions = [
        { label: "All Status", value: "" },
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" },
    ];

    const categoryOptions = [
        { label: "All Categories", value: "" },
        { label: "Technology", value: "technology" },
        { label: "Business", value: "business" },
        { label: "Lifestyle", value: "lifestyle" },
    ];

    const handleFilterChange = (field: string, value: unknown) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
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