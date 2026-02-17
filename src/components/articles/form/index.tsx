import type { IArticleFormInput, IArticleFormProps } from "@components/articles/form/interface";
import CustomButton from "@components/common/button";
import CustomDialogForm from "@components/common/dialogForm";
import CustomCheckBox from "@components/common/input/checkbox";
import CustomSelect from "@components/common/input/select";
import CustomTextarea from "@components/common/input/textarea";
import CustomTextField from "@components/common/input/textField";
import { getCategoryColor } from "@components/articles/articles.utils";
import ArticlePreview from "@components/articles/form/preview";
import { Cancel, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { dialogActionStyleSx, dialogContentStyleSx, dialogHeaderStyleSx } from './style'
import { ArticleStatusEnum } from "@interfaces/article.interface";

const ArticleForm: FC<IArticleFormProps> = (props) => {

    const [showPreview, setShowPreview] = useState(false);

    const form  = useForm<IArticleFormInput>();

    const watchValues = form.watch();

    const categoryOptions = [
        { label: "Science", value: "Science" },
        { label: "Sport", value: "Sport" },
        { label: "Culture", value: "Culture" },
        { label: "Business", value: "Business" },
        { label: "Technologie", value: "Technologie" },
        { label: "Politique", value: "Politique" },
    ];

    const networkOptions = [
        { label: "Réseau Principal", value: "Réseau Principal" },
        { label: "Réseau Partenaires", value: "Réseau Partenaires" },
        { label: "Réseau Interne", value: "Réseau Interne" },
    ];

    const statusOptions = [
        { label: "Brouillon", value: ArticleStatusEnum.DRAFT },
        { label: "Publié", value: ArticleStatusEnum.PUBLISHED },
        { label: "Archivé", value: ArticleStatusEnum.ARCHIVED },
    ];

    useEffect(() => {
        !props.open && form.reset()
    }, [props.open]);

    useEffect(() => {
        const handlePopulateForm = () => {
            if(props.article) {
                Object.keys(props.article).forEach((key) => {
                    form.setValue(key as keyof IArticleFormInput, props.article?.[key as keyof IArticleFormInput])
                });
            }
        }
        handlePopulateForm();
    }, [props.article]);

    const handleClose = () => {
        props.onCancel();
    };
    
    const handleSubmit = (data: IArticleFormInput) => {
        props.onSubmit(data);
    };

    return <FormProvider {...form}>
        <CustomDialogForm<IArticleFormInput>
            onSubmit={handleSubmit}
            title={(
                <Box sx={dialogHeaderStyleSx}>
                    <Typography component="h4">
                        {props.article ? "Modifier l'article" : "Ajouter un article"}
                    </Typography>
                    <CustomButton
                        type="button"
                        variant="contained"
                        startIcon={showPreview ? <VisibilityOff /> : <Visibility />}
                        onClick={() => setShowPreview((prev) => !prev)}
                    >
                        {showPreview ? "Masquer la prévisualisation" : "Prévisualiser"}
                    </CustomButton>
                </Box>
            )}
            dialogProps={{
                open: props.open,
                onClose: handleClose,
                maxWidth: showPreview ? "xl" : "sm",
                fullWidth: true,
            }}
            dialogContentStyleSx={{
                width: '100%',
                maxWidth: '100vw'
            }}
            dialogContents={(
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, lg: showPreview ? 6 : 12 }}>
                        <Box sx={dialogContentStyleSx}>
                            <CustomTextField
                                fullWidth
                                placeholder="Titre de l'article"
                                label="Titre"
                                {...form.register('title', {
                                    required: "Le titre de l'article est requis",
                                    minLength: {
                                        value: 5,
                                        message: "Le titre doit contenir au moins 5 caractères",
                                    },
                                })}
                                error={!!form.formState.errors.title}
                                helperText={form.formState.errors.title?.message}
                            />
                            <CustomTextField
                                fullWidth
                                placeholder="Resume cours de l'article"
                                label="Resume"
                                {...form.register('excerpt', {
                                    required: "Le resume est requis",
                                })}
                                error={!!form.formState.errors.excerpt}
                                helperText={form.formState.errors.excerpt?.message}
                            />
                            <CustomTextField
                                fullWidth
                                placeholder="Nom de l'autheur"
                                label="Autheur"
                                {...form.register('author', {
                                    required: "Autheur est requis",
                                })}
                                error={!!form.formState.errors.author}
                                helperText={form.formState.errors.author?.message}
                            />
                            <CustomTextarea 
                                fullWidth
                                placeholder="Contenu de l'article"
                                label="Contenu de l'article"
                                {...form.register('content', {
                                    required: "Le contenu est requise",
                                    minLength: {
                                        value: 50,
                                        message: "Le contenu doit contenir au moins 50 caractères",
                                    },
                                })}
                                error={!!form.formState.errors.content}
                                helperText={form.formState.errors.content?.message}
                            />
                            <Controller
                                name="categories"
                                control={form.control}
                                render={({ field }) => (
                                    <CustomSelect
                                        id="article-categories"
                                        label="Catégories"
                                        options={categoryOptions}
                                        selectProps={{
                                            multiple: true,
                                            value: field.value ?? [],
                                            onChange: field.onChange,
                                            renderValue: (selected) => (
                                                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                                                    {(selected as string[]).map((value) => (
                                                        <Chip
                                                            key={value}
                                                            label={value}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{
                                                                borderColor: getCategoryColor(value),
                                                                color: getCategoryColor(value),
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="network"
                                control={form.control}
                                render={({ field }) => (
                                    <CustomSelect
                                        id="article-network"
                                        label="Réseau"
                                        options={networkOptions}
                                        selectProps={{
                                            value: field.value ?? "",
                                            onChange: field.onChange,
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="status"
                                control={form.control}
                                render={({ field }) => (
                                    <CustomSelect
                                        id="article-status"
                                        label="Statut"
                                        options={statusOptions}
                                        selectProps={{
                                            value: field.value ?? ArticleStatusEnum.DRAFT,
                                            onChange: field.onChange,
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="featured"
                                control={form.control}
                                render={({ field }) => (
                                    <CustomCheckBox
                                        label="Mise en avant"
                                        checked={!!field.value}
                                        onChange={(event) => field.onChange(event.target.checked)}
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                    {showPreview && (
                        <Grid size={{ xs: 12, lg: 6 }}>
                            <Box sx={{ position: { lg: 'sticky' }, top: { lg: 16 } }}>
                                <ArticlePreview values={watchValues} />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            )}
            dialogActions={(
                <Box sx={dialogActionStyleSx}>
                    <CustomButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={props.loading}
                        startIcon={<Save />}
                    >
                        {props.loading && <>Chargement...</>}
                        {!props.loading && <>Sauvegarder</>}
                    </CustomButton>
                    <CustomButton
                        variant="outlined"
                        color="error"
                        onClick={handleClose}
                        startIcon={<Cancel />}
                    >
                        Annuler
                    </CustomButton>
                </Box>
            )}
        />
    </FormProvider>
}

export default ArticleForm;