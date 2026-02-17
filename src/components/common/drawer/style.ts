import { darken, type SxProps } from "@mui/material";
import theme from "@theme/theme";
import { DRAWER_WIDTH } from "@utils/constant/drawer";

const style: SxProps = {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box' },
    '& .drawer-content': {
        marginTop: 2,
        overflow: 'auto'
    },
    '& .drawer-item': {
        transition: 'background-color 0.3s',
        '&.active': {
            backgroundColor: darken(theme.palette.primary.main, 0.2)
        },
        '& .drawer-item-button': {
            color: '#ffffff',
            '& .MuiListItemIcon-root': {
                color: 'inherit'
            },
            '& .MuiTypography-root': {
                color: 'inherit'
            }
        }
    }
}

export default style;