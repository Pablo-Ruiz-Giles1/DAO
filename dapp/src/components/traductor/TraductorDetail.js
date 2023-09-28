import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useParams, Link } from "react-router-dom";
import Watchipfs from '../ipfs/watchipfs';
import SoyAdmin from "../roles/SoyAdmin"
import SoyCompany from "../roles/SoyCompany"

import Traductortip from './traductortip';
const { useDrizzle } = drizzleReactHooks;
const TraductorDetail = () => {
    const { useCacheCall } = useDrizzle();
    let { addr } = useParams();
    const datos = useCacheCall("Traductores", "datosHolders", addr);
    const tokens = useCacheCall("GovernanceToken", "balanceOf", addr);
    return <>
        <header className="AppCompany">
            <h2>Traductor Info</h2>
        </header>
        <ul>
            <li><b>Nombre:</b> {datos ?? "Desconocido"}</li>
            
            <li><b>Address:</b> {addr}</li>

            <li><b>Tokens:</b> {tokens}</li>
        </ul>
        <SoyAdmin>
        <Traductortip></Traductortip>
        </SoyAdmin>

        <SoyCompany>
        <Traductortip address={addr} ></Traductortip>
        </SoyCompany>

        <div>
        <Link to="/traductores">Volver</Link>
        </div>

        
        <Watchipfs address={addr} ></Watchipfs>

    </>
};
export default TraductorDetail;