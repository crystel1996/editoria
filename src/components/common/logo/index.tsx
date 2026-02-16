import type { ILogoProps } from "@components/common/logo/interface";
import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import style from "./style";

const Logo: FC<ILogoProps> = (props) => {

    const logoSx = {
        ...style,
        ...(props.sx || {})
    };

    return  <Box sx={logoSx}>
                {props.icon && <Box className="logo-icon">{props.icon}</Box>}
                <Typography variant="h6" component="div">
                    {props.title}
                </Typography>
            </Box>
};

export default Logo;