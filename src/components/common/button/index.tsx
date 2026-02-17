import type { ICustomButtonProps } from "./interface";
import { Button } from "@mui/material";
import type { FC, ReactNode } from "react";
import style from "./style";

const CustomButton: FC<ICustomButtonProps> = (props) => {

    const buttonSx = {
        ...style,
        ...(props.sx || {})
    };

    const formatLabel = (children: ReactNode): ReactNode => {
        if (typeof children === "string" || typeof children === "number") {
            const text = String(children).toLowerCase();
            return text.length > 0 ? text[0].toUpperCase() + text.slice(1) : text;
        }

        if (Array.isArray(children)) {
            return children.map((child, index) => (
                <span key={index}>{formatLabel(child)}</span>
            ));
        }

        return children;
    };

    return <Button {...props} sx={buttonSx}>{formatLabel(props.children)}</Button>;
}

export default CustomButton;