import type { DrawerProps } from "@mui/material";
import type { ReactNode } from "react";

export interface IListDrawerMenu {
    title: string;
    icon: ReactNode;
    path: string;
    hidden?: boolean;
    isActive: boolean;
}

export interface ICustomDrawerProps {
    drawerProps?: DrawerProps;
    drawerMenu: IListDrawerMenu[]
}

export interface IDynamicDrawerProps {
    drawerProps?: DrawerProps;
    children: ReactNode;
}