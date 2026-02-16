import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import type { IRoutes } from "@types/routes.interface";
import ListRoutes from "@routes/listRoutes";
import Layout from "@components/layout";

const RouteComponent: FC<IRoutes> = () => {
    return <>
        <Routes>
            <Route element={<Layout />}>
                {ListRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Route>
        </Routes>
    </>
}

export default RouteComponent;