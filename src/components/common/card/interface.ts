import type { CardActionsProps, CardContentProps, CardHeaderProps, CardMediaProps, CardProps } from "@mui/material";
import type { ReactNode } from "react";

export interface ICustomCardContent {
    children: ReactNode;
    attribute?: CardContentProps;
}

export interface ICustomCardAction {
    children: ReactNode;
    attribute?: CardActionsProps;
}

export interface ICustomCardProps {
    cardProps?: CardProps;
    withCardMedia?: boolean;
    cardHeaderProps?: CardHeaderProps;
    cardMediaProps?: CardMediaProps;
    cardContent: ICustomCardContent;
    cardAction?: ICustomCardAction;
}