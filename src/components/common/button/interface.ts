import type { ButtonProps } from "@mui/material";
import type { ReactNode } from "react";

export interface ICustomButtonProps extends ButtonProps {
    children: ReactNode;
}