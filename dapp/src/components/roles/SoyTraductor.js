import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyTraductor = ({children}) => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const numero_traductores = useCacheCall("Traductores", "getTraductorLength") || 0;
    
    //Conseguir los traductores

     let rows = useCacheCall(['Traductores'], call => {
        let rows = [];
        for (let ei = 0; ei < numero_traductores; ei++) {
            const addr_traductor = call("Traductores", "s_traductores", ei);
            rows.push(addr_traductor)
        }
        return rows;
    });
    for (let i = 0; i < numero_traductores; i++) {

        if (rows[i] === drizzleState.accounts[0]) {
            return (
                <>
                {children}
                </>
            );
        }
       
    }
};
export default SoyTraductor;