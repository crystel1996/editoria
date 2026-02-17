import type { FC } from "react";
import type { ICustomSelectProps } from "./interface";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

const CustomSelect: FC<ICustomSelectProps> = (props) => {
    return  <FormControl {...props.formControlProps} sx={{ ...(props.formControlProps?.sx || {}), width: '100%' }}>
                <InputLabel id={`${props.id}-label`} {...props.inputLabelProps}>{props.label}</InputLabel>
                <Select size="small" labelId={`${props.id}-label`}  id={props.id} label={props.label} {...props.selectProps}>
                    {props.options.map((option, index) => {
                        return <MenuItem key={index} {...props.menuItemProps} value={option.value}>{option.label}</MenuItem>
                    })}
                </Select>
                {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
            </FormControl>
}

export default CustomSelect;