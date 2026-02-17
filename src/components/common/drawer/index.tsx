import style from "./style";
import type { ICustomDrawerProps, IListDrawerMenu } from "./interface";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@components/common/logo";
import { SourceOutlined } from "@mui/icons-material";

const CustomDrawer: FC<ICustomDrawerProps> = (props) => {

    const navigate = useNavigate();

    const handleClickItem = (e: MouseEvent<HTMLElement>, item: IListDrawerMenu) => {
        e.stopPropagation();
        navigate(item.path);
    };

    const { sx: customDrawerSx, ...restDrawerProps} = props.drawerProps || {};

    const drawerSx = {
        ...style,
        ...(customDrawerSx || {})
    };

    return <Drawer sx={drawerSx} {...restDrawerProps}>
        <Logo title="Editoria" icon={<SourceOutlined />} />
        <Divider />
        <Box className="drawer-content">
            <List>
                {props.drawerMenu
                .filter((item) => !item.hidden)
                .map((item) => (
                    <ListItem 
                        key={item.title} 
                        onClick={(e) => handleClickItem(e, item)} 
                        disablePadding 
                        className={`drawer-item ${item.isActive ? 'active' : ''}`}
                    >
                        <ListItemButton className="drawer-item-button">
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>
}

export default CustomDrawer;