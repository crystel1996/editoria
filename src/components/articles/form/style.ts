import type { SxProps } from "@mui/material";

export const dialogContentStyleSx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    
}

export const dialogActionStyleSx: SxProps = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '8px',
    flexWrap: 'wrap'
}

export const dialogHeaderStyleSx: SxProps = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    '& h4': {
        fontWeight: 'bold',
        fontSize: '18px'
    }
}