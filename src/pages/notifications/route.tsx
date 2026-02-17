import type { IRoute } from "@interfaces/routes.interface";
import NotificationPage from "@pages/notifications";
import { NOTIFICATION_PATH } from "@services/path/notification";

const NotificationRoutes: IRoute[] = [
    {
        path: NOTIFICATION_PATH(),
        element:<NotificationPage />
        
    }
];

export default NotificationRoutes;