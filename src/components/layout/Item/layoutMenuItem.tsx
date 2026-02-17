
import { Article, Dashboard, Folder, Notifications } from "@mui/icons-material";
import type { IListDrawerMenu } from "@components/common/drawer/interface";
import { HOME_PATH } from "@services/path/dashboard";
import type { ILayoutMenuItem } from "./interface";
import content from "./content";
import { ARTICLE_PATH } from "@services/path/article";
import { CATEGORIE_PATH } from "@services/path/categorie";
import { NOTIFICATION_PATH } from "@services/path/notification";

const layoutMenuItem = (input: ILayoutMenuItem):  IListDrawerMenu[] => {
    return [
            {
                title: content.field.dashboard.title, 
                icon: <Dashboard />, 
                path: HOME_PATH(), 
                isActive: input.location.pathname == HOME_PATH()
            },
            {
                title: content.field.article.title,
                icon: <Article />,
                path: ARTICLE_PATH(),
                isActive: input.location.pathname == ARTICLE_PATH()
            },
            {
                title: content.field.category.title,
                icon: <Folder />,
                path: CATEGORIE_PATH(),
                isActive: input.location.pathname == CATEGORIE_PATH()
            },
            {
                title: content.field.notification.title,
                icon: <Notifications />,
                path: NOTIFICATION_PATH(),
                isActive: input.location.pathname == NOTIFICATION_PATH()
            }
        ]
};

export default layoutMenuItem;