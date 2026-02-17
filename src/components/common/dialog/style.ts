import type { SxProps } from "@mui/material";

export const dialogTitleStyleSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
        cursor: 'pointer'
    }
}

export const dialogContentStyleSx: SxProps = {
    width: '600px',
    maxWidth: '600px',
    overflowX: 'hidden'
}

export const dialogActionStyleSx: SxProps = {
    px: '24px',
    py: '24px'
}