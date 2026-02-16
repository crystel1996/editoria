import type { SxProps } from "@mui/material";
import { DRAWER_WIDTH } from "@utils/constant/drawer";
import { customDarkScrollbar } from "@utils/style/customScrollbar";

const style: SxProps = {
    '& .main-component__layout': {
        flexGrow: 1,
        padding: '20px',
        marginLeft: `${DRAWER_WIDTH}px`
    }
}

export const customDrawerStyle: SxProps = {
    '& .drawer-content': {
        overflow: 'visible !important'
    },
    '& .MuiPaper-root': {
        ...(customDarkScrollbar || {}),
        height: `100vh`,
        backgroundColor: '#0F172A',
        overflowY: 'auto',
        color: (theme: any) => theme.palette.getContrastText(theme.palette.primary.main),
        borderTop: `1px solid #0F172A`,
        '& .MuiSvgIcon-root': {
            color: (theme: any) => theme.palette.getContrastText(theme.palette.primary.main),
        }
    }
}

export default style;