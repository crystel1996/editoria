import CustomDialog from "@components/common/dialog";
import { Typography } from "@mui/material";
import type { FC } from "react";
import CustomButton from "@components/common/button";
import type { IDeleteConfirmationProps } from "./interface";

const DeleteConfirmation: FC<IDeleteConfirmationProps> = (props) => {
    return  <CustomDialog 
                title="Suppression de la catégorie"
                dialogProps={{
                    open: props.open,
                    onClose: props.onCancel
                }}
                dialogContents={(
                    <Typography>
                        Êtes-vous sûr de vouloir supprimer {props.categoryName ?? "cette catégorie"} ? Cette action est irréversible.
                    </Typography>
                )}
                dialogActions={
                    <>
                        <CustomButton variant="outlined" onClick={props.onCancel}>Annuler</CustomButton>
                        <CustomButton variant="contained" color="error" onClick={() => props.onConfirm(props.categoryId)}>Supprimer</CustomButton>
                    </>
                }
            />
}

export default DeleteConfirmation;