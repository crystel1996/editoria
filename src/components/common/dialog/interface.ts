import type { DialogActionsProps, DialogContentProps, DialogContentTextProps, DialogProps, DialogTitleProps, SxProps } from "@mui/material";
import type { ReactNode } from "react";

export interface ICustomDialogProps {
    title: string | ReactNode;
    dialogProps: DialogProps;
    dialogActions: ReactNode;
    dialogContents: ReactNode;
    dialogTitleProps?: DialogTitleProps;
    dialogContentText?: string;
    dialogContentTextProps?: DialogContentTextProps;
    dialogContentProps?: DialogContentProps;
    dialogActionProps?: DialogActionsProps
    dialogContentStyleSx?: SxProps;
}