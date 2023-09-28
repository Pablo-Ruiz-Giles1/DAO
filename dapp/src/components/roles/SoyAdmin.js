import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyAdmin = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const address = drizzleState.accounts[0];
  //  const balance = drizzleState.accountBalances[address];
  

    const admin = useCacheCall("Traductores", "admin");



    if (address !== admin) {
        return null;
    }
    return <>
        {children}
    </>
     

};
export default SoyAdmin;