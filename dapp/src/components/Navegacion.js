import {NavLink} from "react-router-dom";

const Navegacion = () => {

    const f = ({isActive}) => isActive ? "navlinkactive" : "";

    return <nav>
        <ul>
            <li><NavLink className={f} to="/">Home</NavLink></li>
            <li><NavLink className={f} to="/company/">Compañias</NavLink></li>
            <li><NavLink className={f} to="/traductores/">Traductores</NavLink></li>
            <li><NavLink className={f} to="/propuestas/">Propuestas</NavLink></li>
            <li><NavLink className={f} to="/videos/">Subir Videos</NavLink></li>
            <li><NavLink className={f} to="/miscosas/">Mis Cosas</NavLink></li>
        </ul>
    </nav>
};

export default Navegacion;