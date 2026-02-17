import type { SxProps } from "@mui/material";

const style: SxProps = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    gap: 2,
    color: '#ffffff',
    '& .MuiTypography-root': {
        color: 'inherit'
    },
    '& .logo-icon': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        backgroundColor: '#182543',
        borderRadius: '50%',
        color: 'inherit',
        padding: '16px 16px'
    }
}

export default style;