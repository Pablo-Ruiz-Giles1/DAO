
import { Drizzle } from '@drizzle/store';


///////////////////////////////////////////////////////


import GovernanceToken from './contracts/GovernanceToken.json';

import GovernorContract from './contracts/GovernorContract.json';

import TimeLock from './contracts/TimeLock.json';

import Traductores from './contracts/Traductores.json';

import Gestor from './contracts/Gestor.json';



import NFTContract from './contracts/NFTContract.json';


///////////////////////////////////////////////////////

// Opciones:
const options = {
    contracts: [ Gestor, GovernanceToken, Traductores, GovernorContract, TimeLock, NFTContract],
      
    polls: {
        accounts: 3000,
    },
    web3: {
        fallback: {

            /*
            type: "ws",
            url: "ws://127.0.0.1:8545"
            */
            
            type: "wss",
            url: "wss://sepolia.infura.io/ws/v3/c836b19a977649eea74534266dfeb35f"
            
        }
    }
}

// Crear y exportar el objeto drizzle:
const drizzle = new Drizzle(options);
export default drizzle;


