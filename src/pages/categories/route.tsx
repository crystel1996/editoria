import CategoriePage from "@pages/categories";
import { CATEGORIE_PATH } from "@services/path/categorie";
import type { IRoute } from "@types/routes.interface";

const CategorieRoutes: IRoute[] = [
    {
        path: CATEGORIE_PATH(),
        element:<CategoriePage />
        
    }
];

export default CategorieRoutes;