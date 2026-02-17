import { Close } from "@mui/icons-material";
import type { ICustomDialogProps } from "./interface";
import { dialogActionStyleSx, dialogContentStyleSx, dialogTitleStyleSx } from "./style";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import type { FC } from "react";

const CustomDialog: FC<ICustomDialogProps> = (props) => {

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
                <Box>
                    <Close onClick={props.dialogProps?.onClose as any} />
                </Box>
            </Box>
        </DialogTitle>
        {props.dialogContentText && (
            <DialogContentText {...props.dialogContentTextProps}>
                {props.dialogContentText}
            </DialogContentText>
        )}
        <Box sx={{...dialogContentStyleSx, ...(props?.dialogContentStyleSx as any || {})}}>
            <DialogContent {...props.dialogContentProps}>
                {props.dialogContents}
            </DialogContent>
            <DialogActions sx={dialogActionSx} {...resetDialogActionProps}>
                {props.dialogActions}
            </DialogActions>
        </Box>
    </Dialog>
}

export default CustomDialog