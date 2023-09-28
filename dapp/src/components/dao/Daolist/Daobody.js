import { drizzleReactHooks } from '@drizzle/react-plugin'



import Daowatch from "./Daowatch"; 


const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const Daobody = ({children}) => {

    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const addr = drizzleState.accounts[0];
    const balance = drizzleState.accountBalances[addr];
    
    



  
    const proposesLength = useCacheCall("GovernorContract", "s_proposalCount") || 0;


 

  let rows = [];
  for (let i = 0; i < proposesLength; i++) {
      rows.push(<Daowatch key={"ab-" + i} DaoIndex={i} />);
  }
  return <tbody>{rows}</tbody>;



 
   

};
export default Daobody;