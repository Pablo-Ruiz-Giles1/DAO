import { drizzleReactHooks } from '@drizzle/react-plugin'
import Watchipfs from './ipfs/watchipfs';
import SoyCompany from './roles/SoyCompany';
import SoyAdmin from './roles/SoyAdmin';
import SoyTraductor from './roles/SoyTraductor';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;



const Cuenta = ({children}) => {

    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const addr = drizzleState.accounts[0];
    const balance = drizzleState.accountBalances[addr];
  

    const tokens = useCacheCall("GovernanceToken", "balanceOf", addr);
    const admin = useCacheCall("Traductores", "admin");


    const gestor = useCacheCall("Gestor", "valor");

   return     <>
   <div>
 <h3>Mis Datos</h3>
            <ul>
               <SoyTraductor><li>Rol: Traductor</li></SoyTraductor>
               <SoyAdmin><li>Rol: Administrador</li></SoyAdmin>
               <SoyCompany><li>Rol: Compañía</li></SoyCompany>
               
                <li>Dirección: <span style={{color: "blue"}}>{addr}</span></li>
                <li>Balance: <span style={{color: "blue"}}>{balance}</span> weis</li>
                <li>Tokens: <span style={{color: "blue"}}>{tokens}</span> TDAO</li>
        
                
            </ul>

            <Watchipfs address={addr} ></Watchipfs>
            </div>
    </>
    
   

};
export default Cuenta;