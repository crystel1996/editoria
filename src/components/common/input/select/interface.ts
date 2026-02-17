import type { FormControlProps, InputLabelProps, MenuItemProps, SelectProps } from "@mui/material"
import type { ReactNode } from "react";

export interface ICustomSelectOptions {
    label: ReactNode;
    value: string;
}

export type ICustomSelectProps = {
    id: string;
    label: string;
    options: ICustomSelectOptions[]
    formControlProps?: FormControlProps;
    inputLabelProps?: InputLabelProps;
    selectProps?: SelectProps;
    menuItemProps?: MenuItemProps;
    helperText?: string;
}