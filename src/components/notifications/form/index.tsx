import { useState, type FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import CustomCard from "@components/common/card";
import CustomTextField from "@components/common/input/textField";
import CustomTextarea from "@components/common/input/textarea";
import CustomSelect from "@components/common/input/select";
import CustomButton from "@components/common/button";
import { Send, Visibility, VisibilityOff } from "@mui/icons-material";
import type { INotificationFormProps, INotificationFormValues } from "./interface";
import NotificationPreview from "@components/notifications/preview";

const ARTICLE_OPTIONS = [
    { label: "L'intelligence artificielle revolutionne le secteur medical", value: "1" },
    { label: "Les tendances tech de 2025", value: "2" },
    { label: "Finance et innovation: que retenir", value: "3" },
];

const ARTICLE_PREVIEW_DATA: Record<string, { title: string; excerpt: string; content: string }> = {
    "1": {
        title: "L'intelligence artificielle revolutionne le secteur medical",
        excerpt: "L'IA transforme le secteur medical avec des diagnostics plus precis.",
        content:
            "L'intelligence artificielle transforme profondement le secteur medical. Des algorithmes sophistiques permettent desormais de diagnostiquer certaines maladies avec une precision superieure a celle des ...",
    },
    "2": {
        title: "Les tendances tech de 2025",
        excerpt: "Un tour d'horizon des innovations qui vont marquer l'annee.",
        content:
            "De l'edge computing a l'IA generative, les entreprises accelerent leur transformation. Voici les tendances clees a surveiller pour rester competitif.",
    },
    "3": {
        title: "Finance et innovation: que retenir",
        excerpt: "Les acteurs financiers innovent pour mieux servir leurs clients.",
        content:
            "Open banking, paiements instantanes et cybersecurite: la finance evolue vite. Ce dossier resume les mouvements majeurs et leurs impacts.",
    },
};

const NotificationForm: FC<INotificationFormProps> = ({ onSubmit }) => {

    const [showPreview, setShowPreview] = useState<boolean>(false);

    const form = useForm<INotificationFormValues>({
        defaultValues: {
            articleId: "",
            recipients: "",
            subject: "",
        },
    });

    const watchValues = form.watch();
    const selectedArticle = ARTICLE_PREVIEW_DATA[watchValues.articleId] || {
        title: "Selectionnez un article",
        excerpt: "Aucun resume disponible pour le moment.",
        content: "Le contenu de l'article apparaitra ici apres selection.",
    };
    const previewSubject = watchValues.subject || `Nouvel article : ${selectedArticle.title}`;

    const handleSubmit = (values: INotificationFormValues) => {
        onSubmit(values);
        form.reset();
    };

    return (
        <Grid container spacing={2} alignItems="stretch">
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                <CustomCard
                    cardProps={{ sx: { width: "100%", height: "100%", display: "flex", flexDirection: "column" } }}
                    cardHeaderProps={{ title: "Envoyer une notification" }}
                    cardContent={{
                        children: (
                            
                            <Box
                                component="form"
                                onSubmit={form.handleSubmit(handleSubmit)}
                                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                            >
                                <Controller
                                    name="articleId"
                                    control={form.control}
                                    rules={{ required: "Veuillez choisir un article" }}
                                    render={({ field }) => (
                                        <CustomSelect
                                            id="notification-article"
                                            label="Article"
                                            options={ARTICLE_OPTIONS}
                                            selectProps={{
                                                value: field.value,
                                                onChange: field.onChange,
                                            }}
                                            helperText={form.formState.errors.articleId?.message}
                                        />
                                    )}
                                />
                                <CustomTextarea
                                    fullWidth
                                    label="Destinataires (emails separes par virgules)"
                                    placeholder="email1@test.com, email2@test.com"
                                    {...form.register("recipients", {
                                        required: "Veuillez saisir au moins un email",
                                    })}
                                    error={!!form.formState.errors.recipients}
                                    helperText={form.formState.errors.recipients?.message}
                                />
                                <CustomTextField
                                    fullWidth
                                    label="Sujet"
                                    placeholder="Nouvel article :"
                                    {...form.register("subject", {
                                        required: "Le sujet est requis",
                                    })}
                                    error={!!form.formState.errors.subject}
                                    helperText={form.formState.errors.subject?.message}
                                />
                                <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
                                    <CustomButton
                                        type="submit"
                                        variant="contained"
                                        startIcon={<Send />}
                                    >
                                        Envoyer
                                    </CustomButton>
                                    <CustomButton
                                        variant="outlined"
                                        startIcon={showPreview ? <VisibilityOff /> : <Visibility />}
                                        onClick={() => setShowPreview(!showPreview)}
                                    >
                                        {showPreview ? "Masquer" : "Prévisualiser"}
                                    </CustomButton>
                                </Box>
                            </Box>
                        ),
                        attribute: {},
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                {showPreview && (
                    <CustomCard 
                        cardProps={{ sx: { width: "100%", height: "100%", display: "flex", flexDirection: "column" } }}
                        cardContent={{
                            children: (
                                <NotificationPreview
                                    fromEmail="noreply@cms-editorial.com"
                                    subject={previewSubject}
                                    articleTitle={selectedArticle.title}
                                    articleExcerpt={selectedArticle.excerpt}
                                    articleContent={selectedArticle.content}
                                />
                            )
                        }}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default NotificationForm;
