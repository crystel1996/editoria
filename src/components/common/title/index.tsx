import type { ITitleProps } from "@components/common/title/interface";
import { Typography } from "@mui/material";
import type { FC } from "react";

const Title: FC<ITitleProps> = ({ children, variant = "h1", sx, ...props }) => {
    return <Typography variant={variant} sx={sx} {...props}>{children}</Typography>
}

export default Title;