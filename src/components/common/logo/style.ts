import type { SxProps } from "@mui/material";

const style: SxProps = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    gap: 2,
    '& .logo-icon': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        backgroundColor: 'primary.main',
        borderRadius: '50%',
        color: '#fff',
        padding: '16px 16px'
    }
}

export default style;