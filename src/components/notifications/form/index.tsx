import { useState, type FC, useMemo } from "react";
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

const NotificationForm: FC<INotificationFormProps> = ({ onSubmit, articles, isLoading }) => {

    const [showPreview, setShowPreview] = useState<boolean>(false);

    const form = useForm<INotificationFormValues>({
        defaultValues: {
            articleId: "",
            recipients: "",
            subject: "",
        },
    });

    const articleOptions = useMemo(() => 
        (articles || []).map(article => ({
            label: article.title,
            value: article.id
        })),
        [articles]
    );

    const watchValues = form.watch();
    const selectedArticle = (articles || []).find(a => a.id === watchValues.articleId);
    
    const previewData = selectedArticle ? {
        title: selectedArticle.title,
        excerpt: selectedArticle.excerpt || "",
        content: selectedArticle.content || ""
    } : {
        title: "Selectionnez un article",
        excerpt: "Aucun resume disponible pour le moment.",
        content: "Le contenu de l'article apparaitra ici apres selection.",
    };
    const previewSubject = watchValues.subject || `Nouvel article : ${previewData.title}`;

    const handleSubmit = (values: INotificationFormValues) => {
        const recipientsList = values.recipients
            .split(",")
            .map(item => item.trim())
            .filter(item => item.length > 0);
        
        onSubmit(values.articleId, recipientsList, values.subject);
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
                                            options={articleOptions}
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
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Envoi..." : "Envoyer"}
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
                                    articleTitle={previewData.title}
                                    articleExcerpt={previewData.excerpt}
                                    articleContent={previewData.content}
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
