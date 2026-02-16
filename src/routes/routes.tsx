import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import type { IRoutes } from "@types/routes.interface";
import ListRoutes from "@routes/listRoutes";

const RouteComponent: FC<IRoutes> = () => {
    return <>
        <Routes>
            {ListRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    </>
}

export default RouteComponent;