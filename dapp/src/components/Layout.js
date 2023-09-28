import { Outlet } from "react-router-dom";

import Header from "./Header";
import Navegacion from "./Navegacion";

function Layout() {
    return (
        <>
            
            <Navegacion />
            <Outlet />
        </>
    );
}

export default Layout;