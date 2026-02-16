
import { Article, Dashboard } from "@mui/icons-material";
import type { IListDrawerMenu } from "@components/common/drawer/interface";
import { HOME_PATH } from "@services/path/dashboard";
import type { ILayoutMenuItem } from "./interface";
import content from "./content";
import { ARTICLE_PATH } from "@services/path/article";

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
            }
        ]
};

export default layoutMenuItem;