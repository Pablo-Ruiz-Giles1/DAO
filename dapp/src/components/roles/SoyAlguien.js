import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyAlguien = ({children}) => {
    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const numero_companias = useCacheCall("Traductores", "getCompanyLength") || 0;
    
    let flag = 0;
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
           flag = 1; 
        }
       
    }


    const numero_traductores = useCacheCall("Traductores", "getTraductorLength") || 0;
    
    //Conseguir los traductores

     let rows2 = useCacheCall(['Traductores'], call => {
        let rows2 = [];
        for (let ei = 0; ei < numero_traductores; ei++) {
            const addr_traductor = call("Traductores", "s_traductores", ei);
            rows2.push(addr_traductor)
        }
        return rows2;
    });

    for (let i = 0; i < numero_companias; i++) {

        if (rows2[i] === drizzleState.accounts[0]) {
           flag = 1; 
        }
       
    }

    const admin = useCacheCall("Traductores", "admin");

    if (admin === drizzleState.accounts[0]) {
        flag = 1; 
     }

     if(flag !== 0)
     {
          return <>
     {children}
 </>
    }
    return <>
    <h3>Registrese primero o identifiquese</h3>
    </>;
};
export default SoyAlguien;