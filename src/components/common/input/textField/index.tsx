import type { FC } from 'react'
import type { ICustomTextFieldProps } from './interface';
import { TextField } from '@mui/material';

const CustomTextField: FC<ICustomTextFieldProps> = (props) => {
    return <TextField size="small" {...props} />
};

export default CustomTextField;