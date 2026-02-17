import type { ICustomTextareaProps } from "@components/common/input/textarea/interface";
import { TextField } from "@mui/material";
import type { FC } from "react";

const CustomTextarea: FC<ICustomTextareaProps> = (props) => {
    return <TextField size="small" multiline minRows={3} {...props} />;
}

export default CustomTextarea;