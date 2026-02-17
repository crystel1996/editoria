import type { IRoute } from "@interfaces/routes.interface";
import ImportPage from "@pages/import";
import { IMPORT_PATH } from "@services/path/import";

const ImportRoutes: IRoute[] = [
    {
        path: IMPORT_PATH(),
        element:<ImportPage />
        
    }
];

export default ImportRoutes;