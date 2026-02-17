import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import CustomDrawer from "@components/common/drawer";
import layoutMenuItem from "@components/layout/Item/layoutMenuItem";
import style, { customDrawerStyle } from "./style";

const Layout = () => {

    const location = useLocation();

    return <Box sx={style}>
        <CustomDrawer 
            drawerProps={{
                variant: 'permanent',
                sx: customDrawerStyle,
            }}
            drawerMenu={layoutMenuItem({ location })}
        />
        <Box component="main" className="main-component__layout">
            <Outlet />
        </Box>
    </Box>
}

export default Layout;