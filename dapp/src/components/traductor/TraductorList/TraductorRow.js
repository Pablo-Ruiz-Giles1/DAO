import {drizzleReactHooks} from '@drizzle/react-plugin'
import {Link} from "react-router-dom";
const {useDrizzle} = drizzleReactHooks;

const TraductorRow = ({TraductorIndex}) => {
 const {useCacheCall} = useDrizzle();
 let {addr, datos} = useCacheCall(['Traductores'],
 call => {
 const addr = call("Traductores", "s_traductores", TraductorIndex);
 const datos = addr && call("Traductores", "datosHolders", addr);
 return {addr, datos};
 }
 );
 return <tr key={"TRA-" + TraductorIndex}>
 <th>A<sub>{TraductorIndex}</sub></th>
 <td>{datos}</td>
 <td>{addr}</td>
  <td><Link to={`/Traductor/${addr}`}>Info</Link></td>
 </tr>;
};
export default TraductorRow;