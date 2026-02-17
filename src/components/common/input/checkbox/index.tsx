import type { FC } from 'react'
import type { ICustomCheckBoxProps } from './interface';
import { Checkbox, FormControlLabel } from '@mui/material';

const CustomCheckBox: FC<ICustomCheckBoxProps> = ({ label, ...rest}) => {
    return <FormControlLabel
                control={<Checkbox {...rest} />}
                label={label}
            />
};

export default CustomCheckBox;