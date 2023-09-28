import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useParams, Link } from "react-router-dom";
import Watchipfs from '../ipfs/watchipfs';


import TokenCompanybody from './tokens/TokenCompanybody';


const { useDrizzle } = drizzleReactHooks;


const CompanyDetail = () => {
    const { useCacheCall } = useDrizzle();
    let { addr } = useParams();
    const datos = useCacheCall("Traductores", "datosCompanies", addr);
    const tokens = useCacheCall("GovernanceToken", "balanceOf", addr);

    return <>
        <header className="AppCompany">
            <h2>Company Info</h2>
        </header>
        <div>
        <ul>
            <li><b>Nombre:</b> {datos ?? "Desconocido"}</li>
            
            <li><b>Address:</b> {addr}</li>

            <li><b>Tokens:</b> {tokens}</li>
        </ul>
        <TokenCompanybody></TokenCompanybody>
        <Watchipfs address={addr} ></Watchipfs>
        <Link to="/company">Volver</Link>
        </div>
    </>
};
export default CompanyDetail;