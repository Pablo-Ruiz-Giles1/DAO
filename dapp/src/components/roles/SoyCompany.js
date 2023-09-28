import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyCompany = ({children}) => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const numero_companias = useCacheCall("Traductores", "getCompanyLength") || 0;
    
    //Conseguir las Compañias

     let rows = useCacheCall(['Traductores'], call => {
        let rows = [];
        for (let ei = 0; ei < numero_companias; ei++) {
            const addr_company = call("Traductores", "companies", ei);
            rows.push(addr_company)
        }
        return rows;
    });
    for (let i = 0; i < numero_companias; i++) {

        if (rows[i] === drizzleState.accounts[0]) {
            return (
                <>
                {children}
                </>
            );
        }
       
    }
};
export default SoyCompany;