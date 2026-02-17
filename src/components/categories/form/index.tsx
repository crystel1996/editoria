import { type FC, useEffect } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import type { ICategoryFormProps, ICategoryFormInput } from './interface';
import CustomDialogForm from '@components/common/dialogForm';
import CustomTextField from '@components/common/input/textField';
import { Box } from '@mui/material';
import CustomButton from '@components/common/button';
import { dialogContentStyleSx, dialogActionStyleSx } from './style';
import CustomTextarea from '@components/common/input/textarea';
import CustomColorPicker from '@components/common/input/colorPicker';
import { Cancel, Save } from '@mui/icons-material';

const CategoryForm: FC<ICategoryFormProps> = (props) => {

    const form = useForm<ICategoryFormInput>();

    useEffect(() => {
        !props.open && form.reset()
    }, [props.open]);

    useEffect(() => {
        const handlePopulateForm = () => {
            if(props.category) {
                Object.keys(props.category).forEach((key) => {
                    form.setValue(key as keyof ICategoryFormInput, props.category?.[key as keyof ICategoryFormInput])
                });
            }
        }
        handlePopulateForm();
    }, [props.category]);

    const handleClose = () => {
        props.onCancel();
    };
    
    const handleSubmit = (data: ICategoryFormInput) => {
        props.onSubmit(data);
    };

    return <FormProvider {...form}>
            <CustomDialogForm<ICategoryFormInput>
                onSubmit={handleSubmit}
                title={props.category ? "Modifier la catégorie" : "Ajouter une catégorie"}
                dialogProps={{
                    open: props.open,
                    onClose: handleClose
                }}
                dialogContents={(
                    <Box sx={dialogContentStyleSx}>
                        <CustomTextField
                            fullWidth
                            placeholder="Nom de la catégorie"
                            label="Nom de la catégorie"
                            {...form.register('name', {
                                required: "Le nom de la catégorie est requis",
                            })}
                            error={!!form.formState.errors.name}
                            helperText={form.formState.errors.name?.message}
                        />
                        <CustomTextarea 
                            fullWidth
                            placeholder="Description de la catégorie"
                            label="Description de la catégorie"
                            {...form.register('description', {
                                required: "La description de la catégorie est requise",
                            })}
                            error={!!form.formState.errors.description}
                            helperText={form.formState.errors.description?.message}
                        />
                        <CustomColorPicker
                            fullWidth
                            label="Couleur"
                            {...form.register('color', {
                                required: "La couleur est requise",
                            })}
                            error={!!form.formState.errors.color}
                            helperText={form.formState.errors.color?.message}
                        />
                    </Box>
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

export default CategoryForm;