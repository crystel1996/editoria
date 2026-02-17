import type { SxProps, TypographyProps } from "@mui/material";
import type { ReactNode } from "react";

export interface ITitleProps extends TypographyProps {
    children: ReactNode;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    sx?: SxProps;
}