import { Close } from "@mui/icons-material";
import type { ICustomDialogFormProps } from "./interface";
import { dialogActionStyleSx, dialogContentStyleSx, dialogTitleStyleSx } from "./style";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { type FieldValues, useFormContext } from "react-hook-form";

const CustomDialogForm = <T extends FieldValues,>({...props}: ICustomDialogFormProps<T>) => {
    const { handleSubmit } = useFormContext<T>();

    const { sx: customDialogActionSx, ...resetDialogActionProps } = props.dialogActionProps || {}

    const dialogActionSx = {
        ...dialogActionStyleSx,
        ...(props.dialogActionProps?.sx || {})
    }

    return <Dialog {...props.dialogProps} onClose={() => {}}>
        <DialogTitle {...props.dialogTitleProps}>
            <Box sx={dialogTitleStyleSx}>
                <Box>
                    {props.title}
                </Box>
                {props.dialogProps?.onClose && (
                    <Box>
                        <Close onClick={props.dialogProps?.onClose as any} />
                    </Box>
                )}
            </Box>
        </DialogTitle>
        {props.dialogContentText && (
            <DialogContentText {...props.dialogContentTextProps}>
                {props.dialogContentText}
            </DialogContentText>
        )}
        <Box sx={{...dialogContentStyleSx, ...(props?.dialogContentStyleSx as any || {})}}>
            <form  onSubmit={handleSubmit(props.onSubmit)}>
                <DialogContent {...props.dialogContentProps}>
                    {props.dialogContents}
                </DialogContent>
                <DialogActions sx={dialogActionSx} {...resetDialogActionProps}>
                    {props.dialogActions}
                </DialogActions>
            </form>
        </Box>
    </Dialog>
}

export default CustomDialogForm