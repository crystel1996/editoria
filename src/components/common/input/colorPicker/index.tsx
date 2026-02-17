import type { FC } from "react";
import { TextField } from "@mui/material";
import type { ICustomColorPickerProps } from "@components/common/input/colorPicker/interface";

const CustomColorPicker: FC<ICustomColorPickerProps> = (props) => {
    return (
        <TextField
            size="small"
            type="color"
            InputLabelProps={{ shrink: true }}
            {...props}
        />
    );
};

export default CustomColorPicker;
