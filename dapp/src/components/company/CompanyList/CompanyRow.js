import {drizzleReactHooks} from '@drizzle/react-plugin'
import {Link} from "react-router-dom";
const {useDrizzle} = drizzleReactHooks;

const CompanyRow = ({CompanyIndex}) => {
 const {useCacheCall} = useDrizzle();
 let {addr, datos} = useCacheCall(['Traductores'],
 call => {
 const addr = call("Traductores", "companies", CompanyIndex);
 const datos = addr && call("Traductores", "datosCompanies", addr);
 return {addr, datos};
 }
 );
 return <tr key={"COM-" + CompanyIndex}>
 <th>A<sub>{CompanyIndex}</sub></th>
 <td>{datos}</td>
 <td>{addr}</td>
  <td><Link to={`/Company/${addr}`}>Info</Link></td>
 </tr>;
};
export default CompanyRow;