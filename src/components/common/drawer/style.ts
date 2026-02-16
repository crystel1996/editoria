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
        '&.active': {
            backgroundColor: darken(theme.palette.primary.main, 0.2)
        }
    }
}

export default style;